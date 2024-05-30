import usePosts from "@libs/swr/usePosts";
import { IPost } from "@models/posts";
import { ReactNode } from "react";

export default function SwrPage() {
  return (
    <div>
      <h1>swr page</h1>
      <Controller>
        {({ posts }) => {
          return posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ));
        }}
      </Controller>
    </div>
  );
}

interface ControllerChildrenProps {
  posts: IPost[];
}

interface ControllerProps {
  children: (args: ControllerChildrenProps) => ReactNode;
}

function Controller({ children }: ControllerProps) {
  const { posts, loading, isValidating } = usePosts();

  if (!children || typeof children !== "function") return null;

  if (loading || isValidating || posts === undefined)
    return <div data-testid="posts_loading_indicator">loading...</div>;

  return children({ posts });
}
