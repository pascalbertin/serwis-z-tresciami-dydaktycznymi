const {CourseSchema, courseModel} = require("../models/courseModel");
const AppError = require("../helpers/AppError");
const { COURSE_ERROR } = require("../helpers/errorCodes");
const { COURSE_NOT_FOUND, COURSE_DUPLICATE, COURSE_MISSING_PARAMETERS } = require("../helpers/errorMessages");
const { COURSE_CREATED } = require("../helpers/confirmationMessages");
const { tryCatch } = require("../helpers/tryCatch");
const { transporter } = require('../config/nodemailerConfig');

const courseCreate = tryCatch(async (req, res) => {
  if (!req.body.title || 
      !req.body.description ||
      !req.body.price ||
      !req.body.author ||
      !req.body.subject ||
      !req.body.level ||
      !req.body.video ||
      !req.body.thumbnail) {
    throw new AppError(COURSE_ERROR, COURSE_MISSING_PARAMETERS, 400);
  }

  const ifCourseDuplicate = await courseModel.findOne({ title: req.body.title }).exec();
  if (ifCourseDuplicate) {
    throw new AppError(COURSE_ERROR, COURSE_DUPLICATE, 409);
  }

  const newCourse = courseModel({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    author: req.body.author,
    subject: req.body.subject,
    level: req.body.level,
    video: req.body.video,
    thumbnail: req.body.thumbnail,
    verification: false
  });
  
  const mailOptions = {
    from: 'Tutors Alpha <JakubStyszynski@gmail.com>',
    to: req.body.email,
    subject: 'Tutors Alpha - Dodanie kursu',
    text: req.body.title,
    html: "<p>Kurs "+req.body.title+" został przesłany i oczekuje na weryfikację przez administratora serwisu. Poinformujemy Cię w osobnej wiadomości e-mail gdy kurs zostanie zweryfikowany.</p>"
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (!error) {
      console.log("E-mail sent: " + info.response);
    }
  });

  newCourse.save(error => {
    if (!error) {
      return res.status(200).json({message: COURSE_CREATED});
    }
  });
});

const courseGetByTitle = tryCatch(async (req, res) => {
  const course = await courseModel.findOne({title: req.params.title});

  if (course == null) {
    throw new AppError(COURSE_ERROR, COURSE_NOT_FOUND, 404);
  }

  res.course = course;
  return res.status(200).json(res.course);
});

const courseGetAll = tryCatch(async (req, res) => {
  const course = await courseModel.find();

  if (course == null) {
    throw new AppError(COURSE_ERROR, COURSE_NOT_FOUND, 404);
  }

  res.course = course;
  return res.status(200).json(res.course);
});

const courseDeleteByTitle = tryCatch(async (req, res) => {
  const course = await courseModel.findOne({title: req.params.title});

  if (course == null) {
    throw new AppError(COURSE_ERROR, COURSE_NOT_FOUND, 404);
  }

  res.course = course;

  await courseModel.deleteOne({_id: res.course._id});
  return res.status(200).json({message: COURSE_DELETED});
});

const coursePatchByTitle = tryCatch(async (req, res) => {
  const course = await courseModel.findOne({title: req.params.title});

  if (course == null) {
    throw new AppError(COURSE_ERROR, COURSE_NOT_FOUND, 404);
  }

  res.course = course;

  if (req.body.title != null) {
    res.course.title = req.body.title;
  }
  if (req.body.description != null) {
    res.course.description = req.body.description;
  }
  if (req.body.price != null) {
    res.course.price = req.body.price;
  }
  if (req.body.author != null) {
    res.course.author = req.body.author;
  }
  if (req.body.subject != null) {
    res.course.subject = req.body.subject;
  }
  if (req.body.level != null) {
    res.course.level = req.body.level;
  }
  if (req.body.video != null) {
    res.course.video = req.body.video;
  }
  if (req.body.thumbnail != null) {
    res.course.thumbnail = req.body.thumbnail;
  }

  const updatedCourse = await res.course.save();
  return res.status(200).json(updatedCourse);
});

//get all courses that fulfills the filter
//price subject level
const courseGetFiltered = async (req, res) => {

  let course
  try{
    course = await courseModel.find()
    //console.log(course)
    if(req.query.subject != null){
      subject = req.query.subject.split(",")
      let tempList = []
      course.forEach(function(element){
        //console.log(level, element.level)
        if (subject.includes(element.subject)) {
          tempList.push(element)
        }
      course = tempList
      })
      console.log(tempList)
    }


    if(req.query.level != null){
        level = req.query.level.split(",")
        level = level.map(Number)
        let tempList = []
        course.forEach(function(element){
          //console.log(level, element.level)
          if (level.includes(element.level)) {
            tempList.push(element)
          }
        course = tempList
        })
        console.log(tempList)
    }

    if(req.query.priceMin != null){
      console.log("min")
      course = course.filter(function(item){
        return item.price >= req.query.priceMin
      })
    }

    if(req.query.priceMax != null){
      console.log("max")
      course = course.filter(function(item){
        return item.price <= req.query.priceMax
        })  
    }
    //course = await courseModel.find({author: req.query.author})
    if (course == null) {
      return res.status(404).json({message: 'Cannot find course'})
    }
  }catch(error) {
    return res.status(500).json({message: error.message})
  }
  res.course = course

  //console.log(res.course)
  res.json(res.course)
};

const courseGetByAuthor = tryCatch(async (req, res) => {
  const course = await courseModel.find({author: req.params.username});

  if (course == null) {
    throw new AppError(COURSE_ERROR, COURSE_NOT_FOUND, 404);
  }

  res.course = course;
  return res.status(200).json(res.course);
});

const courseGetByVerification = tryCatch(async (req, res) => {
  const course = await courseModel.find({verification: false});

  if (course == null) {
    throw new AppError(COURSE_ERROR, COURSE_NOT_FOUND, 404);
  }

  res.course = course;
  return res.status(200).json(res.course);
});

const courseVerifyByAdministrator = tryCatch(async (req, res) => {
  const course = await courseModel.findOne({title: req.params.title});

  if (course == null) {
    throw new AppError(COURSE_ERROR, COURSE_NOT_FOUND, 404);
  }

  res.course = course;

  course.verification = true;

  const mailOptions = {
    from: 'Tutors Alpha <JakubStyszynski@gmail.com>',
    to: req.body.email,
    subject: 'Tutors Alpha - Zweryfikowano Twój kurs',
    text: req.body.title,
    html: "<p>Twój kurs "+res.course.title+" został zweryfikowany przez administratora serwisu. Użytkownicy mogą już z niego korzystać.</p>"
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (!error) {
      console.log("E-mail sent: " + info.response);
    }
  });

  const updatedCourse = await res.course.save();
  return res.status(200).json(updatedCourse);
});

module.exports = {
    courseCreate,
    courseGetByTitle,
    courseDeleteByTitle,
    coursePatchByTitle,
    courseGetAll,
    courseGetFiltered,
    courseGetByAuthor,
    courseVerifyByAdministrator,
    courseGetByVerification
};