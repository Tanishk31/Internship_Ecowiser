import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-4 px-6 rounded-lg border border-border/50">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:bg-primary/10 hover:text-primary transition-colors border-primary/20"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center space-x-2 text-sm font-medium">
        <span className="text-muted-foreground">Page</span>
        <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">{currentPage}</span>
        <span className="text-muted-foreground">of</span>
        <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">{totalPages}</span>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hover:bg-primary/10 hover:text-primary transition-colors border-primary/20"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

