const mongoose = require("mongoose");
const { lectureSchema, lectureModel } = require('./lectureModel');

const courseSchema = new mongoose.Schema({
  title: {
      type: String,
      required: [true, "Nie podano tytułu!"]
  },
  description: {
      type: String,
      required: [true, "Nie podano opisu!"]
  },
  price: {
      type: Number,
      required: [true, "Nie podano ceny!"]
  },
  lectures: [lectureSchema]
});

const courseModel = mongoose.model('Course', courseSchema);
module.exports = {courseSchema, courseModel};