"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
let requestCount = 0;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/chat", async (req, res) => {
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
    }
    catch (err) {
        console.error(err);
        let errorMessage = "Something went wrong";
        if (err instanceof Error)
            errorMessage = err.message;
        res.status(500).json({ error: errorMessage });
    }
});
app.listen(3001, () => console.log("Local chat API running on http://localhost:3001"));
