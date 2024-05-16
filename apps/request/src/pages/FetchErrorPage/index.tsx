import { css } from "@emotion/react";
import { IPost } from "@models/posts";
import { memo, useCallback, useEffect, useState, useTransition } from "react";

export default function FetchErrorPage() {
  const [isPending, startTransition] = useTransition();
  const [selectedPostId, setSelectPostId] = useState<IPost["id"] | null>(null);
  const updatePostId = useCallback((id: IPost["id"]) => {
    startTransition(() => {
      setSelectPostId(id);
    });
  }, []);
  return (
    <>
      <Post postId={selectedPostId} />
      <Posts selectPostId={updatePostId} isPending={isPending} />
    </>
  );
}

function Posts({
  selectPostId,
  isPending,
}: {
  selectPostId: (id: IPost["id"]) => void;
  isPending: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";
  useEffect(() => {
    let isValidCall = true;
    setIsLoading(true);
    (async function () {
      try {
        const res = await fetch(apiUrl);

        if (res.status === 200) {
          const data = (await res.json()) as IPost[];
          if (isValidCall) {
            setPosts(data.slice(0, 10));
          }
        } else {
          throw new Error(`${res.status}`);
        }
      } catch (err) {
        throw new Error("500");
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      isValidCall = false;
    };
  }, []);
  return (
    <>
      <PostsView
        posts={posts}
        isLoading={isLoading}
        selectPostId={selectPostId}
        isPending={isPending}
      />
    </>
  );
}

const PostsView = memo(function PostsView({
  posts,
  isLoading,
  selectPostId,
  isPending,
}: {
  posts: IPost[];
  isLoading: boolean;
  selectPostId: (id: IPost["id"]) => void;
  isPending: boolean;
}) {
  if (isLoading) return <p>loading...</p>;
  return posts.map((p) => (
    <div
      key={p.id}
      onClick={() => {
        if (isPending) return;
        selectPostId(p.id);
      }}
    >
      <h5
        style={{
          opacity: isPending ? "0.6" : "1",
        }}
      >
        {p.title}
      </h5>
    </div>
  ));
});

function Post({ postId }: { postId: IPost["id"] | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<IPost | null>(null);
  useEffect(() => {
    (async function () {
      if (!postId) {
        setPost(null);
        return;
      }
      setIsLoading(true);
      try {
        const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
        const res = await fetch(apiUrl);
        if (res.status === 200) {
          const data = (await res.json()) as IPost;
          setPost(data);
        } else {
          throw new Error(`${res.status}`);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [postId]);
  return <PostView post={post} isLoading={isLoading} />;
}

const PostView = memo(function PostView({
  post,
  isLoading,
}: {
  post: IPost | null;
  isLoading: boolean;
}) {
  if (isLoading) return <p>loading...</p>;
  if (!post) return null;
  return (
    <div
      css={css`
        width: 280px;
        border: 2px solid orange;
      `}
    >
      <p>{post.body}</p>
    </div>
  );
});
