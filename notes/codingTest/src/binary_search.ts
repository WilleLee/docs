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
