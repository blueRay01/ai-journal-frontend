require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Shared helper: strips markdown fences and returns parsed JSON
function parseClaudeJSON(raw) {
  const cleaned = raw
    .trim()
    .replace(/^```[\w]*[\r\n]*/i, "")
    .replace(/[\r\n]*```\s*$/i, "")
    .trim();
  return JSON.parse(cleaned);
}

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
CRITICAL: Return raw JSON only. No backticks, no markdown, no code fences, no explanation.
`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const parsed = parseClaudeJSON(message.content[0].text);
    res.json(parsed);
  } catch (err) {
    console.error("Analyze error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/analyze-correlations", async (req, res) => {
  const { entries } = req.body;

  const prompt = `
You are a data analysis AI specializing in wellness correlations. Analyze the following journal entry data and identify the strongest correlation between different wellness factors.

User's journal data:
${entries.map(entry => `
Date: ${entry.date}
Sleep Quality: ${entry.sleepQuality}
Exercise: ${entry.exercise ? "Yes" : "No"}
Mood: ${entry.mood}
Stress Level: ${entry.stressLevel}
Wellness Score: ${entry.wellnessScore}/10
`).join("\n")}

Identify the most significant correlation and return a JSON object with:
{
  "title": "Brief title of the correlation (max 5 words)",
  "body": "Detailed explanation of the correlation with specific percentages or patterns discovered"
}

Focus on correlations between:
- Sleep quality and wellness scores
- Exercise and mood/stress levels
- Stress levels and sleep quality
- Mood patterns and overall wellness

Return raw JSON only. No backticks, no markdown, no code fences, no explanation.
`;

  try {
    const msg = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    const parsed = parseClaudeJSON(msg.content[0].text);
    res.json({ correlation: parsed });
  } catch (err) {
    console.error("Correlation analysis error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/generate-weekly-intent", async (req, res) => {
  const { entries } = req.body;

  if (!entries || entries.length === 0) {
    return res.status(400).json({ error: "No entries provided." });
  }

  const summary = entries.map((e, i) =>
    `Day ${i + 1}: mood=${e.mood}, sleep=${e.sleepQuality}, stress=${e.stressLevel}, exercise=${e.exercise ? "yes" : "no"}, reflection="${e.reflection}"`
  ).join("\n");

  const prompt = `
You are a compassionate wellness AI. Based on this user's weekly journal entries, generate a focus intent for next week.

Weekly entries:
${summary}

Return ONLY a raw JSON object with no markdown or code fences:
{
  "intent": {
    "title": "A short motivating title (max 5 words)",
    "body": "A 2-3 sentence personalized recommendation for next week based on patterns you notice. Be warm and specific."
  }
}
CRITICAL: Return raw JSON only. No backticks, no markdown, no code fences, no explanation.
`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    });

    const parsed = parseClaudeJSON(message.content[0].text);
    res.json(parsed);
  } catch (err) {
    console.error("Weekly intent error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));