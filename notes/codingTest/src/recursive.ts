function recursive_function(n: number) {
  if (n === 10) return;
  console.log(`${n}번째 재귀함수에서 ${n + 1}번째 재귀함수를 호출합니다.`);
  recursive_function(n + 1);
  console.log(`${n}번째 재귀함수를 종료합니다.`);
}

recursive_function(1);

function iterativeFactorial(n: number) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(iterativeFactorial(5));

function recursiveFactorial(n: number): number {
  if (n <= 1) return 1;
  return n * recursiveFactorial(n - 1);
}

console.log(recursiveFactorial(5));
