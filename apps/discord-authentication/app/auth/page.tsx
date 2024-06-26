import { GlobalPortal } from "@app/global-portal";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  let user;
  let error = "";
  console.log("searchParams", searchParams);

  try {
    const res = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: searchParams.code }),
    });
    const json = await res.json();
    if (!res.ok) {
      error = json.error;
    } else {
      const { username, global_name, email } = json;
      user = { username, global_name, email };
    }
  } catch (err) {
    console.error(err);
    error = "인증에 실패했습니다.";
  }

  if (!error) {
    revalidatePath("/");
    redirect("/");
  }

  if (error.length > 0) {
    return (
      <GlobalPortal>
        <div>{error}</div>
      </GlobalPortal>
    );
  }

  return null;
}
