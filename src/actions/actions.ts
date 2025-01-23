"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addPet(formData) {
  await prisma.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),
      imageUrl:
        formData.get("imageUrl") ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: parseInt(formData.get("age")),
      notes: formData.get("notes"),
    },
  })

  // simulate a delay 2 second
  await new Promise((resolve) => setTimeout(resolve, 2000))
  // Revalidate the layout component in the /app route
  revalidatePath("/app", "layout")
}
