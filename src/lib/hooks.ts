import { PetContext } from "@/contexts/pet-context-provider"
import { SearchContext } from "@/contexts/search-context-provider"
import { useContext } from "react"

export function usePetContext() {
  const conext = useContext(PetContext)

  if (!conext) {
    throw new Error("usePetContext must be used within a PetContextProvider")
  }

  return conext
}

export function useSearchContext() {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider",
    )
  }

  return context
}
