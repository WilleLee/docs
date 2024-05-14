import {
  ButtonHTMLAttributes,
  ChangeEvent,
  Fragment,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IPost } from "@/models/posts";
import { css } from "@emotion/react";

export default function StartPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [reloader, setReloader] = useState(0);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [showWrite, setShowWrite] = useState(false);
  function toggleShowWrite() {
    setShowWrite((prev) => !prev);
  }
  const reloadPosts = useCallback(() => {
    setReloader((prev) => prev + 1);
  }, []);
  useEffect(() => {
    let isValidCall = true;
    (function () {
      return new Promise<IPost[]>((resolve, reject) => {
        setIsLoading(true);
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
        xhr.send();
        xhr.onload = () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.response);
            resolve(data);
          } else {
            reject(new Error(String(xhr.status)));
          }
        };
      });
    })()
      .then((data) => {
        if (data && isValidCall) {
          setPosts(data.slice(0, 10));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      isValidCall = false;
    };
  }, [reloader]);

  return (
    <div>
      <h2>start page</h2>
      <button onClick={toggleShowWrite}>
        {showWrite ? "dismiss" : "write"}
      </button>
      {showWrite && (
        <div
          css={css`
            border: 1px solid orange;
            border-radius: 5px;
          `}
        >
          <WriteWrapper reloadPosts={reloadPosts}>
            {({
              title,
              body,
              isSubmitting,
              onChangeTitle,
              onChangeBody,
              onSubmitPost,
            }) => (
              <Fragment>
                <Input
                  placeholder="title"
                  value={title}
                  onChange={onChangeTitle}
                />
                <Textarea
                  placeholder="body"
                  value={body}
                  onChange={onChangeBody}
                />
                <Button
                  onClick={onSubmitPost}
                  disabled={isSubmitting || !title || !body}
                >
                  submit
                </Button>
              </Fragment>
            )}
          </WriteWrapper>
        </div>
      )}
      <div>
        {isLoading
          ? "loading..."
          : posts.map((post) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
              </div>
            ))}
      </div>
    </div>
  );
}

interface WriteChildrenArgs {
  title: string;
  body: string;
  isSubmitting: boolean;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeBody: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmitPost: () => void;
}

interface WriteWrapperProps {
  reloadPosts: () => void;
  children: (args: WriteChildrenArgs) => ReactNode;
}

function WriteWrapper({ reloadPosts, children }: WriteWrapperProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetAll = useCallback(() => {
    setTitle("");
    setBody("");
  }, []);

  const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.trimStart());
  }, []);

  const handleChangeBody = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setBody(e.target.value);
    },
    [],
  );

  const handleSubmitPost = useCallback(() => {
    (function () {
      return new Promise<IPost[]>((resolve, reject) => {
        setIsSubmitting(true);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
        xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
        xhr.send(
          JSON.stringify({
            title,
            body,
            useId: 333,
          }),
        );
        xhr.onload = () => {
          if (xhr.status === 201) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(new Error(`${xhr.status}: ${xhr.statusText}`));
          }
        };
      });
    })()
      .then((data) => {
        console.log("created: ", data);
        resetAll();
        reloadPosts();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [title, body, reloadPosts, resetAll]);

  if (!children || typeof children !== "function") return null;

  return children({
    title,
    body,
    isSubmitting,
    onChangeTitle: handleChangeTitle,
    onChangeBody: handleChangeBody,
    onSubmitPost: handleSubmitPost,
  });
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...rest }: InputProps) {
  return <input {...rest} />;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

function Textarea({ ...rest }: TextareaProps) {
  return <textarea {...rest} />;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...rest }: ButtonProps) {
  return <button {...rest}>{children}</button>;
}
