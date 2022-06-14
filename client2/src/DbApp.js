require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express");
const ejs = require("ejs");
var cors = require('cors');

const app = express();

const dbClusterLink = process.env.DB_CLUSTER_LINK;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const dbConnectionLink = "mongodb+srv://" + dbUser + ":" + dbPassword + "@" + dbClusterLink + dbName;

mongoose.connect(dbConnectionLink, { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

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

  const CourseModel = mongoose.model('Course', courseSchema);
  const TeacherModel = mongoose.model('Teacher', teacherSchema);

  app.get("/register", function (req, res) {
    console.log("register");
  });

  app.post("/register", function (req, res) {
    const new_user = TeacherModel({
      userName: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    new_user.save(function(error){
      if (error) {
        console.log(error);
      } else {
          console.log("Succes");
      }
      });
  });

app.listen(3001);