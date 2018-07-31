require("dotenv").config({ path: "./.env" });
const createError              = require("http-errors");
const express                  = require("express");
const app                      = express();
const mongoose                 = require("mongoose");
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
const { DB_USER, DB_PASS }     = process.env;
const url                      = `mongodb://${DB_USER}:${DB_PASS}@ds249311.mlab.com:49311/measurement`;
const options                  = {
  keepAlive: 1, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 5000,
  useNewUrlParser: true
};

mongoose
  .connect(
    url,
    options
  )
  .then(() => {
    console.log("connected to db");
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
