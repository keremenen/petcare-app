import { PetContext } from "@/contexts/pet-conext-provider"
import { useContext } from "react"

export function usePetContext() {
  const conext = useContext(PetContext)

  if (!conext) {
    throw new Error("usePetContext must be used within a PetContextProvider")
  }

  return conext
}
