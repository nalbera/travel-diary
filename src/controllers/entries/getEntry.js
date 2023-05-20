const { Entries, Users, Votes, Photos } = require('../../database/config/db');
const {fn,col} = require('sequelize');

const getEntry = async (req,res) => {
    
    const { id } = req.params;

    try {
        
        const entry = await Entries.findAll({
            attributes: ['id','place','description',],
            include: [
                {model: Users, attributes: ['email'] },
                {model: Votes, attributes: [[fn('AVG',col('vote')),'avgVote']]},
            ],
            where: { id }
        });
        
        const photosByEntry = await Photos.findAll({
            where:{
                entry_id: id
            }
        });
        
        const parseEntry = JSON.stringify(entry);
        const jsonEntry = JSON.parse(parseEntry);
        const parsePhotos = JSON.stringify(photosByEntry);
        const photos = JSON.parse(parsePhotos);
        
        res.status(200).send({
            status: 'OK',
            message: 'Entry detail',
            data: {
                ...jsonEntry[0],
                photos
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = getEntry;