"use client"
import { usePetContext } from "@/lib/hooks"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import PetFormButton from "./pet-form-button"

type PetFormProps = {
  actionType: "add" | "edit"
  onFormSubbmition: () => void
}

export default function PetForm({
  actionType,
  onFormSubbmition,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext()

  return (
    <form
      className="flex flex-col"
      action={async (formData) => {
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
