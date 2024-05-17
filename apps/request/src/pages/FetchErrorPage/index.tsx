import { GlobalPortal } from "@/GlobalPortal";
import { css, keyframes } from "@emotion/react";
import { IPost } from "@models/posts";
import { memo, useCallback, useEffect, useState, useTransition } from "react";

const spin = keyframes`
  0% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(380deg);
  }
`;

export default function FetchErrorPage() {
  const [isPending, startTransition] = useTransition();
  const [selectedPostId, setSelectPostId] = useState<IPost["id"] | null>(null);
  const updatePostId = useCallback(
    (id: IPost["id"]) => {
      if (isPending) return;
      startTransition(() => {
        setSelectPostId(id);
      });
    },
    [isPending],
  );
  return (
    <>
      <Post postId={selectedPostId} />
      <Posts selectedPostId={selectedPostId} selectPostId={updatePostId} />
    </>
  );
}

function Posts({
  selectedPostId,
  selectPostId,
}: {
  selectedPostId: IPost["id"] | null;
  selectPostId: (id: IPost["id"]) => void;
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
            setPosts(data.slice(0, 30));
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
        selectedPostId={selectedPostId}
      />
    </>
  );
}

const PostsView = memo(function PostsView({
  posts,
  isLoading,
  selectedPostId,
  selectPostId,
}: {
  posts: IPost[];
  isLoading: boolean;
  selectedPostId: IPost["id"] | null;
  selectPostId: (id: IPost["id"]) => void;
}) {
  if (isLoading) return <p>loading...</p>;
  return posts.map((p) => (
    <div
      key={p.id}
      onClick={() => {
        selectPostId(p.id);
      }}
    >
      <h5
        css={css`
          opacity: ${selectedPostId === p.id ? "0.5" : "1"};
        `}
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
    let isValidCall = true;
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
          if (isValidCall) {
            const now = Date.now();
            while (Date.now() < now + 2000);
            setPost(data);
          }
        } else {
          throw new Error(`${res.status}`);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      isValidCall = false;
    };
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
  if (!post) return null;
  return (
    <div
      css={css`
        width: 280px;
        height: 180px;
        border: 2px solid orange;
        overflow-y: scroll;
        padding: 4px 8px;
      `}
    >
      <h6>{post.title}</h6>
      <p>{post.body}</p>
      {isLoading && (
        <GlobalPortal.Consumer>
          <div
            css={css`
              z-index: 999;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.3);
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <div
              css={css`
                width: 32px;
                height: 32px;
                border-radius: 50%;
                border: 4px solid transparent;
                border-top: 4px solid orange;
                animation: ${spin} 1s ease-in-out infinite;
              `}
            />
          </div>
        </GlobalPortal.Consumer>
      )}
    </div>
  );
});
