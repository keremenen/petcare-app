import AppFooter from "@/components/app-footer"
import AppHeader from "@/components/app-header"
import BackgroundPattern from "@/components/background-pattern"
import PetContextProvider from "@/contexts/pet-context-provider"
import SearchContextProvider from "@/contexts/search-context-provider"
import { prisma } from "@/lib/db"
import { Pet } from "@/lib/types"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await prisma.pet.findMany()

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
    </>
  )
}
