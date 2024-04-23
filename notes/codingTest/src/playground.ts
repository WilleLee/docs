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
