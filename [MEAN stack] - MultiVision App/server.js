var express = require('express');

// setting up env vars
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// configurations
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

// handling all requests
app.get('*', function (req, res) {
    res.render('index');
});

var port = 3030;
app.listen(port);
console.log("Listening on port " + port);