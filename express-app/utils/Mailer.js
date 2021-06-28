"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'ashleigh.jones@ethereal.email', // generated ethereal user
    pass: 'pedn1r1ax3whf2qNty', // generated ethereal password
  },
});

module.exports = transporter