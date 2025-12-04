export default function Loading() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <div className='animate-pulse space-y-8'>
          <div className='h-8 w-48 rounded bg-muted' />
          <div className='space-y-4'>
            <div className='h-4 w-full rounded bg-muted' />
            <div className='h-4 w-3/4 rounded bg-muted' />
            <div className='h-4 w-1/2 rounded bg-muted' />
          </div>
        </div>
      </div>
    </section>
  )
}
