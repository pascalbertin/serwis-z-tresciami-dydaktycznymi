const {CourseSchema, courseModel} = require("../models/courseModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto")
require('dotenv').config();

const nodemailerPass = process.env.nodemailerPass
const nodemailerMail = process.env.nodemailerMail

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: nodemailerMail,
    pass: nodemailerPass
  }
});

const courseGenerateCode = async (req, res) => {

    let course
    let endpoint = req.params.title
    let link = "https://serwis-z-tresciami.herokuapp.com/courses/"+endpoint.replace(" ","%20")
    try{
      course = await courseModel.findOne({title: req.params.title})
      if (course == null) {
        return res.status(404).json({message: 'Cannot find course'})
      }
    }catch(error) {
      return res.status(500).json({message: error.message})
    }
    res.course = course


    const generatedCode = crypto.randomBytes(16).toString('hex');
    const hashedCode = await bcrypt.hash(generatedCode, 10);
    res.course.codes.push({code: hashedCode, uses: 3})
  
    console.log(res.course)


    try {
        const updatedCourse = await res.course.save()
          var mailOptions = {
            from: 'Tutors Alpha <JakubStyszynski@gmail.com>',
            to: req.body.email,
            subject: 'Tutors Alpha - Twój Kod',
            text: generatedCode,
            html: "<b><strong><p>Dziękujemy za zakup</p></strong></b> <br/> <p>Twój kod: </p>"+generatedCode+" <br/> <p>Zakupiony kurs znajdziesz tutaj: </p>"+"<a href="+link+">Link do kursu</a>"
          };
        
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.json(updatedCourse)

      } catch(error){
          res.status(400).json({message: error.message})
      }
  };

const courseUseCode = async (req, res) => {
    let course
    try{
      course = await courseModel.findOne({title: req.params.title})
      if (course == null) {
        return res.status(404).json({message: 'Cannot find course'})
      }
    }catch(error) {
      return res.status(500).json({message: error.message})
    }
    res.course = course

    i = 0
    shouldContinue = true
    while(shouldContinue){
        if(await bcrypt.compare(req.body.code, course.codes[i].code)){
            shouldContinue = false
            //Positive case
            if(course.codes[i].uses > 0){
                console.log("poprawny kod")
                course.codes[i].uses = course.codes[i].uses -1
                //save to database
                try {
                    const updatedCourse = await res.course.save()
                    res.json(updatedCourse)
                }catch(error){
                    res.status(400).json({message: error.message})
                }
            //Out of uses case
            }else{
                console.log("Out of uses")
                res.json({message: "Out of uses"})
            }
        //code not found case
        }else{
            if(i === course.codes.length-1){
                shouldContinue = false
                res.json({message: "Incorrect code"})
            }
        }
        i = i+1
    }
  };


module.exports = {
    courseGenerateCode,
    courseUseCode
};