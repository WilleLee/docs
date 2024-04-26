const INF = Infinity;
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
