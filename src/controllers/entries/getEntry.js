const { Entries, Users, Votes, Photos } = require('../../database/config/db');
const {fn,col} = require('sequelize');

const getEntry = async (req,res) => {
    
    const { id } = req.params;

    try {
        
        const entry = await Entries.findOne({
            attributes: ['id','place','description',],
            include: [
                {model: Users, attributes: ['email'] },
                {model: Votes, attributes: [[fn('AVG',col('vote')),'avgVote']]},
                {model: Photos, attributes: ['id', 'photo', 'date']}
            ],
            where: { id }
        });

        res.status(200).send({
            status: 'OK',
            message: 'Entry detail',
            data: {
                entry
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = getEntry;