"use client"
import { Button } from "./ui/button"
import { useFormStatus } from "react-dom"

type AuthFormBtnProps = {
  type: "signUp" | "logIn"
}

export default function AuthFormBtn({ type }: AuthFormBtnProps) {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending}>
      {type === "signUp" ? "Sign up" : "Log in"}
    </Button>
  )
}
