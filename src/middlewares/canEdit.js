const {Entries} = require('../database/config/db');

const canEdit = async (req,res,next) => {
    
    const { id } = req.params;

    try {
        
        const entrie = await Entries.findOne({
            attributes: ['user_id'],
            where: {
                id: id
            }
        });

        if(req.userInfo.id != entrie.user_id || req.userInfo.role !== 'admin'){
            res.status(401).send('You do not have permissions on this entry');
        }

        next();

    } catch (error) {
        console.log(error,'canEdit');
    }
}

module.exports = canEdit;