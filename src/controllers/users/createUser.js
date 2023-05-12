const {Users} = require('../../database/config/db');
const bycrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const sendMail = require('../../services/sendMail');

const createUser = async (req,res) => {
    
    const {email,pwd} = req.body;

    try {
        
        if(!email || !pwd) return res.status(400).send('Missing Datta');

        const user = await Users.findOne({where:{email: email}});

        if(user) return res.status(409).send('There is already a user with this email');

        const regCode = uuidv4();

        const body = `
        You have just registered in Travel Diary.
        Click this link to activate the user: ${process.env.ACTIVE_ACOUNT_HOST}${regCode}
        `
        const respMail = await sendMail(email,'"Travel Diary" validation email',body);
      
        if(respMail.rejected.length!=0){
          return res.send({
                status: 'Error sending email',
                message: respMail.response
            })
        };
        
        const pwdEnc = bycrypt.hashSync(pwd,10);

        const newUser = await Users.create({email,password: pwdEnc, regCode: regCode});

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