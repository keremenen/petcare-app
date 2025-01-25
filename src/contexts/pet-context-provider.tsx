"use client"
import { addPet, checkoutPet, editPet } from "@/actions/actions"
import { Pet } from "@/lib/types"
import { createContext, useOptimistic, useState } from "react"
import { toast } from "sonner"

type TPetContext = {
  pets: Pet[]
  selectedPetId: string | null
  selectedPet: Pet | undefined
  numberOfPets: number
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => Promise<void>
  handleCheckoutPet: (id: string) => Promise<void>
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
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, newPet) => {
      return [...state, newPet]
    },
  )

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = optimisticPets.length

  // handlers
  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setOptimisticPets(newPet)
    const error = await addPet(newPet)
    if (error) {
      toast.error(error.message)
      return
    }
  }

  const handleEditPet = async (petId: string, newPetData: Omit<Pet, "id">) => {
    const error = await editPet(selectedPet!.id, newPetData)

    if (error) {
      toast.error(error.message)
      return
    }
  }

  const handleSetSelectedPetId = (id: string) => {
    setSelectedPetId(id)
  }

  const handleCheckoutPet = async (petId: string) => {
    await checkoutPet(petId)
    setSelectedPetId(null)
  }

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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
