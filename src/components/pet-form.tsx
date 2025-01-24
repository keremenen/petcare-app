"use client"
import { usePetContext } from "@/lib/hooks"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { addPet } from "@/actions/actions"
import { on } from "events"
import PetFormButton from "./pet-form-button"
import { toast } from "sonner"

type PetFormProps = {
  actionType: "add" | "edit"
  onFormSubbmition: () => void
}

export default function PetForm({
  actionType,
  onFormSubbmition,
}: PetFormProps) {
  const { selectedPet } = usePetContext()

  return (
    <form
      className="flex flex-col"
      action={async (formData) => {
        const error = await addPet(formData)

        if (error) {
          toast.error(error.message)
          return
        }

        onFormSubbmition()
      }}
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
        </div>

        <div>
          <Label htmlFor="ownerName">Owner name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          />
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            required
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
          />
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
            required
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>
      <PetFormButton actionType={actionType} />
    </form>
  )
}
