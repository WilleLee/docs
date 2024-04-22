function solution(numbers: string) {
  let primeCount = 0;
  const v: boolean[] = Array(numbers.length).fill(false);
  const set = new Set<number>();

  function recurr(visited: boolean[], turnCount: number, str: string) {
    if (turnCount === numbers.length) {
      str = str.replace(/^0+/gi, "");
      if (str.length > 0) {
        set.add(Number(str));
      }
      return;
    }
    for (let i = 0; i < numbers.length; i++) {
      if (!visited[i]) {
        const copiedV = [...visited];
        copiedV[i] = true;
        recurr(copiedV, turnCount + 1, str);
        recurr(copiedV, turnCount + 1, str + numbers[i]);
      }
    }
  }

  recurr(v, 0, "");

  set.forEach((v) => {
    if (isPrimeNumber(v)) {
      primeCount++;
    }
  });

  return primeCount;
}

function isPrimeNumber(number: number) {
  let isPrime = true;
  if (number < 2) {
    return false;
  }
  if (number === 2) {
    return true;
  }
  for (let i = number - 1; i > 1; i--) {
    if (number % i === 0) {
      isPrime = false;
      break;
    }
  }
  return isPrime;
}

console.log(solution("17"));
console.log(solution("011"));
