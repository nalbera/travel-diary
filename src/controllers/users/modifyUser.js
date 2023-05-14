const { Users } = require('../../database/config/db');
const loadPhoto = require('../../services/loadPhoto');

const {v4: uuidv4} = require('uuid');

const modifyUser = async (req,res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    
    try {
        
        if(req.userInfo.id !== parseInt(id) && req.userInfo.role !== 'admin'){
            return res.status(403).send('You do not have permissions to edit this user');
        }

        const user = await Users.findByPk(id);

        
        if(req.files && req.files.avatar){
            const userImage = await loadPhoto(req.files.avatar);
            
            await Users.update(
                {
                    avatar: userImage
                },
                {
                    where: { id }
                }
            );
        }
        
        if(email && email !== user.email){
            const existsEmail = await Users.findOne({where:{email: email}});

            if(existsEmail) return res.status(409).send('There is already a user with the email provided in the database');

            const regCode = uuidv4();

            const body = `
            You have just modified your email in the Travel Diary.
            Click on this link to validate your new email: ${process.env.ACTIVE_ACOUNT_HOST}${regCode}
            `
            const respMail = await sendMail(email,'"Travel Diary" Confirm your new email',body);
      
            if(respMail.rejected.length!=0){
            return res.send({
                    status: 'Error sending email',
                    message: respMail.response
                })
            };

            await Users.update(
                {
                    name: name,
                    email: email,
                    lastAuthUpdate: new Date(),
                    active: 0,
                    regCode: regCode
                },
                {
                    where: { id }
                }
            );

            res.status(200).send({
                status: 'OK',
                message: 'Updated user data. Check your email to validate the new address'
            });

        }else{
            await Users.update(
                {
                    name: name
                },
                {
                    where: { id }
                }
            );
    
            res.status(200).send('Updated user data');
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = modifyUser;