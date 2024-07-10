# this

## this 키워드

객체는 상태(state)를 나타내는 프로퍼티와 동작(behavior)을 나타내는 매서드를 가진다. 이때 메서드는 자신이 속한 객체의 상태, 프로퍼티를 참조/변경할 수 있어야 하는데, 이때 우선적으로 **자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.**

프로퍼티 `radius`와 매서드 `getDiameter()`를 갖는 `Circle`이라는 객체 생성자 함수를 생각해보자. 생성자 함수로 인스턴스를 생성하기 위해서는 먼저 `Circle` 생성자 함수의 정의가 필요하다. 그런데 생성자 함수를 정의하는 시점에는 아직 객체 인스턴스가 생성되지 이전이기 때문에 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없다. 이때 자바스크립트는 `this`라는 특수한 식별자를 제공하여 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리킬 수 있게 한다. 즉 **`this`는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(self-referencing variable)로, 이러한 `this`를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.** 단, **`this`가 가리키는 값, 즉 `this` 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.**

> **this 바인딩**
>
> 바인딩이란 식별자와 값을 연결하는 과정이다. this 바인딩은 `this`와 `this`가 가리킬 객체를 연결하는 과정이다.

### 객체 리터럴에서 this 바인딩 예시

```javascript
// 객체 리터럴
const circle = {
  radius: 5,
  getDiameter() {
    // this = 메서드를 호출한 객체
    return this.radius * 2;
  },
};

console.log(circle.getDiameter()); // 10
```

### 생성자 함수에서 this 바인딩 예시

```javascript
function Circle(radius) {
  // this = 생성자 함수가 생성할 인스턴스
  this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // this = 생성자 함수가 생성할 인스턴스
  return this.radius * 2;
};

// 인스턴스 생성
const circle = new Circle(5);

console.log(circle.getDiameter()); // 10
```

## 함수 호출 방식과 this 바인딩

> **렉시컬 스코프와 this 바인딩**
>
> 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되는 시점에 상위 스코프를 결정하지만, this 바인딩은 함수 호출 시점에 결정된다.

this에 바인딩될 값은 **함수 호출 방식, 즉 함수가 어떻게 호출되었는지**에 따라 동적으로 결정된다. 함수 호출 방식은 다음과 같다.

1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

### 1. 일반 함수 호출

일반 함수 호출 시 `this`에는 기본적으로 **전역 객체**(global object)가 바인딩된다. 이는 전역 함수는 물론이고 중첩 함수도 마찬가지인데, 다만 strict mode가 적용된 일반 함수 내부의 `this`에는 `undefined`가 바인딩된다.

```javascript
function foo() {
  console.log(this); // global object
  function bar() {
    console.log(this); // global object
  }
  bar();
}
foo();
```

```javascript
function foo() {
  "use strict";

  console.log(this); // undefined
  function bar() {
    console.log(this); // undefined
  }
  bar();
}
foo();
```

또 콜백함수가 일반 함수로 호출되는 경우에도 `this`에는 전역 객체가 바인딩된다.

```javascript
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

obj.foo(); // { value: 100, foo: f } -> global object -> 1
```

### 2. 메서드 호출

메서드 내부의 `this`에는 메서드를 호출할 때 메서드 이름 앞의 마침표 연산자 앞에 기술한 객체가 바인딩된다. 이때 `this`가 메서드를 "소유"한 객체가 아니라 메서드를 "호출"한 객체에 바인딩된다는 점에 주의해야 한다.

```javascript
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

console.log(getName()); // getName 메서드를 호출한 객체 = global object -> "" | node에서는 undefined
```

`person` 객체의 `getName` 프로퍼티가 가리키는 함수 객체는 `person` 객체와는 별도로 존재하는 함수 객체이며, `getName` 프로퍼티는 단지 그 함수 객체를 가리키고 있을 뿐이다.

![this of getName example](https://github.com/WilleLee/docs/blob/main/assets/this_get_name_ex.jpeg?raw=true)

### 3. 생성자 함수 호출

생성자 함수 내부의 `this`에는 생성자 함수가 미래에 생성할 인스턴스가 바인딩된다.

```javascript
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

만약 `new` 연산자를 사용하지 않으면, 생성자 함수가 아닌 일반 함수로 동작한다.

```javascript
// ...

const circle3 = Circle(15); // 일반 함수로 호출
console.log(circle3); // undefined
console.log(radius); // 15
```

### Function.prototype.apply/call/bind 메서드에 의한 간접 호출

#### apply와 call

`Function.prototype.apply`와 `Function.prototype.call` 메서드는 `this`로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 "호출"한다. 이때 `apply`는 인수 리스트를 배열로, `call`은 인수 리스트를 쉼표로 구분한 리스트로 전달한다.

```javascript
Function.prototype.apply(thisArg[, argsArray]);
Function.prototype.call(thisArg[, arg1, arg2, ...]);
```

```javascript
function getThisBinding() {
  console.log(arguments);
  return this;
}

const thisArg = { a: 1 }; // this로 사용할 객체

console.log(getThisBinding()); // global object

console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3) [1, 2, 3]
// { a: 1 }
console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3) [1, 2, 3]
// { a: 1 }
```

#### bind

`Function.prototype.bind` 메서드는 함수를 곧바로 호출하지는 않지만, 첫 번째 인수로 전달한 값으로 `this`를 설정한 새로운 함수를 반환한다.

```javascript
const person = {
  name: "Lee",
  foo(callback) {
    setTimeout(callback.bind(this), 100);
  },
};

person.foo(function () {
  console.log(`My name is ${this.name}.`);
}); // My name is Lee.
```
