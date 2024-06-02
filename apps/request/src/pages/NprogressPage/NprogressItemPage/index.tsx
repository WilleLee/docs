import { ReactNode, memo } from "react";
import { useParams } from "react-router-dom";
import usePost from "./usePost";
import { IPost } from "@models/posts";
import Header from "@components/Header";
import useNav from "@hooks/useNav";

export default function NprogressItemPage() {
  const { item } = useParams();
  const { goBack } = useNav();

  if (!item) return null;

  return (
    <>
      <Header onClickBack={goBack} />
      <Controller postId={Number(item)}>
        {({ post }) => (
          <>
            <Post post={post} />
          </>
        )}
      </Controller>
    </>
  );
}

interface ControllerProps {
  postId: IPost["id"];
  children: (args: { post: IPost }) => ReactNode;
}

function Controller({ postId, children }: ControllerProps) {
  const { post, isError, isLoading, error } = usePost(postId);

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

  if (isLoading || !post) return <p data-testid="loading">loading...</p>;

  return children({ post });
}

const Post = memo(function Post({ post }: { post: IPost }) {
  return (
    <div>
      <h3 data-testid="post_title">{post.title}</h3>
      <p data-testid="post_body">{post.body}</p>
    </div>
  );
});
