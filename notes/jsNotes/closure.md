# closure

MDN 정의에 따르면, 클로저는 ["함수와 그 함수가 선언된 렉시컬 환경의 조합"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)이다. 여기서 먼저 이해해야 할 핵심 키워드는 "함수가 선언된 렉시컬 환경"이다.

## 렉시컬 스코프

자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 **함수를 어디에 정의했는지**에 따라 상위 스코프를 결정한다. 이를 **렉시컬 스코프** 혹은 **정적 스코프**라고 한다.

```javascript
const x = 1;

function foo() {
  const x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1
```

위 코드에서 `bar` 함수와 `foo` 함수는 모두 전역에서 정의되었다. 함수의 상위 소크프(렉시컬 환경의 외부 렉시컬 환경 참조)는 함수를 어디서 정의했느냐에 따라 결정되므로, `foo` 함수와 `bar` 함수의 상위 스코프는 전역 스코프이다. 따라서 `bar` 함수는 `foo` 함수 내부에서 호출되었더라도 `foo` 함수의 렉시컬 환경을 참조하지 않고 전역 스코프를 참조한다.

![function lexical scope and context stack example](https://github.com/WilleLee/docs/blob/main/assets/function_lexical_scope_and_context_stack_ex.jpeg?raw=true)

렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정된다. 이것이 바로 렉시컬 스코프이다.

## 함수 객체의 내부 슬롯 `[[Environment]]`

함수는 자신의 내부 슬롯 `[[Environment]]`에 자신이 정의된 환경, 즉 상위 스코프에 대한 참조를 저장한다. **함수 객체는 내부 슬롯 `[[Environment]]`에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다.**

## 클로저와 렉시컬 환경

```javascript
const x = 1;

function outer() {
  const x = 10;
  const iner = function () {
    console.log(x);
  };
  return inner;
}

const innerFunc = outer();
innerFunc(); // 10
```

위 예시에서 `outer` 함수를 호출하면 `outer` 함수는 **중첩 함수**인 `inner`를 반환하고 생명 주기를 마감한다. 즉 `outer` 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거되는 것이다.

그런데 위 코드의 실행 결과는 `10`이다. 이미 스택에서 제거된 `outer` 함수의 지역 변수가 마치 부화라한 듯이 동작하는 것이다.

이처럼 **외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저라고 한다.**

예시로 돌아가서, `outer` 함수의 실행이 종료하면 `inner` 함수가 반환되면서 `outer` 함수의 생명 주기가 종료되어 실행 컨텍스트 스택에서 제거된다. 이때 **`outer` 함수의 실행 컨텍스트는 실행 컨텍스트에서 제거되지만 `outer` 함수의 렉시컬 환경까지 소멸하는 것은 아니다.** `outer` 함수의 렉시컬 환경은 `inner` 함수의 `[[Environment]]` 내부 슬롯에 의해 참조되고 있고, `inner` 함수는 전역 변수 `innerFunc`에 의해 참조되고 있으므로, `outer` 함수의 렉시컬 환경은 가비지 컬렉션의 대상이 되지 않는 것이다.

```javascript
function foo() {
  const x = 1;
  const y = 2;

  // 클로저
  function bar() {
    console.log(x);
  }

  return bar;
}

const bar = foo();
bar(); // 1
```

외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저라고 한다.

그런데 위 예시에서 클로저 `bar`는 상위 스코프의 식별자 `x`, `y` 중 `x`만 참조하고 있다. 이때 대부분의 모던 브라우저는 최적화를 통해 **상위 스코프의 식별자 중 클로저가 참조하고 있는 식별자만을 기억한다(메모리에 유지한다).**

클로저에 의해 참조되는 상위 스코프의 변수를 **자유 변수(free variable)**라 하며, 클로저라는 이름은 "함수가 자유 변수에 대해 닫혀있다"는 것을 의미한다. 즉 클로저란 **"자유 변수에 묶여있는 함수"**이다.

## 클로저의 활용

클로저는 특정 상태가 의도치 않게 변경되지 않도록 **상태를 안전하게 은닉(information hiding)하고 특정 함수에게만 상태 변경을 허용**하는 데 활용된다.

```javascript
const counter = (function () {
  let num = 0;

  function increase() {
    return ++num;
  }

  function decrease() {
    return num > 0 ? --num : num;
  }

  return {
    increase,
    decrease,
  };
})();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```
