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
    author: {
      type: String,
      required: [true, "Nie podano autora!"]
    },
    subject: {
      type: String,
      required: [true, "Nie podano przedmiotu!"]
    },
    level: {
      type: Number,
      required: [true, "Nie podano poziomu!"]
    },
    video: {
      type: String,
      required: [true, "Nie podano pliku video!"]
    },
    thumbnail: {
        type: String,
        required: [true, "Nie podano miniaturki"]
    },
    lectures: [lectureSchema]
  });

const courseModel = mongoose.model('Course', courseSchema);
module.exports = {courseSchema, courseModel};