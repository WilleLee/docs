// 거스름돈
const changes = [500, 100, 50, 10];

// n은 항상 10의 배수
function change(n: number) {
  let count = 0;
  for (let i = 0; i < changes.length; i++) {
    count += Math.floor(n / changes[i]);
    n %= changes[i];
  }
  return count;
}

console.log("change count for 1260", change(1260)); // 6

/*
그리디 알고리즘으로 문제의 해법을 찾았을 때는 그 해법이 정당한지 검토해야 한다.
거스름돈 문제를 그리디 알고리즘으로 해결할 수 있는 이유는 가지고 있는 동전 중에서 큰 단위가 항상 작은 단위의 배수이므로
작은 단위의 동전들을 종합해 다른 해가 나올 수 없기 때문이다.
*/

// 큰 수의 법칙
const bigNumList = [2, 4, 5, 4, 6];

function bigNumLaw(list: number[], m: number, k: number) {
  console.time("bigNumLaw");
  const [first, second] = list.sort((a, b) => b - a);
  let sum = 0;
  let count = 0;

  while (count < m) {
    count++;
    if (count % (k + 1) === 0) {
      sum += second;
    } else {
      sum += first;
    }
  }

  console.timeEnd("bigNumLaw");
  return sum;
}

console.log("big num law", bigNumLaw(bigNumList, 8, 3));

function bigNumLaw2(list: number[], m: number, k: number) {
  console.time("bigNumLaw2");
  const [first, second] = list.sort((a, b) => b - a);
  let sum = 0;
  let firstCount = Math.floor(m / (k + 1)) + (m % (k + 1));
  let secondCount = m - firstCount;

  sum += first * firstCount;
  sum += second * secondCount;
  console.timeEnd("bigNumLaw2");
  return sum;
}

console.log("big num law2", bigNumLaw2(bigNumList, 8, 3));

// 숫자 카드 게임
const cardGameList = [
  [3, 1, 2],
  [4, 1, 4],
  [2, 2, 2],
];
const cardGameList2 = [
  [7, 3, 1, 8],
  [3, 3, 3, 4],
];

function cardGame(list: number[][]) {
  console.time("cardGame");
  const minList = list.map((arr) => Math.min(...arr));
  console.timeEnd("cardGame");
  return Math.max(...minList);
}

console.log("card game", cardGame(cardGameList));
console.log("card game2", cardGame(cardGameList2));

// 1이 될 때까지

function untilOne(n: number, k: number) {
  console.time("untilOne");
  let count = 0;
  while (n > 1) {
    if (n % k === 0) {
      n /= k;
    } else {
      n -= 1;
    }
    count++;
  }
  console.timeEnd("untilOne");
  return count;
}

console.log("until one", untilOne(25, 5));
