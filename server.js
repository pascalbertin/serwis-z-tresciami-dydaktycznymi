require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');

const teacherRoute = require("./src/routes/teacherRouter");
const refreshRouter = require("./src/routes/refreshRouter");
const logoutRouter = require("./src/routes/logoutRouter");
const getAllTeachersRouter = require("./src/routes/getAllTeachersRouter");
const loginRouter = require("./src/routes/loginRouter");
const registerRouter = require("./src/routes/registerRouter");
const courseRoute = require("./src/routes/courseRouter");
const rootRouter = require("./src/routes/rootRouter");

const corsOptions = require('./src/config/corsOptions');
const dbConnectionLink = require("./src/config/databaseConfig");
const credentials = require('./src/middleware/credentials');
const verifyJWT = require('./src/middleware/verifyJWT');
const cookieParser = require('cookie-parser');

const app = express();

mongoose.connect(process.env.MONGODB_URI || dbConnectionLink, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
//middleware for cookies
app.use(cookieParser());
// JWT
app.use(credentials);
app.use(cors(corsOptions));

app.use('/', rootRouter);

//Routes for teacher
app.use('/api/teacher', teacherRoute);

//Routes for course
app.use('/api/course', courseRoute);


//JWT NA FRONCIE TRZEBA UŻYĆ credentials PRZY fetch
app.use('/register', registerRouter);
app.use('/user/login', loginRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);
app.use('/test', getAllTeachersRouter);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  console.log('App is set to PRODUCTION');
} else {
  console.log('App is set to DEVELOPMENT');
}

//MUST BE AT THE END OF FILE heroku deploy react routing fix
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`[server.js]: Server is running at port ${port}`);
});
