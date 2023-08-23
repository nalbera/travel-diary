const {Users} = require('../../database/config/db');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req,res) => {
    
    const {email,pwd} = req.body;

    try {
        
        if(!email || !pwd) return res.status(400).send({ message: 'Missing data' });

        const user = await Users.findOne({where:{email: email}});
        
        if(!user) return res.status(404).send({ message: 'User not found' });

        const check = bycrypt.compareSync(pwd,user.password);

        if(check==false) return res.status(401).send({message: 'Incorrect email or password'});
        
        if(!user.active) return res.status(401).send({message: 'User pending validation. Check the email.'});

        const jwtInfo = {
            id: user.id,
            role: user.role
        };
        
        const token = jwt.sign(jwtInfo, process.env.SECRET, {expiresIn: '1d'});

        res.status(200).send({
            status: 'OK',
            message: 'User successfully logged in',
            data: { token }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = loginUser;