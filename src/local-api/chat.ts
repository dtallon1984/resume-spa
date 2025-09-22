import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
let requestCount = 0;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req: Request, res: Response) => {
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
    if (err instanceof Error) errorMessage = err.message;
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(3001, () => console.log("Local chat API running on http://localhost:3001"));
