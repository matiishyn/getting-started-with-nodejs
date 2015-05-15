var util = require('util');

// LOG
var log = util.debuglog('specificKeyword');
log('Msg is visible in debug mode');
// running
// NODE_DEBUG=specificKeyword node app1.js

// FORMAT
var person = {name: 'Nick'}
console.log(util.format('%s : %j', person, person));

// INSPECT
console.log(util.inspect(util, {colors: true})); // all methods os util

// INHERITS
function User () {}
User.prototype.loggedIn = function() {
	return true;
};
function Admin () {}
util.inherits(Admin, User); // Admin.prototype.prototype === User.prototype

admin = new Admin();
console.log(admin.loggedIn());