var util = require('util');
var EventEmitter = require('events').EventEmitter;

function UserList() {
	this.list = [];
	EventEmitter.call(this);
}
// inheritance
util.inherits(UserList, EventEmitter);
UserList.prototype.add = function(name) {
	this.list.push(name);
	this.emit('new-user-added', name);
};

var list = new UserList();
list.on('new-user-added', function(name) {
	console.log('Added new user: ', name);
});
// adding will trigger event
list.add('Harisson');