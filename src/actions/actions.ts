"use server"

import { signIn } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { PetEssentials } from "@/lib/types"
import { petFormSchema, petIdSchema } from "@/lib/validations"
import { Pet } from "@prisma/client"
import { revalidatePath } from "next/cache"

// USER ACTIONS

export async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries())

  await signIn("credentials", authData)
}

// PET ACTIONS

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

export async function editPet(petId: unknown, newPetData: unknown) {
  const validatedPet = petFormSchema.safeParse(newPetData)
  const validatedPetId = petIdSchema.safeParse(petId)

  if (!validatedPet.success || !validatedPetId.success) {
    return { message: "Invalid pet data" }
  }

  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: validatedPet.data,
    })
  } catch (error) {
    return { message: "Could not edit pet" }
  }

  // simulate a delay 2 second
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the layout component in the /app route
  revalidatePath("/app", "layout")
}

export async function checkoutPet(petId: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId)
  if (!validatedPetId.success) {
    return { message: "Invalid pet data" }
  }

  try {
    await prisma.pet.delete({
      where: { id: validatedPetId.data },
    })
  } catch (error) {
    return { message: "Could not delete pet" }
  }

  // simulate a delay 2 second
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the layout component in the /app route
  revalidatePath("/app", "layout")
}
