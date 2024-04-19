const V = 6; // 노드의 개수
const unions: [number, number][] = [
  [1, 4],
  [2, 3],
  [2, 4],
  [5, 6],
];

const parentTable = Array.from({ length: V + 1 })
  .fill(0)
  .map((_, index) => index);

function findRoot(parent: number[], node: number) {
  if (parent[node] !== node) {
    return findRoot(parent, parent[node]);
  }
  return node;
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

const compressedParentTable = Array.from({ length: V + 1 })
  .fill(0)
  .map((_, index) => index);

function compressedFindRoot(parent: number[], node: number) {
  if (parent[node] !== node) {
    parent[node] = compressedFindRoot(parent, parent[node]);
  }
  return parent[node];
}

function compressedUnion(parent: number[], a: number, b: number) {
  const rootA = compressedFindRoot(parent, a);
  const rootB = compressedFindRoot(parent, b);
  if (rootA < rootB) {
    parent[rootB] = rootA;
  } else {
    parent[rootA] = rootB;
  }
}

console.time("union");
for (let i = 0; i < unions.length; i++) {
  const [a, b] = unions[i];
  union(parentTable, a, b);
}

console.log("parentTable", parentTable);
const roots = Array.from({ length: V + 1 }).map(() => 0);
for (let i = 1; i <= V; i++) {
  roots[i] = findRoot(parentTable, i);
}
console.log("roots", roots);
console.timeEnd("union");

console.time("compressedUnion");
for (let i = 0; i < unions.length; i++) {
  const [a, b] = unions[i];
  compressedUnion(compressedParentTable, a, b);
}
console.log("compressedParentTable", compressedParentTable);
const compressedRoots = Array.from({ length: V + 1 }).map(() => 0);
for (let i = 1; i <= V; i++) {
  compressedRoots[i] = compressedFindRoot(compressedParentTable, i);
}
console.log("compressedRoots", compressedRoots);
console.timeEnd("compressedUnion");
