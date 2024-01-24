# Analyzing Algorithms

## Time Complexity

### What is it?

- 서로 다른 알고리듬을 비교하는 **표준적인** 방법  
  어떤 사람에 의해서든, 어떤 조건에서든 어떤 알고리듬이 더 좋은지 비교할 수 있어야 함

### Math Refresher

- Computer science is kind of applied math.

#### Logarithm

- logarithmic function = inverse of exponential function  
  e.g. if log<sub>2</sub>n = 3, then n = 2<sup>3</sup> = 8

<img src="https://github.com/WilleLee/docs/blob/main/assets/computer_science_logarithmic_chart.jpg?raw=true" width="256" alt="logarithmic chart compared to exponential function" />

#### Factorial

- e.g. 5! = 5 x 4 x 3 x 2 x 1 = 120
- if the program runs in factorial time, it's **BAD**

#### Algebra

- in case of n&middot;log<sub>2</sub>n, n might be a representation of the amount of data. We don't know what n is, but we know the concrete way of how it grows.  
  e.g. if n = 8, then 8&middot;log<sub>2</sub>8 = 24

### n-Notation
