import useSWR from "swr";
import fetcher from "../fetcher";
import { IPost } from "@models/posts";

export default function usePost(id: IPost["id"]) {
  const {
    data: post,
    isLoading,
    error,
  } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    fetcher<IPost>,
    {
      refreshInterval: 1000 * 60,
    },
  );

  return { post, isLoading, isError: typeof error !== "undefined", error };
}
