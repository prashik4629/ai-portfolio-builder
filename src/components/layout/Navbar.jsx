import { motion } from 'framer-motion'
import { Download, FileJson, Moon, Sun, Sparkles, Zap } from 'lucide-react'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { exportHTML, exportJSON } from '../../utils/exportUtils'

const THEMES = [
  { key: 'dark', icon: '🌑', label: 'Dark' },
  { key: 'light', icon: '☀️', label: 'Light' },
  { key: 'gradient', icon: '✨', label: 'Gradient' },
  { key: 'minimal', icon: '⬜', label: 'Minimal' },
]

export default function Navbar() {
  const { theme, setTheme, profile, skills, projects, experience, generatedResume } =
    usePortfolioStore()

  const handleExportHTML = () => {
    exportHTML(profile, skills, projects, experience, theme, generatedResume)
  }

  const handleExportJSON = () => {
    exportJSON(profile, skills, projects, experience)
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-6 h-14 border-b border-white/[0.08] bg-[#0a0a0f]/97 backdrop-blur-xl z-50 flex-shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 font-head font-extrabold text-lg">
        <motion.div
          className="w-2 h-2 rounded-full bg-gemini shadow-[0_0_12px_#4285f4]"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        PortfolioAI
        <span className="text-[10px] font-semibold text-gemini-2 bg-gemini/10 border border-gemini/25 px-2 py-0.5 rounded-full tracking-wider">
          ✦ Gemini
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme switcher */}
        <div className="flex gap-1">
          {THEMES.map((t) => (
            <button
              key={t.key}
              title={t.label}
              onClick={() => setTheme(t.key)}
              className={`w-7 h-7 rounded-lg border text-[13px] flex items-center justify-center transition-all cursor-pointer
                ${
                  theme === t.key
                    ? 'border-gemini bg-gemini/15'
                    : 'border-white/14 bg-surface hover:border-gemini hover:bg-gemini/15'
                }`}
            >
              {t.icon}
            </button>
          ))}
        </div>

        {/* Export JSON */}
        <button
          onClick={handleExportJSON}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-white/14 text-[#9898b8] text-xs font-medium hover:text-white transition-all cursor-pointer"
        >
          <FileJson size={13} />
          JSON
        </button>

        {/* Export HTML */}
        <button
          onClick={handleExportHTML}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-medium hover:bg-green-500/18 hover:border-green-400 transition-all cursor-pointer"
        >
          <Download size={13} />
          Export HTML
        </button>
      </div>
    </motion.nav>
  )
}
