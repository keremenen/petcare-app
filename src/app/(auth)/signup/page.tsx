import AuthForm from "@/components/auth-form"
import H1 from "@/components/h1"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <main>
      <H1 className="mb-5 text-center">Sign up</H1>

      <AuthForm type="signUp" />
      <p className="mt-6 text-sm text-zinc-500">
        Don't have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  )
}
