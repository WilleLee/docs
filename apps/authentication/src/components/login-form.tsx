"use client";

import { authenticate } from "@lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, {
    isError: false,
    message: "",
  });

  return (
    <form action={dispatch}>
      <input
        type="text"
        name="email"
        placeholder="이메일을 입력해주세요."
        required
        minLength={2}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        required
        minLength={6}
      />
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="cursor-pointer disabled:cursor-not-allowed"
      aria-disabled={pending}
      disabled={pending}
    >
      로그인
    </button>
  );
}
