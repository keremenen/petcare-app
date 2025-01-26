"use client"
import { usePetContext } from "@/lib/hooks"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import PetFormButton from "./pet-form-button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type PetFormProps = {
  actionType: "add" | "edit"
  onFormSubbmition: () => void
}

type TPerForm = {
  name: string
  ownerName: string
  imageUrl: string
  age: number
  notes: string
}

const petFormSchema = z.object({
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

export default function PetForm({
  actionType,
  onFormSubbmition,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext()
  const {
    register,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<TPerForm>({
    resolver: zodResolver(petFormSchema),
  })

  return (
    <form
      className="flex flex-col"
      action={async (formData) => {
        const result = await trigger()
        if (!result) return

        onFormSubbmition()

        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl:
            (formData.get("imageUrl") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          age: Number(formData.get("age")),
          notes: formData.get("notes") as string,
        }

        if (actionType === "add") {
          await handleAddPet(petData)
        } else if (actionType === "edit") {
          await handleEditPet(selectedPet!.id, petData)
        }
      }}
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="ownerName">Owner name</Label>
          <Input
            id="ownerName"
            {...register("ownerName")}
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>
      <PetFormButton actionType={actionType} />
    </form>
  )
}
