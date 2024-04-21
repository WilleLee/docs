// name: 더 맵게, data structure: heap, url: https://school.programmers.co.kr/learn/courses/30/lessons/42626

class Heap {
  heap: number[];
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
  add(scov: number) {
    this.heap.push(scov);
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
  bubbleDown() {
    let index = 0;
    let leftIndex = 1;
    let rightIndex = 2;
    while (
      (this.heap[leftIndex] && this.heap[leftIndex] < this.heap[index]) ||
      (this.heap[rightIndex] && this.heap[rightIndex] < this.heap[index])
    ) {
      let smallerIndex = leftIndex;
      if (this.heap[rightIndex] < this.heap[leftIndex]) {
        smallerIndex = rightIndex;
      }
      this.swap(index, smallerIndex);
      index = smallerIndex;
      leftIndex = index * 2 + 1;
      rightIndex = index * 2 + 2;
    }
  }
  mix() {
    const a = this.heap[0];
    this.heap[0] = this.heap.pop() as number;
    this.bubbleDown();
    const b = this.heap[0];
    // 한 개만 남은 경우 의도대로 값이 추가되지 않음
    if (this.size() > 1) {
      this.heap[0] = this.heap.pop() as number;
      this.bubbleDown();
    } else {
      this.heap.pop();
    }

    const mixedValue = a + b * 2;
    this.add(mixedValue);
  }
  isPassed(k: number) {
    return this.heap[0] >= k;
  }
}

function solution(scoville: number[], K: number) {
  let mixCount = 0;
  const heap = new Heap();
  for (let i = 0; i < scoville.length; i++) {
    heap.add(scoville[i]);
  }

  while (true) {
    if (heap.isPassed(K)) {
      break;
    }
    if (heap.size() < 2) {
      mixCount = -1;
      break;
    }

    heap.mix();
    mixCount++;
  }

  return mixCount;
}

console.log(solution([1, 2, 3, 9, 10, 12], 7));
