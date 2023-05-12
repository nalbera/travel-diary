const nodeMailer = require('nodemailer');

const sendMail = async (to, subject, body) => {
    
    let transporter = nodeMailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: 587,
        auth: {
          user: process.env.USERNAME_MAIL,
          pass: process.env.SMTP_PWD,
        },
    });

    const mailToUser = await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: to,
        subject: subject,
        text: body,
        html:`
        <div>
            <h1>${subject}</h1>
            <p>${body}</p>
        </div>
        `
    });

    return mailToUser;

}


module.exports = sendMail;

// ,(error,info) => {
//     if(error){
//         return {
//             success: false,
//             error: error
//         }
//     }else{
//         return {
//             success: true,
//             message: 'email sent'
//         }
//     }
// }