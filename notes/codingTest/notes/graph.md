# 그래프 이론

## 그래프(Graph)란?

- 그래프는 노드와 노드 사이에 연결된 간선(edge)의 정보를 가지고 있는 자료구조이다.

|                | 그래프                  | 트리                |
| -------------- | ----------------------- | ------------------- |
| 방향성         | 방향 또는 무방향 그래프 | 방향 그래프         |
| 순환성         | 순환 및 비순환          | 비순환              |
| 루트 노드      | 루트 노드 없음          | 루트 노드 존재      |
| 부모-자식 관계 | 부모-자식 관계 없음     | 부모-자식 관계 존재 |
| 모델 종류      | 네트워크 모델           | 계층 모델           |

- 그래프는 두 가지 방법으로 구현 가능하다.
  - 인접 행렬(Adjacency Matrix): 2차원 배열을 사용, 메모리 공간: O(_V<sup>2</sup>_), V: 노드의 개수, 간선 비용 O(1)
  - 인접 리스트(Adjacency List): 리스트를 사용, 메모리 공간: O(_E_), E: 간선의 개수, 간선 비용 O(V)
- 가령 다익스트라 알고리즘은 인접 리스트(1차원 리스트)를 사용하며, 플로이드 워셜 알고리즘은 인접 행렬(2차원 배열)을 사용한다. 문제의 노드 개수가 적으면 플로이드 워셜 알고리즘을 이용할 수 있겠지만, 노드 개수가 많으면 다익스트라 알고리즘을 이용하는 것이 효율적이다.

## 기타 그래프 알고리즘

### 서로소 집합(Disjoint Sets)

- 수학적 의미에서 서로소 집합은 **공통 원소가 없는 두 집합**을 의미한다.
- 서로소 집합 자료구조는 **서로소 부분 집합들로 나누어진 원소들의 데이터를 처리하기 위한 자료구조**이며, **합집합(union)**과 **찾기(find)** 연산으로 조작 가능하다.

#### 서로소 집합 자료구조

- 서로소 집합 자료구조는 트리 자료구조를 이용하여 집합을 표현한다.
- 서로소 집합 계산 알고리즘은 아래 연산 과정을 거친다.
  1. union 연산을 확인하여 서로 연결된 두 노드 A, B를 확인한다.
     - A와 B의 루트 노드 A', B'를 각각 찾는다.
     - A'를 B'의 부모 노드로 설정한다.(B'가 A'를 가리키도록 한다.)
  2. 모든 union 연산을 처리할 때까지 1번 과정을 반복한다.
- 번호가 작은 원소가 부모 노드가 되도록 구현하는 것이 일반적이다. 가령 A'가 1, B'가 3이라면, B'가 A'를 가리키도록(A'를 부모 노드로 설정하도록) 한다.

#### 서로소 집합 자료구조의 구현

전체 집합 `[1, 2, 3, 4, 5, 6]`에 대하여 아래 4가지 union 연산을 수행한다고 가정하자.

- union 1, 4
- union 2, 3
- union 2, 4
- union 5, 6

##### 1. 부모 테이블 초기화

노드 개수 크기의 부모 테이블을 초기화한다. 이때 모든 원소가 자기 자신을 부모로 가지도록 설정한다.

| 노드 | 1   | 2   | 3   | 4   | 5   | 6   |
| ---- | --- | --- | --- | --- | --- | --- |
| 부모 | 1   | 2   | 3   | 4   | 5   | 6   |

##### 2. union 1, 4

노드 1과 노드 4의 루트 노드를 찾는다. 이때 노드 1의 루트 노드는 1, 노드 4의 루트 노드는 4이므로, 노드 4의 부모 노드를 1로 설정한다.

| 노드 | 1   | 2   | 3   | 4   | 5   | 6   |
| ---- | --- | --- | --- | --- | --- | --- |
| 부모 | 1   | 2   | 3   | 1   | 5   | 6   |

##### 3. union 2, 3

노드 2와 노드 3의 루트 노드를 찾는다. 이때 노드 2의 루트 노드는 2, 노드 3의 루트 노드는 3이므로, 노드 3의 부모 노드를 2로 설정한다.

| 노드 | 1   | 2   | 3   | 4   | 5   | 6   |
| ---- | --- | --- | --- | --- | --- | --- |
| 부모 | 1   | 2   | 2   | 1   | 5   | 6   |

##### 4. union 2, 4

노드 2와 노드 4의 루트 노드를 찾는다. 이때 노드 2의 루트 노드는 2, 노드 4의 루트 노드는 1이므로, 노드 2의 부모 노드를 1로 설정한다.

| 노드 | 1   | 2   | 3   | 4   | 5   | 6   |
| ---- | --- | --- | --- | --- | --- | --- |
| 부모 | 1   | 1   | 2   | 1   | 5   | 6   |

##### 5. union 5, 6

노드 5와 노드 6의 루트 노드를 찾는다. 이때 노드 5의 루트 노드는 5, 노드 6의 루트 노드는 6이므로, 노드 6의 부모 노드를 5로 설정한다.

| 노드 | 1   | 2   | 3   | 4   | 5   | 6   |
| ---- | --- | --- | --- | --- | --- | --- |
| 부모 | 1   | 1   | 2   | 1   | 5   | 5   |

##### 결론

위와 같이 서로소 집합 자료구조를 이용하면, 노드 1, 2, 3, 4는 연결되어 있고, 노드 5, 6은 연결되어 있음을 알 수 있다. 이때 각 노드의 루트 노드를 찾기 위해서는 재귀적으로 부모를 거슬러 올라가야 한다.

```typescript
const V = 6; // 노드의 개수
const unions: [number, number][] = [
  [1, 4],
  [2, 3],
  [2, 4],
  [5, 6],
];

function findRoot(parent: number[], x: number) {
  // 루트 노드가 발견될 때까지 재귀 호출
  if (parent[x] !== x) {
    return findRoot(parent, parent[x]);
  }
  return x;
}

function union(parent: number[], a: number, b: number) {
  const rootA = findRoot(parent, a);
  const rootB = findRoot(parent, b);
  if (rootA < rootB) {
    parent[rootB] = rootA;
  } else {
    parent[rootA] = rootB;
  }
}

// 부모 테이블 초기화 (모든 원소가 자기 자신을 부모로 가짐)
const parentTable = Array(V + 1)
  .fill(0)
  .map((_, i) => i);

// union 실행
for (let i = 0; i < unions.length; i++) {
  const [a, b] = unions[i];
  union(parentTable, a, b);
}

// 각 원소의 루트 노드 출력
for (let i = 1; i <= V; i++) {
  console.log(findRoot(parentTable, i));
}

// 부모 테이블 출력
for (let i = 1; i <= V; i++) {
  console.log(parentTable[i]);
}
```

그런데 이 경우 find 함수의 시간 복잡도가 O(V)로 비효율적이다. 이때 경로 압축(Path Compression) 기법을 사용하면 시간 복잡도를 개선할 수 있다. 즉 find 함수를 재귀적으로 호출한 뒤 부모 테이블 값을 갱신하는 것이다.

```typescript
function findRoot(parent: number[], x: number) {
  if (parent[x] !== x) {
    parent[x] = findRoot(parent, parent[x]);
  }
  return parent[x];
}
```

#### 서로소 집합을 이용한 사이클 판별

서로소 집합은 무방향 그래프 내에서의 사이클을 판별하는 데 사용 가능하다. 즉 간선을 하나씩 확인하면서 두 노드가 포함되어 있는 집합을 합치는 과정을 반복하여 사이클을 판별하는 것이다.

1. 각 간선에 대하여 두 노드의 루트 노드를 확인한다.
   1. 루트 노드가 서로 다르다면 두 노드에 대하여 union 연산을 수행한다.
   2. 루트 노드가 서로 같다면 사이클이 발생한 것이다.
2. 모든 간선에 대하여 1번 과정을 반복한다.

```typescript
const V = 3; // 노드의 개수
const edges: [number, number][] = [
  [1, 2],
  [1, 3],
  [2, 3],
];

const parentTable = Array.from({
  length: V + 1,
})
  .fill(0)
  .map((_, index) => index);

function findRoot(parent: number[], x: number) {
  if (parent[x] !== x) {
    parent[x] = findRoot(parent, parent[x]);
  }
  return parent[x];
}

function union(parent: number[], a: number, b: number) {
  const rootA = findRoot(parent, a);
  const rootB = findRoot(parent, b);
  if (rootA < rootB) {
    parent[rootB] = rootA;
  } else {
    parent[rootA] = rootB;
  }
}

let isCycle = false;

for (let i = 0; i < edges.length; i++) {
  const [a, b] = edges[i];
  if (findRoot[a] === findRoot[b]) {
    isCycle = true;
    break;
  } else {
    union(parentTable, a, b);
  }
}

if (isCycle) {
  console.log("사이클이 발생했습니다.");
} else {
  console.log("사이클이 발생하지 않았습니다.");
}
```

### 신장 트리(Spanning Tree)

- 신장 트리는 **하나의 그래프가 있을 때 모든 노드를 포함하면서 사이클이 존재하지 않는 부분 그래프**를 의미한다.

### 크루스칼 알고리즘(Kruskal's Algorithm)

![spanning tree example](https://github.com/WilleLee/docs/blob/main/assets/spanning_tree_example.jpeg?raw=true)

- 위 그래프에서 최소 비용으로 신장 트리를 만든다고 가정해보자. 1, 2, 3 노드를 최소 비용으로 연결하면서 사이클이 발생하지 않도록 하는 시나리오는 두 번째 그림처럼 1-2, 2-3 간선을 선택하는 것이다.
- 이처럼 신장 트리 중에서 최소 비용으로 만들 수 있는 신장 트리를 찾는 알고리즘을 **최소 신장 트리 알고리즘**이라고 하는데, **크루스칼 알고리즘(Kruskal's Algorithm)**은 대표적인 최소 신장 트리 알고리즘이다.
