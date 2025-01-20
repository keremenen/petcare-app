import AppFooter from "@/components/app-footer"
import AppHeader from "@/components/app-header"
import BackgroundPattern from "@/components/background-pattern"
import PetContextProvider from "@/contexts/pet-conext-provider"
import { Pet } from "@/lib/types"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets",
  )
  if (!response.ok) {
    throw new Error("Failed to fetch pets")
  }

  const data: Pet[] = await response.json()

  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <AppHeader />
        <PetContextProvider data={data}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  )
}
