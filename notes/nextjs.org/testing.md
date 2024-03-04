## Vitest

Vite와 React Testing Library는 함께 **유닛 테스팅**을 작성하는 데 자주 사용된다. 아래에서는 어떻게 넥스트에서 Vitest를 설정하고 최초 테스트를 작성할 수 있는지 볼 것이다.

> **good to know**  
> `async`로 선언한 서버 컴포넌트는 리액트에는 새롭게 소개된 것으로, Vitest에서는 아직 지원되지 않는다. 동기적인 서버 및 클라이언트 컴포넌트에 대해서는 유닛 테스트를 실행할 수 있기는 하지만, `async`인 컴포넌트에 대해서는 E2E 테스트를 실행해야 한다.

### Quickstart

`create-next-app`을 사용할 때 `with-vitest` 예시를 적용하면 빠르게 시작할 수 있다.

```bash
npx create-next-app@latest --example with-vitest with-vitest-app
```

### 직접 설정하기

직접 Vitest를 설정하려면 `vitest`와 아래 다른 패키지들을 devDependencies로 설치해야 한다.

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react
```

그리고 프로젝트의 루트에 `vitest.config.ts|js` 파일을 생성하고 아래 옵션들을 추가해야 한다:

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
});
```

Vitest 환경설정에 대한 더 많은 정보는 [Vitest 환경설정](https://vitest.dev/config/#configuration) 문서에서 확인 가능하다.

그런 후 `package.json`에 `test` 스크립트를 추가한다:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest"
  }
}
```

`npm run test`를 실행하면 Vitest가 디폴트로 프로젝트 내의 변화를 **바라볼**(watch) 것이다.

### Vitest 유닛 테스트 생성하기

`<Page />` 컴포넌트가 성공적으로 헤딩을 렌더링하는지 확인하는 테스트를 생성하여 확인해보자.

```tsx
// app/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
```

```tsx
// __tests__/page.test.tsx
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

test("Page", () => {
  render(<Page />);
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined();
});
```

> **good to know**  
> 위 예시에서는 일반적으로 사용되는 `__tests__` 폴더 컨벤션을 사용했는데, 테스트 파일들 또한 `app` 라우터 내에서 동일장소배치될 수 있다.

### 테스트 실행하기

그후 아래의 명령어를 실행하여 테스트를 시작하면 된다:

```bash
npm run test
```

### 추가 리소스

- [Vitest를 이용한 넥스트 예시](https://github.com/vercel/next.js/tree/canary/examples/with-vitest)
- [Vitest 문서](https://vitest.dev/guide/)
- [React Testing Library 문서](https://testing-library.com/docs/react-testing-library/intro/)
