var bookController = function (Book) {
    var post = function (req, res) {
        // create a new Book
        var book = new Book(req.body);
        //console.log(book);
        book.save(); // save in DB
        res.status(201).send(book);
    };

    var get = function (req, res) {
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
    };

    return {
        get: get,
        post: post
    };
};

module.exports = bookController;