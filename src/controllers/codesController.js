const {CourseSchema, courseModel} = require("../models/courseModel");
const TeacherModel = require("../models/teacherModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const AppError = require("../helpers/AppError");
const { COURSE_ERROR } = require("../helpers/errorCodes");
const { COURSE_NOT_FOUND, COURSE_MISSING_EMAIL, COURSE_CODE_MISSING } = require("../helpers/errorMessages");
const { EMAIL_SENT, COURSE_CODE_OUT_OF_USES, COURSE_INCORRECT_CODE, COURSE_DELETED } = require("../helpers/confirmationMessages");
const { tryCatch } = require("../helpers/tryCatch");
const { transporter } = require('../config/nodemailerConfig');

const courseGenerateCode = tryCatch(async (req, res) => {
  const courseTitle = req.params.title;
  const courseTitleReplaced = courseTitle.replace(/ /g, "%20")
  const link = "https://tutorsalpha.herokuapp.com/course/?title=" + courseTitleReplaced;

  const course = await courseModel.findOne({title: req.params.title});
  const courseAuthor = await TeacherModel.findOne({ userName: course.author }).exec();

  if (course == null) {
    throw new AppError(COURSE_ERROR, COURSE_NOT_FOUND, 404);
  }

  if (!req.body.email) {
    throw new AppError(COURSE_ERROR, COURSE_MISSING_EMAIL, 400);
  }

  res.course = course;
  res.user = courseAuthor;

  const generatedCode = crypto.randomBytes(16).toString('hex');
  const hashedCode = await bcrypt.hash(generatedCode, 10);

  let numberOfCopiesSold = res.course.copiesSold + 1;
  let authorAccountBalance = res.user.accountBalance + res.course.price;

  res.course.codes.push({code: hashedCode, uses: 3});
  res.course.set({copiesSold: numberOfCopiesSold});
  res.user.set({accountBalance: authorAccountBalance});

  await res.course.save();
  await res.user.save();

  const mailOptions = {
    from: 'Tutors Alpha <JakubStyszynski@gmail.com>',
    to: req.body.email,
    subject: 'Tutors Alpha - Twój Kod',
    text: generatedCode,
    html: "<b><strong><p>Dziękujemy za zakup!</p></strong></b> <br/> <p>Twój kod: </p>"+generatedCode+" <br/> <p>Zakupiony kurs znajdziesz tutaj: </p>"+"<a href="+link+">Link do kursu</a>"
  }; 

  transporter.sendMail(mailOptions, (error, info) => {
    if (!error) {
      console.log("E-mail sent: " + info.response);
    }
  });

  return res.status(200).json({message: EMAIL_SENT});
});

const courseUseCode = tryCatch(async (req, res) => {
  const course = await courseModel.findOne({title: req.params.title});

  if (course == null) {
    throw new AppError(COURSE_ERROR, COURSE_NOT_FOUND, 404);
  }

  res.course = course;

  if (!req.body.code) {
    throw new AppError(COURSE_ERROR, COURSE_CODE_MISSING, 400);
  }

  if (course.toBeDeleted && !course.codes.length) {
    await res.course.deleteOne({_id: res.course._id});
    return res.status(200).json({message: COURSE_DELETED});
  }

  if (!course.codes.length) {
    return res.status(406).json({message: COURSE_INCORRECT_CODE});
  }

  let i = 0;
  let shouldContinue = true;

  while (shouldContinue) {
    if (await bcrypt.compare(req.body.code, course.codes[i].code)) {
      shouldContinue = false;

      //Positive case
      if (course.codes[i].uses > 0) {
        course.codes[i].uses = course.codes[i].uses - 1;

        //save to database
        const updatedCourse = await res.course.save();
        return res.status(200).json(updatedCourse);
      } else {
        //Out of uses case
        console.log(course.codes[i])
        course.codes[i].remove()
        const updatedCourse = await res.course.save();
        return res.status(204).json({message: COURSE_CODE_OUT_OF_USES});
      }

    } else {
      //code not found case
      if (i === course.codes.length - 1) {
        shouldContinue = false;
        return res.status(406).json({message: COURSE_INCORRECT_CODE});
      }
    }

    i = i + 1;
  }
});

module.exports = {
    courseGenerateCode,
    courseUseCode
};