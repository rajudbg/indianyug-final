import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const TO_EMAIL = 'contact@indianyug.com'; // As specified by the user
const FROM_EMAIL = 'noreply@indianyug.com'; // A good practice for the 'from' address

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, type } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!resend) {
      console.warn('RESEND_API_KEY not configured. Contact form disabled.');
      return NextResponse.json({ error: 'Contact form temporarily unavailable' }, { status: 503 });
    }

    const emailHtml = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message Type:</strong> ${type || 'Not specified'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: `IndianYug Contact Form <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New Message: ${subject}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
