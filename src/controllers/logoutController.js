const TeacherModel = require("../models/teacherModel");
require('dotenv').config();
const AppError = require("../helpers/AppError");
const { USER_ERROR } = require("../helpers/errorCodes");
const { RESPONSE_NO_CONTENT } = require("../helpers/confirmationMessages");
const { tryCatch } = require("../helpers/tryCatch");

const handleLogout = tryCatch(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    throw new AppError(USER_ERROR, RESPONSE_NO_CONTENT, 204);
  }

  const refreshToken = cookies.jwt;
  const foundTeacher = await TeacherModel.findOne({ refreshToken }).exec();

  if (!foundTeacher) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    throw new AppError(USER_ERROR, RESPONSE_NO_CONTENT, 204);
  }

  foundTeacher.refreshToken = '';
  const result = await foundTeacher.save();

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  return res.sendStatus(204);
});

module.exports = {
  handleLogout
}