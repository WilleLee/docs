// selection sort

const arr1 = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];
console.time("selection sort");
for (let i = 0; i < arr1.length; i++) {
  let minIndex = i;
  for (let j = i + 1; j < arr1.length; j++) {
    if (arr1[minIndex] > arr1[j]) {
      minIndex = j;
    }
  }
  const min = arr1[minIndex];
  arr1[minIndex] = arr1[i];
  arr1[i] = min;
}
console.timeEnd("selection sort");

console.log(arr1);

// insertion sort

const arr2 = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];

console.time("insertion sort");
for (let i = 1; i < arr2.length; i++) {
  for (let j = i; j > 0; j--) {
    if (arr2[j] < arr2[j - 1]) {
      // 앞으로 이동
      const temp = arr2[j];
      arr2[j] = arr2[j - 1];
      arr2[j - 1] = temp;
    } else {
      break; // 다음 i로 넘어감
    }
  }
}
console.timeEnd("insertion sort");

console.log(arr2); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// quick sort

const arr3 = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8];

function quickSort(array: number[], start: number, end: number) {
  if (start >= end) return;
  const pivot = start;
  let left = start + 1;
  let right = end;
  while (left <= right) {
    while (left <= end && array[left] <= array[pivot]) {
      left++;
    }
    while (right > start && array[right] >= array[pivot]) {
      right--;
    }
    if (left > right) {
      const min = array[right];
      array[right] = array[pivot];
      array[pivot] = min;
    } else {
      const min = array[right];
      array[right] = array[left];
      array[left] = min;
    }
  }
  quickSort(array, start, right - 1);
  quickSort(array, right + 1, end);
}
console.time("quick sort");
quickSort(arr3, 0, arr3.length - 1);
console.timeEnd("quick sort");
console.log(arr3);
// count sort

const arr4 = [7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2];
console.time("count sort");
const max = Math.max(...arr4);
const counts = Array(max + 1).fill(0);
const countResult = [];

for (let i = 0; i < arr4.length; i++) {
  counts[arr4[i]]++;
}

for (let i = 0; i < counts.length; i++) {
  if (counts[i] > 0) {
    for (let j = 0; j < counts[i]; j++) {
      countResult.push(i);
    }
  }
}
console.timeEnd("count sort");
console.log(countResult);

// 위에서 아래로

function topToBottom(arr: number[]) {
  return arr.sort((a, b) => b - a);
}
console.log(topToBottom([15, 27, 12]));

// 성적이 낮은 순서로 학생 출력하기

const studentsEx = [
  "홍길동 95",
  "이순신 77",
  "김유신 65",
  "강감찬 87",
  "척준경 100",
];

function lowToHighStudents(arr: string[]) {
  let result = "";
  const sorted = arr.sort((a, b) => {
    const _a = a.split(" ")[1];
    const _b = b.split(" ")[1];
    return Number(_a) - Number(_b);
  });
  for (let i = 0; i < sorted.length; i++) {
    if (i !== 0) result += " ";
    result += sorted[i].split(" ")[0];
  }
  return result;
}

console.log(lowToHighStudents(studentsEx));

// 두 배열의 원소 교체
const _a = [1, 2, 5, 4, 3];
const _b = [5, 5, 6, 6, 5];
const _k = 3;

// 최대 k번 바꿔치기 가능
// a의 원소의 합이 최대가 되도록
function changeElems(a: number[], b: number[], k: number) {
  console.log("change elems");
  let count = 0;

  // a는 오름차순, b는 내림차순
  a.sort((a, b) => a - b);
  b.sort((a, b) => b - a);
  console.log("a", a);
  console.log("b", b);

  for (let i = 0; i < a.length; i++) {
    if (count >= k) break;

    if (a[i] < b[i]) {
      const min = a[i];
      a[i] = b[i];
      b[i] = min;
    } else {
      break;
    }

    count++;
  }

  console.log("a", a);
  console.log("b", b);

  return a.reduce((prev, curr) => prev + curr, 0);
}

console.log(changeElems(_a, _b, _k)); // 26
