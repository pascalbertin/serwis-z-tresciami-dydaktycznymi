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
            res.status(200).send("Kurs dodano");
            console.log("Succes");
        }
        });   
      }catch{
        console.log("error sent")
        res.status(500).send()
      }
};

//get one course by id
const courseGetByTitle = async (req, res) => {
    let course
    try{
//      course = await courseModel.findOne({_id: req.query.id})
      console.log(req.params)
      course = await courseModel.findOne({title: req.params.title})
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
      course = await courseModel.find({subject: req.query.subject})
      if (course == null) {
        return res.status(404).json({message: 'Cannot find course'})
      }
    }catch(error) {
      return res.status(500).json({message: error.message})
    }
    res.course = course

    console.log(res.course)
    res.json(res.course)
    // console.log(req.query.subject)
};

//get all courses of requested author
const courseGetByAuthor = async (req, res) => {
    let course
    try{
      course = await courseModel.find({author: req.query.author})
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

//get all courses
const courseGetAll = async (req, res) => {
  let course
  try{
    course = await courseModel.find()
    if (course == null) {
      return res.status(404).json({message: 'Cannot find any course'})
    }
  }catch(error) {
    return res.status(500).json({message: error.message})
  }
  res.course = course

  console.log(res.course)
  res.json(res.course)
};

const courseDeleteByTitle = async (req, res) => {
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

    try{
        console.log(res.course._id)
        await courseModel.deleteOne({_id: res.course._id})
        res.json({message:"usunieto kurs"})
      }catch(error){
        res.status(500).json({message: error.message})
      }
};

const coursePatchByTitle = async (req, res) => {
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
        res.course.thumbnail = req.body.thumbnail
      }

      try {
        const updatedCourse = await res.course.save()
          res.json(updatedCourse)
      } catch(error){
          res.status(400).json({message: error.message})
      }
};


//get all courses that fulfills the filter
//price subject level
const courseGetFiltered = async (req, res) => {

  let course
  try{
    course = await courseModel.find()
    //console.log(course)
    if(req.body.subject != null){
      subject = req.body.subject.split(",")
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


    if(req.body.level != null){
        level = req.body.level.split(",")
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

    if(req.body.priceMin != null){
      console.log("min")
      course = course.filter(function(item){
        return item.price >= req.body.priceMin
      })
    }

    if(req.body.priceMax != null){
      console.log("max")
      course = course.filter(function(item){
        return item.price <= req.body.priceMax
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





module.exports = {
    courseCreate,
    courseGetByTitle,
    courseDeleteByTitle,
    coursePatchByTitle,
    courseGetBySubject,
    courseGetByAuthor,
    courseGetAll,
    courseGetFiltered
};
