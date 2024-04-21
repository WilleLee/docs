console.log("hello");

// 팀 결성

// 학생들 0 ~ N까지 번호 부여
// 처음엔 서로가 각각 팀 (N + 1개의 팀)
// 선생님 : 팀 합치기 연산, 같은 팀 여부 확인 연산 사용 가능

// 팀 합치기 : [0, a, b]
// 팀 여부 확인 : [1, a, b] => YES or NO 출력

const N = 7;
const inputs: [0 | 1, number, number][] = [
  [0, 1, 3],
  [1, 1, 7],
  [0, 7, 6],
  [1, 7, 1],
  [0, 3, 7],
  [0, 4, 2],
  [0, 1, 1],
  [1, 1, 1],
];

const parentTable: number[] = Array(N)
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

for (let i = 0; i < inputs.length; i++) {
  const [command, a, b] = inputs[i];
  if (command === 0) {
    // 합치기
    union(parentTable, a, b);
  } else {
    // 같은 팀 여부 확인
    if (findRoot(parentTable, a) === findRoot(parentTable, b)) {
      console.log("YES");
    } else {
      console.log("NO");
    }
  }
}

// 도시 분할 계획

// 마을 도로 공사
// N개의 집, M개의 길, 양방향
// 2개의 분리된 마을로 분할
// 분할된 마을 내에서는 임의의 두 집 사이 경로가 항상 존재해야 함
// [a, b, cost] 집 - 집 - 비용

const H = 7;

const costInputs: [number, number, number][] = [
  [1, 2, 3],
  [1, 3, 2],
  [3, 2, 1],
  [2, 5, 2],
  [3, 4, 4],
  [7, 3, 6],
  [5, 1, 5],
  [1, 6, 2],
  [6, 4, 1],
  [6, 5, 3],
  [4, 5, 3],
  [6, 7, 4],
];

const houseParent: number[] = Array(H + 1)
  .fill(0)
  .map((_, index) => index);

function findRootHouse(parent: number[], x: number) {
  if (parent[x] !== x) {
    parent[x] = findRootHouse(parent, parent[x]);
  }
  return parent[x];
}

function unionHouse(parent: number[], a: number, b: number) {
  const rootA = findRootHouse(parent, a);
  const rootB = findRootHouse(parent, b);
  if (rootA < rootB) {
    parent[rootB] = rootA;
  } else {
    parent[rootA] = rootB;
  }
}

costInputs.sort((a, b) => a[2] - b[2]);

let totalCost = 0;
let last = 0;

console.log("cost inputs", costInputs);

for (let i = 0; i < costInputs.length; i++) {
  const [a, b, cost] = costInputs[i];
  if (findRootHouse(houseParent, a) !== findRootHouse(houseParent, b)) {
    unionHouse(houseParent, a, b);
    totalCost += cost;
    last = cost;
  }
}

console.log(totalCost - last);

// 커리큘럼

// N개의 강의, 모든 강의는 1~N의 번호 가짐
// [수강시간, ...선수과목번호들]
// N개의 강의 각각에 대해서 수강하기까지 걸리는 최소 시간 출력

const L = 5;

const lectureInputs: number[][] = [[10], [10, 1], [4, 1], [4, 3, 1], [3, 3]];

const lectureIndegree: number[] = Array(L + 1).fill(0);

const lectureGraph: number[][] = Array(L + 1).fill([]);

const lectureTimes: number[] = Array(L + 1).fill(0);

for (let i = 0; i < lectureInputs.length; i++) {
  const [time, ...preLecs] = lectureInputs[i];
  lectureTimes[i + 1] = time;
  for (let j = 0; j < preLecs.length; j++) {
    lectureIndegree[i + 1] += 1;
    lectureGraph[preLecs[j]] = [...lectureGraph[preLecs[j]], i + 1];
  }
}

function topo() {
  const result = [...lectureTimes];
  const queue: number[] = [];

  for (let i = 1; i <= L; i++) {
    if (lectureIndegree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length > 0) {
    const now = queue.shift() as number;

    for (let i = 0; i < lectureGraph[now].length; i++) {
      const target = lectureGraph[now][i];

      result[target] = Math.max(
        result[target],
        result[now] + lectureTimes[target]
      );
      lectureIndegree[target] -= 1;

      if (lectureIndegree[target] === 0) {
        queue.push(target);
      }
    }
  }

  for (let i = 1; i <= L; i++) {
    console.log(result[i]);
  }
}

topo();
