export default function Loading() {
  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <div className='mb-8 h-5 w-24 animate-pulse rounded bg-muted' />
        <div className='mb-6 h-96 w-full animate-pulse rounded-lg bg-muted' />
        <div className='animate-pulse space-y-4'>
          <div className='h-10 w-3/4 rounded bg-muted' />
          <div className='h-4 w-48 rounded bg-muted' />
          <div className='mt-16 space-y-3'>
            <div className='h-4 w-full rounded bg-muted' />
            <div className='h-4 w-full rounded bg-muted' />
            <div className='h-4 w-2/3 rounded bg-muted' />
          </div>
        </div>
      </div>
    </section>
  )
}
