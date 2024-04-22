// name: 피로도, algorithm: exhaustive search, recursive function, url: https://school.programmers.co.kr/learn/courses/30/lessons/87946

function solution(k: number, dungeons: [number, number][]) {
  // k: 현재 피로도
  // dungeons: [최소필요피로도, 소모피로도][]
  // return 탐험 가능한 최대 던전 수
  const results: number[] = [];
  const N = dungeons.length;
  const visited: boolean[] = Array(N).fill(false);

  recurr(visited, dungeons, k, 0, 0, results);

  return Math.max(...results);
}

function recurr(
  visited: boolean[],
  dungeons: [number, number][],
  k: number,
  turnCount: number,
  clearCount: number,
  results: number[]
) {
  if (turnCount === dungeons.length) {
    results.push(clearCount);
    return;
  }
  for (let i = 0; i < dungeons.length; i++) {
    if (!visited[i]) {
      const visits = [...visited]; // 매 for문마다 visited를 deep copy해줘야 함!
      visits[i] = true;
      const [min, req] = dungeons[i];
      if (k >= min) {
        recurr(
          visits,
          dungeons,
          k - req,
          turnCount + 1,
          clearCount + 1,
          results
        );
      } else {
        recurr(visits, dungeons, k, turnCount + 1, clearCount, results);
      }
    }
  }
}

console.log(
  solution(80, [
    [80, 20],
    [50, 40],
    [30, 10],
  ])
);
