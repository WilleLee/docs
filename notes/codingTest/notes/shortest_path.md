# 최단 경로(shortest path)

- 가장 짧은 경로를 찾는 알고리즘
- 최단 경로 문제는 보통 노드와 간선으로 이루어진 그래프를 이용해 표현된다.
- ex) 다익스트라 최단 경로 알고리즘, 플로이드 워셜 알고리즘, 벨만 포드 알고리즘

## 다익스트라(Dijkstra) 최단 경로 알고리즘

- 여러 개의 노드가 있을 때, 특정한 노드에서 출발하여 다른 노드로 가는 각각의 최단 경로를 구해주는 알고리즘
- **음의 간선**(음수를 값으로 갖는 간선)이 없을 때 정상적으로 동작
- 하나의 그리디 알고리즘으로 분류, 매번 '가장 비용이 적은 노드'를 선택하는 과정을 반복

1. 출발 노드 설정
2. 최단 거리 테이블 초기화
3. 방문하지 않은 노드 중에서 최단 거리가 가장 짧은 노드 선택
4. 해당 노드를 거쳐 다른 노드로 가는 비용을 계산하여 최단 거리 테이블 갱신
5. 위 과정에서 3, 4번을 반복

다익스트라 알고리즘은 '각 노드에 대한 현재까지의 최단 거리' 정보를 항상 1차원 리스트에 저장하며, 리스트를 계속 갱신한다. 매번 현재 처리 중인 노드와 인접한 노드로 도달하는 더 짧은 경로를 찾으면 '더 짧은 경로도 있었네?'라고 판단하는 것이다.

### 다익스트라 알고리즘 구현

![dijkstra graph example](https://github.com/WilleLee/docs/blob/main/assets/dijkstra_graph_example.jpeg?raw=true)

출발 노드를 1로 하고, 다른 모든 노드로 가는 최단 거리를 '무한'으로 초기화한다.

| 노드 | 1   | 2        | 3        | 4        | 5        | 6        |
| ---- | --- | -------- | -------- | -------- | -------- | -------- |
| 거리 | 0   | Infinity | Infinity | Infinity | Infinity | Infinity |

1번 노드를 거쳐 다른 노드로 가는 비용을 계산한다.

| 노드 | 1x  | 2   | 3   | 4   | 5        | 6        |
| ---- | --- | --- | --- | --- | -------- | -------- |
| 거리 | 0   | 2   | 5   | 1   | Infinity | Infinity |

이후 단계에서, 방문하지 않은 노드 중 현재로부터 가장 가까운 노드를 선택해 거쳐가는 비용을 계산한다. 위 경우에서는 4번 노드가 선택되며, 4번 노드에서 갈 수 있는 노드는 3번, 5번 노드이다.

| 노드 | 1x  | 2   | 3               | 4x  | 5                      | 6        |
| ---- | --- | --- | --------------- | --- | ---------------------- | -------- |
| 거리 | 0   | 2   | `min(5, 1 + 3)` | 1   | `min(Infinity, 1 + 1)` | Infinity |
| 거리 | 0   | 2   | 4               | 1   | 2                      | Infinity |

다음 노드는 2번 노드이며, 2번 노드에서 갈 수 있는 노드는 3번 노드이다(4번 노드는 이미 방문한 노드이므로 제외).

| 노드 | 1x  | 2x  | 3               | 4x  | 5   | 6        |
| ---- | --- | --- | --------------- | --- | --- | -------- |
| 거리 | 0   | 2   | `min(4, 2 + 3)` | 1   | 2   | Infinity |
| 거리 | 0   | 2   | 4               | 1   | 2   | Infinity |

다음 노드는 5번 노드이며, 5번 노드에서 갈 수 있는 노드는 3번, 6번 노드이다.

| 노드 | 1x  | 2x  | 3               | 4x  | 5x  | 6                      |
| ---- | --- | --- | --------------- | --- | --- | ---------------------- |
| 거리 | 0   | 2   | `min(4, 2 + 1)` | 1   | 2   | `min(Infinity, 2 + 2)` |
| 거리 | 0   | 2   | 3               | 1   | 2   | 4                      |

다음 노드는 3번 노드이며, 3번 노드에서 갈 수 있는 노드는 6번 노드이다.

| 노드 | 1x  | 2x  | 3x  | 4x  | 5x  | 6               |
| ---- | --- | --- | --- | --- | --- | --------------- |
| 거리 | 0   | 2   | 3   | 1   | 2   | `min(4, 3 + 5)` |
| 거리 | 0   | 2   | 3   | 1   | 2   | 4               |

마지막으로 6번 노드를 선택한다. 더 이상 방문할 수 있는 노드가 없으므로 알고리즘이 종료된다.

| 노드 | 1x  | 2x  | 3x  | 4x  | 5x  | 6x  |
| ---- | --- | --- | --- | --- | --- | --- |
| 거리 | 0   | 2   | 3   | 1   | 2   | 4   |

#### 간단한 다익스트라 알고리즘 구현 - O(V<sup>2</sup>)

> V: 노드의 개수, E: 간선의 개수

1. 각 노드에 대한 최단 거리를 담는 1차원 리스트를 선언한다.
2. 이후 단계마다 '방문하지 않은 노드 중에서 최단 거리가 가장 짧은 노드를 선택'하기 위해 매 단계마다 1차원 리스트의 모든 원소를 확인(순차 탐색)한다.

```typescript
const INF = Infinity;

const graph = [
  [],
  [
    [2, 2],
    [3, 5],
    [4, 1],
  ], // 1번 노드에서 2로 가는 비용 = 2, 3으로 가는 비용 = 5 ...
  [
    [3, 3],
    [4, 2],
  ],
  [
    [2, 3],
    [6, 5],
  ],
  [
    [3, 3],
    [5, 1],
  ],
  [
    [3, 1],
    [6, 2],
  ],
  [],
];
// 노드의 개수(V) = graph.length - 1
const V = graph.length - 1; // 노드 개수
const visited = Array(graph.length).fill(false);
const distance = Array(graph.length).fill(INF);

function getSmallestNode() {
  let min = INF;
  let index = 0; // 가장 최단 거리가 짧은 노드(인덱스)
  for (let i = 1; i <= V; i++) {
    if (distance[i] < min && !visited[i]) {
      min = distance[i];
      index = i;
    }
  }
  return index;
}

function dijkstra(start: number) {
  // 시작 노드 초기화
  distance[start] = 0;
  visited[start] = true;
  for (let i = 0; i < graph[start].length; i++) {
    const [n, d] = graph[start][i];
    distance[n] = d;
  }
  // 시작 노드를 제외한 전체 노드에 대해 반복
  for (let i = 0; i < V - 1; i++) {
    // 현재 최단 거리가 가장 짧은 노드를 꺼내서 방문 처리
    const now = getSmallestNode();
    visited[now] = true;
    // 현재 노드와 연결된 다른 노드를 확인
    for (let j = 0; j < graph[now].length; j++) {
      const [n, d] = graph[now][j];
      const cost = distance[now] + d;
      // 현재 노드를 거쳐서 다른 노드로 이동하는 거리가 더 짧은 경우
      if (cost < distance[n]) {
        distance[n] = cost;
      }
    }
  }
}

dijkstra(1);

// 모든 노드로 가기 위한 최단 거리 출력
for (let i = 1; i <= V; i++) {
  if (distance[i] === INF) {
    console.log("INFINITY"); // 도달할 수 없는 경우
  } else {
    console.log(distance[i]);
  }
}
```

#### 개선된 다익스트라 알고리즘 구현 - O(E*log*V)

- 개선된 다익스트라 알고리즘은 특정 노드까지의 최단 거리에 대한 정보를 힙(Heap) 자료구조에 담아 처리한다.
- 최단 거리를 저장하기 위한 1차원 리스트는 그대로 사용하지만, 현재 가장 가까운 노드를 저장하기 위해 우선순위 큐를 사용한다.

> **힙 자료구조**
>
> | 자료구조    | 추출되는 데이터             |
> | ----------- | --------------------------- |
> | 스택        | 가장 나중에 삽입된 데이터   |
> | 큐          | 가장 먼저 삽입된 데이터     |
> | 우선순위 큐 | 가장 우선순위가 높은 데이터 |

- 힙은 우선순위 큐를 구현하기 위해 사용하는 자료구조 중 하나로, 최소 힙과 최대 힙이 있다.

```typescript
// [distance, node]
class PriorityQueue {
  consturctor() {
    this.queue = [];
  }
  add([distance, node]) {
    this.queue.push([distance, node]);
    this.queue.sort((a, b) => a[0] - b[0]);
  }
  pop() {
    return this.queue.shift();
  }
  size() {
    return this.queue.length;
  }
}

const INF = Infinity;

const graph = [
  [],
  [
    [2, 2],
    [3, 5],
    [4, 1],
  ],
  [
    [3, 3],
    [4, 2],
  ],
  [
    [2, 3],
    [6, 5],
  ],
  [
    [3, 3],
    [5, 1],
  ],
  [
    [3, 1],
    [6, 2],
  ],
  [],
];

const V = graph.length - 1;
const distances = Array(V + 1).fill(INF);

function dijkstra(start: number) {
  const queue = new PriorityQueue();

  // 시작 노드 초기화
  queue.add([0, start]);
  distances[start] = 0;

  while (queue.size() > 0) {
    // 가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
    const [d, now] = queue.pop();
    // 현재 노드가 이미 처리된 적이 있는 노드라면 무시
    if (distances[now] < d) {
      continue;
    }
    // 현재 노드와 연결된 다른 인접한 노드들을 확인
    for (let i = 0; i < graph[now].length; i++) {
      const [n, d] = graph[now][i];
      const cost = d + distances[now];
      if (cost < distances[n]) {
        distances[n] = cost;
        queue.add([cost, n]);
      }
    }
  }
}

dijkstra(1);
```
