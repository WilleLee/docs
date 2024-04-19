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
console.log("roots", roots.slice(1));
console.timeEnd("union");

console.time("compressedUnion");
for (let i = 0; i < unions.length; i++) {
  const [a, b] = unions[i];
  compressedUnion(compressedParentTable, a, b);
}
const cRoots: number[] = [];
for (let i = 1; i <= V; i++) {
  cRoots.push(compressedFindRoot(compressedParentTable, i));
}
console.log("cRoots", cRoots);
console.timeEnd("compressedUnion");

const cycleV = 3; // 노드의 개수
const cycleEdges: [number, number][] = [
  [1, 2],
  [1, 3],
  [2, 3],
];

const cycleParentTable = Array.from({
  length: cycleV + 1,
})
  .fill(0)
  .map((_, index) => index);

function findCycleRoot(parent: number[], x: number) {
  if (parent[x] !== x) {
    parent[x] = findCycleRoot(parent, parent[x]);
  }
  return parent[x];
}

function cycleUnion(parent: number[], a: number, b: number) {
  const rootA = findCycleRoot(parent, a);
  const rootB = findCycleRoot(parent, b);
  if (rootA < rootB) {
    parent[rootB] = rootA;
  } else {
    parent[rootA] = rootB;
  }
}

let isCycle = false;

for (let i = 0; i < cycleEdges.length; i++) {
  const [a, b] = cycleEdges[i];
  if (
    findCycleRoot(cycleParentTable, a) === findCycleRoot(cycleParentTable, b)
  ) {
    isCycle = true;
    break;
  } else {
    cycleUnion(cycleParentTable, a, b);
  }
}

console.log("cycleParentTable", cycleParentTable);

if (isCycle) {
  console.log("사이클이 발생했습니다.");
} else {
  console.log("사이클이 발생하지 않았습니다.");
}
