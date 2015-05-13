var http = require('http'),
    url = require('url');

var server = new http.Server(); // http.Server -> net.Server -> EventEmitter

server.listen(8080, 'localhost');

server.on('request', function (req, res) {
    var urlParsed = url.parse(req.url, true);

    if (req.method === 'GET' && urlParsed.pathname === '/echo' && urlParsed.query.message) {
        res.end(urlParsed.query.message);
        return;
    }

    res.statusCode = 404;
    res.end("Not Found");
});

// http://localhost:8080/echo?message=text -> text