"use client"
import { usePetContext } from "@/lib/hooks"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

type PetFormProps = {
  actionType: "add" | "edit"
}

export default function PetForm({ actionType }: PetFormProps) {
  const { handleAddPet } = usePetContext()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const newPet = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl: formData.get("imageUrl") as string,
      age: parseInt(formData.get("age") as string),
      notes: formData.get("notes") as string,
    }

    handleAddPet(newPet)
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" required />
        </div>

        <div>
          <Label htmlFor="ownerName">Owner name</Label>
          <Input id="ownerName" name="ownerName" type="text" required />
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" type="text" />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" required />
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" rows={4} required />
        </div>
      </div>
      <Button type="submit" className="mt-4 self-end">
        {actionType === "add" ? "Add pet" : "Save changes"}
      </Button>
    </form>
  )
}
