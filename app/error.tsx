'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl text-center'>
        <h1 className='title mb-4'>Something went wrong</h1>
        <p className='mb-8 text-muted-foreground'>
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className='rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'
        >
          Try again
        </button>
      </div>
    </section>
  )
}
