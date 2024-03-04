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
