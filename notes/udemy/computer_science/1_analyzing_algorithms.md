# Analyzing Algorithms

## Time Complexity

### What is it?

- 서로 다른 알고리듬을 비교하는 **표준적인** 방법  
  어떤 사람에 의해서든, 어떤 조건에서든 어떤 알고리듬이 더 좋은지 비교할 수 있어야 함

### Math Refresher

- Computer science is kind of applied math.

#### 1. Logarithm

- logarithmic function = inverse of exponential function  
  e.g. if log<sub>2</sub>n = 3, then n = 2<sup>3</sup> = 8

<img src="https://github.com/WilleLee/docs/blob/main/assets/computer_science_logarithmic_chart.jpg?raw=true" width="256" alt="logarithmic chart compared to exponential function" />

#### 2. Factorial

- e.g. 5! = 5 x 4 x 3 x 2 x 1 = 120
- if the program runs in factorial time, it's **BAD**

#### 3. Algebra (대수학)

- in case of n&middot;log<sub>2</sub>n, n might be a representation of the amount of data. We don't know what n is, but we know the concrete way of how it grows.  
  e.g. if n = 8, then 8&middot;log<sub>2</sub>8 = 24

### n-Notation

- in programming, output is a function(logic of operation) of input

<img src="https://github.com/WilleLee/docs/blob/main/assets/computer_science_n_notation.jpg?raw=true" width="512" alt="n is function of n" />

- 이러한 표기법은 인풋의 크기에 따른 알고리듬 실행 시간의 크기를 확인할 수 있게 한다.  
  알고리듬을 설계할 때, 해당 알고리듬이 얼마나 효율적인지 정량적으로 확인할 수 있게 하기 때문.

#### n-Notation 크기 비교

- 규칙

  1. 곱셈은 무시한다.  
     e.g. 2n<sup>2</sup> &rarr; n<sup>2</sup>
  1. 방정식 가운데 가장 큰 것만 남긴다.  
     e.g. n<sup>2</sup> + n &rarr; n<sup>2</sup>

- n이 커질수록 n-Notation 간의 성능 차이가 매우 커진다!

<img src="https://github.com/WilleLee/docs/blob/main/assets/computer_science_n_notation_comparison.png?raw=true" width="256" alt="n notation comparisons" />

### Big O Notation

| Notation   | Meaning                   |
| ---------- | ------------------------- |
| o(n)       | faster than n             |
| O(n)       | faster than or equal to n |
| &Theta;(n) | equal to n                |
| &Omega;(n) | slower than or equal to n |
| &omega;(n) | slower than n             |

- Big O represents the **worst case** scenario.  
  e.g. if an algorithm runs in O(n) time, it means that it will run in n time or less.

### Example using n-Notation and Big O Notation

for example, a program runs&hellip;

- O(n<sup>2</sup>) time in loading
- O(n&middot;log<sub>2</sub>n) time in execution 1
- O(n) time in execution 2
- O(1) time in saving

then the total time complexity is O(n<sup>2</sup> + n&middot;log<sub>2</sub>n + n + 1), **which is equal to O(n<sup>2</sup>)**, because n<sup>2</sup> is the biggest one among them.
