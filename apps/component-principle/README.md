# Wille's Component Principle

## Single Responsibility State Management(단일 책임 상태 관리)

하나의 컨트롤러 컴포넌트는 하나의 상태, 또는 밀접히 관련된 상태들과 그 핸들러들만을 관리해야 한다.

## Separation of Concerns(관심사 분리)

상태 관리 로직과 뷰 렌더링 로직을 서로 다른 컴포넌트 함수로 분리한다.

## Effect Isolation(이팩트 격리)

`useEffect` 훅은 외부 시스템과의 상호작용이나 사이드 이팩트를 다루기 위해서만 사용하고 내부 상태 관리에는 사용하지 않는다.

## Encapsulated Event Handlers(캡슐화된 이벤트 핸들러)

상태 세터 함수를 직접적으로 전달하는 대신 이를 호출하는 이벤트 핸들러를 prop으로 전달하여 각 핸들러가 특정한 동작을 수행하도록 한다.

## Clear and Concise Handlers(명확하고 간결한 핸들러)

이벤트 핸들러는 간결하고 명확하게 작성한다.

<!--

Single Responsibility State Management

A controller component should manage only one state or a set of closely related states along with their handlers.

Separation of Concerns

Separate state management logic from view rendering logic within component functions.

Effect Isolation

Use useEffect only for interactions with external systems or side effects, not for internal state management.

Encapsulated Event Handlers

Pass event handlers as props instead of state setter functions directly, ensuring each handler performs a specific action.

Clear and Concise Handlers

Write event handlers that call state setter functions in a simple and clear manner.
-->
