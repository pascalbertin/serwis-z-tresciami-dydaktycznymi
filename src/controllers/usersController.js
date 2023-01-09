const TeacherModel = require("../models/teacherModel");
const AppError = require("../helpers/AppError");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { USER_ERROR } = require("../helpers/errorCodes");
const { USER_NOT_FOUND, USER_MISSING_PASSWORD, USER_UNAUTHORIZED, USER_FORBIDDEN, USER_NOT_ENOUGH_MONEY, USER_BANK_ACCOUNT_MISSING } = require("../helpers/errorMessages");
const { USER_DELETED, USER_ACCOUNT_VERIFIED, USER_MODIFY, USER_RESET_PASSWORD, USER_MONEY_WITHDRAWED } = require("../helpers/confirmationMessages");
const { tryCatch } = require("../helpers/tryCatch");
const { transporter } = require('../config/nodemailerConfig');

const teacherGetAll = tryCatch(async (req, res) => {
  const user = await TeacherModel.find();

  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  res.user = user;
  return res.status(200).json(res.user);
});

const userGetByUsername = tryCatch(async (req, res) => {
  const user = await TeacherModel.findOne({userName: req.params.username});

  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  res.user = user;
  return res.status(200).json(res.user);
});

const userPatchByUsername = tryCatch(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt){
    throw new AppError(USER_ERROR, USER_UNAUTHORIZED, 401);
  }

  const refreshToken = cookies.jwt;
  const foundUser = await TeacherModel.findOne({ refreshToken }).exec();
  if (!foundUser) {
    throw new AppError(USER_ERROR, USER_FORBIDDEN, 403);
  }

  const user = await TeacherModel.findOne({userName: req.params.username});
  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  if (req.params.username != foundUser.userName) {
    throw new AppError(USER_ERROR, USER_UNAUTHORIZED, 401);
  }

  res.user = user;
  
  if (req.body.password != null && req.body.password != "") {
    const hashedUserPassword = await bcrypt.hash(req.body.password, 10);
    res.user.password = hashedUserPassword;
  }

  if (req.body.avatar != null && req.body.avatar != "") {
    res.user.avatar = req.body.avatar;
  }

  if (req.body.bank_account != null && req.body.bank_account != "") {
    res.user.bank_account = req.body.bank_account;
  }
  
  await res.user.save();
  return res.status(200).json({message: USER_MODIFY});
});

const userDeleteByUsername = tryCatch(async (req, res) => {
  const user = await TeacherModel.findOne({userName: req.params.username})
  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  res.user = user;

  await TeacherModel.deleteOne({userName: res.user.userName});
  return res.status(200).json({message: USER_DELETED});
});

const userVerifyAfterRegistration = tryCatch(async (req, res) => {
  const user = await TeacherModel.findOne({userName: req.params.username});
  res.user = user;

  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  user.verification = true;

  await res.user.save();
  return res.status(200).json({message: USER_ACCOUNT_VERIFIED});
});

const userPasswordReset = tryCatch(async (req, res) => {
  const newPassword = crypto.randomBytes(16).toString('hex');

  const user = await TeacherModel.findOne({email: req.body.email});
  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  res.user = user;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  res.user.set({password: hashedPassword});

  const mailOptions = {
    from: 'Tutors Alpha <JakubStyszynski@gmail.com>',
    to: req.body.email,
    subject: 'Tutors Alpha - Resetowanie hasła',
    text: newPassword,
    html: "<p>Twoje hasło zostało zresetowane. Aby się zalogować użyj nowo wygenerowanego hasła: " + newPassword + "</p>"
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (!error) {
      console.log("E-mail sent: " + info.response);
    }
  });

  await res.user.save();
  return res.status(200).json({message: USER_RESET_PASSWORD});
});


const userWithdrawMoney = tryCatch(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt){
    throw new AppError(USER_ERROR, USER_UNAUTHORIZED, 401);
  }

  const refreshToken = cookies.jwt;
  const foundUser = await TeacherModel.findOne({ refreshToken }).exec();
  if (!foundUser) {
    throw new AppError(USER_ERROR, USER_FORBIDDEN, 403);
  }

  const user = await TeacherModel.findOne({userName: req.params.username});
  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  if (req.params.username != foundUser.userName) {
    throw new AppError(USER_ERROR, USER_UNAUTHORIZED, 401);
  }

  if(foundUser.bank_account == "00 0000 0000 0000 0000 0000 0000") {
    throw new AppError(USER_ERROR, USER_BANK_ACCOUNT_MISSING, 407);
  }

  res.user = user;
  if (res.user.accountBalance < req.body.moneyAmount) {
    throw new AppError(USER_ERROR, USER_NOT_ENOUGH_MONEY, 406);
  }

  const moneyAmountToBeWithdrawed = req.body.moneyAmount
  const currentBalance = res.user.accountBalance
  const balanceAfterWithdraw = currentBalance - moneyAmountToBeWithdrawed
  res.user.set({accountBalance: balanceAfterWithdraw})
  
  const mailOptions = {
    from: 'Tutors Alpha <JakubStyszynski@gmail.com>',
    to:'TutorsAlphaKontakt@gmail.com',
    subject: 'Tutors Alpha - Wypłata środków',
    text: moneyAmountToBeWithdrawed,
    html: "<p>Użytkownik: " + res.user.userName + "<br/>zażądał wypłatę środków w wysokości: " + moneyAmountToBeWithdrawed +"<br/>na konto bankowe: "+res.user.bank_account+"</p>"
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (!error) {
      console.log("E-mail sent: " + info.response);
    }
  });
  
  
  await res.user.save();
  return res.status(200).json({message: USER_MONEY_WITHDRAWED});
});

module.exports = { 
  teacherGetAll,
  userGetByUsername,
  userPatchByUsername,
  userDeleteByUsername,
  userVerifyAfterRegistration,
  userPasswordReset,
  userWithdrawMoney
};