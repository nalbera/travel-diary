const { Users } = require('../database/config/db');

const userExist = async (req,res,next) => {

    const { id } = req.params;
    try {
        
        const user = Users.findByPk(id);

        if(!user) res.status(404).send('User not found');

        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = userExist;