const TeacherModel = require("../models/teacherModel");
const AppError = require("../helpers/AppError");
const { USER_ERROR } = require("../helpers/errorCodes");
const { USER_NOT_FOUND, USER_MISSING_PASSWORD } = require("../helpers/errorMessages");
const { USER_DELETED } = require("../helpers/confirmationMessages");
const { tryCatch } = require("../helpers/tryCatch");

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
  const user = await TeacherModel.findOne({userName: req.params.username});

  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  res.user = user;
  
  if (req.body.password != null) {
    res.user.password = req.body.password;
  } else {
    throw new AppError(USER_ERROR, USER_MISSING_PASSWORD, 400);
  }
   
  const updatedUser = await res.user.save();
  return res.status(200).json(updatedUser);
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

module.exports = { 
  teacherGetAll,
  userGetByUsername,
  userPatchByUsername,
  userDeleteByUsername
};