// fibo without memoization
function fibo_1(x: number): number {
  if (x === 1 || x === 2) return 1;
  return fibo_1(x - 1) + fibo_1(x - 2);
}

console.time("fibo_1");
console.log(fibo_1(10));
console.timeEnd("fibo_1");

// fibo with memoization
const fiboMemo: number[] = Array(10 + 1).fill(0);
function fibo_2(x: number): number {
  if (x === 1 || x === 2) return 1;
  if (fiboMemo[x] !== 0) return fiboMemo[x];
  fiboMemo[x] = fibo_2(x - 1) + fibo_2(x - 2);
  return fiboMemo[x];
}

console.time("fibo_2");
console.log(fibo_2(10));
console.timeEnd("fibo_2");

// fibo with loop
const _d = Array(11).fill(0); // DP table

_d[1] = 1;
_d[2] = 1;
const num = 10;

for (let i = 3; i <= num; i++) {
  _d[i] = _d[i - 1] + _d[i - 2];
}
console.time("fibo_3");
console.log(_d[num]);
console.timeEnd("fibo_3");

// 1로 만들기

const x = 26;
const d = Array(x + 1).fill(0);
console.time("1로 만들기");
for (let i = 2; i <= x; i++) {
  // 1을 뺌
  d[i] = d[i - 1] + 1;

  // 2로 나누어짐
  if (i % 2 === 0) {
    d[i] = Math.min(d[i], d[i / 2] + 1);
  }

  // 3으로 나누어짐
  if (i % 3 === 0) {
    d[i] = Math.min(d[i], d[i / 3] + 1);
  }

  // 5로 나누어짐
  if (i % 5 === 0) {
    Math.min(d[i], d[i / 5] + 1);
  }

  console.log(d);
}

console.log(d[x]);
console.timeEnd("1로 만들기");

// 개미 전사
const foods = [1, 3, 1, 5];
const d2 = Array(foods.length).fill(0);
console.time("개미 전사");
d2[0] = foods[0];
d2[1] = Math.max(foods[0], foods[1]);

for (let i = 2; i < foods.length; i++) {
  d2[i] = Math.max(d2[i - 1], d2[i - 2] + foods[i]);
}

console.log(d2[foods.length - 1]);
console.timeEnd("개미 전사");
