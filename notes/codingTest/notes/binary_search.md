# 이진 탐색

## 순차 탐색(Sequential Search)

- 리스트 안에 있는 특정한 데이터를 찾기 위해 앞에서부터 데이터를 하나씩 차례대로 확인하는 방법
- 보통 정렬되지 않은 리스트에서 데이터를 찾아야 할 때 사용
- 순차 탐색은 데이터 정렬 여부와 상관 없이 가장 앞에 있는 원소부터 하나씩 확인해야 한다는 특징을 갖는다. 따라서 데이터의 개수가 N개일 때 최대 N번의 비교 연산이 필요하므로 순차 탐색의 최악의 경우의 시간 복잡도는 O(N)이다.

```typescript
function sequentialSearch(target: number, arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i + 1; // 현재 번째
  }
  return -1;
}
```

## 이진 탐색(Binary Search): 반으로 쪼개면서 탐색하기

- 배열 내부의 데이터가 정렬되어 있어야만 사용할 수 있는 알고리즘
- 시작점, 끝점, 중간점의 3개의 변수를 사용하여 탐색 범위를 설정한다.
- 찾으려는 데이터와 중간점 위치에 있는 데이터를 반복적으로 비교하여 원하는 데이터를 찾는다.
- 이진 탐색은 한 번 확인할 때마다 확인하는 원소의 개수가 절반씩 줄어든다는 점에서 시간 복잡도가 O(logN)이다.

```typescript
// 재귀 함수로 구현한 이진 탐색
function binarySearch(array, target, start, end) {
  if (start > end) return -1;
  const mid = Math.floor((start + end) / 2);

  if (target === array[mid]) return mid;

  if (target < array[mid]) {
    return binarySearch(array, target, start, mid - 1);
  } else {
    return binarySearch(array, target, mid + 1, end);
  }
}
```

```typescript
// 반복문으로 구현한 이진 탐색
```

## 트리 자료구조

.
