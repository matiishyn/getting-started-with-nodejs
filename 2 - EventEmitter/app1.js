var EventEmitter = require('events').EventEmitter;

var ee = new EventEmitter();

// subscribe
ee.on('someEvent', function(data) {
	console.log('someEvent: ',data);
});
// publish or trigger
ee.emit('someEvent', {option: true});
ee.emit('someEvent', {option: false});

// one time triggering
ee.once('anotherEvent', function(data) {
	console.log('anotherEvent: ',data);
});
ee.emit('anotherEvent', {option: true}); // only first evt will be triggered
ee.emit('anotherEvent', {option: false});

// remove event
ee.removeListener('someEvent', callbackFn)