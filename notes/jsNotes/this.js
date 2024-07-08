/*
const circle = {
  radius: 5,
  getDiameter() {
    return this.radius * 2;
  },
};

console.log(circle.getDiameter());
*/

/*
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  return this.radius * 2;
};

const circle2 = new Circle(5);

console.log(circle2.getDiameter());
*/

/*
const person = {
  name: "Lee",
  foo(callback) {
    setTimeout(callback.bind(this), 100);
  },
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`);
});
*/

/*
const foo = function () {
  console.dir(this);
};

// 일반 함수 호출
// global object
foo();

// 메서드 호출
// obj object
const obj = {
  foo,
};

obj.foo();

// 생성자 함수 호출
// instance
new foo();

// call, apply, bind 호출
const bar = { name: "good bar" };

// bar object
foo.call(bar);
foo.apply(bar);
foo.bind(bar)();
*/

/*
function foo() {
  console.log("A", this); // global object
  function bar() {
    console.log("B", this); // global object
  }
  bar();
}
foo();

function foo2() {
  "use strict";

  console.log("A", this); // undefined
  function bar() {
    console.log("B", this); // undefined
  }
  bar();
}

foo2();
*/

/*
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log(this);

    setTimeout(function () {
      console.log(this);
      console.log(this.value);
    }, 100);
  },
};

obj.foo();
*/

const person = {
  name: "Lee",
  getName() {
    return this.name;
  },
};

console.log(person.getName()); // getName 메서드를 호출한 객체 = person -> Lee

const anotherPerson = {
  name: "Kim",
};

anotherPerson.getName = person.getName;

console.log(anotherPerson.getName()); // getName 메서드를 호출한 객체 = anotherPerson -> Kim

const getName = person.getName;

console.log(getName());
