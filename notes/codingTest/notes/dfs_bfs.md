# DFS and BFS

- 탐색(search) : 많은 양의 데이터 중에서 원하는 데이터를 찾는 과정
- 자료구조(data structure) : 데이터를 표현하고 관리하고 처리하기 위한 구조

## 스택(Stack)

- 선입후출(First In Last Out) 구조
- 후입선출(Last In First Out) 구조
- 박스 쌓기와 같은 구조

## 큐(Queue)

- 선입선출(First In First Out) 구조
- 먼저 들어온 데이터가 먼저 나가는 구조

## 재귀함수(Recursive Function)

- 자기 자신을 다시 호출하는 함수
- 재귀함수를 사용할 때에는 재귀함수가 언제 끝날지, **종료 조건**을 꼭 명시해야 한다. 자칫 종료 조건을 명시하지 않으면 함수가 무한 호출될 수 있다.
- 컴퓨터 내부에서 재귀 함수의 수행은 스택 자료구조를 이용한다. 함수를 계속 호출했을 때 가장 마지막에 호출한 함수가 먼저 수행을 끝내야 그 앞의 함수 호출이 종료되기 때문이다.

## DFS (Depth-First Search)

- 깊이 우선 탐색, 그래프에서 깊은 부분을 우선적으로 탐색하는 알고리즘

> **그래프**
>
> - 노드(Node)와 간선(Edge)으로 표현되는 자료구조
> - 그래프 탐색이란 하나의 노드를 시작으로 다수의 노드를 방문하는 것
> - 두 노드가 간선으로 연결되어 있다면 '두 노드는 인접하다(adjacent)'라고 표현한다.
>
> 프로그래밍에서 그래프는 두 가지 방식으로 표현 가능하다.
>
> - 인접 행렬(Adjacency Matrix) : 2차원 배열로 그래프의 연결 관계를 표현하는 방식
>
> ```javascript
> const INF = 999999999; // 무한의 비용 선언
>
> // 2차원 리스트를 이용해 인접 행렬 표현
> const graph = [
>   [0, 7, 5],
>   [7, 0, INF],
>   [5, INF, 0],
> ];
> ```
>
> - 인접 리스트(Adjacency List) : 모든 노드에 대하여 연결된 노드에 대한 정보를 차례대로 연결하여 저장하는 방식
>
> ```javascript
> // 행(Row)이 3개인 2차원 리스트로 인접 리스트 표현
> const graph = new Array(3);
>
> // 노드 0에 연결된 노드 정보 저장(노드, 거리)
> graph[0] = [
>   [1, 7],
>   [2, 5],
> ];
>
> // 노드 1에 연결된 노드 정보 저장(노드, 거리)
> graph[1] = [[0, 7]];
>
> // 노드 2에 연결된 노드 정보 저장(노드, 거리)
> graph[2] = [[0, 5]];
> ```
>
> 메모리 측면에서 보면 인접 행렬 방식은 모든 관계를 저장하므로 노드 개수가 많을수록 메모리를 불필요하게 낭비한다. 반면에 인접 리스트 방식은 연결된 정보만을 저장하기 때문에 메모리를 효율적으로 사용한다. 그러나 이 때문에 인접 리스트 방식은 인접 행렬 방식에 비해 특정한 두 노드가 연결되어 있는지에 대한 정보를 얻는 속도가 느리다.

DFS는 특정한 경로로 탐색하다가 특정한 상황에서 최대한 깊숙이 들어가서 노드를 방문한 후, 다시 돌아가 다른 경로로 탐색하는 알고리즘이다.

DFS는 **스택 자료구조**를 이용하며, 구체적인 동작 과정은 다음과 같다.

1. 탐색 시작 노드를 스택에 삽입하고 **방문 처리**를 한다.
2. 스택의 최상단 노드에 방문하지 않은 인접 노드가 있으면 그 인접 노드를 스택에 넣고 방문 처리를 한다. 방문하지 않은 인접 노드가 없으면 스택에서 최상단 노드를 꺼낸다.
3. 2번의 과정을 더 이상 수행할 수 없을 때까지 반복한다.

```typescript
const V = 8;
const graph: number[][] = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];
const visited = Array(V + 1).fill(false);

function dfs(gr: number[][], start: number, vs: boolean[]) {
  // 출발 노드를 스택에 넣고 방문 처리
  const stack: number[] = [start];
  vs[start] = true;
  while (stack.length > 0) {
    const now = stack.pop();
    for (let i = 0; i < gr[now].length; i++) {
      const next = gr[now][i];
      if (!vs[next]) {
        stack.push(next);
        vs[next] = true;
      }
    }
  }
}

dfs();
```

```typescript
const V = 8;
const graph: number[][] = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];
const visited = Array(V + 1).fill(false);

function recurDfs(gr, node, vi) {
  vi[node] = true;
  console.log(`visited ${node}`);

  for (let i = 0; i < gr[node].length; i++) {
    const next = gr[node][i];
    if (!vi[next]) {
      recurDfs(gr, next, vi);
    }
  }
}

recurDfs(graph, 1, visited);
```

## BFS (Breadth-First Search)

- 너비 우선 탐색, 가까운 노드부터 탐색하는 알고리즘

BFS는 큐 자료구조를 이용하며, 구체적인 동작 과정은 다음과 같다.

1. 탐색 시작 노드를 큐에 삽입하고 방문 처리를 한다.
2. 큐에서 노드를 꺼내 해당 노드의 인접 노드 중에서 방문하지 않은 노드를 모두 큐에 삽입하고 방문 처리를 한다.
3. 2번의 과정을 더 이상 수행할 수 없을 때까지 반복한다.

```typescript
const V = 8;
const graph: number[][] = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];
const visited: boolean[] = Array(V + 1).fill(false);

function dfs(gr, start, vi) {
  const queue: number[] = [start];
  vi[start] = true;

  while (queue.length > 0) {
    const now = queue.shift() as number;

    for (let i = 0; i < gr[now].length; i++) {
      const next = gr[now][i];
      if (!vi[next]) {
        vi[next] = true;
        queue.push(next);
      }
    }
  }
}
```

## Summary

|           | DFS            | BFS              |
| --------- | -------------- | ---------------- |
| 동작 원리 | 스택           | 큐               |
| 구현 방법 | 재귀 함수 이용 | 큐 자료구조 이용 |

코딩 테스트 중 2차원 배열에서의 탐색 문제를 만나면 그래프 형태로 바꿔서 생각해보자. 그러면 DFS나 BFS로 간단하게 해결할 수 있는 문제가 많다.
