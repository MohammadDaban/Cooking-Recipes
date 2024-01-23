import nodemailer from 'nodemailer';

async function sendEmail(to,subject,html){
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.EMAIL,
    pass: process.env.SENDPASSWORD,
    },
    tls:{
        rejectUnauthorized: false
        }
});

    const info = await transporter.sendMail({
      from:`"Cooking Recipes👻" <${process.env.EMAIL}>`,  
      to,
      subject,
      html,
    });
}


export default sendEmail
