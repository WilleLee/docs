const INF = Infinity;

const S = 6;
const inputs: [number, number][] = [
  [1, 5],
  [3, 4],
  [4, 2],
  [4, 6],
  [5, 2],
  [5, 4],
];

const graph: number[][] = Array(S + 1)
  .fill([])
  .map(() => Array(S + 1).fill(INF));

for (let a = 1; a <= S; a++) {
  for (let b = 1; b <= S; b++) {
    if (a === b) {
      graph[a][b] = 0;
    }
  }
}

inputs.forEach((input) => {
  const [a, b] = input;
  graph[a][b] = -1;
  graph[b][a] = 1;
});

for (let k = 1; k <= S; k++) {
  for (let a = 1; a <= S; a++) {
    for (let b = 1; b <= S; b++) {
      const ak = graph[a][k];
      const kb = graph[k][b];
      if (ak === 1 && kb === 1) {
        graph[a][b] = 1;
        graph[b][a] = -1;
      }
      if (ak === -1 && kb === -1) {
        graph[a][b] = -1;
        graph[b][a] = 1;
      }
    }
  }
}

let answer = 0;

for (let a = 1; a <= S; a++) {
  let definedCount = 0;
  for (let b = 1; b <= S; b++) {
    if (graph[a][b] !== INF) {
      definedCount++;
    }
  }
  if (definedCount === S) {
    answer++;
  }
}

console.log("answer", answer);
