// utils/emailService.js
const nodemailer = require('nodemailer');

// Configure your email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'Outlook', 'SendGrid', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app password
    },
    // For production, consider using a more robust service and less permissive options
    tls: {
        rejectUnauthorized: false
    }
});

const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Permintaan Reset Password - Kode OTP Anda',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #0056b3;">Permintaan Reset Password</h2>
                <p>Halo,</p>
                <p>Anda telah meminta untuk mengatur ulang password akun Anda. Berikut adalah kode OTP (One-Time Password) Anda:</p>
                <h3 style="color: #d9534f; background-color: #f9f9f9; padding: 10px; border-radius: 5px; display: inline-block;">${otp}</h3>
                <p>Kode ini berlaku selama <strong>10 menit</strong>. Harap masukkan kode ini di halaman reset password untuk melanjutkan.</p>
                <p>Jika Anda tidak meminta reset password ini, abaikan email ini.</p>
                <p>Terima kasih,</p>
                <p>Tim Sekolah Yayasan Pesantren YPMA</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP Email sent successfully to:', email);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Gagal mengirim email OTP.');
    }
};

module.exports = {
    sendOtpEmail
};