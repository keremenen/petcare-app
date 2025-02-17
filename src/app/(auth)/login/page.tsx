import AuthForm from "@/components/auth-form"
import H1 from "@/components/h1"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main>
      <H1 className="mb-5 text-center">Log in</H1>

      <AuthForm type="logIn" />
      <p className="mt-6 text-sm text-zinc-500">
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  )
}
