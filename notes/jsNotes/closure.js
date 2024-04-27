/*
var funcs = [];

for(var i = 0; i < 3; i++) {
  console.log(i);
  funcs[i] = function() {
    return i;
  };
}

for(var j = 0; j < 3; j++) {
  console.log(funcs[j]());
}

console.log(funcs);
*/

var funcs = [];

for(var i = 0; i <3;i++) {
  funcs[i] = (function(id) {
    return function() {
      return id;
    }
  })(i);
}

for(var j = 0; j < 3; j++) {
  console.log(funcs[j]());
}