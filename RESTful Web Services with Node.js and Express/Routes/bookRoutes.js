var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();

// GET /books
    bookRouter.route('/')
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
            Book.find(query, function (err, books) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    // send json to client
                    res.json(books);
                }
            });
        })
        .post(function (req, res) {
            // create a new Book
            var book = new Book(req.body);
            //console.log(book);
            book.save(); // save in DB
            res.status(201).send(book);
        });

    // use middleware for route '/:bookId'
    bookRouter.use('/:bookId', function (req, res, next) {
        // this function will be used for all routes
        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else if (book) {
                // book is found, add it to request to make it available downstairs
                req.book = book;
                // step up
                next();
            } else {
                res.status(404).send('no book found');
            }
        });
    });
// GET /books/123
    bookRouter.route('/:bookId')
        // http://localhost:3000/api/books/1 -> {...}
        .get(function (req, res) {
            // get here from middleware
            res.json(req.book);
        })
        // updating one record - replacing
        .put(function (req, res) {
            // get here from middleware
            // book is found, replace content
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.book);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.book[p] = req.body[p];
            }

            req.book.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.book);
                }
            });
        })
        .delete(function (req, res) {
            req.book.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send("Removed");
                }
            });
        });

    return bookRouter;
};

module.exports = routes;