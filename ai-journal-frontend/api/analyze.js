// api/analyze.js
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * POST /api/analyze
 * Body: { entry: { mood, sleepQuality, stressLevel, exercise, reflection, timestamp } }
 * Returns: { insight, activities, timeline, affirmation }
 */
async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { entry } = req.body;
  if (!entry) return res.status(400).json({ error: "Missing entry data" });

  const {
    mood = "neutral",
    sleepQuality = "neutral",
    stressLevel = "neutral",
    exercise = false,
    reflection = "",
    timestamp,
  } = entry;

  const dateStr = timestamp
    ? new Date(timestamp).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : "today";

  const prompt = `You are a compassionate wellness coach analysing a user's daily journal check-in for ${dateStr}.

Check-in data:
- Mood: ${mood}
- Sleep quality last night: ${sleepQuality}
- Stress level: ${stressLevel}
- Exercised today: ${exercise ? "yes" : "no"}
- Reflection: "${reflection || "No reflection written"}"

Based on this check-in, respond with a JSON object only — no markdown, no backticks, raw JSON.

Use this exact structure:
{
  "insight": {
    "title": "A poetic, specific 3-5 word title",
    "summary": "2-3 warm sentences of specific observation. Reference their actual mood, sleep, stress, and reflection text.",
    "tone": "one of: calm | energized | reflective | uplifting | grounding"
  },
  "activities": [
    {
      "id": "act_1",
      "title": "Activity name (3-5 words)",
      "description": "Why this helps them right now specifically (1-2 sentences).",
      "duration": "e.g. 15 min",
      "category": "one of: movement | mindfulness | social | creative | rest | nature | nutrition",
      "icon": "single relevant emoji",
      "priority": "high | medium | low"
    }
  ],
  "timeline": [
    {
      "time": "e.g. 8:00 AM",
      "label": "Short activity or slot label",
      "activityId": "act_1 or null",
      "type": "activity | meal | rest | work | transition",
      "note": "optional one-sentence tip or null"
    }
  ],
  "affirmation": "A short, genuine 1-sentence affirmation personalised to their state today"
}

Rules:
- Provide exactly 4-5 activities
- Provide exactly 7 timeline slots spanning morning to evening
- Reference specific details from their reflection text where relevant
- Mood rules: sad/anxious -> prioritise social connection, nature, gentle movement; positive/happy -> creative or energising activities
- Sleep rules: restless/poor -> include a rest or nap slot; good/excellent -> can include more active suggestions
- Stress rules: overwhelmed/moderate -> include mindfulness and breaks; calm -> can include focused work blocks
- Exercise: if not exercised today, include at least one movement activity marked high priority
- Keep language warm, specific, never generic wellness cliches`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0]?.text?.trim() ?? "";
    const cleaned = raw.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    const parsed = JSON.parse(cleaned);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("analyze.js error:", err);
    return res.status(500).json({ error: "Failed to generate insights", details: err.message });
  }
}

module.exports = handler;
// ESM / Vite: export default handler;