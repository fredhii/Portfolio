import * as React from 'react'

import { cn } from '@/lib/utils'
import { ChevronDownIcon } from '@radix-ui/react-icons'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, error, ...props }, ref) => {
    return (
      <div className='relative'>
        <select
          className={cn(
            'flex h-11 w-full appearance-none rounded-lg border bg-background px-4 py-2 pr-10 text-sm transition-all duration-200',
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
        >
          {children}
        </select>
        <ChevronDownIcon className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
