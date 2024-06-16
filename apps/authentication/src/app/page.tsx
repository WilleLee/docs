import { auth } from "@/auth";
import Header from "@/components/header";

export default async function HomePage() {
  const session = await auth();
  return (
    <>
      <Header />
      <h1>home</h1>
      <p>{JSON.stringify(session)}</p>
    </>
  );
}
