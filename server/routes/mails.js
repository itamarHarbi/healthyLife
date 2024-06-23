const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADRRESS,
        pass: process.env.EMAIL_PASS
    }
});
const mailOptions = {
    from: process.env.EMAIL_ADRRESS,
    to: 'itamaradam686@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};



router.get("/register", async (req, res) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    console.log(process.env.EMAIL_ADRRESS,process.env.EMAIL_PASS);
    res.send(process.env.EMAIL_ADRRESS)
})
module.exports = router;