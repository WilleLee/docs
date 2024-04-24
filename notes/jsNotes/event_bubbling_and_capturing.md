# event bubbling and capturing

## How does event flow work in the DOM?

- DOM 트리에서 이벤트는 세 단계에 걸쳐 상위에서 하위로, 다시 하위에서 상위로 전파된다.
  - Capturing phase
  - Target phase
  - Bubbling phase

### Event Capturing

- capturing 단계에서 이벤트는 가장 바깥 요소에서 가장 안쪽 요소로 전파된다.

### Event Bubbling

- bubbling 단계에서 이벤트는 가장 안쪽 요소에서 가장 바깥 요소로 전파된다.
