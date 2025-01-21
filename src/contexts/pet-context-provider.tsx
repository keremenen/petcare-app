"use client"
import { Pet } from "@/lib/types"
import { createContext, useState } from "react"

type TPetContext = {
  pets: Pet[]
  selectedPetId: string | null
  selectedPet: Pet | undefined
  numberOfPets: number
  handleAddPet: (newPet: Omit<Pet, "id">) => void
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
  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    setPets([...pets, newPet])
  }

  const handleSetSelectedPetId = (id: string) => {
    setSelectedPetId(id)
  }

  const handleCheckoutPet = (id: string) => {
    const updatedPets = pets.filter((pet) => pet.id !== id)
    setPets(updatedPets)
    setSelectedPetId(null)
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleAddPet,
        handleCheckoutPet,
        handleSetSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
