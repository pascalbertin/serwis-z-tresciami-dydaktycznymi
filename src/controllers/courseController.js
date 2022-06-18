const {CourseSchema, courseModel} = require("../models/courseModel");

const courseCreate = (req, res) => {
    try {
        const new_course = courseModel({
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          author: req.body.author,
          subject: req.body.subject,
          level: req.body.level,
          video: req.body.video,
          thumbnail: req.body.thumbnail
        });
        
        console.log(new_course)
        new_course.save(function(error){
        if (error) {
          console.log(error);
        } else {
            console.log("Succes");
        }
        });   
      }catch{
        console.log("error sent")
        res.status(500).send()
      }
};

//get one course by id
const courseGetById = async (req, res) => {
    let course
    try{
      course = await courseModel.findOne({_id: req.body.id})
      if (course == null) {
        return res.status(404).json({message: 'Cannot find course'})
      }
    }catch(error) {
      return res.status(500).json({message: error.message})
    }
    res.course = course

    console.log(res.course)
    res.json(res.course)
};

//get all courses with requested subject
const courseGetBySubject = async (req, res) => {
    let course
    try{
      course = await courseModel.find({subject: req.body.subject})
      if (course == null) {
        return res.status(404).json({message: 'Cannot find course'})
      }
    }catch(error) {
      return res.status(500).json({message: error.message})
    }
    res.course = course

    console.log(res.course)
    res.json(res.course)
};

//get all courses of requested author
const courseGetByAuthor = async (req, res) => {
    let course
    try{
      course = await courseModel.find({author: req.body.author})
      if (course == null) {
        return res.status(404).json({message: 'Cannot find course'})
      }
    }catch(error) {
      return res.status(500).json({message: error.message})
    }
    res.course = course

    console.log(res.course)
    res.json(res.course)
};

const courseDeleteById = async (req, res) => {
    let course
    try{
      course = await courseModel.findOne({_id: req.body.id})
      if (course == null) {
        return res.status(404).json({message: 'Cannot find course'})
      }
    }catch(error) {
      return res.status(500).json({message: error.message})
    }
    res.course = course

    try{
        console.log(res.course._id)
        await courseModel.deleteOne({_id: res.course._id})
        res.json({message:"usunieto kurs"})
      }catch(error){
        res.status(500).json({message: error.message})
      }
};

const coursePatchById = async (req, res) => {
    let course
    try{
      course = await courseModel.findOne({_id: req.body.id})
      if (course == null) {
        return res.status(404).json({message: 'Cannot find course'})
      }
    }catch(error) {
      return res.status(500).json({message: error.message})
    }
    res.course = course


    if (req.body.title != null){
        res.course.title = req.body.title
      }
      if (req.body.description != null){
        res.course.description = req.body.description
      }
      if (req.body.price != null){
        res.course.price = req.body.price
      }
      if (req.body.author != null){
        res.course.author = req.body.author
      }
      if (req.body.subject != null){
        res.course.subject = req.body.subject
      }
      if (req.body.level != null){
        res.course.level = req.body.level
      }
      if (req.body.video != null){
        res.course.video = req.body.video
      }
      if (req.body.thumbnail != null){
        res.course.thumbnail = req.body.thumnail
      }

      try {
        const updatedCourse = await res.course.save()
          res.json(updatedCourse)
      } catch(error){
          res.status(400).json({message: error.message})
      }
};

module.exports = {
    courseCreate,
    courseGetById,
    courseDeleteById,
    coursePatchById,
    courseGetBySubject,
    courseGetByAuthor
};