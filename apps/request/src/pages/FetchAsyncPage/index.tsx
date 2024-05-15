import { IPost } from "@models/posts";
import { useEffect, useState } from "react";

export default function FetchAsyncPage() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let isValidCall = true;
    (async function () {
      setIsLoading(true);
      try {
        const data = (await (
          await fetch("https://jsonplaceholder.typicode.com/posts")
        ).json()) as IPost[];
        if (isValidCall && data) {
          console.log("data", data);
          setPosts(data.slice(0, 10));
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
  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        posts.map((p) => (
          <div key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))
      )}
    </>
  );
}
