const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyC89YzwZQEzKiFCl-8tz8PIxXTUvD8RzQM");

router.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro-exp-03-25" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a job portal assistant and your answer should be concise not more than 50 words.\n\nUser prompt: ${prompt}`
            }
          ]
        }
      ]
    });

    const text = result?.response?.text();
    res.json({ response: text || "No response." });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to get response from Gemini API." });
  }
});

module.exports = router;
