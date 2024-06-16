import Header from "@/components/header";
import LoginForm from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <h1>login</h1>
      <LoginForm />
    </>
  );
}
