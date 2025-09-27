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
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (requestCount > 50) {
    return res.status(429).json({ error: "Rate limit exceeded" });
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

    let parsed: MeetingRequestData | null = null;

    // Only attempt to parse JSON if it looks like a full object
    const jsonFenced = rawContent.match(/```json([\s\S]*?)```/i);
    try {
      if (jsonFenced) {
        parsed = JSON.parse(jsonFenced[1].trim());
      } else if (rawContent.trim().startsWith("{") && rawContent.trim().endsWith("}")) {
        parsed = JSON.parse(rawContent.trim());
      }
    } catch {
      // Not a complete JSON — ignore, AI is likely asking follow-up questions
      console.warn("Partial or invalid JSON, returning raw text to frontend.");
    }

    // If parsed meeting request is valid -> send emails
    if (parsed && isMeetingRequest(parsed)) {
      const { name, company, role, phone, email } = parsed.data;
      const chatHistoryHtml = messages
        .map((msg: { role: string; content: string }) => `<p><b>${msg.role}:</b> ${msg.content}</p>`)
        .join("");

      try {
        // 1️⃣ Send draft email to requester (with CC to David)
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          cc: "dtallon1984@gmail.com",
          subject: "Your meeting request with David Tallon has been received",
          html: `<pre>${parsed.draftEmail}</pre>`,
        });

        // 2️⃣ Send detailed email to David (you) with chat history
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "dtallon1984@gmail.com",
          subject: `New Meeting Request from ${name}`,
          html: `
            <h2>New Meeting Request</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Company:</b> ${company}</p>
            <p><b>Role:</b> ${role}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Email:</b> ${email}</p>
            <h3>Draft Email Sent to Requester:</h3>
            <pre>${parsed.draftEmail}</pre>
            <h3>Chat History:</h3>
            ${chatHistoryHtml}
          `,
        });

        // 3️⃣ Return simple acknowledgment to frontend
        return res.status(200).json({
          message:
            "Your request for a meeting has been queued for David to review and he will get back to you shortly, thank you!",
          emailSent: true,
        });
      } catch (err) {
        console.error("Failed to send emails:", err);
        return res.status(500).json({
          error: "Failed to send meeting emails",
          parsed,
        });
      }
    }

    // Otherwise, just return raw content for frontend display (AI can ask follow-ups)
    return res.status(200).json({ message: rawContent });

  } catch (err) {
    console.error("Chat API error:", err);
    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    return res.status(500).json({ error: errorMessage });
  }
}
