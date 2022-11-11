const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { BADFLAGS } = require("dns");

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
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
    .then((result) => {
    res.redirect('/blogs')
    }).catch((err) => {
    console.log(err)
  })
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findById(id)
    .then(result => {
    res.render('details', { blog: result, title: "Blog details"})
    }).catch((err) => {
    console.log(err)
  })
})

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id).then((result) => {
    res.json({ redirect: "/blogs" });
  }).catch(err => {
    console.log(err);
  } )
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// use this funcion for all incoming requests
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
