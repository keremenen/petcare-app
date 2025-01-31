import "server-only"
import { redirect } from "next/navigation"
import { auth } from "./auth"
import { Pet, User } from "@prisma/client"
import { prisma } from "./db"

export async function checkAuth() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  return session
}

export async function getPetsByUserId(userId: User["id"]) {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  })

  return pets
}

export async function getPetByPetId(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
  })

  return pet
}
