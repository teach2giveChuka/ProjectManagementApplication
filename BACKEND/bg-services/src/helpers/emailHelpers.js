"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createTransporter(configs) {
    const transporter = nodemailer_1.default.createTransport(configs);
    return transporter;
}
let configurations = ({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    auth: {
        user: "charitynyawirairungu@gmail.com",
        pass: "gerugoyqivctdjbh"
    }
});
const sendMail = (messageOption) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = createTransporter(configurations);
    yield transporter.verify();
    console.log('verified');
    yield transporter.sendMail(messageOption, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(info.response);
        }
    });
});
exports.sendMail = sendMail;
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
