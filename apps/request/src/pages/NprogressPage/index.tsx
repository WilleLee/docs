import { ReactNode, memo, useCallback } from "react";
import usePosts from "./usePosts";
import { IPost } from "@models/posts";
import useNav from "@hooks/useNav";

export default function NprogressPage() {
  return (
    <Wrapper>
      <Controller>
        {({ posts, onClickPostItem }) => (
          <>
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onClickPostItem={onClickPostItem}
              />
            ))}
          </>
        )}
      </Controller>
    </Wrapper>
  );
}

interface ControllerProps {
  children: (args: {
    posts: IPost[];
    onClickPostItem: (id: IPost["id"]) => void;
  }) => ReactNode;
}

function Controller({ children }: ControllerProps) {
  const { push } = useNav();
  const { posts, isLoading, isError, error } = usePosts();

  const handleClickPostItem = useCallback(
    (id: IPost["id"]) => {
      push(`/nprogress/${id}`);
    },
    [push],
  );

  if (!children || typeof children !== "function") return null;

  if (isError)
    return (
      <div>
        <p>something went wrong!</p>
        {error.message && <p data-testid="error_message">{error.message}</p>}
        <button
          data-testid="refresh_button"
          onClick={() => {
            window.location.reload();
          }}
        >
          refresh
        </button>
      </div>
    );

  if (!posts || isLoading) return <p data-testid="loading">loading...</p>;

  return children({ posts, onClickPostItem: handleClickPostItem });
}

function Wrapper({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

const Post = memo(function Post({
  post,
  onClickPostItem,
}: {
  post: IPost;
  onClickPostItem: (id: IPost["id"]) => void;
}) {
  return (
    <div data-testid="post_container" onClick={() => onClickPostItem(post.id)}>
      <h3 data-testid="post_title">{post.title}</h3>
      <p data-testid="post_body">{post.body}</p>
    </div>
  );
});
