# 디자인 패턴

## 디자인 패턴이란?

- 프로그램 설계 시의 문제 해결 방법을 하나의 '규약' 형태로 정리한 것

## 디자인 패턴의 종류

### 싱글톤 패턴(Singleton Pattern)

- 하나의 클래스를 기반으로 단 하나의 인스턴스만을 생성하는 디자인 패턴
- 인스턴스 생성 비용이 줄어든다.
- 하지만 의존성이 높아질 수 있다.

#### 구현

자바스크립트에서 `{}` 리터럴 또는 `new Object`로 객체를 생성하면, 다른 객체와 다른 객체를 생성하므로, 싱글톤 패턴을 구현할 수 있다.

```typescript
const obj = {
  a: 1,
};
```

```typescript
class Singleton {
  private static instance: Singleton;

  private constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  getInstance() {
    return this;
  }
}

const a = new Singleton();
const b = new Singleton();

console.log(a === b); // true
```

이러한 싱글톤 패턴은 데이터베이스 연결 모듈 구현에 많이 사용된다.

```typescript
const URL = "mongodb://blahblah";
const createConnection = (url: string) => ({
  url,
});

class DB {
  public instance: any;
  static instance: DB;
  constructor(url: string) {
    if (!DB.instance) {
      DB.instance = createConnection(url);
    }
    return DB.instance;
  }
  connect() {
    return this.instance;
  }
}
```

### 팩토리 패턴(Factory Pattern)

- 객체를 사용하는 코드에서 객체 생성 부분을 떼어내 추상화한 것

#### 구현

```typescript
class Vehicle {
  private make: string;
  private model: string;
  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
  display() {
    console.log(`${this.make} ${this.model}`);
  }
}

class Car extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model);
  }
}
class Truck extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model);
  }
}

function vehicleFactory(type: string, make: string, model: string) {
  switch (type) {
    case "car":
      return new Car(make, model);
    case "truck":
      return new Truck(make, model);
    default:
      throw new Error("Invalid vehicle type");
  }
}

const car1 = vehicleFactory("car", "Toyota", "Corolla");
const truck1 = vehicleFactory("truck", "Ford", "F150");

car1.display();
truck1.display();
```

### 전략 패턴(Strategy Pattern)

- 객체의 행위를 바꾸고 싶은 경우 '직접' 수정하지 않고, 전략이라 부르는 '캡슐화한 알고리즘'을 컨텍스트 안에서 바꿔주면서 상호 교체하도록 하는 패턴

> 컨텍스트
>
> 어떤 작업을 완료하는 데 필요한 모든 관련 정보

```typescript
class Vehicle {
  private make: string;
  private model: string;
  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
  display() {
    console.log(`${this.make} ${this.model}`);
  }
}

class Car extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model);
  }
}
class Truck extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model);
  }
}

function vehicleFactory(type: string, make: string, model: string) {
  switch (type) {
    case "car":
      return new Car(make, model);
    case "truck":
      return new Truck(make, model);
    default:
      throw new Error("Invalid vehicle type");
  }
}

const car1 = vehicleFactory("car", "Toyota", "Corolla");
const truck1 = vehicleFactory("truck", "Ford", "F150");

car1.display();
truck1.display();
```

### 옵저버 패턴(Observer Pattern)

- 주체가 어떤 객체의 상태 변화를 관찰하다가 상태 변화가 일어나면 매서드를 호출해 옵저버 목록의 옵저버들에게 상태 변화를 통지하는 패턴
- 옵저버 패턴은 주로 이벤트 핸들러에서 사용되며, MVC(Model - View - Controller) 패턴에서도 사용된다; 모델의 상태가 변하면 뷰에게 알려주고, 이를 기반으로 컨트롤러가 작동하는 것이다.

> observer
>
> an object that is interested in being notified of changes in the subject
>
> controller
>
> is responsible for handling user inputs and updating the model accordingly
>
> therefore...
>
> 어떤 리액트 컴포넌트는 옵저버이면서 동시에 컨트롤러일 수밖에 없다.

### 프록시 패턴(Proxy Pattern)과 프록시 서버

#### 프록시 패턴

- 다른 객체에 대한 접근 흐름을 가로채 제어할 수 있는 객체를 제공하는 패턴

> 프록시 서버에서 캐싱
>
> 클라이언트가 캐시에 저장된 정보를 요청하는 경우 원격 서버에 데이터를 요청하지 않고 캐시에 저장된 데이터를 반환한다.

#### 프록시 서버

- 클라이언트와 원격 서버 사이에 중계 역할을 하는 서버
- Nginx, Cloudflare&hellip;

![proxy server structure](https://github.com/WilleLee/docs/blob/main/assets/proxy_server_structure.jpeg?raw=true)

##### CORS와 프록시 서버

- CORS(Cross-Origin Resource Sharing) : 다른 도메인 간의 자원 공유를 제한하는 보안 방식, 다른 오리진에서 리소스를 요청할 때 브라우저가 보안 상의 이유로 요청을 차단하는 것
- 프론트엔드 개발 시 백엔드 서버와 동일한 오리진을 갖는 프록시 서버를 구축하여 CORS 문제를 해결할 수 있다.

> 오리진
>
> URL의 프로토콜, 호스트, 포트의 조합

### 이터레이터 패턴(Iterator Pattern)

- 어떤 컬렌션에 대하여 자료형 구조와 상관 없이 이터레이터를 통해 순회할 수 있도록 하는 패턴

### 노출모듈 패턴(Revealing Module Pattern)

- **즉시 실행 함수**를 통해 private 멤버들을 캡슐화하고, public인 멤버만을 노출하는 패턴
- 전역 네임스페이스의 오염을 방지하고, 구현 세부사항을 숨기는 데 도움이 된다.

```typescript
const counterModule = (function () {
  let count = 0;

  function increment() {
    count++;
  }

  function decrement() {
    count--;
  }

  function getCount() {
    return count;
  }

  return {
    increment,
    decrement,
    getCount,
  };
})();

console.log(counterModule.getCount()); // 0
counterModule.increment();
counterModule.increment();
console.log(counterModule.getCount()); // 2
counterModule.decrement();
console.log(counterModule.getCount()); // 1
```

> public
>
> 클래스 정의 함수 내부, 자식 클래스, 외부 클래스에서 접근 가능
>
> private
>
> 클래스 정의 함수 내부에서만 접근 가능
>
> protected
>
> 클래스 정의 함수 내부와 자식 클래스에서 접근 가능
>
> 즉시 실행 함수
>
> 함수를 정의하자마자 즉시 실행되는 함수
