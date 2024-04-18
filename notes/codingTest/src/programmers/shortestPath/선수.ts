// name: 선수, algorithm: floyd-warshall, url: https://school.programmers.co.kr/learn/courses/30/lessons/49191

function solution(n: number, results: [number, number][]) {
  // n명의 선수
  // results: [a, b][], a가 b를 이김
  // 정확하게 수누이를 매길 수 있는 선수 수 return

  // 기록된 경기 결과에 바탕하여 플로이드-워셜 알고리듬을 통해 다른 선수 간 승패를 유추할 수 있다.

  const points = Array(n + 1)
    .fill([])
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i < results.length; i++) {
    const [a, b] = results[i];
    points[a][b] = 1;
    points[b][a] = -1;
  }

  for (let k = 1; k <= n; k++) {
    for (let a = 1; a <= n; a++) {
      for (let b = 1; b <= n; b++) {
        if (points[a][b] === 0) {
          if (points[a][k] === 1 && points[k][b] === 1) {
            points[a][b] = 1;
          } else if (points[a][k] === -1 && points[k][b] === -1) {
            points[a][b] = -1;
          }
        }
      }
    }
  }

  let counts = 0;
  for (let i = 1; i < points.length; i++) {
    let matches = 0;
    for (let j = 1; j < points[i].length; j++) {
      if (points[i][j] !== 0) {
        matches++;
      }
    }
    if (matches === n - 1) {
      counts++;
    }
  }
  return counts;
}

console.log(
  solution(5, [
    [4, 3],
    [4, 2],
    [3, 2],
    [1, 2],
    [2, 5],
  ])
);
