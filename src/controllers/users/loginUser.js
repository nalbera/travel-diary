const {Users} = require('../../database/config/db');
const bycrypt = require('bcryptjs');

const loginUser = async (req,res) => {
    
    const {email,pwd} = req.body;

    try {
        
        if(!email || !pwd) return res.status(400).send('Missing data');

        const user = await Users.findOne({where:{email: email}});

        if(!user) return res.status(404).send('User not found');

        const check = bycrypt.compareSync(pwd,user.password);

        if(check==false) return res.status(401).send('Incorrect email or password');

        res.status(200).send({
            status: 'OK',
            message: 'User successfully logged in'
        })
    } catch (error) {
        
    }
}

module.exports = loginUser;