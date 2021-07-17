// const { globalVariables } = require('./config/configuration');
// const { selectOption } = require('./config/customFunction');
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// const fileUpload = require('express-fileupload');
const passport = require("passport");
// const multer = require('multer');
const app = express();

/*---Configure expresss----*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Configure Mongoose to COnnect to MongoDB */
dotenv.config();
console.log(process.env.DB_URL);
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connected FAILED");
  });

/*-----Setup view Engine To Use Handlebars-------- */
app.set("view engine", "ejs");
/*----------Setup method-OverRide-------- */
app.use(methodOverride("newMethod"));
/*-----Setup Flash and Session-------- */
app.use(
  session({
    secret: "work hard",
    saveUninitialized: false,
    resave: true,
  })
);

// Check login user

app.use(flash());

// app.use(fileUpload());

app.use(passport.initialize());
app.use(passport.session());
/*-------------------Routes------------------------*/
const defaultRoutes = require("./routes/defaultRoute");
const adminRoutes = require("./routes/adminRoute");

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
// app.get('/admin', (req, res, next) => {
//     res.locals.admin = req.admin || null;
//     console.log(res.locals.admin);
//     next();
// })

/*------------INIT UPLOAD--------------*/
// app.post('/upload', (req, res) => {
//     res.send('hello');
// })

app.use("/", defaultRoutes);
app.use("/admin", adminRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
