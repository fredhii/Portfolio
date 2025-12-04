export default function Loading() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-8'>Contact</h1>
        <div className='animate-pulse space-y-6'>
          <div className='h-4 w-2/3 rounded bg-muted' />
          <div className='space-y-4'>
            <div className='h-10 w-full rounded bg-muted' />
            <div className='h-10 w-full rounded bg-muted' />
            <div className='h-32 w-full rounded bg-muted' />
            <div className='h-10 w-32 rounded bg-muted' />
          </div>
        </div>
      </div>
    </section>
  )
}
