import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { Note, NoteFormData } from "@/types/note"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  tagline: z.string().min(1, "Tagline is required"),
  body: z.string().min(1, "Body is required"),
})

interface NoteFormProps {
  initialData?: Note
  onSubmit: (data: NoteFormData) => void
  onCancel?: () => void
}

export function NoteForm({ initialData, onSubmit, onCancel }: NoteFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          tagline: initialData.tagline,
          body: initialData.body,
        }
      : {
          title: "",
          tagline: "",
          body: "",
        },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary/80">Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Note title" 
                  {...field} 
                  className="border-primary/20 focus-visible:ring-primary/20 bg-background/50"
                />
              </FormControl>
              <FormMessage className="text-destructive/80" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary/80">Tagline</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Brief tagline" 
                  {...field} 
                  className="border-primary/20 focus-visible:ring-primary/20 bg-background/50"
                />
              </FormControl>
              <FormMessage className="text-destructive/80" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary/80">Body</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Note content" 
                  className="min-h-[100px] border-primary/20 focus-visible:ring-primary/20 bg-background/50" 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-destructive/80" />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-4 border-t border-border/50">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit"
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
          >
            {initialData ? "Update" : "Add"} Note
          </Button>
        </div>
      </form>
    </Form>
  )
}

