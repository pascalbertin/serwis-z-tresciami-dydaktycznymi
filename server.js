require('dotenv').config();

const mongoose    = require('mongoose');
const express     = require("express");
var cors          = require('cors');
const bodyParser  = require('body-parser');

const swaggerJsDoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');

const rootRouter            = require("./src/routes/rootRouter");
const coursesRouter         = require("./src/routes/courseRouter");
const usersRouter           = require("./src/routes/usersRouter");
const authRouter            = require("./src/routes/authRouter");

const corsOptions        = require('./src/config/corsOptions');
const dbConnectionLink   = require("./src/config/databaseConfig");
const credentials        = require('./src/middleware/credentials');
const cookieParser       = require('cookie-parser');

const errorHandler = require("./src/middleware/errorHandler");

const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const GOOGLE_STORAGE_KEY = require('./src/config/googleStorageKey');

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      version: "0.0.2",
      title: "Serwis z treściami dydaktycznymi - API",
      description: "Dokumentacja całego API dla strony",
      servers: ["http://localhost:3001","https://serwis-z-tresciami.herokuapp.com/"]
    },
    components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          }
      }
  },
  security: [{
      bearerAuth: []
  }]
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(process.env.MONGODB_URI || dbConnectionLink, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('[server.js]: MongoDB connected successfully');
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(credentials);
app.use(cors(corsOptions));

app.use('/', rootRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);


const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

const projectId = process.env.GOOGLE_STORAGE_PROJECT_ID;
const googleCredentials = GOOGLE_STORAGE_KEY

const storage = new Storage({
  projectId,
  googleCredentials
});

const bucketThumbnails = storage.bucket(process.env.GOOGLE_STORAGE_THUMBNAILS_BUCKET);
const bucketVideos = storage.bucket(process.env.GOOGLE_STORAGE_VIDEOS_BUCKET);

app.post('/api/fileUploadThumbnail', multer.single("file"), (req, res) => {
  console.log("Made it /upload");
  try {
    if (req.file) {
      console.log("File found, trying to upload a Thumbnail...");
      const blob = bucketThumbnails.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Success");
        console.log("Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/fileUploadVideo', multer.single("file"), (req, res) => {
  console.log("Made it /upload");
  try {
    if (req.file) {
      console.log("File found, trying to upload a Video...");
      const blob = bucketVideos.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Success");
        console.log("Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  console.log('[server.js]: App is set to PRODUCTION');
} else {
  console.log('[server.js]: App is set to DEVELOPMENT');
}

//MUST BE AT THE END OF FILE heroku deploy react routing fix
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`[server.js]: Server is running at port ${port}`);
});