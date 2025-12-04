import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const projects = await getProjects()
  const slugs = projects.map(project => ({ slug: project.slug }))

  return slugs
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.'
    }
  }

  const { title, summary, image, author } = project.metadata
  const url = `https://fredhii.com/projects/${slug}`

  return {
    title: title || 'Project',
    description: summary || 'A project by Fredy Acuna',
    authors: [{ name: author || 'Fredy Acuna' }],
    openGraph: {
      title: title || 'Fredy Acuna',
      description: summary || 'A project by Fredy Acuna',
      url,
      siteName: 'Fredy Acuna',
      images: image
        ? [
            {
              url: `https://fredhii.com${image}`,
              width: 1200,
              height: 630,
              alt: title || 'Project image'
            }
          ]
        : [],
      locale: 'en_US',
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Fredy Acuna',
      description: summary || 'A project by Fredy Acuna',
      images: image ? [`https://fredhii.com${image}`] : [],
      creator: '@fredhii'
    },
    alternates: {
      canonical: url
    }
  }
}

export default async function Project({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, image, author, publishedAt } = metadata

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Link
          href='/projects'
          className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to projects</span>
        </Link>

        {image && (
          <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
            <Image
              src={image}
              alt={title || ''}
              className='object-cover'
              fill
              priority
              sizes='(max-width: 768px) 100vw, 768px'
            />
          </div>
        )}

        <header>
          <h1 className='title'>{title}</h1>
          <p className='mt-3 text-xs text-muted-foreground'>
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        <main className='prose mt-16 dark:prose-invert'>
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  )
}
