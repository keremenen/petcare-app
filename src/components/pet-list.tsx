"use client"
import { usePetContext } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function PetList() {
  const { pets, handleSetSelectedPetId, selectedPetId } = usePetContext()

  return (
    <ul className="border-light border-b bg-white">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleSetSelectedPetId(pet.id)}
            className={cn(
              "flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#EFF1F2] focus:bg-[#EFF1F2]",
              {
                "bg-[#EFF1F2]": selectedPetId === pet.id,
              },
            )}
          >
            <Image
              src={pet.imageUrl}
              alt={pet.name}
              width={45}
              height={45}
              className="size-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}
