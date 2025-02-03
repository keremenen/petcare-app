"use client"
import { createCheckoutSesstion } from "@/actions/actions"
import H1 from "@/components/h1"
import { Button } from "@/components/ui/button"

export default function PaymentPage() {
  return (
    <main className="flex flex-col items-center gap-y-10">
      <H1>PetSoft access requires payment</H1>

      <Button
        onClick={async () => {
          await createCheckoutSesstion()
        }}
      >
        Buy lifetime access for 299$
      </Button>
    </main>
  )
}
