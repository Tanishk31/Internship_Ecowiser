'use client'

import { useState } from "react"
import { Plus, StickyNote } from 'lucide-react'
import { Button } from "@/components/ui/button"                     
import { NoteCard } from "@/components/note-card"
import { EditNoteDialog } from "@/components/edit-note-dialog"
import { Pagination } from "@/components/pagination"
import type { Note, NoteFormData } from "@/types/note"

const NOTES_PER_PAGE = 6

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Sort notes: pinned first, then by date
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  // Calculate pagination
  const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE) || 1
  const startIndex = (currentPage - 1) * NOTES_PER_PAGE
  const endIndex = startIndex + NOTES_PER_PAGE
  const currentNotes = sortedNotes.slice(startIndex, endIndex)

  const handleAddNote = (data: NoteFormData) => {
    const newNote: Note = {
      id: Date.now().toString(),
      ...data,
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setNotes((prev) => [...prev, newNote])
    setIsDialogOpen(false)
  }

  const handleEditNote = (data: NoteFormData) => {
    if (!selectedNote) return
    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedNote.id
          ? {
              ...note,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    )
    setSelectedNote(null)
    setIsDialogOpen(false)
  }

  const handleTogglePin = (id: string, isPinned: boolean) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              isPinned,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    )
  }

  return (
    // <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10">
    //   <div className="container py-12 px-16">
    //     <div className="flex justify-between items-center mb-12 mx-8">
    //       <div className="flex items-center space-x-4">
    //         <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-3 rounded-lg border border-primary/20 shadow-lg shadow-primary/5">
    //           <StickyNote className="h-6 w-6 text-primary" />
    //         </div>
    //         <div>
    //           <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
    //             Notes
    //           </h1>
    //           <p className="text-muted-foreground mt-1">
    //             Capture your thoughts and ideas
    //           </p>
    //         </div>
    //       </div>
    //       <Button 
    //         onClick={() => setIsDialogOpen(true)}
    //         size="lg"
    //         className="shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary"
    //       >
    //         <Plus className="h-4 w-4 mr-2" />
    //         Add Note
    //       </Button>
    //     </div>

    //     {notes.length === 0 ? (
    //       <div className="text-center py-12">
    //         <div className="bg-gradient-to-br from-primary/20 to-primary/10 inline-flex p-4 rounded-full mb-4 border border-primary/20">
    //           <StickyNote className="h-6 w-6 text-primary" />
    //         </div>
    //         <h2 className="text-xl font-semibold mb-2 text-primary">No notes yet</h2>
    //         <p className="text-muted-foreground mb-4">
    //           Create your first note to get started
    //         </p>
    //         <Button 
    //           onClick={() => setIsDialogOpen(true)}
    //           variant="outline"
    //           className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
    //         >
    //           <Plus className="h-4 w-4 mr-2" />
    //           Create Note
    //         </Button>
    //       </div>
    //     ) : (
    //       <>
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    //           {currentNotes.map((note) => (
    //             <NoteCard
    //               key={note.id}
    //               note={note}
    //               onEdit={(note) => {
    //                 setSelectedNote(note)
    //                 setIsDialogOpen(true)
    //               }}
    //               onTogglePin={handleTogglePin}
    //             />
    //           ))}
    //         </div>

    //         {notes.length > NOTES_PER_PAGE && (
    //           <div className="flex justify-center mt-12">
    //             <Pagination
    //               currentPage={currentPage}
    //               totalPages={totalPages}
    //               onPageChange={setCurrentPage}
    //             />
    //           </div>
    //         )}
    //       </>
    //     )}

    //     <EditNoteDialog
    //       note={selectedNote}
    //       open={isDialogOpen}
    //       onOpenChange={(open) => {
    //         setIsDialogOpen(open)
    //         if (!open) setSelectedNote(null)
    //       }}
    //       onSubmit={selectedNote ? handleEditNote : handleAddNote}
    //     />
    //   </div>
    // </div>



    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 flex justify-center">
  <div className="container max-w-15xl py-12 px-16"> 
    <div className="flex justify-between items-center mb-12 mx-8">
      <div className="flex items-center space-x-4">
        <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-3 rounded-lg border border-primary/20 shadow-lg shadow-primary/5">
          <StickyNote className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Notes
          </h1>
          <p className="text-muted-foreground mt-1">
            Capture your thoughts and ideas
          </p>
        </div>
      </div>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        size="lg"
        className="shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Note
      </Button>
    </div>

    {notes.length === 0 ? (
      <div className="text-center py-12">
        <div className="bg-gradient-to-br from-primary/20 to-primary/10 inline-flex p-4 rounded-full mb-4 border border-primary/20">
          <StickyNote className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-primary">No notes yet</h2>
        <p className="text-muted-foreground mb-4">
        Start capturing your brilliance now and bring them to life!
        </p>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          variant="outline"
          className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Note
        </Button>
      </div>
    ) : (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={(note) => {
                setSelectedNote(note)
                setIsDialogOpen(true)
              }}
              onTogglePin={handleTogglePin}
            />
          ))}
        </div>

        {notes.length > NOTES_PER_PAGE && (
          <div className="flex justify-center mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </>
    )}

    <EditNoteDialog
      note={selectedNote}
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) setSelectedNote(null)
      }}
      onSubmit={selectedNote ? handleEditNote : handleAddNote}
    />
  </div>
</div>

  )
}

