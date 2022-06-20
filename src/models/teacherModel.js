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
  course: [courseSchema],
  refreshToken: String,
  roles: {
    User: {
        type: Number,
        default: 2001
    },
    Editor: Number,
    Admin: Number
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);