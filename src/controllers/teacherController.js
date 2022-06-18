const TeacherModel = require("../models/teacherModel");
const bcrypt = require("bcrypt");

const teacherRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = TeacherModel({
      userName: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    newUser.save( error => {
      if (error) {
        console.log("[teacherController.js]:", error);
      } else {
          console.log("[teacherController.js]: Successfully added to database");
          console.log(newUser);
      }
    });

  } catch {
    res.status(500).send();
  }
};

const teacherLogin = async (req, res) => {
  const teacher = req.body.username;

  let teacherData = null
  TeacherModel.findOne({userName: teacher}, async function(error, data){
    if (error) {
      console.log(error);
    } else {
        teacherData = JSON.parse(JSON.stringify(data));

        if (teacherData == null){
          return res.status(404).send("Cannot find user");
        }

        try{

          if(await bcrypt.compare(req.body.password, teacherData.password)){
            res.send("Success");
          } else{
            res.send("Not Allowed");
          }
      }catch{
        res.status(500).send("nie udalo sie");
      }
    }
  });
};

module.exports = {
  teacherRegister,
  teacherLogin
};