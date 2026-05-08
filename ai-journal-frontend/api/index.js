require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post("/api/analyze", async (req, res) => {
  const { exercise, sleepQuality, mood, stressLevel, reflection } = req.body;

  const prompt = `
You are a compassionate wellness AI. Based on this user's daily journal check-in, generate a personalized insight, a recommended schedule for tomorrow, and a brief history summary.

User's check-in:
- Exercise today: ${exercise ? "Yes" : "No"}
- Sleep quality: ${sleepQuality}
- Mood: ${mood}
- Stress level: ${stressLevel}
- Reflection: "${reflection}"

Respond ONLY with a valid JSON object in this exact format, no preamble, no markdown:
{
  "insight": {
    "type": "one of: morning_routine, sleep_tip, mood_boost, stress_relief, motivation",
    "title": "A short, warm insight title (max 8 words)",
    "content": "A thoughtful 3-4 sentence personalized insight based on their check-in. Be warm, supportive, and specific to their responses."
  },
  "timeline": [
    { "time": "7:00 AM", "title": "Activity name", "subtitle": "Brief explanation why this helps them" },
    { "time": "8:00 AM", "title": "Activity name", "subtitle": "Brief explanation" },
    { "time": "12:00 PM", "title": "Activity name", "subtitle": "Brief explanation" },
    { "time": "3:00 PM", "title": "Activity name", "subtitle": "Brief explanation" },
    { "time": "8:00 PM", "title": "Activity name", "subtitle": "Brief explanation" },
    { "time": "10:00 PM", "title": "Activity name", "subtitle": "Brief explanation" }
  ],
  "summary": {
    "emoji": "A single emoji that best represents the user's overall mood and energy for the day (e.g. 🌤️, 🌧️, ⚡, 🌙, ☀️, 🌫️, 🔥, 🌿)",
    "preview": "A single sentence (max 15 words) summarizing the key insight for this entry, written in second person."
  }
}
`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].text.trim();
    const parsed = JSON.parse(raw);
    res.json(parsed);
  } catch (err) {
    console.error("Full error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));