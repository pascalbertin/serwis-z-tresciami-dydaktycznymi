const mongoose = require("mongoose");
const { courseSchema, courseModel } = require('./courseModel');

/**
 * @swagger
 * components:
 *  schemas:
 *    Teachers:
 *      type: object
 *      required:
 *      - userName
 *      - email
 *      - password
 *      properties:
 *        title:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        course:
 *          $ref: '#/components/schemas/Courses'
 *        refreshToken:
 *          type: string
 */
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
  verification: {
        type: Boolean,
        required: [true]
  },
  bank_account: {
        type: Number,
        required: [false]
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