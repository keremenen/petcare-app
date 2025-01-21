"use client"
import { Pet } from "@/lib/types"
import { createContext, useState } from "react"

type TPetContext = {
  pets: Pet[]
  selectedPetId: string | null
  selectedPet: Pet | undefined
  numberOfPets: number
  handleCheckoutPet: (id: string) => void
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
  // state
  const [pets, setPets] = useState(data)
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = pets.length

  // handlers
  const handleSetSelectedPetId = (id: string) => {
    setSelectedPetId(id)
  }

  const handleCheckoutPet = (id: string) => {
    const updatedPets = pets.filter((pet) => pet.id !== id)
    setPets(updatedPets)
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleCheckoutPet,
        handleSetSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
