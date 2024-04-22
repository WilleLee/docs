// name: 네트워크, algorithm: graph(find-union), url: https://school.programmers.co.kr/learn/courses/30/lessons/43162

/*
컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.
*/

function solution(n: number, computers: number[][]) {
  const set = new Set<number>();
  const rootTable: number[] = Array(n)
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

  for (let i = 0; i < computers.length - 1; i++) {
    for (let j = i + 1; j < computers.length; j++) {
      if (computers[i][j] === 1) {
        union(rootTable, i, j);
      }
    }
  }

  // set 결과를 도출하기 전에 findRoot를 한번 더 돌려서 rootTable을 최신화 시켜준다!
  for (let i = 0; i < rootTable.length; i++) {
    findRoot(rootTable, i);
  }
  for (let i = 0; i < rootTable.length; i++) {
    set.add(rootTable[i]);
  }

  return set.size;
}

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ])
);
