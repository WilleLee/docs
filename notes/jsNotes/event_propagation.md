# 이벤트 전파(Event Propagation)

## 이벤트 전파(Event Propagation)란?

DOM 트리에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파되는데, 이를 이벤트 전파(Event Propagation)라 한다.

```html
<!doctype html>
<html>
  <body>
    <ul id="numbers">
      <li id="number_1">1</li>
      <li id="number_2">2</li>
      <li id="number_3">3</li>
    </ul>
  </body>
</html>
```

`id`가 `number_2`인 `li` 요소를 클릭한다고 해보자. 이때 **생성된 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 이벤트 타겟(event target)을 중심으로 DOM 트리를 통해 전파된다.** 이러한 이벤트 전파는 세 단계로 구분된다.

![event propagation flow example](https://github.com/WilleLee/docs/blob/main/assets/event_propagation_flow_example.jpeg?raw=true)

1. 캡쳐링 단계(Capturing Phase) : 이벤트가 상위 요소에서 하위 요소 방향으로 전파
2. 타겟 단계(Target Phase) : 이벤트가 이벤트 타겟에 도달
3. 버블링 단계(Bubbling Phase) : 이벤트가 하위 요소에서 상위 요소 방향으로 전파

## 이벤트 전파의 활용

이벤트 핸들러 어트리뷰트/프로퍼티 방식으로 등록한 이벤트 핸들러는 타겟 단계와 버블링 단계의 이벤트만 캐치할 수 있다. **하지만 `addEventListener` 메서드 방식으로 등록한 이벤트 핸들러는 캡쳐링 단계의 이벤트 또한 선별적으로 캐치할 수 있다.** 이 경우 `addEventListener` 메서드의 세 번째 인수로 `true`를 전달하면 된다.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <ul id="fruits">
      <li id="fruit_banana">Banana</li>
      <li id="fruit_apple">Apple</li>
      <li id="fruit_kiwi">Kiwi</li>
    </ul>
    <script>
      const $fruits = document.getElementById("fruits");
      const $apple = document.getElementById("fruit_apple");

      $fruits.addEventListener(
        "click",
        (e) => {
          console.log("event phase: ", e.eventPhase); // 1
          console.log("event target: ", e.target);
          console.log("event current target: ", e.currentTarget);
        },
        true,
      );

      $apple.addEventListener("click", (e) => {
        console.log("event phase: ", e.eventPhase); // 2
        console.log("event target: ", e.target);
        console.log("event current target: ", e.currentTarget);
      });

      $fruits.addEventListener("click", (e) => {
        console.log("event phase: ", e.eventPhase); // 3
        console.log("event target: ", e.target);
        console.log("event current target: ", e.currentTarget);
      });
    </script>
  </body>
</html>
```

위처럼 이벤트 핸들러가 캡쳐링 단계의 이벤트를 캐치할 수 있다면, 이벤트 핸들러는 `window`에서 시작해 이벤트 타겟 방향으로 전파되는 이벤트 객체를 캐치하고, 이벤트를 발생시킨 이벤트 타겟과 해당 이벤트 핸들러가 바인딩된 커런트 타겟이 동일한 경우 타겟 단계의 이벤트 객체를 캐치한다.

이처럼 **이벤트는 이벤트를 발생시킨 이벤트 타겟은 물론 상위 DOM 요소에서도 캐치할 수 있다.**

## 예외

대부분의 이벤트는 캡쳐링과 버블링을 통해 전파되지만, 아래 아벤트들은 버블링을 통해 전파되지 않는다.

- 포커스 이벤트 : `focus`, `blur`
- 리소스 이벤트 : `load`, `unload`, `abort`, `error`
- 마우스 이벤트 : `mouseenter`, `mouseleave`

해당 이벤트들의 경우 버블링되지 않으므로 캡쳐링 단계에서 이벤트를 캐치할 필요가 있을 수 있다. 하지만 상위 요소에서 이벤트를 캐치해야만 한다면, 대체 가능한 이벤트들이 존재한다. 가령 `focus`, `blur`는 `focusin`, `focusout`으로 대체할 수 있고, `mouseenter`, `mouseleave`는 `mouseover`, `mouseout`으로 대체할 수 있다.
