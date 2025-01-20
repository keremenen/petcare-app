"use client"
import { Pet } from "@/lib/types"
import { createContext, useState } from "react"

type TPetContext = {
  pets: Pet[]
  selectedPetId: string | null
  handleSetSelectedPetId: (id: string) => void
}

export const PetContext = createContext<TPetContext | null>(null)

type PetContextProviderProps = {
  data: Pet[]
  children: React.ReactNode
}

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [pets, setPets] = useState(data)
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const handleSetSelectedPetId = (id: string) => {
    setSelectedPetId(id)
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSetSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
