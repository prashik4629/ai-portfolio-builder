# PortfolioAI ✦

> **AI-powered portfolio builder** — Generate professional developer portfolios with Google Gemini AI. Built with React, Vite, Tailwind CSS, Framer Motion, and Zustand.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer)

---

## Features

- **7-step guided form** — Personal info, bio, skills, projects, experience, social links, AI resume
- **Gemini AI integration** — Generate bios, suggest skills, improve project descriptions, create ATS-optimized resume summaries
- **Live preview** — Real-time portfolio preview with 4 themes (Dark, Light, Gradient, Minimal)
- **Export** — Download as a standalone HTML file or JSON data
- **Persistent state** — Data saved to localStorage via Zustand persist middleware
- **Secure backend** — Express.js API proxy keeps your Gemini key server-side (optional)
- **Responsive** — Mobile sidebar drawer, responsive layouts

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| State | Zustand 4 (with persist) |
| Routing | React Router v6 |
| HTTP | Axios |
| Backend | Node.js + Express |
| AI | Google Gemini 1.5 Flash |
| Deploy | Vercel |

## Project Structure

```
portfolioai/
├── src/
│   ├── components/
│   │   ├── forms/          # Step components (PersonalInfo, Skills, Projects…)
│   │   ├── layout/         # Navbar, Sidebar
│   │   ├── preview/        # Live PreviewPanel
│   │   └── ui/             # Reusable UI: InputField, AIButton, SkillTag…
│   ├── pages/              # BuilderPage
│   ├── services/           # aiService.js (Gemini API calls)
│   ├── store/              # Zustand store (usePortfolioStore.js)
│   ├── styles/             # globals.css (Tailwind base)
│   └── utils/              # exportUtils.js (HTML + JSON export)
├── server/
│   └── index.js            # Express backend (Gemini API proxy)
└── vercel.json             # Vercel deployment config
```

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourname/portfolioai.git
cd portfolioai
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env`:
```env
# Optional: Set a server-side Gemini key so users don't need to enter their own
GEMINI_API_KEY=your_gemini_api_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

Get your free Gemini API key at: https://aistudio.google.com/app/apikey

### 3. Run (Frontend only)

```bash
npm run dev
```

### 4. Run with Backend (for secure API key handling)

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd server && npm install && npm run dev
```

Or both at once:
```bash
npm run dev:all
```

### 5. Build for Production

```bash
npm run build
```

## Deployment (Vercel)

### Frontend only (users provide their own API key in UI)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

### With Backend

Deploy the server separately to Railway, Render, or a VPS:
1. Set `GEMINI_API_KEY` env var on your server
2. Set `VITE_API_URL` to your server URL in Vercel environment variables
3. Update `FRONTEND_URL` in server env to your Vercel domain

## AI Features

| Feature | Endpoint |
|---|---|
| Generate bio | `POST /api/gemini` |
| Suggest skills | `POST /api/gemini` |
| Improve project description | `POST /api/gemini` |
| Generate ATS resume summary | `POST /api/gemini` |

All features use **Gemini 1.5 Flash** — fast and free tier available.

## Contributing

PRs welcome! Please open an issue first for major changes.

## License

MIT
