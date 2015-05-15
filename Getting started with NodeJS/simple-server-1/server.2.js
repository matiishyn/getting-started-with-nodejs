var http = require('http');

var server = new http.Server(); // http.Server -> net.Server -> EventEmitter

server.listen(8080, 'localhost');

server.on('request', function(req, res) {
    res.end("Hello");
});

// log all events
var emit = server.emit;
server.emit = function(event /*, arg1, arg2,... */) {
    console.log(event);
    emit.apply(server, arguments);
};