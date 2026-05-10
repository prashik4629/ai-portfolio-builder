import axios from 'axios'

// Calls go to /api/* which is proxied to the Express backend in dev
// In production, set VITE_API_URL to your backend URL
const BASE = import.meta.env.VITE_API_URL || ''

async function geminiRequest(prompt, apiKey) {
  try {
    // If a backend URL is configured, use it (secure)
    const res = await axios.post(`${BASE}/api/gemini`, { prompt, apiKey })
    return res.data.text
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message)
  }
}

export async function generateBio({ name, title, skills, experience }, apiKey) {
  const skillsList = skills.slice(0, 10).join(', ')
  const expSummary = experience
    .filter((e) => e.role)
    .map((e) => `${e.role} at ${e.company}`)
    .join(', ')

  const prompt = `Write a compelling professional bio for ${name || 'a developer'}, who is a ${title || 'software developer'}.
Skills: ${skillsList || 'various technologies'}
Experience: ${expSummary || 'professional experience'}

Write 2-3 sentences that are engaging, first-person, and highlight their expertise. 
No bullet points. No headers. Just flowing prose.`

  return geminiRequest(prompt, apiKey)
}

export async function suggestSkills({ title, skills }, apiKey) {
  const existing = skills.join(', ')
  const prompt = `List 10 relevant technical skills for a ${title || 'software developer'}.
Already has: ${existing || 'none listed'}

Return ONLY a comma-separated list of skill names. No explanations. No numbering. Just skills.
Example format: React, Node.js, TypeScript, PostgreSQL`

  const text = await geminiRequest(prompt, apiKey)
  return text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 10)
}

export async function improveProjectDesc({ name, desc, tech }, apiKey) {
  const prompt = `Improve this project description for "${name || 'a project'}":
Current: ${desc || 'No description provided'}
Tech stack: ${tech || 'not specified'}

Write 2-3 sentences that highlight impact, technical complexity, and outcomes.
Be specific, use active voice, and make it sound impressive for a resume. 
No bullet points. Just polished prose.`

  return geminiRequest(prompt, apiKey)
}

export async function generateResumeSummary(
  { name, title, skills, experience, projects, about },
  apiKey
) {
  const skillsList = skills.slice(0, 8).join(', ')
  const expSummary = experience
    .filter((e) => e.role)
    .map((e) => `${e.role} at ${e.company} (${e.period || 'N/A'})`)
    .join(' | ')
  const projectNames = projects
    .filter((p) => p.name)
    .map((p) => p.name)
    .join(', ')

  const prompt = `Write an ATS-optimized professional resume summary for ${name || 'a developer'}.

Role: ${title || 'Software Developer'}
Core Skills: ${skillsList || 'modern web technologies'}
Experience: ${expSummary || 'professional experience in software development'}
Notable Projects: ${projectNames || 'various software projects'}
About: ${about || ''}

Write 4-6 sentences that:
- Start with a strong opening about their role and years of experience
- Highlight top technical skills and expertise areas  
- Mention key achievements or specialized experience
- Are ATS-friendly with relevant keywords
- Sound professional and compelling

No bullet points. No headers. Just a polished paragraph.`

  return geminiRequest(prompt, apiKey)
}
