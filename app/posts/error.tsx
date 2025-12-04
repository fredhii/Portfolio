'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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
        <h1 className='title mb-4'>Failed to load posts</h1>
        <p className='mb-8 text-muted-foreground'>
          There was an error loading the posts. Please try again.
        </p>
        <div className='flex justify-center gap-4'>
          <button
            onClick={reset}
            className='rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'
          >
            Try again
          </button>
          <Link
            href='/'
            className='rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground'
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  )
}
