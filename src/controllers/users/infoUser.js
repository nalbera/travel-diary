const { Users } = require('../../database/config/db');

const infoUser = async (req,res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const user = await Users.findByPk(id);
        
        if(!user) return res.status(400).send('User not found');

        const info = {
            id: user.id,
            date: user.date,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            role: user.role
        }

        res.status(200).json(info);
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = infoUser;