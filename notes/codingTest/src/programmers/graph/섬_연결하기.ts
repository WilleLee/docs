// name: 섬 연결하기, algorithm: Kruskal's algorithm, url: https://school.programmers.co.kr/learn/courses/30/lessons/42861

/*
n개의 섬 사이에 다리를 건설하는 비용(costs)이 주어질 때, 최소의 비용으로 모든 섬이 서로 통행 가능하도록 만들 때 필요한 최소 비용을 return 하도록 solution을 완성하세요.
*/

function solution(n: number, costs: [number, number, number][]) {
  let totalCost = 0;

  const parentTable = Array.from({
    length: n + 1,
  })
    .fill(0)
    .map((_, index) => index);

  function findRoot(parent: number[], x: number) {
    if (parent[x] !== x) {
      parent[x] = findRoot(parent, parent[x]);
    }
    return parent[x];
  }

  function union(parent: number[], a: number, b: number) {
    const rootA = findRoot(parent, a);
    const rootB = findRoot(parent, b);
    if (rootA < rootB) {
      parent[rootB] = rootA;
    } else {
      parent[rootA] = rootB;
    }
  }

  costs.sort((a, b) => a[2] - b[2]);

  for (let i = 0; i < costs.length; i++) {
    const [a, b, cost] = costs[i];
    if (findRoot(parentTable, a) !== findRoot(parentTable, b)) {
      totalCost += cost;
      union(parentTable, a, b);
    }
  }

  return totalCost;
}

const N = 4;
const C: [number, number, number][] = [
  [0, 1, 1],
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8],
];

console.log(solution(N, C)); // 4
