const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  title: {
      type: String,
      required: [true, "Nie podano tytułu!"]
  },
  video: {
      type: String,
      required: [true, "Nie podano linku!"]
  }
});

const lectureModel = mongoose.model('Lecture', lectureSchema);
module.exports = {lectureSchema, lectureModel};