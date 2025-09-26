// api/send-email.ts
import { Resend } from 'resend';

// initialize with env var
const resend = new Resend(process.env.RESEND_API_KEY as string);

export const config = {
  runtime: 'edge', // ensure this runs as an edge function
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { name, company, role, phone, email } = body as {
      name: string;
      company: string;
      role: string;
      phone: string;
      email: string;
    };

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // must be verified in Resend
      to: 'dtallon1984@gmail.com',
      subject: `New Meeting Request from ${name}`,
      html: `
        <h2>Meeting Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Role:</b> ${role}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
