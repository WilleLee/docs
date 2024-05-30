import { ITodo } from "@libs/types";
import { ReactNode } from "react";

interface TodosChildrenArgs {
  todos: ITodo[];
}

interface ControllerProps {
  children: (args: TodosChildrenArgs) => ReactNode;
}

function Controller({ children }: ControllerProps) {
  if (!children || typeof children !== "function") return null;

  return children({ todos: [] });
}

export const Todos = {
  Controller,
};
