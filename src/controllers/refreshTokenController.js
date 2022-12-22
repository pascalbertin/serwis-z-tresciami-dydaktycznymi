const TeacherModel = require("../models/teacherModel");
const jwt = require('jsonwebtoken');
const AppError = require("../helpers/AppError");
const { tryCatch } = require("../helpers/tryCatch");
const { USER_UNAUTHORIZED, USER_FORBIDDEN } = require("../helpers/errorMessages");
const { USER_ERROR } = require("../helpers/errorCodes");

const handleRefreshToken = tryCatch(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt){
    throw new AppError(USER_ERROR, USER_UNAUTHORIZED, 401);
  }

  const refreshToken = cookies.jwt;
  const foundUser = await TeacherModel.findOne({ refreshToken }).exec();
  
  if (!foundUser) {
    throw new AppError(USER_ERROR, USER_FORBIDDEN, 403);
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error || foundUser.userName !== decoded.username) {
        throw new AppError(USER_ERROR, USER_FORBIDDEN, 403);
      }

      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "username": decoded.username,
            "roles": roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '20s' }
      );

      return res.status(200).json({ roles, accessToken });
    }
  );
});

module.exports = {
  handleRefreshToken
};