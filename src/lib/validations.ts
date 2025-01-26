import { z } from "zod"
import { DEFAULT_PET_IMAGE } from "./constants"

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, {
        message: "Name should be at least 3 characterss",
      })
      .max(20, {
        message: "Name should be at most 20 characters",
      }),
    ownerName: z.string().trim().max(20),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Invalid URL" }),
    ]),
    age: z.coerce.number().int().positive().max(20),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }))

export type TPerForm = z.infer<typeof petFormSchema>
