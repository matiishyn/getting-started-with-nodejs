var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// setting up env vars
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// ---------------------------------------------------
// configurations
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
    src: __dirname + '/public'
}));
// static route handling
app.use(express.static(__dirname + '/public')); // ex. GET favicon.ico -> public/favicon.ico
app.use(logger('dev'));
//app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// ---------------------------------------------------

// ---------------------------------------------------
// DB
// connection to MongoDB
mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('multivision db opened');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function (err, messageDoc) {
    mongoMessage = messageDoc.message;
});
// ---------------------------------------------------

// requests to partials files
app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});

// handling all requests
app.get('*', function (req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = 3030;
app.listen(port);
console.log("Listening on port " + port);

// stylus compiler function - middleware
function compile(str, path) {
    return stylus(str).set('filename', path)
}