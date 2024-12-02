const otpGenerator = require('speakeasy');
const config = require('../config/config');
const nodemailer = require('nodemailer');

const generateOTP = async (emailId) => {
    try {
        const secret = config.FORGET_PASSWORD_SECRET_KEY + emailId;
        const otp = await otpGenerator.totp({
            secret: secret,
            encoding: "base32",
            step: 600
        });
        return otp;
    } catch (error) {
        console.log({ ERROR: `Error in generateOTP Common function - ${error.message}` });

        throw new Error(error.message);
    };

};

const verifyOTP = async (otp,emailId) =>{

    try {
        const secret = config.FORGET_PASSWORD_SECRET_KEY + emailId;

        const verified = await otpGenerator.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: otp,
            step: 600
          });
          return verified;
    } catch (error) {
        console.log({ ERROR: `Error in verifyOTP Common function - ${error.message}` });

        throw new Error(error.message);        
    };
};

const replaceHtmlContent = async (content, keyObject) => {
    for (let key in keyObject) {
        const replaceText = '${' + key + '}';
        content = content && (content.split(replaceText).join(keyObject[key]));

    }
    return content;
};

const sendMail = async (MAILCODE, to , html) => {
    console.log({ INFO: `Send Mail function Called with MailCode - ${MAILCODE}` });

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "ashalaxmima@gmail.com",
                pass: "xymi ivit exer kjiu",
            },
        });

        const info = await transporter.sendMail({
            from: '"Dev Tinder" <ashalaxmima@gmail.com>',
            to: to,
            subject: config[MAILCODE].subject ?? null,
            text: config[MAILCODE].text,
            html: html,
        });

        if (info.messageId) {
            console.log({ INFO: `Send Mail Function Success - MessageId =${info.messageId} ` });
            return true;
        } else throw new Error("failed to send Mail");


    } catch (error) {
        console.log({ ERROR: `Error in sendMail Common function - ${error.message}` });

        throw new Error(error.message);
    };
};

module.exports = { generateOTP, sendMail, replaceHtmlContent,verifyOTP };