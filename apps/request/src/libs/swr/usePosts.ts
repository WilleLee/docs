import { IPost } from "@models/posts";
import { fetcher } from "@server/fetcher";
import useSWR from "swr";

export default function usePosts() {
  const { data: posts, isValidating } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher<IPost[]>,
  );

  return {
    posts,
    loading: !posts,
    isValidating,
  };
}
