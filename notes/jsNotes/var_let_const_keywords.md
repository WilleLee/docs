# var, let, const 키워드

## var 키워드의 문제점

1. 변수 중복 선언 허용
2. **함수 레벨 스코프** : 함수 코드 블록만을 지역 스코프로 인정(if, for, while 등의 코드 블록은 지역 스코프로 인정되지 않음)
3. 호이스팅(Hoisting) : 런타임 이전에 변수 선언 및 초기화(undefined 할당) 처리

```javascript
console.log(x); // undefined
x = 1;
console.log(x); // 1
var x;
```

## let 키워드에서의 개선

1. 변수 중복 선언 금지
2. **블록 레벨 스코프** : 모든 코드 블록을 지역 스코프로 인정
3. 호이스팅(Hoisting) : 선언 단계만 호이스팅, 초기화 단계는 값 할당과 함께 실행 -> TDZ(Temporal Dead Zone) 발생

```javascript
let x = 1;
{
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 2;
}
```
