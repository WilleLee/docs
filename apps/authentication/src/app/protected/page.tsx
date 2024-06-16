import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protected",
};

export default function ProtectedPage() {
  return (
    <>
      <Header />
      <h2>protected page</h2>
    </>
  );
}
