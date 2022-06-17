require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
var cors = require('cors');

const app = express();

const dbClusterLink = process.env.DB_CLUSTER_LINK;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const dbConnectionLink = "mongodb+srv://" + dbUser + ":" + dbPassword + "@" + dbClusterLink + dbName;

mongoose.connect(process.env.MONGODB_URI || dbConnectionLink, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

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

  app.post("/register", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const new_user = TeacherModel({
        userName: req.body.username,
        email: req.body.email,
        password: hashedPassword
      });

      new_user.save(function(error){
      if (error) {
        console.log(error);
      } else {
          console.log("Succes");
      }
      });   
    }catch{
      res.status(500).send()
    }
  });
  
  app.post('/login', async (req, res) => {
    console.log(req.body.username)
    const teacher = req.body.username;

    let teacherData = null
    TeacherModel.findOne({userName: teacher}, async function(error, data){
      if (error) {
        console.log(error);
      } else {
          console.log("data", data)
          teacherData = JSON.parse(JSON.stringify(data));

          console.log(teacherData);
          if (teacherData == null){
            return res.status(404).send("Cannot find user");
          }


          try{
            console.log(teacherData.password);
            console.log(req.body.password);
            if(await bcrypt.compare(req.body.password, teacherData.password)){
              res.send("Success");
            } else{
              res.send("Not Allowed");
            }
        }catch{
          res.status(500).send("nie udalo sie");
        }
      }
    });
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    console.log("found");
  } else {
    console.log("not found");
  }

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.listen(process.env.PORT || 3001, console.log(`Server is running at ${process.env.PORT}`));
console.log(process.env.NODE_ENV, process.env.MONGODB_URI);
console.log(__dirname + '/client/build/index.html'); 