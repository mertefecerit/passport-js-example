const nodeMailer = require('nodemailer');
const JWT = require('jsonwebtoken');


const mailler = async (email) => {
    const unSignedHash = {
        email: email
    }
    
    const token = JWT.sign(unSignedHash,process.env.JWT_SECRET_KEY);
    let transporter = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
    
    const accountActivationUrl = `http://localhost:3000/user/verify/${token}`;
    
    try{
        let info = await transporter.sendMail({
            from:'Passportjs Example - <mertefecerit@gmail.com>',
            to: email,
            subject: 'Account Activation',
            text: '',
            html: `<a href="${accountActivationUrl}">Activation Link</a>`
        });
    }catch(e){
        console.log(e);
    }
}

module.exports = mailler;