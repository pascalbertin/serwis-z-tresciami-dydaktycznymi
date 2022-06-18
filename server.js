require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
var cors = require('cors');
const teacherRoute = require("./src/routes/teacherRouter");

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  console.log('App is set to PRODUCTION');
} else {
  console.log('App is set to DEVELOPMENT');
}

//Routes
app.use('/api', teacherRoute);

//MUST BE AT THE END OF FILE heroku deploy react routing fix
app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`[server.js]: Server is running at port ${port}`);
});