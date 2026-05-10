import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())

// ── POST /api/gemini ─────────────────────────────────────────
// Accepts { prompt, apiKey } — apiKey from client (user's own key)
// Falls back to server-side GEMINI_API_KEY env var if configured
app.post('/api/gemini', async (req, res) => {
  const { prompt, apiKey } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' })
  }

  const resolvedKey = process.env.GEMINI_API_KEY || apiKey

  if (!resolvedKey) {
    return res.status(401).json({
      error: 'No Gemini API key provided. Please add your key in the app or set GEMINI_API_KEY in server .env',
    })
  }

  try {
    const genAI = new GoogleGenerativeAI(resolvedKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    res.json({ text })
  } catch (err) {
    console.error('Gemini error:', err.message)
    res.status(500).json({ error: err.message || 'Gemini API error' })
  }
})

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

app.listen(PORT, () => {
  console.log(`🚀 PortfolioAI server running on http://localhost:${PORT}`)
})
