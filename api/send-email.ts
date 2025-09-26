//send-email.ts
import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('send-email API invoked', req.body);
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, company, role, phone, email } = req.body;

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

    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
