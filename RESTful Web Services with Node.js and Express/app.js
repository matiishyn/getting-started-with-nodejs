var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'); // parses data from post request

var app = express();

// connect to 'bookAPI' MongoDB database
var db = mongoose.connect('mongodb://localhost/bookAPI');

// models for Book, instance of a Book Schema
var Book = require('./models/bookModel');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * New router for books
 */
var bookRouter = require('./Routes/bookRoutes')(Book);

// root
app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    // app started listening
    console.log('Gulp is running my app on port: ', port);
});

app.use('/api/books', bookRouter);