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

// 모험가 길드
const adventureList = [2, 3, 1, 2, 2];

// O(nlogn)
function adventureGuild(list: number[]) {
  console.time("adventureGuild");
  list.sort((a, b) => a - b); // [1, 2, 2, 2, 3]
  let count = 0;
  let group = 0;

  for (let i = 0; i < list.length; i++) {
    count++;
    if (count >= list[i]) {
      group++;
      count = 0;
    }
  }
  console.timeEnd("adventureGuild");
  return group;
}

console.log(adventureGuild(adventureList));

// 곱하기 혹은 더하기
const numStr = "02984";
const numStr2 = "567";

// 0이나 1이 아니면 곱하면 되지 않나?
// O(n)
function multiplyOrAdd(str: string) {
  console.time("multiplyOrAdd");
  let result = Number(str[0]);
  if (str.length === 1) return result;
  for (let i = 1; i < str.length; i++) {
    const num = Number(str[i]);
    if (result <= 1 || num <= 1) {
      result += num;
    } else {
      result *= num;
    }
  }
  console.timeEnd("multiplyOrAdd");
  return result;
}

console.log(multiplyOrAdd(numStr));
console.log(multiplyOrAdd(numStr2));

// 문자열 뒤집기
const reverseStr = "11001100110011000001";

// bad performance!!
function reverseString(str: string) {
  console.time("reverseString");
  const replaced = str.replace(/0+/g, "0").replace(/1+/g, "1");
  const zeroCount = replaced.replace(/1/g, "").length;
  const oneCount = replaced.length - zeroCount;
  console.timeEnd("reverseString");
  return Math.min(zeroCount, oneCount);
}

console.log(reverseString(reverseStr));

// O(n)
function reverseString2(str: string) {
  console.time("reverseString2");
  if (str.length === 1) return 0;
  let current = str[0];
  let zeroCount = 0;
  let oneCount = 0;
  if (current === "0") zeroCount++;
  else oneCount++;
  for (let i = 1; i < str.length; i++) {
    if (current === str[i]) continue;
    current = str[i];
    if (current === "0") zeroCount++;
    else oneCount++;
  }
  const min = Math.min(zeroCount, oneCount);
  console.timeEnd("reverseString2");
  return min;
}

console.log(reverseString2(reverseStr));

// 만들 수 없는 금액
const coins = [3, 2, 1, 1, 9];

// O(nlogn)
function impossibleAmount(list: number[]) {
  console.time("impossibleAmount");
  let result = 1;
  list.sort((a, b) => a - b);
  for (let i = 0; i < list.length; i++) {
    if (result < list[i]) break;
    result += list[i];
  }
  console.timeEnd("impossibleAmount");
  return result;
}

console.log(impossibleAmount(coins));

// 볼링공 고르기
// n = 공의 개수, m = 공의 최대 무게
// 서로 다른 무게의 공을 고를 거임
// [1,3,2,3,2], 3
const balls = [1, 3, 2, 3, 2];
const maxWeight = 3;

const balls2 = [1, 5, 4, 3, 2, 4, 5, 2];
const maxWeight2 = 5;

// O(n^2)
function selectBalls(list: number[], m: number) {
  let count = 0;

  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (list[i] !== list[j]) count++;
    }
  }

  return count;
}

console.log(selectBalls(balls, maxWeight));
console.log(selectBalls(balls2, maxWeight2));

// 무지의 먹방 라이브
// 효율성 테스트 실패, O(n)
function muzi(food_times: number[], k: number) {
  if (k < food_times.length) {
    return k + 1;
  }

  const maxTime = food_times.reduce((prev, curr) => prev + curr, 0);
  if (maxTime <= k) return -1;

  const map = new Map();
  for (let i = 0; i < food_times.length; i++) {
    map.set(i, food_times[i]);
  }

  while (true) {
    k = k - map.size;
    map.forEach((value, key) => {
      if (value <= 1) {
        map.delete(key);
      } else {
        map.set(key, value - 1);
      }
    });
    if (map.size === k) {
      k = 0;
      map.forEach((value, key) => {
        if (value <= 1) {
          map.delete(key);
        } else {
          map.set(key, value - 1);
        }
      });
      break;
    }
    if (map.size > k) {
      break;
    }
  }

  // console.log("k", k, "map", map);
  // if(map.size >= k) return -1;
  const mapKeys: number[] = [];
  map.forEach((value, key) => {
    mapKeys.push(key + 1);
  });
  return mapKeys[k];
}
