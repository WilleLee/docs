# REST API

REST(REpresentational State Transfer)는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처이고, REST API는 REST를 기반으로 서비스 API를 구현한 것이다.

## REST API의 구성

REST API는 자원(Resource), 행위(Verb), 표현(Representations)의 3가지 요소로 구성된다.

| 구성 요소             | 내용                           | 표현 방법       |
| --------------------- | ------------------------------ | --------------- |
| 자원(Resource)        | 자원                           | URI(엔드포인트) |
| 행위(Verb)            | 자원에 대한 행위               | HTTP 메서드     |
| 표현(Representations) | 자원에 대한 행위의 구체적 내용 | 페이로드        |

## REST API의 설계 원칙

1. URI는 자원을 표한하는 데 집중한다.
   - 동사보다는 명사를 사용한다.
2. 자원에 대한 행위는 HTTP 메서드로 표현한다. 즉 리소스에 대한 행위를 URI에 표현하지 않는다.
   - `GET`: 모든/특정 자원 취득
   - `POST`: 자원 생성
   - `PUT`: 자원 전체 교체
   - `PATCH`: 자원의 일부 수정
   - `DELETE`: 모든/특정 자원 삭제
