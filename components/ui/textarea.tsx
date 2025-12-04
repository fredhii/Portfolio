import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-lg border bg-background px-4 py-3 text-sm transition-all duration-200 resize-none',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-destructive focus:ring-destructive/50'
            : 'border-input focus:border-primary focus:ring-primary/50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
