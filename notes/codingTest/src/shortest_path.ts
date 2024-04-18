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

// console.log("hello");

const V = graph.length - 1; // 노드 개수
const S = 1; // 시작 노드

const visited1 = Array(V + 1).fill(false);
const distance1 = Array(V + 1).fill(INF);

function getSmallestNode() {
  let min = INF;
  let index = 0;

  for (let i = 1; i <= V; i++) {
    if (distance1[i] < min && !visited1[i]) {
      min = distance1[i];
      index = i;
    }
  }

  return index;
}

function simpleDijkstra(start: number) {
  // 시작 노드에 대하여 초기화
  visited1[start] = true;
  distance1[start] = 0;
  for (let i = 0; i < graph[start].length; i++) {
    const [node, cost] = graph[start][i];
    distance1[node] = cost;
  }

  // 시작 노드를 제외한 전체 n - 1개의 노드에 대해 반복
  for (let i = 0; i < V - 1; i++) {
    const now = getSmallestNode();
    visited1[now] = true;

    for (let j = 0; j < graph[now].length; j++) {
      const [n, c] = graph[now][j];
      const cost = distance1[now] + c;
      if (cost < distance1[n]) {
        distance1[n] = cost;
      }
    }
  }
}

console.time("simpleDijkstra");

simpleDijkstra(S);

console.timeEnd("simpleDijkstra");

for (let i = 1; i <= V; i++) {
  if (distance1[i] === INF) {
    console.log("도달할 수 없습니다.");
  } else {
    console.log(i, distance1[i]);
  }
}

// 0.116ms
/*
class PriorityQueue {
  queue: [number, number][];
  constructor() {
    this.queue = [];
  }
  add([distance, node]: [number, number]) {
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
*/

// 0.210ms
class PriorityQueue {
  queue: [number, number][]; // [distance, node]

  constructor() {
    this.queue = [];
  }

  size() {
    return this.queue.length;
  }

  swap(index1: number, index2: number) {
    [this.queue[index1], this.queue[index2]] = [
      this.queue[index2],
      this.queue[index1],
    ];
  }

  add([distance, node]: [number, number]) {
    this.queue.push([distance, node]);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.queue.length - 1; // 새로운 노드의 위치
    let parentIndex = Math.floor((index - 1) / 2); // 새로운 노드의 부모 노드의 위치

    while (
      this.queue[parentIndex] &&
      this.queue[parentIndex][0] > this.queue[index][0]
    ) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  pop() {
    if (this.queue.length === 0) {
      return;
    }

    if (this.queue.length === 1) {
      return this.queue.shift();
    }

    const value = this.queue[0];
    this.queue[0] = this.queue.pop() as [number, number];
    this.heapifyDown();
    return value;
  }

  heapifyDown() {
    let index = 0;
    let leftIndex = index * 2 + 1;
    let rightIndex = index * 2 + 2;

    while (
      (this.queue[leftIndex] &&
        this.queue[leftIndex][0] < this.queue[index][0]) ||
      (this.queue[rightIndex] &&
        this.queue[rightIndex][0] < this.queue[index][0])
    ) {
      let smallerIndex = leftIndex;
      if (
        this.queue[rightIndex] &&
        this.queue[rightIndex][0] < this.queue[leftIndex][0]
      ) {
        smallerIndex = rightIndex;
      }

      this.swap(index, smallerIndex);
      index = smallerIndex;
      leftIndex = index * 2 + 1;
      rightIndex = index * 2 + 2;
    }
  }
}

const distance2 = Array(V + 1).fill(INF);

function advancedDijkstra(start: number) {
  const queue = new PriorityQueue();

  queue.add([0, start]);
  distance2[start] = 0;

  while (queue.size() > 0) {
    // 가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
    const [dist, now] = queue.pop() as [number, number];

    // 이미 처리된 노드 무시
    if (distance2[now] < dist) {
      continue;
    }

    // 현재 노드와 연결된 다른 인접한 노드들을 확인
    for (let i = 0; i < graph[now].length; i++) {
      const [n, d] = graph[now][i];
      const cost = dist + d;
      if (cost < distance2[n]) {
        distance2[n] = cost;
        queue.add([cost, n]);
      }
    }
  }
}

console.time("advancedDijkstra");
advancedDijkstra(S);
console.timeEnd("advancedDijkstra");

for (let i = 1; i <= V; i++) {
  if (distance2[i] === INF) {
    console.log("도달할 수 없습니다.");
  } else {
    console.log(i, distance2[i]);
  }
}

// floyd-warshall
// const fwNodes = 4;
const fwInputs: [number, number, number][] = [
  [1, 2, 4],
  [1, 4, 6],
  [2, 1, 3],
  [2, 3, 7],
  [3, 1, 5],
  [3, 4, 4],
  [4, 3, 2],
];

function fw(nodes: number, inputs: [number, number, number][]) {
  const fwGraph = Array(nodes + 1)
    .fill([])
    .map(() => Array(nodes + 1).fill(INF));

  for (let a = 1; a <= nodes; a++) {
    for (let b = 1; b <= nodes; b++) {
      if (a === b) {
        fwGraph[a][b] = 0;
      }
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    const [a, b, c] = inputs[i];
    fwGraph[a][b] = c;
  }

  for (let k = 1; k <= nodes; k++) {
    for (let a = 1; a <= nodes; a++) {
      for (let b = 1; b <= nodes; b++) {
        fwGraph[a][b] = Math.min(fwGraph[a][b], fwGraph[a][k] + fwGraph[k][b]);
      }
    }
  }

  return fwGraph;
}

console.time("fw");
console.log("fw result", fw(4, fwInputs));
console.timeEnd("fw");

// 미래 도시

// 1번 -> K번 최단 거리
// K번 -> X번 최단 거리

const inputs: [number, number][] = [
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 5],
  [4, 6],
];
const X = 4;
const K = 5;

function futureCity(inp: [number, number][], middle: number, end: number) {
  const cityGraph = Array(101).fill([]);
  for (let i = 0; i < inp.length; i++) {
    const [a, b] = inp[i];
    cityGraph[a] = [...cityGraph[a], b];
    cityGraph[b] = [...cityGraph[b], a];
  }

  const fromStart = dij(1, cityGraph);
  const fromMiddle = dij(middle, cityGraph);

  return fromStart[middle] + fromMiddle[end];
}

function dij(start: number, gr: number[][]) {
  const dists = Array(101).fill(INF);
  const queue = new PriorityQueue();
  queue.add([0, start]);
  dists[start] = 0;

  while (queue.size() > 0) {
    const [dist, now] = queue.pop() as [number, number];

    if (dists[now] < dist) {
      continue;
    }

    for (let i = 0; i < gr[now].length; i++) {
      const next = gr[now][i];
      const cost = dist + 1;
      if (cost < dists[next]) {
        dists[next] = cost;
        queue.add([cost, next]);
      }
    }
  }
  return dists;
}

console.time("futureCity");
console.log(futureCity(inputs, K, X));
console.timeEnd("futureCity");
