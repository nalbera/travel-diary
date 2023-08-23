const {Users} = require('../../database/config/db');
const bycrypt = require('bcryptjs');

const resetPassword = async (req,res) => {
    const {recoverCode, newPwd} = req.body;

    try {
        
        if(!recoverCode || !newPwd || newPwd.length < 6) return res.status(400).send({message: 'Missing fields or new password is too short'});

        const user = await Users.findOne({where:{recoverCode}});

        if(!user) return rs.status(404).send({message: 'Incorrect recovery code'});

        await Users.update(
            {
                password: bycrypt.hashSync(newPwd,10),
                lastAuthUpdate: new Date(),
                recoverCode: null
            },
            {
                where: { id: user.id }
            }
        );

        res.status(200).send({
            status: 'OK',
            message: 'User password changed'
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = resetPassword;