const {Votes, Entries} = require ('../../database/config/db');
const {Op,fn,col} = require('sequelize');

const voteEntry = async (req,res) => {

    const { id } = req.params;
    const userId = req.userInfo.id;
    const { vote } = req.body;

    try {
        
        if(!vote || vote < 1 || vote > 5) return res.status(400).send('Invalid vote');

        const entry = await Entries.findByPk(id);

        if(entry.user_id === userId) res.status(403).send("You can't vote for your own entry");
        
        const voteExist = await Entries.findOne({
            attributes: ['id'],
            where:{
                [Op.and]:[
                    { user_id: userId },
                    { id: id}
                ]
            }
        });

        if(voteExist) res.status(403).send("You can't vote for the same post twice.");

        await Votes.create({
            vote,
            user_id: userId,
            entry_id: id
        });

        const media = await Entries.findAll({
            include:[
                {model: Votes, attributes: [[fn('AVG',col('vote')),'avgVote']]}
            ],
            where:{
                id
            }
        });

        res.status(200).send({
            status: 'OK',
            message: 'Voted Entry',
            data: {mediaVotes: media}
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = voteEntry;