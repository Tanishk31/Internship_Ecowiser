import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { NoteForm } from "./note-form"
import type { Note, NoteFormData } from "@/types/note"

interface EditNoteDialogProps {
  note: Note | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: NoteFormData) => void
}

export function EditNoteDialog({
  note,
  open,
  onOpenChange,
  onSubmit,
}: EditNoteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] shadow-lg shadow-primary/10 bg-gradient-to-br from-background to-primary/5">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight text-primary">
            {note ? "Edit" : "Create"} Note
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {note ? "Update your note details below." : "Add a new note to your collection."}
          </DialogDescription>
        </DialogHeader>
        <NoteForm
          initialData={note || undefined}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

