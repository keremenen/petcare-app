"use client"
import { usePetContext } from "@/lib/hooks"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import PetFormButton from "./pet-form-button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DEFAULT_PET_IMAGE } from "@/lib/constants"
import { petFormSchema, TPerForm } from "@/lib/validations"

type PetFormProps = {
  actionType: "add" | "edit"
  onFormSubbmition: () => void
}

export default function PetForm({
  actionType,
  onFormSubbmition,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext()
  const {
    register,
    getValues,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<TPerForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: actionType === "edit" ? selectedPet?.name : "",
      ownerName: actionType === "edit" ? selectedPet?.ownerName : "",
      imageUrl: actionType === "edit" ? selectedPet?.imageUrl : "",
      age: actionType === "edit" ? selectedPet?.age : undefined,
      notes: actionType === "edit" ? selectedPet?.notes : "",
    },
  })

  return (
    <form
      className="flex flex-col"
      action={async () => {
        const result = await trigger()
        if (!result) return

        onFormSubbmition()

        const petData = getValues()
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE

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
