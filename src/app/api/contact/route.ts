import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
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

    // Configure the SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Content of the email
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER, 
      to: 'contact@qcertify.io',
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName} (${company})`,
      text: `
New contact form submission:

Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company}
Job Title: ${jobTitle}
Industry: ${industry || 'Not specified'}
Interest: ${interest || 'Not specified'}

Message:
${message || 'No message provided.'}
      `,
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
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
