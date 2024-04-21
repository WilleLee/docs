// name: 가장 먼 노드, algorithm: dijkstra, url: https://school.programmers.co.kr/learn/courses/30/lessons/49189

type HeapItem = [number, number];

class Heap {
  heap: HeapItem[];
  constructor() {
    this.heap = [];
  }
  swap(index1: number, index2: number) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
  size() {
    return this.heap.length;
  }
  add([distance, node]: HeapItem) {
    this.heap.push([distance, node]);
    this.bubbleUp();
  }
  bubbleUp() {
    let index = this.size() - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    while (
      this.heap[parentIndex] &&
      this.heap[parentIndex] > this.heap[index]
    ) {
      if (this.heap[parentIndex] > this.heap[index]) {
        this.swap(index, parentIndex);
        index = parentIndex;
        parentIndex = Math.floor((index - 1) / 2);
      }
    }
  }
  pop() {
    if (this.size() === 1) {
      return this.heap.pop();
    }

    const value = this.heap[0];
    this.heap[0] = this.heap.pop() as HeapItem;
    this.bubbleDown();
    return value;
  }
  bubbleDown() {
    let index = 0;
    let leftIndex = 1;
    let rightIndex = 2;

    while (
      (this.heap[leftIndex] && this.heap[leftIndex] < this.heap[index]) ||
      (this.heap[rightIndex] && this.heap[rightIndex] < this.heap[index])
    ) {
      let smallerIndex = leftIndex;
      if (
        this.heap[rightIndex] &&
        this.heap[rightIndex] < this.heap[leftIndex]
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

const INF = Infinity;

function solution(n: number, edge: [number, number][]) {
  const distances = Array(n + 1).fill(INF);
  const graph = Array(n + 1).fill([]);
  let maxDistance = 0;
  let maxCount = 0;

  for (let i = 0; i < edge.length; i++) {
    const [a, b] = edge[i];
    graph[a] = [...graph[a], b];
    graph[b] = [...graph[b], a];
  }

  // console.log("graph", graph);

  const heap = new Heap();
  heap.add([0, 1]);
  distances[1] = 0;

  while (heap.size() > 0) {
    const [dist, now] = heap.pop() as HeapItem;

    if (distances[now] < dist) {
      continue;
    }

    for (let i = 0; i < graph[now].length; i++) {
      const targetNode = graph[now][i];
      const cost = dist + 1;
      if (cost < distances[targetNode]) {
        distances[targetNode] = cost;
        heap.add([cost, targetNode]);
        if (cost > maxDistance) {
          maxDistance = cost;
        }
      }
    }
  }

  // console.log(distances);
  // console.log(maxDistance);
  for (let i = 0; i < distances.length; i++) {
    if (distances[i] === maxDistance) {
      maxCount++;
    }
  }

  return maxCount;
}

console.log(
  solution(6, [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2],
  ])
);
