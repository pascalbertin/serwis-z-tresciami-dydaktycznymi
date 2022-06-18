const mongoose = require("mongoose");
const { courseSchema, courseModel } = require('./courseModel');

const teacherSchema = new mongoose.Schema({
  userName: {
      type: String,
      required: [true, "Nie podano nazwy uzytkownika!"]
  },
  email: {
      type: String,
      required: [true, "Nie podano adresu email!"]
  },
  password: {
      type: String,
      required: [true, "Nie podano hasła!"]
  },
  course: [courseSchema]
});

module.exports = mongoose.model("Teacher", teacherSchema);