'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactFormSchema, ContactSubjects, type ContactFormData } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { sendEmail } from '@/lib/actions'
import {
  CheckCircledIcon,
  CrossCircledIcon,
  PaperPlaneIcon,
  ReloadIcon,
  PersonIcon,
  EnvelopeClosedIcon,
  ChatBubbleIcon
} from '@radix-ui/react-icons'

const MAX_MESSAGE_LENGTH = 5000

export default function ContactForm() {
  const [formTimestamp, setFormTimestamp] = useState<number>(0)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid, dirtyFields }
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      subject: undefined,
      message: '',
      website: '',
      timestamp: 0
    }
  })

  // Set timestamp when form loads (for bot detection)
  useEffect(() => {
    setFormTimestamp(Date.now())
  }, [])

  const messageValue = watch('message') || ''
  const messageLength = messageValue.length

  const processForm = async (data: ContactFormData) => {
    // Add timestamp for bot detection
    const dataWithTimestamp = {
      ...data,
      timestamp: formTimestamp
    }

    const result = await sendEmail(dataWithTimestamp)

    if (result?.error) {
      const errorMessage =
        typeof result.error === 'string'
          ? result.error
          : 'An error occurred. Please try again.'
      toast.error(errorMessage)
      return
    }

    setIsSuccess(true)
    toast.success('Message sent successfully!')
    reset()

    // Reset success state after animation
    setTimeout(() => setIsSuccess(false), 3000)
  }

  return (
    <div className='relative'>
      {/* Card container */}
      <div className='rounded-2xl border border-border/50 bg-card/50 p-6 shadow-lg backdrop-blur-sm sm:p-8'>
        {/* Form header */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold'>Send a message</h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            Fill out the form below and I&apos;ll get back to you shortly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(processForm)}
          className='space-y-6'
          noValidate
        >
          {/* Honeypot field - hidden from users, visible to bots */}
          <div className='absolute -left-[9999px]' aria-hidden='true'>
            <label htmlFor='website'>
              Website
              <input
                type='text'
                id='website'
                tabIndex={-1}
                autoComplete='off'
                {...register('website')}
              />
            </label>
          </div>

          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
            {/* Name Field */}
            <div className='space-y-2'>
              <Label htmlFor='name' required>
                Name
              </Label>
              <div className='relative'>
                <PersonIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  id='name'
                  type='text'
                  placeholder='John Doe'
                  autoComplete='name'
                  error={!!errors.name}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className='pl-10'
                  {...register('name')}
                />
              </div>
              {errors.name?.message && (
                <p
                  id='name-error'
                  className='flex items-center gap-1.5 text-sm text-destructive'
                  role='alert'
                >
                  <CrossCircledIcon className='h-4 w-4 shrink-0' />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className='space-y-2'>
              <Label htmlFor='email' required>
                Email
              </Label>
              <div className='relative'>
                <EnvelopeClosedIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  id='email'
                  type='email'
                  placeholder='john@example.com'
                  autoComplete='email'
                  error={!!errors.email}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className='pl-10'
                  {...register('email')}
                />
              </div>
              {errors.email?.message && (
                <p
                  id='email-error'
                  className='flex items-center gap-1.5 text-sm text-destructive'
                  role='alert'
                >
                  <CrossCircledIcon className='h-4 w-4 shrink-0' />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div className='space-y-2'>
            <Label htmlFor='subject' required>
              Subject
            </Label>
            <Select
              id='subject'
              error={!!errors.subject}
              aria-invalid={errors.subject ? 'true' : 'false'}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              {...register('subject')}
            >
              <option value='' disabled>
                What is this about?
              </option>
              {ContactSubjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </Select>
            {errors.subject?.message && (
              <p
                id='subject-error'
                className='flex items-center gap-1.5 text-sm text-destructive'
                role='alert'
              >
                <CrossCircledIcon className='h-4 w-4 shrink-0' />
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='message' required>
                Message
              </Label>
              <span
                className={`text-xs tabular-nums transition-colors ${
                  messageLength > MAX_MESSAGE_LENGTH
                    ? 'text-destructive'
                    : messageLength > MAX_MESSAGE_LENGTH * 0.9
                      ? 'text-yellow-600 dark:text-yellow-500'
                      : 'text-muted-foreground'
                }`}
              >
                {messageLength.toLocaleString()} / {MAX_MESSAGE_LENGTH.toLocaleString()}
              </span>
            </div>
            <div className='relative'>
              <ChatBubbleIcon className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Textarea
                id='message'
                placeholder='Tell me about your project, question, or just say hello...'
                rows={5}
                error={!!errors.message}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                className='pl-10'
                {...register('message')}
              />
            </div>
            {errors.message?.message && (
              <p
                id='message-error'
                className='flex items-center gap-1.5 text-sm text-destructive'
                role='alert'
              >
                <CrossCircledIcon className='h-4 w-4 shrink-0' />
                {errors.message.message}
              </p>
            )}
            {!errors.message && messageLength < 10 && messageLength > 0 && (
              <p id='message-hint' className='text-xs text-muted-foreground'>
                {10 - messageLength} more characters needed
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className='pt-2'>
            <Button
              type='submit'
              disabled={isSubmitting || !isValid}
              size='lg'
              className='w-full gap-2 transition-all duration-200'
            >
              {isSubmitting ? (
                <>
                  <ReloadIcon className='h-4 w-4 animate-spin' />
                  Sending...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircledIcon className='h-4 w-4' />
                  Sent!
                </>
              ) : (
                <>
                  <PaperPlaneIcon className='h-4 w-4' />
                  Send Message
                </>
              )}
            </Button>
          </div>

          {/* Privacy Notice */}
          <p className='text-center text-xs text-muted-foreground'>
            Your information is secure and will never be shared with third parties.
          </p>
        </form>
      </div>
    </div>
  )
}
