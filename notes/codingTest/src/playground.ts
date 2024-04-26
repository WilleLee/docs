// shortest path
/*
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

// dijkstra
const V = graph.length - 1; // 노드의 개수
const INF = Infinity;

class Heap {
  heap: [number, number][]; // [distance, node]
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
      this.swap(parentIndex, index);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  pop() {
    if (this.size() === 0) {
      return;
    }
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

function dijkstra(start: number) {
  const heap = new Heap();
  const distance = Array(V + 1).fill(INF);

  heap.add([0, start]);
  distance[start] = 0;

  while (heap.size() > 0) {
    const [dist, now] = heap.pop() as [number, number];

    if (distance[now] < dist) {
      continue;
    }

    for (let i = 0; i < graph[now].length; i++) {
      const [n, d] = graph[now][i];
      const cost = dist + d;
      if (cost < distance[now]) {
        distance[now] = cost;
        heap.add([cost, n]);
      }
    }
  }

  return distance;
}

console.time("dijkstra");
console.log(dijkstra(1));
console.timeEnd("dijkstra");
*/

//
/*
const URL = "blh";
const createConnection = (url: string) => ({
  url,
});

class DB {
  public instance: any;
  static instance: any;
  constructor(url: string) {
    if (!DB.instance) {
      DB.instance = createConnection(url);
    }
    return DB.instance;
  }
  connect() {
    return this.instance;
  }
}

const a = new DB(URL);
const b = new DB(URL);

console.log(a === b);

class Vehicle {
  private make: string;
  private model: string;
  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
  display() {
    console.log(`${this.make} ${this.model}`);
  }
}

class Car extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model);
  }
}
class Truck extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model);
  }
}

function vehicleFactory(type: string, make: string, model: string) {
  switch (type) {
    case "car":
      return new Car(make, model);
    case "truck":
      return new Truck(make, model);
    default:
      throw new Error("Invalid vehicle type");
  }
}

const car1 = vehicleFactory("car", "Toyota", "Corolla");
const truck1 = vehicleFactory("truck", "Ford", "F150");

car1.display();
truck1.display();
*/

// revealing module pattern
const counterModule = (function () {
  let count = 0;

  function increment() {
    count++;
  }

  function decrement() {
    count--;
  }

  function getCount() {
    return count;
  }

  return {
    increment,
    decrement,
    getCount,
  };
})();

console.log(counterModule.getCount()); // 0
counterModule.increment();
counterModule.increment();
console.log(counterModule.getCount()); // 2
counterModule.decrement();
console.log(counterModule.getCount()); // 1

// floyd warshall
const INF = Infinity;

const N = 4; // 노드의 개수
const inputs: [number, number, number][] = [
  [1, 2, 4],
  [1, 4, 6],
  [2, 1, 3],
  [2, 3, 7],
  [3, 1, 5],
  [3, 4, 4],
  [4, 3, 2],
];

const distance: number[][] = Array(N + 1)
  .fill([])
  .map(() => Array(N + 1).fill(INF));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    if (i === j) {
      distance[i][j] = 0;
    }
  }
}

for (let i = 0; i < inputs.length; i++) {
  const [a, b, d] = inputs[i];
  distance[a][b] = d;
}

for (let k = 1; k <= N; k++) {
  for (let a = 1; a <= N; a++) {
    for (let b = 1; b <= N; b++) {
      const min = Math.min(distance[a][b], distance[a][k] + distance[k][b]);
      console.log(min);
      distance[a][b] = min;
    }
  }
}

console.log("distance", distance);

const city = 5;
const buses: [number, number, number][] = [
  [1, 2, 2],
  [1, 3, 3],
  [1, 4, 1],
  [1, 5, 10],
  [2, 4, 2],
  [3, 4, 1],
  [3, 5, 1],
  [4, 5, 3],
  [3, 5, 10],
  [3, 1, 8],
  [1, 4, 2],
  [5, 1, 7],
  [3, 4, 2],
  [5, 2, 4],
];

const costs: number[][] = Array(city + 1)
  .fill([])
  .map(() => Array(city + 1).fill(INF));

for (let a = 1; a <= city; a++) {
  for (let b = 1; b <= city; b++) {
    if (a === b) {
      costs[a][b] = 0;
    }
  }
}

for (let i = 0; i < buses.length; i++) {
  const [a, b, cost] = buses[i];
  const currentCost = costs[a][b];
  costs[a][b] = Math.min(cost, currentCost);
}

for (let k = 1; k <= city; k++) {
  for (let a = 1; a <= city; a++) {
    for (let b = 1; b <= city; b++) {
      const min = Math.min(costs[a][b], costs[a][k] + costs[k][b]);
      costs[a][b] = min;
    }
  }
}

for (let i = 1; i <= city; i++) {
  let answer = "";
  for (let j = 1; j <= city; j++) {
    if (costs[i][j] === INF) {
      answer += "0";
    } else {
      answer += String(costs[i][j]);
    }
    if (j !== city) {
      answer += " ";
    }
  }
  console.log(answer);
}
