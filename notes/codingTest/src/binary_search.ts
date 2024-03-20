const _arr = [1, 3, 5, 6, 9, 11, 13, 15, 17, 19];

function binarySearchRecur(
  array: number[],
  target: number,
  start: number,
  end: number
) {
  if (start > end) return -1;
  const mid = Math.floor((start + end) / 2);

  if (target === array[mid]) return mid;

  if (target < array[mid]) {
    return binarySearchRecur(array, target, start, mid - 1);
  } else {
    return binarySearchRecur(array, target, mid + 1, end);
  }
}

console.time("binarySearchRecur");
console.log(binarySearchRecur(_arr, 6, 0, _arr.length - 1));
console.timeEnd("binarySearchRecur");

function binarySearchLoop(
  array: number[],
  target: number,
  start: number,
  end: number
) {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (target === array[mid]) return mid;

    if (array[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}

console.time("binarySearchLoop");
console.log(binarySearchLoop(_arr, 6, 0, _arr.length - 1));
console.timeEnd("binarySearchLoop");

// 부품 찾기
const _n = [8, 3, 7, 11, 13, 14, 16, 18, 20, 9, 2, 6, 4, 19];
const _m = [5, 7, 9, 17];

function findParts(n: number[], m: number[]) {
  let result = "";
  n.sort((a, b) => a - b);

  for (let i = 0; i < m.length; i++) {
    if (i > 0) result += " ";
    if (_binary(n, m[i], 0, n.length - 1) > 0) {
      result += "yes";
    } else {
      result += "no";
    }
  }

  return result;
}

function _binary(array: number[], target: number, start: number, end: number) {
  if (start > end) return -1;

  const mid = Math.floor((start + end) / 2);
  if (target === array[mid]) return mid;

  if (target < array[mid]) {
    return _binary(array, target, start, mid - 1);
  } else {
    return _binary(array, target, mid + 1, end);
  }
}

console.time("findParts");
console.log(findParts(_n, _m));
console.timeEnd("findParts");

// 떡볶이 떡 만들기
const _cakes = [19, 15, 10, 17];
const _target = 6;

const _longCakes = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 1000000)
);
const _longTarget = 34920;

function makeCake(cakes: number[], target: number) {
  cakes.sort((a, b) => b - a);
  let height = cakes[0];
  while (height > 0) {
    let cuts = 0;
    for (let i = 0; i < cakes.length; i++) {
      const cut = cakes[i] - height;
      if (cut > 0) {
        cuts += cut;
      } else break;
    }

    if (cuts >= target) {
      return height;
    } else {
      height--;
    }
  }
  return -1;
}

console.time("makeCake");
console.log(makeCake(_longCakes, _longTarget));
console.timeEnd("makeCake");

function makeCakeBinary(cakes: number[], target: number) {
  let result = 0;
  let start = 0;
  let end = Math.max(...cakes);

  while (start <= end) {
    let cuts = 0;
    const mid = Math.floor((start + end) / 2);

    for (let i = 0; i < cakes.length; i++) {
      const cut = cakes[i] - mid;
      if (cut > 0) {
        cuts += cut;
      }
    }

    if (cuts < target) {
      end = mid - 1;
    } else {
      result = mid;
      start = mid + 1;
    }
  }

  return result;
}

console.time("makeCakeBinary");
console.log(makeCakeBinary(_longCakes, _longTarget));
console.timeEnd("makeCakeBinary");
