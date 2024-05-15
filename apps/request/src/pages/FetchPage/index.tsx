import { IPost } from "@models/posts";
import { useEffect, useState } from "react";

export default function FetchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    let isValidCall = true;
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json() as Promise<IPost[]>;
      })
      .then((data) => {
        if (isValidCall) {
          console.log(data);
          setPosts(data.slice(0, 10));
        }
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
