import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border bg-background px-4 py-2 text-sm transition-all duration-200',
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
Input.displayName = 'Input'

export { Input }
