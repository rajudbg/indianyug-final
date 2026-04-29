import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  // Server-side logging for debugging Vercel environment variables
  console.log('--- Mailchimp API Route ---');
  console.log('MAILCHIMP_API_KEY is set:', !!apiKey);
  console.log('MAILCHIMP_SERVER_PREFIX:', serverPrefix);
  console.log('MAILCHIMP_AUDIENCE_ID:', audienceId);
  console.log('---------------------------');

  if (!apiKey || !serverPrefix || !audienceId) {
    console.error('Mailchimp configuration is missing on the server.');
    return NextResponse.json({ error: 'Mailchimp configuration is missing' }, { status: 500 });
  }

  const data = {
    email_address: email,
    status: 'subscribed',
  };

  try {
    const response = await fetch(`https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Mailchimp returns a 400 if the user is already subscribed
      if (errorData.title === 'Member Exists') {
        return NextResponse.json({ message: 'You are already subscribed!' });
      }
      return NextResponse.json({ error: errorData.detail || 'Failed to subscribe' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Mailchimp API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
