import Header from "@components/Header";
import { IPost } from "@models/posts";
import { ITodo } from "@models/todos";
import { Fragment, ReactNode, memo, useEffect, useState } from "react";

export default function PlaygroundPage() {
  return (
    <>
      <Header />
      <Posts>
        {({ posts }) => (
          <Fragment>
            {posts.map((p) => (
              <Post key={p.id} post={p} />
            ))}
          </Fragment>
        )}
      </Posts>
      <Todos>
        {({ todos }) => (
          <Fragment>
            {todos.map((t) => (
              <Todo key={t.id} todo={t} />
            ))}
          </Fragment>
        )}
      </Todos>
    </>
  );
}

interface PostsProps {
  children: (args: { posts: IPost[] }) => ReactNode;
}

function Posts({ children }: PostsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    let isValidCall = true;

    (async function () {
      try {
        setIsLoading(true);
        const postsData = await (
          await fetch("https://jsonplaceholder.typicode.com/posts")
        ).json();
        if (postsData && isValidCall) {
          setPosts(postsData.slice(0, 10));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      isValidCall = false;
    };
  }, []);

  if (!children || typeof children !== "function") return null;

  if (isLoading) return <p>loading...</p>;

  return children({ posts });
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
  children: (args: { todos: ITodo[] }) => ReactNode;
}

function Todos({ children }: TodosProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<ITodo[]>([]);
  useEffect(() => {
    let isValidCall = true;

    (async function () {
      try {
        setIsLoading(true);
        const todosData = await (
          await fetch("https://jsonplaceholder.typicode.com/todos")
        ).json();
        if (todosData && isValidCall) {
          setTodos(todosData.slice(0, 10));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      isValidCall = false;
    };
  }, []);

  if (!children || typeof children !== "function") return null;

  if (isLoading) return <p>loading...</p>;

  return children({ todos });
}

const Todo = memo(function Todo({ todo }: { todo: ITodo }) {
  return (
    <div>
      <h3>
        {todo.id} ({todo.userId})
      </h3>
    </div>
  );
});
