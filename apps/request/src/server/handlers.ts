import { IPost } from "@models/posts";
import { fetcher } from "./fetcher";
import { ITodo } from "@models/todos";

interface IResponse<T> {
  ok: boolean;
  data: T | null;
  error?: unknown;
}

export async function getPosts(): Promise<IResponse<IPost[]>> {
  try {
    const result = await fetcher<IPost[]>(
      "https://jsonplaceholder.typicode.com/posts",
    );
    return {
      ok: true,
      data: result.slice(0, 10),
    };
  } catch (err) {
    return {
      ok: false,
      data: null,
      error: err,
    };
  }
}

export async function getTodo(todoId: ITodo["id"]) {
  try {
    const apiUrl = `https://jsonplaceholder.typicode.com/todos/${todoId}`;
    const result = await fetcher<ITodo>(apiUrl);
    delay(1500);
    return {
      ok: true,
      data: result,
    };
  } catch (err) {
    return {
      ok: false,
      data: null,
      error: err,
    };
  }
}

export async function putTodo(todo: ITodo): Promise<IResponse<ITodo>> {
  try {
    const apiUrl = `https://jsonplaceholder.typicode.com/todos/${todo.id}`;
    const result = await fetcher<ITodo>(apiUrl, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(todo),
    });
    delay();
    return {
      ok: true,
      data: result,
    };
  } catch (err) {
    return {
      ok: false,
      data: null,
      error: err,
    };
  }
}

export async function getTodos(): Promise<IResponse<ITodo[]>> {
  try {
    const result = await fetcher<ITodo[]>(
      "https://jsonplaceholder.typicode.com/todos",
    );
    return {
      ok: true,
      data: result.slice(0, 10),
    };
  } catch (err) {
    return {
      ok: false,
      data: null,
      error: err,
    };
  }
}

function delay(d?: number) {
  if (!d) d = 500;
  const until = Date.now() + d;
  while (Date.now() < until);
}
