// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Resend } from "resend";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const resend = new Resend(process.env.RESEND_API_KEY!);

// Basic in-memory rate limiter (per function instance)
let requestCount = 0;

type MeetingRequestPayload = {
  name: string;
  company: string;
  role: string;
  phone: string;
  email: string;
};

type MeetingRequestData = {
  action: "schedule_meeting";
  data: MeetingRequestPayload;
  draftEmail: string;
};

function isMeetingRequest(obj: unknown): obj is MeetingRequestData {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as Record<string, unknown>;
  if (o.action !== "schedule_meeting") return false;
  if (typeof o.draftEmail !== "string") return false;
  if (!o.data || typeof o.data !== "object") return false;
  const d = o.data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    typeof d.company === "string" &&
    typeof d.role === "string" &&
    typeof d.phone === "string" &&
    typeof d.email === "string"
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (requestCount > 50) {
    res.status(429).json({ error: "Rate limit exceeded" });
    return;
  }
  requestCount++;

  try {
    const { messages } = req.body;
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    const rawContent = String(completion.choices?.[0]?.message?.content ?? "");
    console.log("Raw model output:", rawContent);

    // Try to extract JSON block if model wrapped it in ```json ... ```
    let parsed: unknown = null;
    const jsonFenced = rawContent.match(/```json([\s\S]*?)```/i);
    try {
      if (jsonFenced) {
        parsed = JSON.parse(jsonFenced[1].trim());
      } else {
        parsed = JSON.parse(rawContent);
      }
    } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({ error: errorMessage });
  }

    // If the model requested scheduling -> validate shape and send email
    if (isMeetingRequest(parsed)) {
      const { name, company, role, phone, email } = parsed.data;
      try {
        const emailResult = await resend.emails.send({
          from: "onboarding@resend.dev", // okay for testing; verify own domain for production
          to: "dtallon1984@gmail.com",
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

        console.log("send-email success for", name, emailResult);
        return res.status(200).json({
          message: parsed.draftEmail,
          emailSent: true,
          emailResult,
        });
      } catch (err) {
        console.error("Failed to send meeting email:", err);
        return res.status(500).json({ error: "Failed to send email", parsed });
      }
    }

    // Not a scheduling action but valid JSON — return parsed object to frontend
    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Chat API error:", err);
    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    res.status(500).json({ error: errorMessage });
  }
}
