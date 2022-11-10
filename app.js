const express = require('express');

const app = express();

//register view engine
app.set('view engine', 'ejs')

app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [
        {title: 'kdjhaskjhdajsd', snippet: 'kdjahskjdhajkshdjhasd'},
        {title: 'hdfghdfgh', snippet: 'kdjahskjhhfghdfghdfghdfghdfghdfghdhajkshdjhasd'},
        {title: 'hhfg', snippet: 'kdjahskjdhajkhhghghghghghghghhshdjhasd'},
    ]
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// use this funcion for all incoming requests
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
})