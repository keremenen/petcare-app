"use client"
import { addPet } from "@/actions/actions"
import { Pet } from "@/lib/types"
import { createContext, useState } from "react"

type TPetContext = {
  pets: Pet[]
  selectedPetId: string | null
  selectedPet: Pet | undefined
  numberOfPets: number
  handleAddPet: (newPet: Omit<Pet, "id">) => void
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => void
  handleCheckoutPet: (id: string) => void
  handleSetSelectedPetId: (id: string) => void
}

export const PetContext = createContext<TPetContext | null>(null)

type PetContextProviderProps = {
  data: Pet[]
  children: React.ReactNode
}

export default function PetContextProvider({
  data: pets,
  children,
}: PetContextProviderProps) {
  // state
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = pets.length

  // handlers
  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    // setPets((prev) => [
    //   ...prev,
    //   {
    //     ...newPet,
    //     id: Date.now().toString(),
    //   },
    // ])

    await addPet(newPet)
  }

  const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
    setPets((prev) =>
      prev.map((pet) => {
        if (pet.id === petId) {
          return {
            ...newPetData,
            id: pet.id,
          }
        }
        return pet
      }),
    )
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
        handleEditPet,
        handleAddPet,
        handleCheckoutPet,
        handleSetSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
