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

// 1로 만들기
const _t = 26;

console.time("makeOneMemo");
const makeOneMemo: number[] = Array(30000 + 1).fill(0);

for (let i = 2; i <= _t + 1; i++) {
  makeOneMemo[i] = makeOneMemo[i - 1] + 1;

  if (i % 2 === 0) {
    makeOneMemo[i] = Math.min(makeOneMemo[i], makeOneMemo[i / 2] + 1);
  }

  if (i % 3 === 0) {
    makeOneMemo[i] = Math.min(makeOneMemo[i], makeOneMemo[i / 3] + 1);
  }

  if (i % 5 === 0) {
    makeOneMemo[i] = Math.min(makeOneMemo[i], makeOneMemo[i / 5] + 1);
  }
}
console.log(makeOneMemo[_t]);
console.timeEnd("makeOneMemo");
