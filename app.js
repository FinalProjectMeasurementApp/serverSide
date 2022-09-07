require("dotenv").config({ path: "./.env" });
const createError              = require("http-errors");
const express                  = require("express");
const app                      = express();
const path                     = require("path");
const cookieParser             = require("cookie-parser");
const logger                   = require("morgan");
const cors                     = require('cors')

// routes
const indexRouter              = require("./routes/index");
const floorsRouter             = require("./routes/floors");
const wallsRouter              = require("./routes/walls");
const usersRouter              = require("./routes/users");
const shapeRouter              = require("./routes/shapes");

// connect mongose database
const usermongo = process.env.USERMONGO;
const passmongo = process.env.PASSMONGO;
const mongoose  = require('mongoose');
const dbUrl     = `mongodb+srv://${usermongo}:${passmongo}@cluster0.rriocxj.mongodb.net/rular?retryWrites=true&w=majority`
mongoose.connect(dbUrl, {
  useNewUrlParser   : true,
  useUnifiedTopology: true,
  keepAlive: true,
  connectTimeoutMS: 30000,
  maxPoolSize: 30,
  socketTimeoutMS: 5000,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log('success connected to database');
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/floor", floorsRouter);
app.use("/wall", wallsRouter);
app.use("/shape", shapeRouter);

module.exports = app;
