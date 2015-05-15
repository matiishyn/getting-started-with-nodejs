var express = require('express'),
    mongoose = require('mongoose');

var app = express();

// connect to 'bookAPI' MongoDB database
var db = mongoose.connect('mongodb://localhost/bookAPI');

// models for Book, instance of a Book Schema
var Book = require('./models/bookModel');

var port = process.env.PORT || 3000;

// root
app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    // app started listening
    console.log('Gulp is running my app on port: ', port);
});

/**
 * New router for books
 */
var bookRouter = express.Router();

bookRouter.route('/books')
    // http://localhost:8000/api/books -> {"hello":"my api"}
    .get(function (req, res) {
        // call this function whenever this route is called

        // 1. sending simple object
        // var responseJson = {hello: 'my api'};
        // res.json(responseJson);

        // 2. get all books from DB
        /* Book.find(function(err, books) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                // send json to client
                res.json(books);
            }
        }); */

        // 3. get books using params/filtering
        var query = req.query;
        // sanitize query - make it available only for genre
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        // http://localhost:3000/api/books?genre=Science -> [...]
        Book.find(function(query, err, books) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                // send json to client
                res.json(books);
            }
        });
    });
//.post()

app.use('/api', bookRouter);
