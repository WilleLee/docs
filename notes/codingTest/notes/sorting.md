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

## 퀵 정렬(Quick Sort)

- 기준 데이터=피벗(pivot)을 설정하고 그 기준보다 큰 데이터와 작은 데이터의 위치를 바꾸는 방법

## 계수 정렬(Count Sort)
