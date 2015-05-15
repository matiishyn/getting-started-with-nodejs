var stream = require('stream');

// readable stream
var rs = new stream.Readable();
rs._read = function() {
    var text = 'Simple text';
    rs.push(text);
    this.push(null); // end streaming
};

// writable stream - reading from readable stream
rs.pipe(process.stdout);
process.stdout.on('error');
