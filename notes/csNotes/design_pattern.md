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
