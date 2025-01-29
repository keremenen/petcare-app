import NextAuth, { NextAuthConfig } from "next-auth"

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized: ({ request }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app")

      if (isTryingToAccessApp) {
        return false
      } else {
        return true
      }
    },
  },
} satisfies NextAuthConfig

export const { auth } = NextAuth(config)
