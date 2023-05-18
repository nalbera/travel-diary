const { Entries, Users, Votes, Photos } = require('../../database/config/db');
const {fn,col, Op} = require('sequelize');

const listEntries = async (req,res) => {
    
    const {search, order, direction} = req.body;

    const orderFields = ['place','date','votes'];
    const orderBy = orderFields.includes(order) ? order : 'date';

    const directionFields = ['ASC','DESC'];
    const orderDirection = directionFields.includes(direction) ? direction : 'DESC';

    try {
        //attributes: [[sequelize.fn('IFNULL', sequelize.col('A.price'), sequelize.col('B.price')]],
        //fn('AVG',col('vote')),'avgVote']
        //fn('AVG',fn('IFNULL',col('vote'),0),'avgVote') 
        let entries;
        if (search){
            entries = await Entries.findAll({
                attributes: ['id','place','description'],
                include: [
                    {model: Users, attributes: ['id','email'] },
                    {model: Votes, attributes: [[fn('AVG',col('vote')),'avgVote']]},
                    {model: Photos}
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
                attributes: ['id','place','description'],
                include: [
                    {model: Users, attributes: ['id','email'] },
                    {model: Votes, attributes: [[fn('AVG',col('vote')),'avgVote']]},
                    {model: Photos}
                ],
                group: 'id',
                order: [
                    [orderBy, orderDirection]
                ],
            });
        };
        res.status(200).send({
            status: 'OK',
            message: 'List of entries',
            data: { entries }
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = listEntries;