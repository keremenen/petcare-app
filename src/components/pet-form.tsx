import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

type PetFormProps = {
  actionType: "add" | "edit"
}

export default function PetForm({ actionType }: PetFormProps) {
  return (
    <form className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" />
        </div>

        <div>
          <Label htmlFor="ownerName">Owner name</Label>
          <Input id="ownerName" type="text" />
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" type="text" />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" />
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" rows={4} />
        </div>
      </div>
      <Button type="submit" className="mt-4 self-end">
        {actionType === "add" ? "Add pet" : "Save changes"}
      </Button>
    </form>
  )
}
