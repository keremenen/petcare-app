"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { PlusIcon } from "lucide-react"
import { DialogTrigger } from "@radix-ui/react-dialog"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import PetForm from "./pet-form"

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout"
  disabled?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

export default function PetButton({
  actionType,
  children,
  disabled,
  onClick,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  if (actionType === "checkout") {
    return (
      <Button variant={"secondary"} disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    )
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size={"icon"}>
            <PlusIcon className="!size-6" />
            {children}
          </Button>
        ) : (
          <Button variant={"secondary"} onClick={onClick}>
            {children}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubbmition={() => setIsFormOpen(false)}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
