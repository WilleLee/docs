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
    const [dist, now] = queue.pop() as [number, number];

    if (distance2[now] < dist) {
      continue;
    }

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
