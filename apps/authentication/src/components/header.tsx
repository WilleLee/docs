import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  const isLoggedin = typeof session?.user?.email === "string";
  return (
    <header>
      <Link href="/">
        <button>Home</button>
      </Link>
      <h1>Authentication Tests</h1>
      {isLoggedin && (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button>sign out</button>
        </form>
      )}
      {!isLoggedin && (
        <Link href="/login">
          <button>log in</button>
        </Link>
      )}
    </header>
  );
}
