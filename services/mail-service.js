const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Akauntni tastiqlash' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Saytga kirishingiz uchun havola orqali tastiqlang!</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        }, function (error, info) {
            if (error) {
                console.log(error.message)
            } else {
                console.log("Email Sent: " + info.response)
            }
        })
    }
}

module.exports = new MailService();
