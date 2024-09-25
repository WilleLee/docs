# React 까보기 시리즈

[유튜브 보러 가기](https://www.youtube.com/watch?v=JadWu4Ygnyc&list=PLpq56DBY9U2B6gAZIbiIami_cLBhpHYCA&index=1)

## 2강

`React`의 전반적인 흐름을 요약하면, `hook`이 `setState`를 호출하면 `scheduler`와의 상호작용이 일어나고, 이는 다시 `reconciler`와의 상호작용으로 이어진다.

- `scheduler`: `React`가 작업을 비동기적으로 실행하도록 한다.
- `reconciler`: 가상 DOM을 재조정(Fiber 아키텍처)하고, 컴포넌트를 호출한다.

`React`에서 렌더링이란 컨포넌트를 호출하고 가상 DOM을 재조정하는 것이다.

- `ReactElement`: 바벨이 `React.createElement()`를 호출하여 JSX를 해석한 것
- `fiber`(아키텍처 Fiber와는 다른 것): 위의 `ReactElement`에 부가 정보(상태, 생명 주기, 훅 등)를 더한 노드 **객체**

## 3강

가상 DOM이란? 메모리 상에 UI 관련 정보를 저장한 것이다.

가상 DOM은 `current` 트리와 `workInProgress` 트리의 더블 버퍼링 구조로 되어 있으며, `createRoot()`로 생성한 루트 노드는 current 트리를 가리키고, 각 트리의 서로 대칭되는 노드들은 서로를 상호 참조한다.

![douch buffering of the react virtual dom](https://github.com/WilleLee/docs/blob/main/assets/virtual-dom-two-way-buffer.png?raw=true)

`React`가 가상 DOM을 구성하고 실제 DOM API를 호출하여 화면을 다시 그리는 작업은 몇 가지 단계를 거쳐 수행된다.

- 렌더 phase
  - 가상 DOM을 재조정하는 단계(reconciliation)
  - 엘리먼트 객체(fiber node)를 추가, 수정, 삭제
- 커밋 phase
  - `reconciler`가 재조정한 가상 DOM을 브라우저 DOM에 적용하는 단계


