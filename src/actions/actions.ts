"use server"

import { signIn, signOut } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { checkAuth, getPetByPetId } from "@/lib/server-utils"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// AUTH ACTIONS

export async function logOut() {
  await signOut({ redirectTo: "/" })
}

// USER ACTIONS

export async function logIn(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return { message: "Invalid credentials" }
  }
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials" }

        default:
          return { message: "Sign in error" }
      }
    }
    throw error // rethrow the error if it's not an AuthError
  }
  redirect("/app/dashboard")
}

export async function signUp(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return { message: "Invalid credentials" }
  }

  const formDataFromEntries = Object.fromEntries(formData.entries())

  const validatedFormData = authSchema.safeParse(formDataFromEntries)

  if (!validatedFormData.success) {
    return { message: "Invalid credentials" }
  }

  const { email, password } = validatedFormData.data

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Email already exists" }
      }
    }
  }

  await signIn("credentials", formData)
}

// PET ACTIONS

export async function addPet(pet: unknown) {
  const session = await checkAuth()

  const validatedPet = petFormSchema.safeParse(pet)
  if (!validatedPet.success) {
    return { message: "Invalid pet data" }
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user?.id,
          },
        },
      },
    })
  } catch (error) {
    return { message: "Could not add pet" }
  }

  // Revalidate the layout component in the /app route
  revalidatePath("/app", "layout")
}

export async function editPet(petId: unknown, newPetData: unknown) {
  const session = await checkAuth()

  const validatedPet = petFormSchema.safeParse(newPetData)
  const validatedPetId = petIdSchema.safeParse(petId)

  if (!validatedPet.success || !validatedPetId.success) {
    return { message: "Invalid pet data" }
  }

  const pet = await getPetByPetId(validatedPetId.data)

  if (!pet) {
    return { message: "Pet not found" }
  }

  if (pet.userId !== session.user.id) {
    return { message: "Unauthorized" }
  }

  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: validatedPet.data,
    })
  } catch (error) {
    return { message: "Could not edit pet" }
  }

  // Revalidate the layout component in the /app route
  revalidatePath("/app", "layout")
}

export async function checkoutPet(petId: unknown) {
  const session = await checkAuth()

  const validatedPetId = petIdSchema.safeParse(petId)
  if (!validatedPetId.success) {
    return { message: "Invalid pet data" }
  }

  // authorization check
  const pet = await getPetByPetId(validatedPetId.data)

  if (!pet) {
    return { message: "Pet not found" }
  }

  if (pet.userId !== session.user.id) {
    return { message: "Unauthorized" }
  }

  try {
    await prisma.pet.delete({
      where: { id: validatedPetId.data },
    })
  } catch (error) {
    return { message: "Could not delete pet" }
  }

  // Revalidate the layout component in the /app route
  revalidatePath("/app", "layout")
}

export async function createCheckoutSesstion() {
  //authorization check
  const session = await checkAuth()

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: "price_1QoTIqLtr5TopiJH92iz11FO",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?canceled=true`,
  })

  redirect(checkoutSession.url)
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}
