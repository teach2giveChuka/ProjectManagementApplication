import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { mail_configs } from '../interfaces/mail_configs'

dotenv.config()

function createTransporter(configs: mail_configs){
    const transporter = nodemailer.createTransport(configs)

    return transporter;
}

let configurations : any = ({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    auth:{
        user: "charitynyawirairungu@gmail.com",
        pass: "gerugoyqivctdjbh"
    }
})

export const sendMail = async(messageOption:any)=>{
    const transporter = createTransporter(configurations)    

    await transporter.verify()
    console.log('verified');

    await transporter.sendMail(messageOption, (error, info)=>{
        if(error){
            console.log(error);
            
        }else{
            console.log(info.response);
        }
    })
}

// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// import { mail_configs } from '../interfaces/mail_configs';

// dotenv.config();

// function createTransporter(configs: mail_configs) {

//     const transporter = nodemailer.createTransport(configs);
//     return transporter;

// }

// console.log(process.env.EMAIL);
// console.log(process.env.PASSWORD);


// let configurations: any = {
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     requireTLS: true, // true for 465, false for other ports
//     auth: {
//         user: process.env.EMAIL, // use environment variables for security
//         pass: process.env.PASSWORD
//     }
// };

// export const sendMail = async (messageOption: any) => {
//     try {
//         const transporter = await createTransporter(configurations);

//         await transporter.verify();
//         console.log('SMTP server connection verified.');

//         await transporter.sendMail(messageOption, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//             } else {
//                 console.log('Email sent successfully:', info.response);
//             }
//         });
//     } catch (error) {
//         console.error('Error in sendMail function:', error);
//     }
// };
