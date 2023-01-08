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
 *      - verification
 *      - accountBalance
 *      - avatar
 *      properties:
 *        title:
 *          type: string
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *          format: password
 *        verification:
 *          type: boolean
 *          default: false
 *        bank_account:
 *          type: number
 *        accountBalance:
 *          type: number
 *          format: double
 *          default: 0
 *        avatar:
 *          type: string
 *          default: https://storage.googleapis.com/tutorsalpha-user-avatar/tutorsalpha_default_avatar.jpg
 *        course:
 *          $ref: '#/components/schemas/Courses'
 *        refreshToken:
 *          type: string
 *        roles:
 *          type: object
 *          properties:
 *            User:
 *              type: number
 *              format: integer
 *              default: 2001
 *              enum: [2001, 5150]
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
        default: false,
        required: [true]
  },
  bank_account: {
        type: Number,
        required: [false]
  },
  accountBalance: {
    type: Number,
    default: 0,
    required: [true]
  },
  avatar: {
    type: String,
    default: "https://storage.googleapis.com/tutorsalpha-user-avatar/tutorsalpha_default_avatar.jpg",
    required: [true]
  },
  course: [courseSchema],
  refreshToken: String,
  roles: {
    User: {
        type: Number,
        default: 2001
    },
    Admin: Number
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);