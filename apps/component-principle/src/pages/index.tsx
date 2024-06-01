import { css } from "@emotion/react";
import { ReactNode, Suspense } from "react";
import { Todos } from "./Todos";
import { Posts } from "./Posts";

export default function StartPage() {
  // 양쪽으로 todos와 posts를 보여줄 거야

  // 1. single responsibility state management
  // 두 개의 상태를 관리할 것이므로, 두 개의 컨트롤러 함수 필요
  return (
    <Layout>
      <>
        <Suspense fallback={<p>loading...</p>}>
          <Todos.Controller>
            {({ todos, onAddTodo, onRemoveTodo, onToggleCompleted }) => (
              <>
                <Todos.TodoHeaderView onAddTodo={onAddTodo} />
                {todos.map((todo) => (
                  <Todos.TodoView
                    key={todo.id}
                    todo={todo}
                    onRemoveTodo={onRemoveTodo}
                    onToggleCompleted={onToggleCompleted}
                  />
                ))}
              </>
            )}
          </Todos.Controller>
        </Suspense>
        <Suspense fallback={<p>loading...</p>}>
          <Posts.Controller>{() => <></>}</Posts.Controller>
        </Suspense>
      </>
    </Layout>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr;
      `}
    >
      {children}
    </div>
  );
}
