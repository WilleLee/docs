import { IPost } from "@models/posts";
import { useEffect, useState } from "react";

export default function XmlPromisePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    let isValidCall = true;
    (function () {
      return new Promise<IPost[]>((resolve, reject) => {
        setIsLoading(true);
        const xml = new XMLHttpRequest();
        xml.open("GET", "https://jsonplaceholder.typicode.com/posts");
        xml.send();
        xml.onload = () => {
          if (xml.status === 200) {
            resolve(JSON.parse(xml.response));
          } else {
            reject(new Error(`${xml.status} : ${xml.statusText}`));
          }
        };
      });
    })()
      .then((data) => {
        if (isValidCall && data) {
          console.log("data", data);
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
