import AppFooter from "@/components/app-footer"
import AppHeader from "@/components/app-header"
import BackgroundPattern from "@/components/background-pattern"
import PetContextProvider from "@/contexts/pet-conext-provider"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <AppHeader />
        <PetContextProvider>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  )
}
