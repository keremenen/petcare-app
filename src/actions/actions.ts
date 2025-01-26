"use server"

import { prisma } from "@/lib/db"
import { PetEssentials } from "@/lib/types"
import { petFormSchema } from "@/lib/validations"
import { Pet } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function addPet(pet: unknown) {
  const validatedPet = petFormSchema.safeParse(pet)
  if (!validatedPet.success) {
    return { message: "Invalid pet data" }
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    })
  } catch (error) {
    return { message: "Could not add pet" }
  }

  // simulate a delay 2 second
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Revalidate the layout component in the /app route
  revalidatePath("/app", "layout")
}

export async function editPet(petId: Pet["id"], newPetData: PetEssentials) {
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: newPetData,
    })
  } catch (error) {
    return { message: "Could not edit pet" }
  }

  // simulate a delay 2 second
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the layout component in the /app route
  revalidatePath("/app", "layout")
}

export async function checkoutPet(petId: Pet["id"]) {
  try {
    await prisma.pet.delete({
      where: { id: petId },
    })
  } catch (error) {
    return { message: "Could not delete pet" }
  }

  // simulate a delay 2 second
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the layout component in the /app route
  revalidatePath("/app", "layout")
}
