import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUsers } from "@lib/data";
import bcrypt from "bcrypt";

async function getUserByEmail(email: string) {
  try {
    const user = await getUsers().then((users) =>
      users.find((u) => u.email === email),
    );
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const parsedCrendentials = z
            .object({
              email: z.string().email(),
              password: z.string().min(6),
            })
            .safeParse(credentials);

          if (parsedCrendentials.success) {
            const { email, password } = parsedCrendentials.data;
            const user = await getUserByEmail(email);
            if (!user) {
              return null;
            }
            const isCorrectPassword = await bcrypt.compare(
              password,
              user.password,
            );
            if (isCorrectPassword) {
              return user;
            }
          }
          // return null;
          throw new Error("올바르지 않은 인증 정보입니다.");
        } catch (err) {
          console.error(err);
          throw new Error("회원 인증에 실패했습니다.");
        }
      },
    }),
  ],
});
