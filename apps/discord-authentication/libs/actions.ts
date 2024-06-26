"use server";

import { redirect } from "next/navigation";

export async function discord(formData: FormData) {
  console.log(process.env.DISCORD_GENERATED_URL as string);
  const discordUrl = process.env.DISCORD_GENERATED_URL as string;
  redirect(discordUrl);
}
