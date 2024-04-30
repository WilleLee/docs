# Ajax

## Ajax란?

Ajax(Asynchronous JavaScript and XML)는 자바스크립트를 사용하여 브라우저가 서버에 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 기법이다.

Ajax는 브라우저 제공 Web API인 XMLHttpRequest 객체를 기반으로 동작하며, XMLHttpRequest 객체는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공한다.

전통적 웹페이지 렌더링 방식에는 아래와 같은 문제점이 있다.

1. 매번 변경할 필요가 없는 부분까지 포함하여 완전한 HTML을 서버로부터 전송받아야 하므로 불필요한 데이터 통신이 발생
2. 매번 변경할 필요가 없는 부분까지 다시 렌더링하므로 화면 전환 시 깜빡임이 발생
3. 클라이언트-서버 간 통신이 동기 방식으로 동작하므로 블로킹이 발생할 수 있음

이와 달리 Ajax는 아래와 같은 장점이 있다.

1. 변경할 부분만 서버로부터 전송받아 갱신하므로 불필요한 데이터 통신이 발생하지 않음
2. 변경할 부분만 갱신하므로 화면 전환 시 깜빡임이 발생하지 않음
3. 클라이언트-서버 간 통신이 비동기 방식으로 동작하므로 블로킹이 발생하지 않음

![ajax and common html request comparison](https://github.com/WilleLee/docs/blob/main/assets/ajax_request_comparison.jpeg?raw=true)

## XMLHttpRequest 객체

### 객체 생성

XMLHttpRequest 객체는 브라우저 제공 Web API이므로 브라우저 환경에서만 정상 동작한다. XMLHttpRequest 객체는 XMLHttpRequest 생성자 함수를 통해 생성한다.

```javascript
const xhr = new XMLHttpRequest();
```

### 요청 전송

ajax에 의한 HTTP 요청은 아래 순서를 따른다.

1. `XMLHttpRequest.prototype.open` 메서드로 HTTP 요청을 초기화한다.
2. 필요에 따라 `XMLHttpRequest.prototype.setRequestHeader` 메서드로 특정 HTTP 요청 헤더 값을 설정한다.
3. `XMLHttpRequest.prototype.send` 메서드로 HTTP 요청을 전송한다.

```javascript
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

// HTTP 요청 헤더 설정
xhr.setRequestHeader("Content-Type", "application/json");

// HTTP 요청 전송
xhr.send();
```

#### `XMLHttpRequest.prototype.open`

`open` 메서드는 HTTP 요청을 초기화한다.

```typescript
xhr.open(method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", url: string, async?: boolean);
```

#### `XMLHttpRequest.prototype.send`

`send` 메서드는 HTTP 요청을 전송하는데, `GET`, `POST` 요청에 따라 전송 방식에 차이가 있다.

- `GET` : 데이터를 URL의 query string에 포함하여 전송
- `POST` : 데이터를 HTTP request body에 포함하여 전송

이때 `POST`의 경우, request body에 포함할 데이터(페이로드)는 `JSON.stringify` 메서드를 사용하여 직렬화한 다음 `send` 메서드의 인수로 전달한다.

```javascript
xhr.send(JSON.stringify({ id: 1, completed: false }));
```

`GET` 요청의 경우, `send` 메서드의 인수는 `null`로 설정된다.

### HTTP 응답 처리

서버가 전송한 응답을 처리하려면 `XMLHttpRequest` 객체가 발생시키는 `readystatechange` 이벤트를 캐치해야 하는데, `readystatechange` 이벤트는 `XMLHttpRequest` 객체의 `readyState` 프로퍼티 값이 변경될 때마다 발생한다.

```javascript
const xhr = new XMLHttpRequest();

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

xhr.setRequestHeader("content-type", "application/json");

xhr.send();

xhr.onreadystatechange = () => {
  // 서버 응답이 완료되었는지 확인
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  // 서버 응답 상태 코드 확인
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
  } else {
    console.error("Error", xhr.status, xhr.statusText);
  }
};
```

`readystatechange`가 아닌 `load` 이벤트를 캐치할 수도 있는데, `load` 이벤트는 HTTP 요청이 성공적으로 완료되었을 때 발생한다. 따라서 `load` 이벤트를 캐치하는 경우 `xhr.readyState`를 확인할 필요가 없다.

```javascript
const xhr = new XMLHttpRequest();

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

xhr.setRequestHeader("content-type", "application/json");

xhr.send();

xhr.onload = () => {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
  } else {
    console.error("Error", xhr.status, xhr.statusText);
  }
};
```
