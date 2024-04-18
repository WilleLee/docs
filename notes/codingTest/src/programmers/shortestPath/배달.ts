// name: 배달, algorithm: dijkstra(heaps), url: https://school.programmers.co.kr/learn/courses/30/lessons/12978

class Heap {
  heap: [number, number][];
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  swap(index1: number, index2: number) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
  add([distance, node]: [number, number]) {
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
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }
  pop() {
    if (this.size() === 1) {
      return this.heap.pop();
    }

    const value = this.heap[0];
    this.heap[0] = this.heap.pop() as [number, number];
    this.bubbleDown();
    return value;
  }
  bubbleDown() {
    let index = 0;
    let leftIndex = 1;
    let rightIndex = 1;

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

function solution(N: number, road: [number, number, number][], K: number) {
  // n개의 마을, k시간 이하
  // 음식 주문을 받을 수 있는 마을 개수 return
  // road : [a, b, c][]

  const graph = Array(N + 1).fill([]);
  for (let i = 0; i < road.length; i++) {
    const [a, b, c] = road[i];
    graph[a] = [...graph[a], [b, c]];
    graph[b] = [...graph[b], [a, c]];
  }
  // console.log(graph);
  const heap = new Heap();
  const distance = Array(N + 1).fill(INF);
  heap.add([0, 1]);
  distance[1] = 0;

  while (heap.size() > 0) {
    const [dist, now] = heap.pop() as [number, number];

    if (distance[now] < dist) {
      continue;
    }

    for (let i = 0; i < graph[now].length; i++) {
      const [n, d] = graph[now][i];
      const cost = dist + d;
      if (cost < distance[n]) {
        distance[n] = cost;
        heap.add([cost, n]);
      }
    }
  }

  let count = 0;
  distance.map((dist) => {
    if (dist <= K) {
      count++;
    }
  });
  return count;
}

console.log(
  solution(
    5,
    [
      [1, 2, 1],
      [2, 3, 3],
      [5, 2, 2],
      [1, 4, 2],
      [5, 3, 1],
      [5, 4, 2],
    ],
    3
  )
);
