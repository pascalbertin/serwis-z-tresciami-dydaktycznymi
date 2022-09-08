const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Lectures:
 *      type: object
 *      required:
 *      - title
 *      - video
 *      properties:
 *        title:
 *          type: string
 *        video:
 *          type: string
 */
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