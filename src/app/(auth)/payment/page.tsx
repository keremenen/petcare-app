"use client"
import { createCheckoutSesstion } from "@/actions/actions"
import H1 from "@/components/h1"
import { use, useTransition } from "react"
import { Button } from "@/components/ui/button"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function PaymentPage(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const [isPending, startTransition] = useTransition()

  return (
    <main className="flex flex-col items-center gap-y-10">
      <H1>PetSoft access requires payment</H1>
      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSesstion()
            })
          }}
        >
          Buy lifetime access for 299$
        </Button>
      )}
      {searchParams.success && (
        <p className="text-sm text-green-700">
          Payment successful! You now have lifetime access to PetSoft
        </p>
      )}
      {searchParams.canceled && (
        <p className="text-sm text-red-700">
          Payment canceled! You need to pay to access PetSoft
        </p>
      )}
    </main>
  )
}
