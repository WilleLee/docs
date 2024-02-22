// 거스름돈
const changes = [500, 100, 50, 10];

// n은 항상 10의 배수
function change(n) {
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

/**
 * 큰 수의 법칙 (나의 풀이)
 * @param {number[]} list 숫자들의 리스트
 * @param {number} m 숫자가 더해지는 횟수
 * @param {number} k 연속해서 더할 수 있는 횟수
 * @return {number} 큰 수의 법칙에 따라 더해진 답
 */
function bigNumLaw(list, m, k) {
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

/**
 * 큰 수의 법칙 (성능을 고려한 풀이)
 * @param {number[]} list 숫자들의 리스트
 * @param {number} m 숫자가 더해지는 횟수
 * @param {number} k 연속해서 더할 수 있는 횟수
 * @return {number} 큰 수의 법칙에 따라 더해진 답
 */
function bigNumLaw2(list, m, k) {
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

/**
 * 숫자 카드 게임 (나의 풀이)
 * @param {number[][]} list 숫자들의 리스트
 */
function cardGame(list) {
  console.time("cardGame");
  const minList = list.map((arr) => Math.min(...arr));
  console.timeEnd("cardGame");
  return Math.max(...minList);
}

console.log("card game", cardGame(cardGameList));
console.log("card game2", cardGame(cardGameList2));
