require('dotenv').config();
const TeacherModel = require("../models/teacherModel");
const jwt = require('jsonwebtoken');
const AppError = require("../helpers/AppError");
const { tryCatch } = require("../helpers/tryCatch");
const { USER_MISSING_PARAMETERS, USER_UNAUTHORIZED, USER_NOT_FOUND } = require("../helpers/errorMessages");
const { USER_ERROR } = require("../helpers/errorCodes");

const handleLogin = tryCatch(async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    throw new AppError(USER_ERROR, USER_MISSING_PARAMETERS, 400);
  }

  const foundUser = await TeacherModel.findOne({ userName: req.body.username }).exec();

  if (!foundUser) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  if (req.body.password !== foundUser.password || !foundUser.verification) {
    throw new AppError(USER_ERROR, USER_UNAUTHORIZED, 401);
  }

  if (req.body.password === foundUser.password) {
    const roles = Object.values(foundUser.roles).filter(Boolean);

    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": foundUser.username,
          "roles": roles
        }
      },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    const refreshToken = jwt.sign(
      { "username": foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    return res.status(200).json({ roles, accessToken });
  }
});

module.exports = {
  handleLogin
};