const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Courses:
 *      type: object
 *      required:
 *      - title
 *      - description
 *      - price
 *      - author
 *      - subject
 *      - level
 *      - video
 *      - thumbnail
 *      - toBeDeleted
 *      - verification
 *      - copiesSold
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: number
 *          format: double
 *        author:
 *          type: string
 *        subject:
 *          type: string
 *          enum: [Matematyka,Polski,Angielski,Niemiecki,Informatyka,Biologia,Chemia,Fizyka,Historia,Geografia,Muzyka,PP]
 *        level:
 *          type: number
 *          format: integer
 *          minimum: 1
 *          maximum: 5
 *        video:
 *          type: string
 *        thumbnail:
 *          type: string
 *        toBeDeleted:
 *          type: boolean
 *          default: false
 *        verification:
 *          type: boolean
 *          default: false
 *        copiesSold:
 *          type: number
 *          format: integer
 *          default: 0
 *        codes:
 *          type: object
 *          properties:
 *            code:
 *              type: string
 *            uses:
 *              type: number
 *              format: integer
 *              minimum: 0
 *              maximum: 3
 */
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
    toBeDeleted: {
      type: Boolean,
      default: false,
      required: [true]
    },
    verification: {
      type: Boolean,
      default: false,
      required: [true]
    },
    copiesSold: {
      type: Number,
      default: 0,
      required: [true]
    },
    codes: [{code: String, uses: Number}]
  });

const courseModel = mongoose.model('Course', courseSchema);
module.exports = {courseSchema, courseModel};