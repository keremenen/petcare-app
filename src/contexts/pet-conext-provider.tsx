"use client"
import { createContext, useState } from "react"

const PetContext = createContext(null)

export default function PetContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [pets, setPets] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)

  return (
    <PetContext.Provider
      value={{
        pets,
        setPets,
        selectedPet,
        setSelected,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
