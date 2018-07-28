require("dotenv").config({ path: "./.env" });
const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var cors = require('cors')

const indexRouter = require("./routes/index");
const floorsRouter = require("./routes/floors");
const wallsRouter = require("./routes/walls");
const usersRouter = require("./routes/users");
const shapeRouter = require("./routes/shapes");

const app = express();

const { DB_USER, DB_PASS } = process.env;
const url = `mongodb://${DB_USER}:${DB_PASS}@ds249311.mlab.com:49311/measurement`;

mongoose
  .connect(
    url,
    { useNewUrlParser: true }
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
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
