import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedin = !!auth?.user;
      const isOnProtectedRoutes = nextUrl?.pathname.startsWith("/protected");
      const isOnLoginPage = nextUrl?.pathname.startsWith("/login");

      if (isOnProtectedRoutes) {
        if (isLoggedin) {
          return true;
        } else {
          return false;
        }
      }

      if (isOnLoginPage && isLoggedin) {
        return NextResponse.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
