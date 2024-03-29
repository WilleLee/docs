console.log("DFS/BFS");

const exGraph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];

const dfsExVisited: boolean[] = Array(exGraph.length).fill(false);

// console.log("exGraph", exGraph);
// console.log("dfsExVisited", dfsExVisited);

function dfs(graph: number[][], v: number, visited: boolean[]) {
  visited[v] = true; // 현재 노드 방문 처리
  console.log(v, "방문");

  for (let i = 0; i < graph[v].length; i++) {
    if (!visited[graph[v][i]]) {
      dfs(graph, graph[v][i], visited);
    }
  }
}

// dfs(exGraph, 1, dfsExVisited);

const bfsExVisited: boolean[] = Array(exGraph.length).fill(false);

function bfs(graph: number[][], start: number, visited: boolean[]) {
  const queue: number[] = [start];

  visited[start] = true;

  while (queue.length > 0) {
    const v = queue.shift() as number; // 큐에서 하나의 원소를 뽑아 출력
    console.log(v, "방문");

    for (let i = 0; i < graph[v].length; i++) {
      const elem = graph[v][i];
      if (!visited[elem]) {
        queue.push(elem);
        visited[elem] = true;
      }
    }
  }
}

// bfs(exGraph, 1, bfsExVisited);

// 음료수 얼려 먹기

const iceGraph = [
  [0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
];

function makeIcecreams(graph: number[][]) {
  function dfsIce(x: number, y: number) {
    if (x <= -1 || x >= graph.length || y <= -1 || y >= graph[0].length) {
      return false;
    }

    if (graph[x][y] === 0) {
      graph[x][y] = 1;
      dfsIce(x - 1, y);
      dfsIce(x + 1, y);
      dfsIce(x, y - 1);
      dfsIce(x, y + 1);
      return true;
    }

    return false;
  }

  let result = 0;

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      if (dfsIce(i, j)) {
        result += 1;
      }
    }
  }

  return result;
}

console.log(makeIcecreams(iceGraph));

// 미로 탈출

const mazeGraph = [
  [1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];
const mazeGraph2 = [
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];

function escapeMaze(graph: number[][]) {
  const queue: [number, number][] = [[0, 0]];

  while (queue.length > 0) {
    const [x, y] = queue.shift() as [number, number];

    const trials = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];
    for (let i = 0; i < trials.length; i++) {
      const [nx, ny] = trials[i];
      if (nx < 0 || ny < 0 || nx >= graph.length || ny >= graph[0].length) {
        continue;
      }
      if (graph[nx][ny] === 0) {
        continue;
      }
      if (graph[nx][ny] === 1) {
        graph[nx][ny] += graph[x][y];
        queue.push([nx, ny]);
      }
    }
  }

  return graph[graph.length - 1][graph[0].length - 1];
}

console.log(escapeMaze(mazeGraph));
console.log(escapeMaze(mazeGraph2));

// 백준 1260 DFS와 BFS

const adjList = [
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 4],
  [3, 4],
];

function dfsBfs(n: number, list: number[][], v: number) {
  // n = 정점의 개수
  // v = 시작 정점
  const dfs: number[] = [];
  const bfs: number[] = [];

  // [ [], [3, 4], [4], [1, 4], [1, 2, 3]  ]
  const newArray: number[][] = Array(n + 1).fill([]);
  console.log(newArray);
  for (let i = 0; i < list.length; i++) {
    const [a, b] = list[i];
    newArray[a] = [...newArray[a], b];
    newArray[b] = [...newArray[b], a];
  }
  console.log(newArray);

  const dfsVisited = Array(n + 1).fill(false);

  function _dfs(start: number) {
    dfsVisited[start] = true;
    dfs.push(start);
    console.log(`dfs ${start} 방문`);

    for (let i = 0; i < newArray[start].length; i++) {
      if (!dfsVisited[newArray[start][i]]) {
        _dfs(newArray[start][i]);
      }
    }
  }

  _dfs(v);

  const bfsVisited = Array(n + 1).fill(false);

  function _bfs(start: number) {
    const queue: number[] = [start];

    bfsVisited[start] = true;

    while (queue.length > 0) {
      const a = queue.shift() as number;
      bfs.push(a);
      console.log(`bfs ${a} 방문`);

      for (let i = 0; i < newArray[a].length; i++) {
        if (!bfsVisited[newArray[a][i]]) {
          queue.push(newArray[a][i]);
          bfsVisited[newArray[a][i]] = true;
        }
      }
    }
  }

  _bfs(v);

  return `${dfs.join(" ")}\n${bfs.join(" ")}`;
}

console.log(dfsBfs(4, adjList, 1));
