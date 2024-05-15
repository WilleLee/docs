import { IPost } from "@models/posts";
import { useEffect, useState } from "react";

export default function XmlPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    let isValidRequest = true;
    setIsLoading(true);
    const xml = new XMLHttpRequest();

    xml.open("GET", "https://jsonplaceholder.typicode.com/posts");

    xml.send();

    xml.onload = () => {
      if (xml.status === 200) {
        const res = JSON.parse(xml.response) as IPost[];
        if (isValidRequest && res) {
          console.log("res", res);
          setPosts(res.slice(0, 10));
        }
      } else {
        throw new Error(`${xml.status}: ${xml.statusText}`);
      }
      setIsLoading(false);
    };

    return () => {
      isValidRequest = false;
    };
  }, []);
  return (
    <div>
      {isLoading
        ? "loading..."
        : posts.map((p) => (
            <div key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
    </div>
  );
}
