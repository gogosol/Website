import { NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function POST(request: Request) {
  try {
    // Initialize inside the request handler to avoid errors during Next.js static build
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
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

    // Validation
    if (!firstName || !lastName || !email || !company || !jobTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Acme <noreply@qcertify.io>', // Resend's default testing address. In production use e.g., 'QCertify <noreply@qcertify.io>'
      to: ['contact@qcertify.io'], 
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName} (${company})`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Industry:</strong> ${industry || 'Not specified'}</p>
        <p><strong>Interest:</strong> ${interest || 'Not specified'}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message ? message.replace(/\n/g, '<br/>') : 'No message provided.'}</p>
      `,
    });

    if (error) {
      console.error('Error from Resend:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Error handling contact form:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
