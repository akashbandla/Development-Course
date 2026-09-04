import nodemailer from "nodemailer";

class EmailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendPasswordResetOtp(email, otp) {

        await this.transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: "Project Tracker - Password Reset OTP",

            text: `
                    Your Project Tracker password reset OTP is: ${otp}

                    This OTP will expire in 10 minutes.

                    If you did not request a password reset, please ignore this email.
                `,

            html: `
                <h2>Password Reset Request</h2>

                <p>Your Project Tracker password reset OTP is:</p>

                <h1>${otp}</h1>

                <p>This OTP will expire in <strong>10 minutes</strong>.</p>

                <p>
                    If you did not request a password reset,
                    please ignore this email.
                </p>
            `
        });
    }
}

export default new EmailService();