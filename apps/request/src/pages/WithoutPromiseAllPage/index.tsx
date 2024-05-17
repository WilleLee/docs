import { IPost } from "@models/posts";
import { ITodo } from "@models/todos";
import { Fragment, useEffect, useState } from "react";

export default function WithoutPromiseAllPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    let isValidCall = true;
    setIsLoading(true);
    const start = performance.now();

    (async function () {
      try {
        const data1 = await (
          await fetch("https://jsonplaceholder.typicode.com/todos")
        ).json();
        const data2 = await (
          await fetch("https://jsonplaceholder.typicode.com/posts")
        ).json();
        if (data1 && data2 && isValidCall) {
          setTodos(data1);
          setPosts(data2);
          const end = performance.now();
          console.log("performance : ", end - start);
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
  if (isLoading) return <p>loading...</p>;
  return (
    <Fragment>
      {todos.map((t) => (
        <Todo key={t.id} todo={t} />
      ))}
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </Fragment>
  );
}

function Todo({ todo }: { todo: ITodo }) {
  return (
    <div>
      <h3>
        {todo.title} {todo.completed ? "o" : "x"}
      </h3>
    </div>
  );
}

function Post({ post }: { post: IPost }) {
  return (
    <div>
      <h3>{post.title}</h3>
    </div>
  );
}
