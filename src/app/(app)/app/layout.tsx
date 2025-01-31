import AppFooter from "@/components/app-footer"
import AppHeader from "@/components/app-header"
import BackgroundPattern from "@/components/background-pattern"
import { Toaster } from "@/components/ui/sonner"
import PetContextProvider from "@/contexts/pet-context-provider"
import SearchContextProvider from "@/contexts/search-context-provider"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { checkAuth } from "@/lib/server-utils"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await checkAuth()

  const data = await prisma.pet.findMany({
    where: {
      userId: session.user?.id,
    },
  })

  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  )
}
