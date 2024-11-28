export interface Note {
  id: string
  title: string
  tagline: string
  body: string
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

export interface NoteFormData {
  title: string
  tagline: string
  body: string
}

