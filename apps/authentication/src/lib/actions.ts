"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

type State = {
  isError: boolean;
  message: string;
};

export async function authenticate(
  prevState: State | void,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (err) {
    return {
      isError: true,
      message: "회원 인증에 실패했습니다.",
    };
  }
}
