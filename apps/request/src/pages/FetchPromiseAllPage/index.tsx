import { IPost } from "@models/posts";
import { ITodo } from "@models/todos";
import { Fragment, useEffect, useState } from "react";

export default function FetchPromiseAllPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    let isValidCall = true;
    setIsLoading(true);
    const start = performance.now();
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
    ])
      .then((res) => {
        (async function () {
          try {
            const todosData = (await res[0].json()) as ITodo[];
            const postsData = (await res[1].json()) as IPost[];

            if (isValidCall) {
              setTodos(todosData.slice(0, 10));
              setPosts(postsData.slice(0, 10));
              const end = performance.now();
              console.log("performance : ", end - start);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      isValidCall = false;
    };
  }, []);
  if (isLoading) return <p>loading...</p>;
  return (
    <Fragment>
      <div>
        {todos.map((t) => (
          <div key={t.id}>
            <h3>
              {t.title} {t.completed ? "o" : "x"}
            </h3>
          </div>
        ))}
      </div>
      <div>
        {posts.map((p) => (
          <div key={p.id}>
            <h3>{p.title}</h3>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
