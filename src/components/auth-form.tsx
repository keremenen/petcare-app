import React from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { logIn, signUp } from "@/actions/actions"
import { useFormStatus } from "react-dom"
import AuthFormBtn from "./auth-form-btn"

type AuthFormProps = {
  type: "signUp" | "logIn"
}

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form action={type === "logIn" ? logIn : signUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>

      <AuthFormBtn type={type} />
    </form>
  )
}
