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
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: number
 *        author:
 *          type: string
 *        subject:
 *          type: string
 *        level:
 *          type: number
 *        video:
 *          type: string
 *        thumbnail:
 *          type: string
 *        codes:
 *          type: object
 *          properties:
 *            code:
 *              type: string
 *            uses:
 *              type: number
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