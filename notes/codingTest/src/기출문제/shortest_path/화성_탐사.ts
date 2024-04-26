// n * m 2차원 공간
const INF = Infinity;

const test1N = 3;
const test1M = 3;

const test1: number[][] = [
  [5, 5, 4],
  [3, 9, 1],
  [3, 2, 7],
];

class Heap {
  public queue: [number, [number, number]][];
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
  add(item: [number, [number, number]]) {
    this.queue.push(item);
    this.bubbleUp();
  }
  bubbleUp() {
    let index = this.size() - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (
      this.queue[parentIndex] &&
      this.queue[parentIndex] > this.queue[index]
    ) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }
  pop() {
    if (this.size() === 1) {
      return this.queue.pop();
    }

    const value = this.queue[0];
    this.queue[0] = this.queue.pop() as [number, [number, number]];
    this.bubbleDown();
    return value;
  }
  bubbleDown() {
    let index = 0;
    let leftIndex = 1;
    let rightIndex = 2;

    while (
      (this.queue[leftIndex] && this.queue[leftIndex] < this.queue[index]) ||
      (this.queue[rightIndex] && this.queue[rightIndex] < this.queue[index])
    ) {
      let smallerIndex = leftIndex;
      if (
        this.queue[rightIndex] &&
        this.queue[rightIndex] < this.queue[leftIndex]
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

const distance1: number[][] = Array(test1N)
  .fill([])
  .map(() => Array(test1M).fill(INF));

function dijkstra(
  start: [number, number],
  graph: number[][],
  distance: number[][],
  n: number,
  m: number
) {
  const heap = new Heap();
  const startDistance = graph[start[0]][start[1]];
  distance[start[0]][start[1]] = startDistance;
  heap.add([startDistance, start]);

  while (heap.size() > 0) {
    const [distanceToNow, [nowX, nowY]] = heap.pop() as [
      number,
      [number, number],
    ];

    if (distance[nowY][nowX] < distanceToNow) {
      continue;
    }

    const nextNodes: [number, number][] = [];
    if (nowX - 1 >= 0) {
      nextNodes.push([nowX - 1, nowY]);
    }
    if (nowY - 1 >= 0) {
      nextNodes.push([nowX, nowY - 1]);
    }
    if (nowX + 1 < graph[0].length) {
      nextNodes.push([nowX + 1, nowY]);
    }
    if (nowY + 1 < graph.length) {
      nextNodes.push([nowX, nowY + 1]);
    }
    nextNodes.forEach((nextNode) => {
      const [x, y] = nextNode;
      const distanceToNext = graph[y][x];
      const cost = distanceToNow + distanceToNext;
      if (cost < distance[y][x]) {
        distance[y][x] = cost;
        heap.add([cost, [x, y]]);
      }
    });
    console.log(distance);
  }

  console.log("distance result", distance);

  return distance[m - 1][n - 1];
}

const answer1 = dijkstra([0, 0], test1, distance1, test1N, test1M);
console.log("answer 1", answer1);

const test2N = 7,
  test2M = 7;
const test2 = [
  [9, 0, 5, 1, 1, 5, 3],
  [4, 1, 2, 1, 6, 5, 3],
  [0, 7, 6, 1, 6, 8, 5],
  [1, 1, 7, 8, 3, 2, 3],
  [9, 4, 0, 7, 6, 4, 1],
  [5, 8, 3, 2, 4, 8, 3],
  [7, 4, 8, 4, 8, 3, 4],
];
const distance2: number[][] = Array(test2M)
  .fill([])
  .map(() => Array(test2N).fill(INF));

const answer2 = dijkstra([0, 0], test2, distance2, test2N, test2M);

console.log("answer 2", answer2);
