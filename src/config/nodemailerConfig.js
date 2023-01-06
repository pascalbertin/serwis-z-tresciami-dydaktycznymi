require('dotenv').config();
const nodemailer = require("nodemailer");

const nodemailerPass = process.env.NODEMAILER_PASS;
const nodemailerMail = process.env.NODEMAILER_MAIL;

exports.transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: nodemailerMail,
    pass: nodemailerPass
  }
});