import nodemailer from "nodemailer";

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendActivationMail(to, link) {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject: "Account activation on " + process.env.API_URL,
            text: "",
            html: `
            <div>
                <h1>Click on the link below to activate your account</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        }

        await this.transporter.sendMail(mailOptions, (err, res) => {
            if (err) console.log(err);
        })
    }
}

export default new MailService();