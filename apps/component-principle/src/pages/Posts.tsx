import { IPost } from "@libs/types";
import { ReactNode } from "react";

interface PostsChildrenArgs {
  posts: IPost[];
}

interface ControllerProps {
  children: (args: PostsChildrenArgs) => ReactNode;
}

function Controller({ children }: ControllerProps) {
  if (!children || typeof children !== "function") return null;

  return children({
    posts: [],
  });
}

export const Posts = {
  Controller,
};
