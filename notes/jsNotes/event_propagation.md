# 이벤트 전파(Event Propagation)

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
