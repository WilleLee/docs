// name: 게임 맵 최단거리, algorithm: bfs, url: https://school.programmers.co.kr/learn/courses/30/lessons/1844

type Map = 0 | 1;
type Location = [number, number];

// bfs를 이용해 특정 노드까지의 최단거리를 계산할 수 있었다.

function solution(maps: Map[][]) {
  const [n, m] = [maps[0].length - 1, maps.length - 1];
  const visited: boolean[][] = Array(maps.length)
    .fill([])
    .map(() => Array(maps[0].length).fill(false));

  return bfs(maps, visited, [0, 0], [n, m]);
}

function bfs(
  maps: Map[][],
  visited: boolean[][],
  [x, y]: Location,
  [n, m]: Location
) {
  let count = -1;
  const queue: [number, number, number][] = [[x, y, 1]];
  visited[y][x] = true;

  while (queue.length > 0) {
    const [_x, _y, _z] = queue.shift() as [number, number, number];
    if (_x === n && _y === m) {
      count = _z;
      break;
    }
    if (_x - 1 >= 0) {
      if (!visited[_y][_x - 1] && maps[_y][_x - 1] === 1) {
        visited[_y][_x - 1] = true;
        queue.push([_x - 1, _y, _z + 1]);
      }
    }
    if (_x + 1 <= n) {
      if (!visited[_y][_x + 1] && maps[_y][_x + 1] === 1) {
        visited[_y][_x + 1] = true;
        queue.push([_x + 1, _y, _z + 1]);
      }
    }
    if (_y - 1 >= 0) {
      if (!visited[_y - 1][_x] && maps[_y - 1][_x] === 1) {
        visited[_y - 1][_x] = true;
        queue.push([_x, _y - 1, _z + 1]);
      }
    }
    if (_y + 1 <= m) {
      if (!visited[_y + 1][_x] && maps[_y + 1][_x] === 1) {
        visited[_y + 1][_x] = true;
        queue.push([_x, _y + 1, _z + 1]);
      }
    }
  }
  return count;
}
console.time("1");
console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ])
);
console.timeEnd("1");
console.time("2");
console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
  ])
);
console.timeEnd("2");
