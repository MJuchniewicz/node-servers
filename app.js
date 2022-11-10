const express = require('express');

const app = express();

app.listen(3000);



app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname});
    // res.send('<p>Home Page<p/>')
});

app.get('/about', (req, res) => {
    res.sendFile("./views/about.html", { root: __dirname });
// res.send('<p>Home Page<p/>')
});

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// use this funcion for all incoming requests
app.use((req, res) => {
    res.sendFile("./views/404.html", { root: __dirname });
    res.statusCode = 404
})