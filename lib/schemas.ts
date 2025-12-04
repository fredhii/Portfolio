import { z } from 'zod'

// Common spam patterns to reject
const spamPatterns = [
  /\b(viagra|cialis|casino|lottery|winner|prize|claim|urgent)\b/i,
  /\b(click here|act now|limited time|free money)\b/i,
  /<[^>]*>/, // HTML tags
  /\[url\]/i, // BBCode
]

// Validation helper to check for spam
const containsSpam = (text: string): boolean => {
  return spamPatterns.some(pattern => pattern.test(text))
}

export const ContactSubjects = [
  { value: 'project', label: 'Project Inquiry' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'job', label: 'Job Opportunity' },
  { value: 'question', label: 'General Question' },
  { value: 'other', label: 'Other' }
] as const

export type ContactSubject = (typeof ContactSubjects)[number]['value']

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name must be less than 100 characters.' })
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes.'
    })
    .transform(val => val.trim()),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' })
    .max(254, { message: 'Email must be less than 254 characters.' })
    .toLowerCase()
    .refine(
      email => {
        // Block disposable email domains
        const disposableDomains = [
          'tempmail.com',
          'throwaway.com',
          'mailinator.com',
          'guerrillamail.com',
          '10minutemail.com'
        ]
        const domain = email.split('@')[1]
        return !disposableDomains.includes(domain)
      },
      { message: 'Please use a valid email address.' }
    ),
  subject: z
    .enum(['project', 'collaboration', 'job', 'question', 'other'], {
      required_error: 'Please select a subject.'
    }),
  message: z
    .string()
    .min(1, { message: 'Message is required.' })
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(5000, { message: 'Message must be less than 5000 characters.' })
    .refine(val => !containsSpam(val), {
      message: 'Your message appears to contain spam. Please revise it.'
    })
    .transform(val => val.trim()),
  // Honeypot field - should always be empty
  website: z
    .string()
    .max(0, { message: 'Bot detected.' })
    .optional(),
  // Timestamp for rate limiting validation
  timestamp: z
    .number()
    .optional()
    .refine(
      val => {
        if (!val) return true
        const now = Date.now()
        const diff = now - val
        // Form must be filled in at least 3 seconds (bot protection)
        return diff >= 3000
      },
      { message: 'Please take your time filling out the form.' }
    )
})

export const NewsletterFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' })
    .max(254, { message: 'Email must be less than 254 characters.' })
    .toLowerCase()
})

// Type exports
export type ContactFormData = z.infer<typeof ContactFormSchema>
export type NewsletterFormData = z.infer<typeof NewsletterFormSchema>
