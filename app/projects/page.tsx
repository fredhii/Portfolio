import type { Metadata } from 'next'
import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of software projects, web applications, and technical work.'
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Projects</h1>

        <Projects projects={projects} />
      </div>
    </section>
  )
}
