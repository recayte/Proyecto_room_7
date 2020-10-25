var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

var indexRouter = require("./routes/index");
var ProductoRouter = require("./routes/Producto");
var CompraRouter = require("./routes/Admin");
var registroRouter = require("./routes/Registro");
const login = require("./routes/login");
var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("./style"));
app.use(express.static("./imagen"));

//rutas
app.use("/", indexRouter);
app.use("/producto", ProductoRouter);
app.use("/admin", CompraRouter); 
app.use("/registro", registroRouter); 
app.use("/login", login); 


//app.use("/login", login);
//app.use("/registro", registroRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
