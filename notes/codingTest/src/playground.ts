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

const visited: boolean[] = Array(graph.length).fill(false);

function dfs_(g: number[][], i: number, v: boolean[]) {
  v[i] = true;
  console.log(i, "방문");

  for (let j = 0; j < g[i].length; j++) {
    if (!v[g[i][j]]) {
      dfs_(g, g[i][j], v);
    }
  }
}

dfs_(graph, 1, visited);

const visited2: boolean[] = Array(graph.length).fill(false);

function bfs_(g: number[][], i: number, v: boolean[]) {
  const queue: number[] = [];
  queue.push(i);
  // v[i] = true;
  // console.log(i, "방문");

  while (queue) {
    const x = queue.shift() as number;

    if (!v[x]) {
      v[x] = true;
      console.log(x, "방문");
      for (let j = 0; j < g[x].length; j++) {
        queue.push(g[x][j]);
      }
    }
  }
}

bfs_(graph, 1, visited2);
