# closure

## What is closure?

- 클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다.
- 클로저는 함수가 생성될 당시의 외부 변수를 기억한다.

## Why do we need closure?

- 클로저는 함수가 생성될 당시의 외부 변수를 기억하기 때문에, 함수가 생성된 이후에도 외부 변수에 접근할 수 있다.
- 이러한 특성을 이용하여 private 변수를 사용할 수 있다.

```javascript
function sayHi(name) {
  let _name = name;
  return function () {
    console.log(`Hi, my name is ${_name}.`);
  };
}

const sayHiToWille = sayHi("Wille");
sayHiToWille(); // Hi, my name is Wille.
sayHiToWille._name; // undefined
```

```javascript
var i;
for (i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}
// 5 5 5 5 5
/*
lexical environment
i: 5
*/

var j;
for (j = 0; j < 5; j++) {
  (function (k) {
    setTimeout(function () {
      console.log(k);
    }, 100);
  })(j);
}
// 0 1 2 3 4
/*
lexical environment
j: 5
k: 0 1 2 3 4
*/
```
