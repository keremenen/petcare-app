import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./db"

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs when a user tries to sign in
        const { email, password } = credentials

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })

        if (!user) {
          console.log("User not found")
          return null
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        )
        if (!passwordsMatch) {
          console.log("Invalid credentials")
          return null
        }

        return user
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = Boolean(auth?.user)
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app")

      if (!isLoggedIn && isTryingToAccessApp) {
        return false
      }
      if (isLoggedIn && isTryingToAccessApp) {
        return true
      }
      if (isLoggedIn && !isTryingToAccessApp) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl))
      }
      if (!isTryingToAccessApp && !isTryingToAccessApp) {
        return true
      }
      return false
    },
  },
} satisfies NextAuthConfig

export const { auth, signIn, signOut } = NextAuth(config)
