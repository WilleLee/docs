import { IPost } from "@models/posts";
import nProgress from "nprogress";
import useSWR from "swr";

function delay(time: number = 500) {
  return new Promise((res) => setTimeout(res, time));
}

async function fetcher<T>(input: RequestInfo, init?: RequestInit) {
  nProgress.start();
  try {
    await delay(300);
    const res = await fetch(input, init);
    const data = (await res.json()) as T;
    if (!res.ok) throw new Error(`Failed to fetch data (CODE : ${res.status})`);
    return data;
  } catch (err) {
    throw new Error("Failed to fetch data");
  } finally {
    nProgress.done();
  }
}

function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR("https://jsonplaceholder.typicode.com/posts", fetcher<IPost[]>, {
    refreshInterval: 1000 * 60,
  });

  return { posts, isLoading, isError: typeof error !== "undefined", error };
}

export default function NprogressPage() {
  const { posts, isLoading, isError, error } = usePosts();

  if (isError)
    return (
      <div>
        <p>something went wrong!</p>
        {error.message && <p>{error.message}</p>}
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          refresh
        </button>
      </div>
    );

  if (!posts || isLoading) return <p>loading...</p>;

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
        </div>
      ))}
    </>
  );
}
