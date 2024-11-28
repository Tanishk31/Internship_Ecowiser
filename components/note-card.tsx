import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pin, PinOff, Clock } from 'lucide-react'
import type { Note } from "@/types/note"
import { format } from "date-fns"

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onTogglePin: (id: string, isPinned: boolean) => void
}

export function NoteCard({ note, onEdit, onTogglePin }: NoteCardProps) {
  return (
    <Card className="flex flex-col h-full group hover:shadow-lg transition-all duration-300 relative overflow-hidden border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
      {note.isPinned && (
        <div className="absolute top-0 right-0 w-16 h-16">
          <div className="absolute transform rotate-45 bg-primary text-primary-foreground text-xs py-1 right-[-40px] top-[32px] w-[170px] text-center">
            Pinned
          </div>
        </div>
      )}
      <CardHeader className="flex flex-row items-start justify-between space-y-0 group relative border-b border-border/50">
        <div className="space-y-1">
          <h3 className="font-semibold tracking-tight text-lg text-primary/80 hover:text-primary transition-colors">
            {note.title}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">{note.tagline}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-6 top-6 hover:bg-primary/10"
          onClick={() => onTogglePin(note.id, !note.isPinned)}
        >
          {note.isPinned ? 
            <PinOff className="h-4 w-4 text-primary/70 hover:text-primary transition-colors" /> : 
            <Pin className="h-4 w-4 text-primary/70 hover:text-primary transition-colors" />
          }
        </Button>
      </CardHeader>
      <CardContent className="flex-grow pt-4">
        <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
          {note.body}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-border/50">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{format(new Date(note.updatedAt), 'MMM d, yyyy')}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onEdit(note)}
          className="text-sm hover:text-primary hover:bg-primary/10 transition-colors"
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}

