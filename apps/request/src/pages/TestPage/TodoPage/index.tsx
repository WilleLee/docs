import { GlobalPortal } from "@/GlobalPortal";
import Header from "@components/Header";
import { css, keyframes } from "@emotion/react";
import useNav from "@hooks/useNav";
import { ITodo } from "@models/todos";
import { getTodo, putTodo } from "@server/handlers";
import {
  Fragment,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import { useParams } from "react-router-dom";

const initialTodo: ITodo = {
  id: 0,
  userId: 0,
  title: "",
  completed: false,
};

export default function TodoPage() {
  const { todoId } = useParams();
  const { goBack } = useNav();

  if (!todoId || typeof todoId !== "string") return null;

  return (
    <>
      <Header onClickBack={goBack} />
      <Todo todoId={Number(todoId)}>
        {({ todo, status, isPending, onClickCheckbox }) => (
          <Fragment>
            <TodoView
              todo={todo}
              isPending={isPending}
              onClickCheckbox={onClickCheckbox}
            />
            {status === "loading" && <Loader />}
          </Fragment>
        )}
      </Todo>
    </>
  );
}

interface TodoProps {
  todoId: ITodo["id"];
  children: (args: {
    isPending: boolean;
    onClickCheckbox: (todo: ITodo) => void;
    todo: ITodo;
    status: "idle" | "loading" | "error" | "success";
  }) => ReactNode;
}

function Todo({ todoId, children }: TodoProps) {
  const [reloader, setReloader] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [todo, setTodo] = useState<ITodo>(initialTodo);

  const [isPending, setIsPending] = useState(false);
  const handleClickCheckbox = useCallback(async (todo: ITodo) => {
    setIsPending(true);
    const result = await putTodo({ ...todo, completed: !todo.completed });
    if (result.ok) {
      setReloader((prev) => prev + 1);
    }
    setIsPending(false);
  }, []);

  useEffect(() => {
    let isValidCall = true;
    (async function () {
      setStatus("loading");

      const res = await getTodo(todoId);
      if (res.ok && res.data) {
        if (isValidCall) {
          setTodo(res.data);
          setStatus("success");
        }
      } else {
        setStatus("error");
      }
    })();
    return () => {
      isValidCall = false;
    };
  }, [todoId, reloader]);

  if (!children || typeof children !== "function") return null;

  return children({
    todo,
    status,
    isPending,
    onClickCheckbox: handleClickCheckbox,
  });
}

const TodoView = memo(function TodoView({
  todo,
  onClickCheckbox,
  isPending,
}: {
  todo: ITodo;
  onClickCheckbox: (todo: ITodo) => void;
  isPending: boolean;
}) {
  return (
    <div>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 4px;
        `}
      >
        <h4>{todo.title}</h4>
        <Checkbox
          type="checkbox"
          checked={todo.completed}
          onChange={() => onClickCheckbox(todo)}
          disabled={isPending}
        />
      </div>
      {isPending && <Loader />}
    </div>
  );
});

const Checkbox = forwardRef(function Checkbox(
  { ...rest }: InputHTMLAttributes<HTMLInputElement>,
  ref: Ref<HTMLInputElement>,
) {
  const id = useId();
  return (
    <label htmlFor={id}>
      <input
        css={css`
          display: none;
        `}
        id={id}
        ref={ref}
        {...rest}
      />
      <div
        css={css`
          width: 12px;
          height: 12px;
          border-radius: 2px;
          background-color: ${rest.checked
            ? "orange"
            : rest.disabled
            ? "#aaa"
            : "#eee"};
        `}
      />
    </label>
  );
});

const spin = keyframes`
  0% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(380deg);
  }
`;

function Loader() {
  return (
    <GlobalPortal.Consumer>
      <div
        css={css`
          z-index: 999;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 4px solid transparent;
            border-top: 4px solid orange;
            animation: ${spin} 1s ease-in-out infinite;
          `}
        />
      </div>
    </GlobalPortal.Consumer>
  );
}
