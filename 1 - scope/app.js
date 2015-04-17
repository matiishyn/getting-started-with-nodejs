// var 1 - Incorrect
require('./module1');
console.log(a);
console.log(b);

// var 2 - Module
var module2 = require('./module2');
console.log(module2.a);
console.log(module2.b);

// var 3 - Module
var Cart = require('./module3');
var c = new Cart();
console.log(c.items);