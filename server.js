const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toISOString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', `${log}\n`, (err) => {
        console.log('unable to append to server log');
    })
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my fucking website'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Paaage'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});