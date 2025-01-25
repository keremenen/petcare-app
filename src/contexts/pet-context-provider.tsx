"use client"
import { addPet, checkoutPet, editPet } from "@/actions/actions"
import { PetEssentials } from "@/lib/types"
import { Pet } from "@prisma/client"
import { createContext, useOptimistic, useState } from "react"
import { toast } from "sonner"

type TPetContext = {
  pets: Pet[]
  selectedPetId: Pet["id"] | null
  selectedPet: Pet | undefined
  numberOfPets: number
  handleAddPet: (newPet: PetEssentials) => Promise<void>
  handleEditPet: (petId: Pet["id"], newPetData: PetEssentials) => Promise<void>
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>
  handleSetSelectedPetId: (id: Pet["id"]) => void
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
    (state, { action, payload }) => {
      // use switch statement to handle different actions
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }]
        case "edit":
          return state.map((pet) =>
            pet.id === payload.id ? { ...pet, ...payload.newPetData } : pet,
          )
        case "delete":
          return state.filter((pet) => pet.id !== payload)
        default:
          return state
      }
    },
  )

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = optimisticPets.length

  // handlers
  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: newPet })
    const error = await addPet(newPet)
    if (error) {
      toast.error(error.message)
      return
    }
  }

  const handleEditPet = async (petId: Pet["id"], newPetData: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { id: petId, newPetData } })
    const error = await editPet(selectedPet!.id, newPetData)

    if (error) {
      toast.error(error.message)
      return
    }
  }

  const handleCheckoutPet = async (petId: Pet["id"]) => {
    setOptimisticPets({ action: "delete", payload: petId })
    const error = await checkoutPet(petId)

    if (error) {
      toast.error(error.message)
      setSelectedPetId(null)
    }
  }

  const handleSetSelectedPetId = (id: Pet["id"]) => {
    setSelectedPetId(id)
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
