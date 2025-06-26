import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { getPosts, getPostBySlug } from '@/lib/posts'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { notFound } from 'next/navigation'
import NewsletterForm from '@/components/newsletter-form'

export async function generateStaticParams() {
  const posts = await getPosts()
  const slugs = posts.map(post => ({ slug: post.slug }))

  return slugs
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    }
  }

  const { title, summary, image, author, publishedAt } = post.metadata
  const url = `https://fredhii.com/posts/${params.slug}`

  return {
    title: title ? `${title} | Fredy Acuna` : 'Fredy Acuna',
    description: summary || 'A blog post by Fredy Acuna',
    authors: [{ name: author || 'Fredy Acuna' }],
    openGraph: {
      title: title || 'Fredy Acuna',
      description: summary || 'A blog post by Fredy Acuna',
      url,
      siteName: 'Fredy Acuna',
      images: image ? [
        {
          url: `https://fredhii.com${image}`,
          width: 1200,
          height: 630,
          alt: title || 'Blog post image'
        }
      ] : [],
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Fredy Acuna',
      description: summary || 'A blog post by Fredy Acuna',
      images: image ? [`https://fredhii.com${image}`] : [],
      creator: '@fredhii',
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { metadata, compiledContent } = post
  const { title, image, author, publishedAt, summary } = metadata

  // JSON-LD structured data for blog post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: summary,
    author: {
      '@type': 'Person',
      name: author || 'Fredy Acuna'
    },
    datePublished: publishedAt,
    dateModified: publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Fredy Acuna',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fredhii.com/images/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fredhii.com/posts/${slug}`
    },
    image: image ? `https://fredhii.com${image}` : undefined,
    url: `https://fredhii.com/posts/${slug}`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className='pb-24 pt-32'>
        <div className='container max-w-3xl'>
          <Link
            href='/posts'
            className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
          >
            <ArrowLeftIcon className='h-5 w-5' />
            <span>Back to posts</span>
          </Link>

          {image && (
            <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
              <Image
                src={image}
                alt={title || ''}
                className='object-cover'
                fill
              />
            </div>
          )}

          <header>
            <h1 className='title'>{title}</h1>
            <p className='mt-3 text-xs text-muted-foreground'>
              {author} / {formatDate(publishedAt ?? '')} / {metadata.readingTime}
            </p>
          </header>

          <main className='prose mt-16 dark:prose-invert'>
            {compiledContent}
          </main>

          <footer className='mt-16'>
            <NewsletterForm />
          </footer>
        </div>
      </section>
    </>
  )
}
