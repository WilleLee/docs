# 정렬(Sorting)

- 데이터를 특정한 기준에 따라 순서대로 나열하는 것
- 정렬 알고리즘으로 데이터를 정렬하면 이진 탐색(Binary Search)이 가능해진다.

## 선택 정렬(Selection Sort)

- "가장 작은 것을 선택"한다는 의미
- 가장 작은 데이터를 선택해 맨 앞에 있는 데이터와 바꾸고, 그 다음 작은 데이터를 선택해 앞에서 두 번째 데이터와 바꾸는 과정을 반복한다.

```javascript
const arr1 = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];

for (let i = 0; i < arr1.length; i++) {
  let minIndex = i;
  for (let j = i + 1; j < arr1.length; j++) {
    if (arr1[minIndex] > arr1[j]) {
      minIndex = j;
    }
  }
  // 스와프 = 리스트에서 두 변수의 위치를 변경하는 작업
  const min = arr1[minIndex];
  arr1[minIndex] = arr1[i];
  arr1[i] = min;
}

console.log(arr1);
```

- 선택 정렬의 시간 복잡도는 O(N<sup>2</sup>)이다.
- 선택 정렬은 매우 비효율적이지만, 특정 리스트에서 가장 작은 데이터를 찾는 일이 코딩 테스트에서 자주 사용되기 때문에 선택 정렬에 대해 알아두는 것이 좋다.

## 삽입 정렬(Insertion Sort)

- 데이터를 하나씩 확인하며, 각 데이터를 적절한 위치에 삽입하는 방법
- 구현 난이도가 높은 편이지만, 선택 정렬에 비해 더 효율적인 알고리즘이다.
- 삽입 정렬은 특정한 데이터가 적절한 위치에 들어가기 이전에, 그 앞까지의 데이터는 이미 정렬되어 있다고 가정한다. 정렬되어 있는 데이터 리스트에서 적절한 위치를 찾은 뒤에, 그 위치에 삽입된다는 점이 특징이다.
- 삽입 정렬은 두 번째 데이터부터 시작한다. 왼쪽에 있는 데이터들은 이미 정렬되어 있다고 가정하기 때문이다.

```javascript
const array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];

for (let i = 1; i < array.length; i++) {
  for (let j = i; j > 0; j--) {
    if (array[j] < array[j - 1]) {
      // 앞으로 이동
      const temp = array[j];
      array[j] = array[j - 1];
      array[j - 1] = temp;
    } else {
      break; // 다음 i로 넘어감
    }
  }
}

console.log(array); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

- 삽입 정렬의 시간 복잡도는 O(N<sup>2</sup>)으로 선택 정렬과 같지만, 현재 리스트의 데이터가 거의 정렬되어 있는 상태라면 매우 빠르게 동작한다.

## 퀵 정렬(Quick Sort)

- 기준 데이터=피벗(pivot)을 설정하고 그 기준보다 큰 데이터와 작은 데이터의 위치를 바꾸는 방법

1. 리스트에서 첫 번째 데이터를 피벗으로 정한다.
2. 왼쪽에서부터 피벗보다 큰 데이터를 찾고, 오른쪽에서부터 피벗보다 작은 데이터를 찾는다.
3. 큰 데이터와 작은 데이터의 위치를 서로 교환한다.

```typescript
const arr = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8];

function quickSort(array: number[], start: number, end: number) {
  if (start >= end) return;
  const pivot = start;
  let left = start + 1;
  let right = end;
  while (left <= right) {
    // left 이동. 피벗보다 큰 데이터 찾을 때까지
    while (left <= end && array[left] <= array[pivot]) {
      left++;
    }
    // right 이동. 피벗보다 작은 데이터 찾을 때까지
    while (right > start && array[right] >= array[pivot]) {
      right--;
    }
    // 엇갈렸다면 작은 데이터(right)와 피벗 교체
    if (left > right) {
      const min = array[right];
      array[right] = array[pivot];
      array[pivot] = min;
    } else {
      // 엇갈리지 않았다면 작은 데이터(left)와 큰 데이터(right) 교체
      const min = array[left];
      array[left] = array[right];
      array[right] = min;
    }
  }
  // 분할 이후 왼쪽 부분과 오른쪽 부분에서 각각 정렬 수행
  quickSort(array, start, right - 1);
  quickSort(array, right + 1, end);
}
```

- 퀵 정렬의 시간 복잡도는 O(NlogN)이다.

## 계수 정렬(Count Sort)

- 특정한 조건이 부합할 때만 사용할 수 있지만 매우 빠르게 동작하는 정렬 알고리즘이다.
- 계수 정렬은 '데이터의 크기 범위가 제한되어 정수 형태로 표한할 수 있을 때'만 사용할 수 있으며, 최악의 경우에도 O(N+K)를 보장한다(N: 데이터의 개수, K: 데이터 중 최대값의 크기).
- 가장 큰 데이터와 가장 작은 데이터의 차이가 너무 크다면 계수 정렬은 사용할 수 없다. 왜냐하면 계수 정렬을 사용할 때에는 '모든 범위를 담을 수 있는 크기의 리스트(배열)를 선언'해야 하기 때문이다.

```javascript
const result = [];
const array = [7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2];

const count = Array.from(Math.max(...array) + 1).fill(0);

for (let i = 0; i < array.length; i++) {
  count[array[i]]++;
}

for (let i = 0; i < count.length; i++) {
  if (count[i] === 0) continue;
  for (let j = 0; j < count[i]; j++) {
    result.push(i);
  }
}

console.log(result); // [0, 0, 1, 1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9]
```
