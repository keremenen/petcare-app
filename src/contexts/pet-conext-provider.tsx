"use client"
import { createContext, useState } from "react"

export const PetContext = createContext(null)

export default function PetContextProvider({
  data,
  children,
}: {
  children: React.ReactNode
}) {
  const [pets, setPets] = useState(data)
  const [selectedPet, setSelectedPet] = useState(null)

  return (
    <PetContext.Provider
      value={{
        pets,
        setPets,
        selectedPet,
        setSelectedPet,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
