import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * Escapes HTML special characters to prevent HTML injection in email templates.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validates that a string looks like a valid email address.
 */
function isValidEmail(email: string): boolean {
  // RFC 5322 simplified — catches the vast majority of invalid inputs
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

/**
 * Validates origin to mitigate CSRF.
 * Allows requests from the production domain and localhost (dev).
 */
function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';

  const source = origin || referer;
  if (!source) return false;

  try {
    const url = new URL(source);
    const allowedHosts = [
      'qcertify.io',
      'www.qcertify.io',
      'localhost',
      '127.0.0.1',
    ];
    return allowedHosts.includes(url.hostname);
  } catch {
    return false;
  }
}

// Maximum field lengths to prevent abuse
const MAX_LENGTHS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  company: 100,
  jobTitle: 100,
  industry: 200,
  interest: 200,
  message: 5000,
} as const;

// Allowed field names to prevent mass assignment
const ALLOWED_FIELDS = new Set(Object.keys(MAX_LENGTHS));

export async function POST(request: Request) {
  // CSRF: validate request origin
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  try {
    // Initialize inside the request handler to avoid errors during Next.js static build
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();

    // Mass assignment protection: reject unknown fields
    const bodyKeys = Object.keys(body);
    for (const key of bodyKeys) {
      if (!ALLOWED_FIELDS.has(key)) {
        return NextResponse.json(
          { error: 'Invalid field submitted' },
          { status: 400 }
        );
      }
    }

    const {
      firstName,
      lastName,
      email,
      company,
      jobTitle,
      industry,
      interest,
      message,
    } = body;

    // Required field validation
    if (!firstName || !lastName || !email || !company || !jobTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Type validation: all fields must be strings
    const allFields = { firstName, lastName, email, company, jobTitle, industry, interest, message };
    for (const [key, value] of Object.entries(allFields)) {
      if (value !== undefined && value !== null && typeof value !== 'string') {
        return NextResponse.json(
          { error: `Field "${key}" must be a string` },
          { status: 400 }
        );
      }
    }

    // Length validation
    for (const [key, value] of Object.entries(allFields)) {
      if (typeof value === 'string' && value.length > MAX_LENGTHS[key as keyof typeof MAX_LENGTHS]) {
        return NextResponse.json(
          { error: `Field "${key}" exceeds maximum length` },
          { status: 400 }
        );
      }
    }

    // Email format validation
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Escape all user inputs before embedding in HTML email
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safeJobTitle = escapeHtml(jobTitle);
    const safeIndustry = escapeHtml(industry || 'Not specified');
    const safeInterest = escapeHtml(interest || 'Not specified');
    const safeMessage = message
      ? escapeHtml(message).replace(/\n/g, '<br/>')
      : 'No message provided.';

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'QCertify Contact Form <noreply@qcertify.io>',
      to: ['contact@qcertify.io'],
      replyTo: email,
      subject: `New Contact Form Submission from ${safeFirstName} ${safeLastName} (${safeCompany})`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Job Title:</strong> ${safeJobTitle}</p>
        <p><strong>Industry:</strong> ${safeIndustry}</p>
        <p><strong>Interest:</strong> ${safeInterest}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      console.error('Error from Resend:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('Error handling contact form:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Explicit 405 for non-POST methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
