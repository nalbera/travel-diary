const {Users} = require('../../database/config/db');
const {v4 : uuidv4} = require('uuid');
const sendMail = require('../../services/sendMail');

const recorverPassword = async (req,res) => {
    const { email } = req.body;

    try {
        if(!email) return res.status(400).send('Missing fields');

        const user = await Users.findOne({where:{email: email}});

        if(!user) return res.status(409).send('There is no registered user with that email');

        const recoverCod = uuidv4();

        const body = `
        A password change was requested for the user registered with this email in the Travel Diary app. <br>
        The recovery code is: ${recoverCod} <br>
        If you were not the one who requested the change, please ignore this email. <br><br>
        
        You can login with your usual password. <br><br>
        
        Thank you!
        `
        const respMail = await sendMail(email,'Change password in Travel Diary',body);
      
        if(respMail.rejected.length!=0){
          return res.send({
                status: 'Error sending email',
                message: respMail.response
            })
        };

        await Users.update(
            {
                recoverCode: recoverCod,
                lastAuthUpdate: new Date()
            },
            {
                where: { email }
            }
        );

        res.status(200).send({
            status: 'OK',
            message: 'E-mail sent'
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = recorverPassword;