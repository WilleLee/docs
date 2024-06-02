import usePosts from "./usePosts";

export default function NprogressPage() {
  const { posts, isLoading, isError, error } = usePosts();

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

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h3 data-testid="post_title">{post.title}</h3>
          <p data-testid="post_body">{post.body}</p>
        </div>
      ))}
    </>
  );
}
