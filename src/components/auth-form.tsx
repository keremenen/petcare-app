"use client"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { logIn, signUp } from "@/actions/actions"
import { useFormState, useFormStatus } from "react-dom"
import AuthFormBtn from "./auth-form-btn"

type AuthFormProps = {
  type: "signUp" | "logIn"
}

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined)
  return (
    <form action={type === "logIn" ? logIn : dispatchSignUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>

      <AuthFormBtn type={type} />
      {signUpError && (
        <p className="text-sm text-red-500">{signUpError.message}</p>
      )}
    </form>
  )
}
