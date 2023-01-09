const TeacherModel = require("../models/teacherModel");
const bcrypt = require("bcrypt");
require('dotenv').config();
const AppError = require("../helpers/AppError");
const { USER_ERROR } = require("../helpers/errorCodes");
const { USER_MISSING_PARAMETERS, USER_DUPLICATE } = require("../helpers/errorMessages");
const { USER_CREATED } = require("../helpers/confirmationMessages");
const { tryCatch } = require("../helpers/tryCatch");
const { transporter } = require('../config/nodemailerConfig');

const handleRegistration = tryCatch(async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    throw new AppError(USER_ERROR, USER_MISSING_PARAMETERS, 400);
  }

  const ifUserNameDuplicate = await TeacherModel.findOne({ userName: req.body.username }).exec();

  if (ifUserNameDuplicate) {
    throw new AppError(USER_ERROR, USER_DUPLICATE, 409);
  }

  const hashedUserPassword = await bcrypt.hash(req.body.password, 10);

  let newUser;
  
  if (req.body.avatar != '') {
    newUser = TeacherModel({
      userName: req.body.username,
      email: req.body.email,
      password: hashedUserPassword,
      avatar: req.body.avatar
    });
  } else {
    newUser = TeacherModel({
      userName: req.body.username,
      email: req.body.email,
      password: hashedUserPassword
    });
  }

  newUser.save();

  const mailOptions = {
    from: 'Tutors Alpha <JakubStyszynski@gmail.com>',
    to: req.body.email,
    subject: 'Tutors Alpha - Potwierdzenie rejestracji',
    text: req.body.username,
    html: "<b><strong><p>Dziękujemy za rejestrację w naszym serwisie.</p></strong></b> <br/> <p>Kliknij w poniższy link aby aktywować konto: </p><br/><form action='https://serwis-z-tresciami.herokuapp.com/api/users/"+req.body.username+"/verification'><button type='submit'>Aktywuj konto</button></form>"
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (!error) {
      console.log("E-mail sent: " + info.response);
    }
  });

  return res.status(200).json({message: USER_CREATED });
});

module.exports = {
  handleRegistration
};
