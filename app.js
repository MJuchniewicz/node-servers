const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes')

const app = express();

// connect to mongodb & listen for requests
const dbURI = process.env.MONGO_API_KEY;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .then(() => console.log("connectedo to db"))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use('/blogs', blogRoutes)

// use this funcion for all incoming requests
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});



