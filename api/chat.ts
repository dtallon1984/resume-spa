import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Basic in-memory rate limiter (per function instance)
let requestCount = 0;

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

  res.status(200).json({ response: completion.choices[0].message });
} catch (err: unknown) {
  console.error(err);

  let errorMessage = "Something went wrong";
  if (err instanceof Error) {
    errorMessage = err.message;
  }

  res.status(500).json({ error: errorMessage });
}

}
