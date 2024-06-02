import useSWR from "swr";
import fetcher from "./fetcher";
import { IPost } from "@models/posts";

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR("https://jsonplaceholder.typicode.com/posts", fetcher<IPost[]>, {
    refreshInterval: 1000 * 60,
  });

  return { posts, isLoading, isError: typeof error !== "undefined", error };
}
