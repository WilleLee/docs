import { getPosts, getTodos } from "@server/handlers";
import Header from "@components/Header";
import { IPost } from "@models/posts";
import {
  Fragment,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ITodo } from "@models/todos";
import useNav from "@hooks/useNav";

export default function TestPage() {
  const { push } = useNav();

  return (
    <>
      <Header onClickBack={() => push("/")} />
      <Posts>
        {({ posts, isLoading }) => (
          <Fragment>
            {isLoading && <p>loading posts...</p>}
            {posts.map((p) => (
              <Post key={p.id} post={p} />
            ))}
          </Fragment>
        )}
      </Posts>
      <Todos>
        {({ todos, isLoading, onClickTodo }) => (
          <Fragment>
            {isLoading && <p>loading todos...</p>}
            {todos.map((t) => (
              <Todo key={t.id} todo={t} onClickTodo={onClickTodo} />
            ))}
          </Fragment>
        )}
      </Todos>
    </>
  );
}

interface PostsProps {
  children: (args: { isLoading: boolean; posts: IPost[] }) => ReactNode;
}

function Posts({ children }: PostsProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    let isValidCall = true;
    (async function () {
      setStatus("loading");
      const res = await getPosts();
      console.log(res);
      if (res.ok && res.data !== null) {
        if (isValidCall) {
          setPosts(res.data);
          setStatus("success");
        }
      } else {
        setStatus("error");
      }
    })();
    return () => {
      isValidCall = false;
    };
  }, []);

  if (!children || typeof children !== "function") return null;

  return children({
    isLoading: status === "loading",
    posts,
  });
}

const Post = memo(function Post({ post }: { post: IPost }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
});

interface TodosProps {
  children: (args: {
    isLoading: boolean;
    todos: ITodo[];
    onClickTodo: (todoId: ITodo["id"]) => void;
  }) => ReactNode;
}

function Todos({ children }: TodosProps) {
  const { push } = useNav();
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const isLoading = useMemo(() => status === "loading", [status]);
  const handleClickTodo = useCallback(
    (todoId: ITodo["id"]) => {
      push(`/test/${todoId}`);
    },
    [push],
  );

  useEffect(() => {
    let isValidCall = true;
    (async function () {
      setStatus("loading");
      const res = await getTodos();
      console.log(res);
      if (res.ok && res.data !== null) {
        if (isValidCall) {
          setTodos(res.data);
          setStatus("success");
        }
      } else {
        setStatus("error");
      }
    })();
    return () => {
      isValidCall = false;
    };
  }, []);

  if (!children || typeof children !== "function") return null;

  return children({
    todos,
    isLoading,
    onClickTodo: handleClickTodo,
  });
}

const Todo = memo(function Todo({
  todo,
  onClickTodo,
}: {
  todo: ITodo;
  onClickTodo: (todoId: ITodo["id"]) => void;
}) {
  return (
    <div onClick={() => onClickTodo(todo.id)}>
      <h3>
        {todo.title} ({todo.completed ? "o" : "x"})
      </h3>
    </div>
  );
});
