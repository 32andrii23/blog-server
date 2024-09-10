import nodemailer, { Transporter } from "nodemailer";

class MailService {
    private transporter: Transporter;

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

    async sendActivationMail(to: string, link: string) {
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

        try {
            await this.transporter.sendMail(mailOptions);
            console.log("The message was sent");
        } catch (err) {
            console.log("Error occured", err);
        }
    }
}

export default new MailService();