const { Users } = require('../../database/config/db');

const getMe = async (req,res) => {
    const {id} = req.userInfo;
    try {
        
        const user = await Users.findByPk(id);

        if(!user) return res.status(400).send('User not found');

        const info = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            date: user.date
        }
        res.status(200).json(info);
    } catch (error) {
        
    }
}

module.exports = getMe;