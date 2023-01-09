require('dotenv').config();

const mongoose     = require('mongoose');
const express      = require("express");
var cors           = require('cors');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const { Storage }  = require("@google-cloud/storage");
const Multer       = require("multer");

const swaggerJsDoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');

const rootRouter    = require("./src/routes/rootRouter");
const coursesRouter = require("./src/routes/courseRouter");
const usersRouter   = require("./src/routes/usersRouter");
const authRouter    = require("./src/routes/authRouter");
const payuRouter    = require("./src/routes/payuRouter");

const corsOptions      = require('./src/config/corsOptions');
const dbConnectionLink = require("./src/config/databaseConfig");
const swaggerOptions   = require('./src/config/swaggerOptions');

const credentials  = require('./src/middleware/credentials');
const errorHandler = require("./src/middleware/errorHandler");

const AppError     = require("./src/helpers/AppError");
const { tryCatch } = require("./src/helpers/tryCatch");

const app = express();

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
app.use('/api/payu', payuRouter);


const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

const projectId = process.env.GOOGLE_STORAGE_PROJECT_ID;
const storage = new Storage({
  projectId,
  credentials: JSON.parse(process.env.GOOGLE_KEY)
});

const bucketThumbnails = storage.bucket(process.env.GOOGLE_STORAGE_THUMBNAILS_BUCKET);
const bucketVideos = storage.bucket(process.env.GOOGLE_STORAGE_VIDEOS_BUCKET);
const bucketAvatars = storage.bucket(process.env.GOOGLE_STORAGE_AVATARS_BUCKET);

app.post('/api/fileUploadThumbnail', multer.single("file"), tryCatch((req, res) => {
  if (req.file) {
    const blob = bucketThumbnails.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("finish", () => {
      res.status(200).send("Success");
      console.log("Thumbnail uploaded successfully");
    });
    blobStream.end(req.file.buffer);
  }
}));

app.post('/api/fileUploadVideo', multer.single("file"), tryCatch((req, res) => {
  if (req.file) {
    const blob = bucketVideos.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("finish", () => {
      res.status(200).send("Success");
      console.log("Video uploaded successfully");
    });
    blobStream.end(req.file.buffer);
  }
}));

app.post('/api/avatarUpload', multer.single("file"), tryCatch((req, res) => {
  console.log("AAAAAAAAAAAAA");
  if (req.file) {
    const blob = bucketAvatars.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("finish", () => {
      res.status(200).send("Success");
      console.log("Avatar uploaded successfully");
    });
    blobStream.end(req.file.buffer);
  }
}));

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
