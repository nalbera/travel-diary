const {Users} = require('../../database/config/db');
const bycrypt = require('bcryptjs');

const modifyPassword = async (req,res) => {
    const {oldPwd, newPwd} = req.body;
    try {
        const user = await Users.findByPk(req.userInfo.id);
        
        if(!user) return res.status(404).send('User not found');
        
        const check = bycrypt.compareSync(oldPwd,user.password);

        if(check==false) return res.status(401).send('Incorrect password');

        const id = req.userInfo.id;

        await Users.update(
            {
                password: bycrypt.hashSync(newPwd,10)
            },
            {
                where: {id}
            }
        );

        res.status(200).send({
            status: 'OK',
            message: 'Password changed successfully'
        });


    } catch (error) {
        console.log(error);
    }
}


module.exports = modifyPassword;