const { Users } = require('../../database/config/db');

const infoUser = async (req,res) => {
    const { id } = req.params;

    try {
        const user = await Users.findByPk(id);
        
        if(!user) return res.status(400).send('User not found');

        const info = {       
            name: user.name,
            avatar: user.avatar,
        }

        if(req.userInfo.id === parseInt(id) || req.userInfo.role==='admin'){
            info.id = user.id;
            info.date = user.date;
            info.email = user.email;
            info.role = user.role;
        }
        res.status(200).json(info);
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = infoUser;