'use server'

import { Resend } from 'resend'
import {
  ContactFormSchema,
  NewsletterFormSchema,
  type ContactFormData,
  type NewsletterFormData
} from '@/lib/schemas'
import ContactFormEmail from '@/emails/contact-form-email'
import React from 'react'
import { headers } from 'next/headers'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiting (resets on server restart)
// In production, use Redis or a database
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }

  record.count++
  return true
}

// Sanitize string to prevent XSS
function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export async function sendEmail(data: ContactFormData) {
  // Get client IP for rate limiting
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0] ||
    headersList.get('x-real-ip') ||
    'unknown'

  // Check rate limit
  if (!checkRateLimit(ip)) {
    return {
      error: 'Too many requests. Please wait a minute before trying again.'
    }
  }

  // Validate the data
  const result = ContactFormSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.format() }
  }

  // Check honeypot
  if (data.website && data.website.length > 0) {
    // Silently reject but return success to confuse bots
    return { success: true }
  }

  try {
    // Sanitize inputs
    const name = sanitizeString(result.data.name)
    const email = result.data.email // Already validated and lowercased
    const subject = result.data.subject
    const message = sanitizeString(result.data.message)

    const { data: emailData, error } = await resend.emails.send({
      from: 'hello@fredhii.com',
      to: ['fredyacu98@hotmail.com'], // Send to yourself
      replyTo: email, // So you can reply directly to the sender
      subject: `[${subject.charAt(0).toUpperCase() + subject.slice(1)}] Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      react: React.createElement(ContactFormEmail, { name, email, subject, message })
    })

    if (!emailData || error) {
      console.error('Email send error:', error)
      throw new Error('Failed to send email')
    }

    return { success: true }
  } catch (error) {
    console.error('Contact form error:', error)
    return { error: 'Failed to send message. Please try again later.' }
  }
}

export async function subscribe(data: NewsletterFormData) {
  // Get client IP for rate limiting
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0] ||
    headersList.get('x-real-ip') ||
    'unknown'

  // Check rate limit
  if (!checkRateLimit(ip)) {
    return {
      error: 'Too many requests. Please wait a minute before trying again.'
    }
  }

  const result = NewsletterFormSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.format() }
  }

  try {
    const { email } = result.data
    const { data: contactData, error } = await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID as string
    })

    if (!contactData || error) {
      throw new Error('Failed to subscribe')
    }

    return { success: true }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { error: 'Failed to subscribe. Please try again later.' }
  }
}
