import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/contact-form'
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Fredy Acuna for project inquiries, collaborations, or just to say hello.'
}

const contactMethods = [
  {
    icon: EnvelopeClosedIcon,
    label: 'Email',
    value: 'hello@fredhii.com',
    href: 'mailto:hello@fredhii.com'
  },
  {
    icon: GitHubLogoIcon,
    label: 'GitHub',
    value: '@fredhii',
    href: 'https://github.com/fredhii'
  },
  {
    icon: LinkedInLogoIcon,
    label: 'LinkedIn',
    value: 'Fredy Acuna',
    href: 'https://linkedin.com/in/fredhii'
  }
]

export default function Contact() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-5xl'>
        <div className='grid gap-12 lg:grid-cols-5 lg:gap-16'>
          {/* Left column - Info */}
          <div className='lg:col-span-2'>
            <h1 className='title'>Let&apos;s work together</h1>
            <p className='mt-4 text-muted-foreground'>
              Have a project in mind or just want to chat? I&apos;d love to hear from you.
              Fill out the form or reach out through any of the channels below.
            </p>

            {/* Contact methods */}
            <div className='mt-10 space-y-6'>
              <h2 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                Other ways to connect
              </h2>
              <ul className='space-y-4'>
                {contactMethods.map((method) => (
                  <li key={method.label}>
                    <Link
                      href={method.href}
                      target={method.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={method.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className='group flex items-center gap-4 rounded-lg p-3 -ml-3 transition-colors hover:bg-muted'
                    >
                      <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-background transition-colors'>
                        <method.icon className='h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors' />
                      </span>
                      <div>
                        <p className='text-sm font-medium'>{method.label}</p>
                        <p className='text-sm text-muted-foreground'>{method.value}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column - Form */}
          <div className='lg:col-span-3'>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
