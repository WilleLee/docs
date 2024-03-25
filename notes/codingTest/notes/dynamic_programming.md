# 다이나믹 프로그래밍

```typescript
function fibo(x: number) {
  if (x === 1 || x === 2) {
    return 1;
  }
  return fibo(x - 1) + fibo(x - 2);
}
// fibo(4) = fibo(3) + fibo(2) = (fibo(1) + fibo(2)) + 1 = 2 + 1 = 3
// 1 1 2 3
```

## 다이나믹 프로그래밍의 조건

- 큰 문제를 작은 문제로 나눌 수 있다.
- 작은 문제에서 구한 정답은 그것을 포함하는 큰 문제에서도 동일하다.

## 메모이제이션 = 캐싱

- 다이나믹 프로그래밍을 구현하는 방법 중 하나
- 한 번 구한 결과를 메모리 공간에 메모해두고 같은 식을 다시 호출하면 메모한 결과를 그대로 가져오는 기법
- 어떻게 구현? 한 번 구한 정보를 리스트에 저장

```typescript
const d = Array(100).fill(0);

function fibo(x: number) {
  if (x === 1 || x === 2) {
    return 1;
  }
  if (d[x] !== 0) {
    return x;
  }
  d[x] = fibo(x - 1) + fibo(x - 2);
  return d[x];
}
```
