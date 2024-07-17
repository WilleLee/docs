# bc challenge DAY 3 학습 정리

## XML(eXtensible Markup Language)

XML은 데이터를 저장/전송하기 위해 설계된 마크업 언어이다. HTML과 비슷한 구조를 가지고 있지만, HTML이 데이터를 나타내는데 중점을 두는 반면, XML은 데이터를 전달하는데 중점을 둔다.

## 컴파일러 이론 중 tokenizer, lexer, parser의 역할

컴파일링에 있어서 토큰화, 렉싱, 파싱은 모두 로우 소스 코드를 컴퓨터가 이해하여 실행할 수 있는 구조로 변환하는 매우 중요한 절차이다. 이는 물론 XML 파싱과 같은 구조화된 텍스트의 처리에 대해서도 적용할 수 있다.

### tokenizer

tokenizer는 입력값을 여러 토큰으로 나누는 컴포넌트이다. 이때 토큰이란 의미를 가지는 가장 작은 유닛으로, 여기에는 keywords, identifiers, operators, literals 등이 포함된다.

| 토큰       | 설명                  |
| ---------- | --------------------- |
| identifier | 식별하기 위한 이름    |
| keyword    | 미리 지정한 예약어    |
| separator  | 글자를 구분하는 문자  |
| operator   | 연산을 위한 심볼      |
| literal    | 숫자, 논리, 문자      |
| comment    | 줄 또는 블록 코멘터리 |

XML을 예시로 들자면 다음과 같은 입출력이 가능하다.

- 인풋 : `<key>CFBundleExecutable</key>`
- 아웃풋 : `["<key>", "CFBundleExecutable", "</key>"]`

### lexer (lexical analyzer)

lexer는 tokenizer가 생성한 토큰을 다양한 타입으로 분류하는 컴포넌트이다. 이는 각 토큰에 의미를 부여하며, 이에 따라 토큰은 가령 태그, 속성, 텍스트 등으로 분류될 수 있다.

- 인풋 : `["<key>", "CFBundleExecutable", "</key>"]`
- 아웃풋 : `[TagStart("key"), Text("CFBundleExecutable"), TagEnd("key")]`

### parser

parser는 lexer의 결과물(lexemes)을 받아 abstract syntax tree(AST)나 document object model(DOM)과 같은 구조를 생성한다.

- 인풋 : `[TagStart("key"), Text("CFBundleExecutable"), TagEnd("key")]`
- 아웃풋 : 문서를 나타내는 트리 구조

## JSON vs XML

| 분류        | JSON                                   | XML                              |
| ----------- | -------------------------------------- | -------------------------------- |
| 문법        | key-value 페어, 간결함                 | 태그로 표현, 장황함              |
| 가독성      | 간결하고 읽기 쉬움                     | 장황하여 가독성이 떨어짐         |
| 데이터 타입 | 문자열, 숫자, 객체, 배열, 불리언, null | 문자열로 모든 데이터 타입을 표현 |
| 유즈케이스  | 웹 API, 설정 파일                      | 문서 저장, 복잡한 데이터 구조    |
| 파싱        | 쉽고 빠름, 다양한 언어에서 지원        | 복잡하고 특수한 파서가 필요      |

JSON은 간결하고 효율적이어서 웹 기반 어플리케이션 및 데이터 교환에서 선호된다. 한편 XML은 견고한 구조를 가지며, 검증이 필요한 복잡한 데이터 구조를 다루는 데 주로 사용된다.
