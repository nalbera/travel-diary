const {Users} = require('../../database/config/db');
const bycrypt = require('bcryptjs');

const createUser = async (req,res) => {
    
    const {email,pwd} = req.body;

    try {
        
        if(!email || !pwd) return res.status(400).send('Missing Datta');

        const user = await Users.findOne({where:{email: email}});

        if(user) return res.status(409).send('There is already a user with this email');

        const pwdEnc = bycrypt.hashSync(pwd,10);

        const newUser = await Users.create({email,password: pwdEnc});

        res.status(200).send({
            status: 'OK',
            message: 'User created successfully',
            data: newUser
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = createUser;