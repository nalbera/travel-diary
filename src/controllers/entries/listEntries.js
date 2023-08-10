const { Entries, Users, Votes, Photos } = require('../../database/config/db');
const {fn,col, Op, Sequelize} = require('sequelize');

const listEntries = async (req,res) => {
    
    const {search, order, direction} = req.body;

    const orderFields = ['place','date','votes'];
    const orderBy = orderFields.includes(order) ? order : 'date';

    const directionFields = ['ASC','DESC'];
    const orderDirection = directionFields.includes(direction) ? direction : 'DESC';

    try {
        let entries;
        if (search){
            entries = await Entries.findAll({
                attributes: ['id','date','place','description'],
                include: [
                    {model: Users, attributes: ['id','email'] },
                    {model: Votes, attributes: [[fn('AVG',fn('IFNULL',col('vote'),0)),'avgVote']]},
                ],
                where: { 
                    [Op.or]: [
                        {
                            place: { [Op.like]: `%${search}%` }
                        },
                        {
                            description: { [Op.like]: `%${search}%` }
                        }
                    ]
                },
                group: 'id' ,
                order: [
                    [orderBy, orderDirection]
                ],
            });
        }else{

            entries = await Entries.findAll({
                attributes: ['id','date','place','description'],
                include: [
                    {model: Users, attributes: ['id','email'] },
                    {model: Votes, attributes: [[fn('AVG',fn('IFNULL',col('vote'),0)),'avgVote']]},
                ],
                group: 'id',
                order: [
                    [orderBy, orderDirection]
                ],
            })
        };

        let entriesWithPhotos = [];

        if(entries.length > 0){
            
            const parseEntries = JSON.stringify(entries);
            const jsonEntries = JSON.parse(parseEntries);
            const arrayID = entries.map((e) => e.id);
            
            const photos = await Photos.findAll({
                where:{
                    entry_id:{
                        [Op.in]: arrayID
                    }
                }
            });
            
            const parsePhotos = JSON.stringify(photos);
            const jsonPhotos = JSON.parse(parsePhotos);
            
            entriesWithPhotos = jsonEntries.map((entry) => {
                const photoEntry = jsonPhotos.filter((photo) => {
                    return photo.entry_id === entry.id;
                });
                console.log(photoEntry);
                return {
                   ...entry,
                   photos: photoEntry
                };
            })
        }
        
        res.status(200).send({
            status: 'OK',
            message: 'List of entries',
            data: entriesWithPhotos
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = listEntries;