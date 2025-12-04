import { ContactSubjects, type ContactSubject } from '@/lib/schemas'

interface ContactFormEmailProps {
  name: string
  email: string
  subject: ContactSubject
  message: string
}

const getSubjectLabel = (subject: ContactSubject): string => {
  return ContactSubjects.find((s) => s.value === subject)?.label ?? subject
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  subject,
  message
}) => (
  <div
    style={{
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#ffffff'
    }}
  >
    {/* Header */}
    <div
      style={{
        borderBottom: '3px solid #18181b',
        paddingBottom: '20px',
        marginBottom: '30px'
      }}
    >
      <h1
        style={{
          margin: '0',
          fontSize: '24px',
          fontWeight: '700',
          color: '#18181b'
        }}
      >
        New Contact Form Submission
      </h1>
      <p
        style={{
          margin: '8px 0 0',
          fontSize: '14px',
          color: '#71717a'
        }}
      >
        Someone reached out via your portfolio website
      </p>
    </div>

    {/* Sender info card */}
    <div
      style={{
        backgroundColor: '#fafafa',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                padding: '8px 0',
                fontSize: '14px',
                color: '#71717a',
                width: '100px'
              }}
            >
              From
            </td>
            <td
              style={{
                padding: '8px 0',
                fontSize: '14px',
                fontWeight: '600',
                color: '#18181b'
              }}
            >
              {name}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: '8px 0',
                fontSize: '14px',
                color: '#71717a'
              }}
            >
              Email
            </td>
            <td
              style={{
                padding: '8px 0',
                fontSize: '14px',
                color: '#18181b'
              }}
            >
              <a
                href={`mailto:${email}`}
                style={{
                  color: '#2563eb',
                  textDecoration: 'none'
                }}
              >
                {email}
              </a>
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: '8px 0',
                fontSize: '14px',
                color: '#71717a'
              }}
            >
              Subject
            </td>
            <td
              style={{
                padding: '8px 0'
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#18181b',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '500',
                  padding: '4px 10px',
                  borderRadius: '9999px'
                }}
              >
                {getSubjectLabel(subject)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Message section */}
    <div>
      <h2
        style={{
          margin: '0 0 12px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#71717a',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
      >
        Message
      </h2>
      <div
        style={{
          backgroundColor: '#fafafa',
          borderRadius: '12px',
          padding: '20px',
          borderLeft: '4px solid #18181b'
        }}
      >
        <p
          style={{
            margin: '0',
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#3f3f46',
            whiteSpace: 'pre-wrap'
          }}
        >
          {message}
        </p>
      </div>
    </div>

    {/* Reply button */}
    <div
      style={{
        marginTop: '30px',
        textAlign: 'center' as const
      }}
    >
      <a
        href={`mailto:${email}?subject=Re: ${getSubjectLabel(subject)}`}
        style={{
          display: 'inline-block',
          backgroundColor: '#18181b',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '600',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none'
        }}
      >
        Reply to {name}
      </a>
    </div>

    {/* Footer */}
    <div
      style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #e4e4e7',
        textAlign: 'center' as const
      }}
    >
      <p
        style={{
          margin: '0',
          fontSize: '12px',
          color: '#a1a1aa'
        }}
      >
        This email was sent from your portfolio contact form at{' '}
        <a
          href='https://fredyacuna.com'
          style={{ color: '#71717a', textDecoration: 'none' }}
        >
          fredyacuna.com
        </a>
      </p>
    </div>
  </div>
)

export default ContactFormEmail
