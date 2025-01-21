import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function PetForm() {
  return (
    <form className="space-y-4">
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
        <Label htmlFor="ownerName">Notes</Label>
        <Input id="ownerName" type="text" />
      </div>
    </form>
  )
}
