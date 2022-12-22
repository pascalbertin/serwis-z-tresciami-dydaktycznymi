const TeacherModel = require("../models/teacherModel");
const bcrypt = require("bcrypt");
require('dotenv').config();
const AppError = require("../helpers/AppError");
const { USER_ERROR } = require("../helpers/errorCodes");
const { USER_MISSING_PARAMETERS, USER_DUPLICATE } = require("../helpers/errorMessages");
const { USER_CREATED } = require("../helpers/confirmationMessages");
const { tryCatch } = require("../helpers/tryCatch");

const handleRegistration = tryCatch(async (req, res) => {
  //const {teacherName, teacherEmail, teacherPassword} = req.body;

  if (!req.body.username || !req.body.email || !req.body.password) {
    throw new AppError(USER_ERROR, USER_MISSING_PARAMETERS, 400);
  }

  const ifUserNameDuplicate = await TeacherModel.findOne({ userName: req.body.username }).exec();

  if (ifUserNameDuplicate) {
    throw new AppError(USER_ERROR, USER_DUPLICATE, 409);
  }

  //const hashedTeacherPassword = await bcrypt.hash(teacherPassword, 10);

  const newUser = TeacherModel({
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save();

  return res.status(200).json({message: USER_CREATED });
});

module.exports = {
  handleRegistration
};