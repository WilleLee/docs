const graph: number[][] = [
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

// dfs는 스택, bfs는 큐

// dfs

const visitedDfs = Array(graph.length).fill(false);

function dfs_(g: number[][], v: number, visited: boolean[]) {
  visited[v] = true;
  console.log(v, "방문!");

  for (let i = 0; i < g[v].length; i++) {
    if (!visited[g[v][i]]) {
      dfs_(g, g[v][i], visited);
    }
  }
}

dfs_(graph, 1, visitedDfs);

// bfs

const visitedBfs = Array(graph.length).fill(false);

function bfs_(g: number[][], v: number, visited: boolean[]) {
  const queue: number[] = [v];
  visited[v] = true;

  while (queue.length > 0) {
    const index = queue.shift() as number;
    console.log(index, "방문!");

    for (let i = 0; i < g[index].length; i++) {
      if (!visited[g[index][i]]) {
        queue.push(g[index][i]);
        visited[g[index][i]] = true;
      }
    }
  }
}

bfs_(graph, 1, visitedBfs);
