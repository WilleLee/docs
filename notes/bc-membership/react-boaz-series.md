# React 까보기 시리즈

[유튜브 보러 가기](https://www.youtube.com/watch?v=JadWu4Ygnyc&list=PLpq56DBY9U2B6gAZIbiIami_cLBhpHYCA&index=1)

## 용어 정의

`React`의 전반적인 흐름을 요약하면, `hook`이 `setState`를 호출하면 `scheduler`와의 상호작용이 일어나고, 이는 다시 `reconciler`와의 상호작용으로 이어진다.

- `scheduler`: `React`가 작업을 비동기적으로 실행하도록 한다.
- `reconciler`: 가상 DOM을 재조정(Fiber 아키텍처)하고, 컴포넌트를 호출한다.

`React`에서 렌더링이란 컨포넌트를 호출하고 가상 DOM을 재조정하는 것이다.

- `ReactElement`: 바벨이 `React.createElement()`를 호출하여 JSX를 해석한 것
- `fiber`(아키텍처 Fiber와는 다른 것): 위의 `ReactElement`에 부가 정보(상태, 생명 주기, 훅 등)를 더한 노드 **객체**

## virtual DOM의 동작 원리 (render & commit phases)

가상 DOM이란? 메모리 상에 UI 관련 정보를 저장한 것이다.

가상 DOM은 `current` 트리와 `workInProgress` 트리의 더블 버퍼링 구조로 되어 있으며, `createRoot()`로 생성한 루트 노드는 current 트리를 가리키고, 각 트리의 서로 대칭되는 노드들은 서로를 상호 참조한다.

![douch buffering of the react virtual dom](https://github.com/WilleLee/docs/blob/main/assets/virtual-dom-two-way-buffer.png?raw=true)

`React`가 가상 DOM을 구성하고 실제 DOM API를 호출하여 화면을 다시 그리는 작업은 몇 가지 단계를 거쳐 수행된다.

- 렌더 phase
  - 가상 DOM을 재조정하는 단계(reconciliation)
  - 엘리먼트 객체(fiber node)를 추가, 수정, 삭제
- 커밋 phase
  - `reconciler`가 재조정한 가상 DOM을 브라우저 DOM에 적용하는 단계

## React element와 component의 종류, 정의

React는 JSX를 React element로, 그리고 이를 다시 fiber로 재구성하는 흐름을 따른다. 이때 fiber는 **가상 DOM에 올라가기 위해 필요한 정보들을 포함한 객체**이다.

React element란 DOM 트리 생성에 필요한 정보를 가지는 자바스크립트 객체이다. 이러한 React element는 세 가지 종류로 설명된다.

1. host component = React DOM element: HTML element에 대응하는 component (`<div>`, `<img>` 등)
2. custom component = React component element: 개발자가 선언한 클래스형 / 함수형 컴포넌트
3. static component: ex) Fragment, lazy, Context, memo 등

## JSX를 React element로 변환하는 과정

JSX 문법은 babel을 통해 `React.createElement()`를 호출하며, 호출 형식은 아래와 같다.

```javascript
createElement(type, config, child1, child2, …);
```

첫 번째 인자인 `type`은 아래와 같은 값들을 가진다.

1. host component: tagName
2. custom component: 작성한 함수?
3. static component: 특정 함수 호출에서 반환된 React element

그리고 `config`는 `props`로 `ref`, `key` 등을 포함한다(`ref`, `key`는 예약된 props).

React element가 만들어지는 과정을 간략화하면 아래와 같다.

1. 예약된 props(key, ref…)를 **제외한** 나머지 props를 객체에 저장
2. `children` 요소가 복수이면 배열에 저장
3. default props가 존재하면 적용
4. 위 정보에 기반하여 React element 객체 생성

<details>
<summary>대략적 형태</summary>

```javascript
function createElement(
    // ...
) {
    // ...
    return ReactElement(type, key, ref, props);
}

function ReactElement(
    // ...
) {
    // ...
    return element;
}
```

</details>

## fiber 생성 과정

React는 `tag: WorkTag`를 통해 fiber의 종류를 구분한다. 이는 fiber의 종류에 따라 reconciliation의 작업 처리 방식이 달라야 하기 때문이다.

유즈 케이스 별 fiber 생성 함수(ex `createFiberFromElement()`)가 호출되면 필요한 정보로 `createFiber()`가 호출되고, 이는 다시 `createFiberImplObject()`를 호출한다.

## root node

`createRoot()`의 결과물(`root`)에 대해 로그를 찍어 보면 많은 정보를 확인할 수 있다!

가령 root node는 `current`에 current tree 최상단 fiber를 가지고, 각 fiber는 `alternate`에 `WORK`를 수행할 대체 노드를 가진다.