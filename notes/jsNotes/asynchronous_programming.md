# 비동기 프로그래밍(Asynchronous Programming)

## 동기 처리와 비동기 처리

**자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택만을 갖는다.** 이는 함수를 실행할 수 있는 창구가 단 하나이며, 동시에 2개 이상의 함수를 실행할 수 없다는 것을 의미한다. 한 번에 하나의 태스크만 실행할 수 있다는 점에서 자바스크립트는 **싱글 스레드(single thread)** 방식으로 동작한다고 할 수 있고, 이로 인해 만약 처리에 시간이 걸리는 태스크를 실행하면 **블로킹(blocking)**, 즉 '작업 중단' 현상이 발생한다.

```javascript
function sleep(callback, delay) {
  const delayUntil = Date.now() + delay;

  while (Date.now() < delayUntil);

  callback();
}
function foo() {
  console.log("foo");
}
function bar() {
  console.log("bar");
}

// sleep 함수는 3초 동안 대기한 후 콜백 함수를 실행한다.
sleep(foo, 3 * 1000);

// bar 함수는 foo 함수 실행이 완전히 종료된 이후에 호출된다.
// 즉 3초 이상 블로킹된다.
bar();
```

한편 이와 같이 현재 실행 중인 태스크가 종료할 때까지 다음 태스크가 대기하는 방식을 **동기 처리(synchronous processing)**라고 한다. 이 경우 태스크의 실행 순서가 보장되기는 하지만, 태스크의 블로킹이 발생한다는 단점이 있다.

그런데 위 코드를 `setTimeout` 타이머 함수를 사용하여 변경하면 어떻게 될까?

```javascript
function foo() {
  console.log("foo");
}
function bar() {
  console.log("bar");
}

setTimeout(foo, 3 * 1000);
bar();
```

`setTimeout` 함수는 앞의 `sleep`처럼 `foo` 실행에 딜레이를 주기는 하지만, 이후의 태스크를 블로킹하지 않는다. 이처럼 현재 실행 중인 태스크가 종료되지 않았더라도 다음 태스크를 곧바로 실행하는 방식을 **비동기 처리(asynchronous processing)**라고 한다.

비동기 처리 방식으로 동작하는 것에는 타이머 함수인 `setTimeout`과 `setInterval`, HTTP 요청, 이벤트 핸들러 등이 있다. 이러한 비동기 처리는 이벤트 루프와 태스크 큐를 통해 구현된다.

## 이벤트 루프와 태스크 큐
