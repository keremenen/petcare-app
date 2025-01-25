"use client"
import { addPet } from "@/actions/actions"
import { Pet } from "@/lib/types"
import { createContext, useOptimistic, useState } from "react"

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
  data,
  children,
}: PetContextProviderProps) {
  // state
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)
  const [optimisticPets, setOptimisticPets] = useOptimistic(data)

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = optimisticPets.length()

  // handlers
  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    const error = await addPet(formData)
    if (error) {
      toast.error(error.message)
      return
    }

    await addPet(newPet)
  }

  const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
    // setPets((prev) =>
    //   prev.map((pet) => {
    //     if (pet.id === petId) {
    //       return {
    //         ...newPetData,
    //         id: pet.id,
    //       }
    //     }
    //     return pet
    //   }),
    // )
  }

  const handleSetSelectedPetId = (id: string) => {
    setSelectedPetId(id)
  }

  const handleCheckoutPet = (id: string) => {
    // const updatedPets = pets.filter((pet) => pet.id !== id)
    // setPets(updatedPets)
    // setSelectedPetId(null)
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
