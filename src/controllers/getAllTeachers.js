const TeacherModel = require("../models/teacherModel");

//get all courses of requested author
const teacherGetAll = async (req, res) => {
  let teacher
  try{
    teacher = await TeacherModel.find()
    console.log(teacher)
    if (teacher == null) {
      return res.status(404).json({message: 'Cannot find any teacher'})
    }
  }catch(error) {
    return res.status(500).json({message: error.message})
  }
  res.teacher = teacher

  console.log(res.teacher)
  res.json(res.teacher)
};

const userGetByUsername = async (req, res) => {
  let teacher
  try{
    teacher = await TeacherModel.findOne({userName: req.params.username});
    if (teacher == null) {
      return res.status(404).json({message: 'Cannot find any teacher'})
    }
  }catch(error) {
    return res.status(500).json({message: error.message})
  }
  res.teacher = teacher
  res.json(res.teacher)
};

const userPatchByUsername = async (req, res) => {
  let user
  try{
    user = await TeacherModel.findOne({userName: req.params.username})
    if (user == null) {
      return res.status(404).json({message: 'Cannot find user'})
    }
  }catch(error) {
    return res.status(500).json({message: error.message})
  }

  res.user = user
  
  if (req.body.password != null) {
      res.user.password = req.body.password
  }
   
  try {
    const updatedUser = await res.user.save()
      res.json(updatedUser)
  } catch(error){
      res.status(400).json({message: error.message})
  }
};


const userDeleteByUsername = async (req, res) => {
  let user
    try{
      user = await TeacherModel.findOne({userName: req.params.username})
      if (user == null) {
        return res.status(404).json({message: 'Cannot find user'})
      }
    }catch(error) {
      return res.status(500).json({message: error.message})
    }
    res.user = user

    try{
        await TeacherModel.deleteOne({userName: res.user.userName})
        res.json({message:"usunieto użytkownika"});
      }catch(error){
        res.status(500).json({message: error.message})
      }
};

module.exports = { teacherGetAll, userGetByUsername, userPatchByUsername, userDeleteByUsername };

