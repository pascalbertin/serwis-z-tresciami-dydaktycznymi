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

module.exports = { teacherGetAll };

