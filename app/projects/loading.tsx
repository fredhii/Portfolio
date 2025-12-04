export default function Loading() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Projects</h1>
        <div className='space-y-8'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='animate-pulse space-y-3'>
              <div className='h-48 w-full rounded-lg bg-muted' />
              <div className='h-6 w-3/4 rounded bg-muted' />
              <div className='h-4 w-1/2 rounded bg-muted' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
