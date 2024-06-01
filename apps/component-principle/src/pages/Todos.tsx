import { ITodo } from "@libs/types";
import { ReactNode, memo, useCallback, useMemo, useState } from "react";

interface TodosChildrenArgs {
  todos: ITodo[];
  onAddTodo: () => void;
  onToggleCompleted: (id: ITodo["id"]) => void;
  onRemoveTodo: (id: ITodo["id"]) => void;
}

interface ControllerProps {
  children: (args: TodosChildrenArgs) => ReactNode;
}

function Controller({ children }: ControllerProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleAddTodo = useCallback(() => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        userId: 33,
        title: "new todo",
        completed: false,
      },
    ]);
  }, []);

  const handleToggleCompleted = useCallback((id: ITodo["id"]) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const handleRemoveTodo = useCallback((id: ITodo["id"]) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // 3. effects isolation
  // 외부 시스템과 동기화하는 경우가 아닌 한,
  // useEffect는 사용하지 않는다.

  // 4. encapsulated handlers
  // 상태 세터를 직접 전달하지 않고,
  // 상태 세터를 사용하는 이벤트 핸들러 함수를 전달한다.
  const childrenArgs: TodosChildrenArgs = useMemo(
    () => ({
      todos,
      onAddTodo: handleAddTodo,
      onRemoveTodo: handleRemoveTodo,
      onToggleCompleted: handleToggleCompleted,
    }),
    [todos, handleAddTodo, handleRemoveTodo, handleToggleCompleted],
  );

  if (!children || typeof children !== "function") return null;

  return children(childrenArgs);
}

interface TodoHeaderViewProps {
  onAddTodo: () => void;
}

const TodoHeaderView = memo(function TodoHeaderView({
  onAddTodo,
}: TodoHeaderViewProps) {
  return (
    <div>
      <button onClick={onAddTodo}>add</button>
    </div>
  );
});

interface TodoViewProps {
  todo: ITodo;
  onRemoveTodo: (id: ITodo["id"]) => void;
  onToggleCompleted: (id: ITodo["id"]) => void;
}

const TodoView = memo(function TodoView({
  todo,
  onRemoveTodo,
  onToggleCompleted,
}: TodoViewProps) {
  // 2. sparation of concerns
  // 투두 상태의 뷰 로직은 컨트롤러 로직으로부터 분리한다.
  return (
    <div>
      <p>{todo.title}</p>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleCompleted(todo.id)}
      />
      <button onClick={() => onRemoveTodo(todo.id)}>remove</button>
    </div>
  );
});

export const Todos = {
  Controller,
  TodoHeaderView,
  TodoView,
};
