import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { usePortfolioStore } from '../../store/usePortfolioStore'

const STEPS = [
  { id: 0, label: 'Personal Info', icon: '👤' },
  { id: 1, label: 'About Me', icon: '📝' },
  { id: 2, label: 'Skills', icon: '⚡' },
  { id: 3, label: 'Projects', icon: '🚀' },
  { id: 4, label: 'Experience', icon: '💼' },
  { id: 5, label: 'Social Links', icon: '🔗' },
  { id: 6, label: 'AI Resume', icon: '✦' },
]

function getCompletedSteps(profile, skills, projects, experience) {
  const done = new Set()
  if (profile.name && profile.email) done.add(0)
  if (profile.about) done.add(1)
  if (skills.length > 0) done.add(2)
  if (projects.some((p) => p.name)) done.add(3)
  if (experience.some((e) => e.role)) done.add(4)
  if (profile.github || profile.linkedin) done.add(5)
  return done
}

export default function Sidebar() {
  const { currentStep, setStep, getProgress, profile, skills, projects, experience } =
    usePortfolioStore()

  const progress = getProgress()
  const completedSteps = getCompletedSteps(profile, skills, projects, experience)

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-[#111118] border-r border-white/[0.08] overflow-y-auto flex flex-col gap-1 p-5 scrollbar-thin"
    >
      {/* Progress */}
      <div className="mb-2">
        <div className="flex justify-between text-[11px] text-[#5a5a7a] mb-1.5">
          <span>Progress</span>
          <span className="text-gemini-2">{progress}%</span>
        </div>
        <div className="h-0.5 bg-surface-2 rounded overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gemini to-gemini-2 rounded"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="h-px bg-white/[0.08] my-2" />

      <p className="text-[10px] font-semibold text-[#5a5a7a] uppercase tracking-widest px-2 mb-1">
        Sections
      </p>

      {STEPS.map((step) => {
        const isActive = currentStep === step.id
        const isDone = completedSteps.has(step.id)

        return (
          <motion.button
            key={step.id}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStep(step.id)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left w-full text-[13px] transition-all cursor-pointer border
              ${
                isActive
                  ? 'bg-gemini/12 border-gemini/25 text-gemini-2'
                  : 'bg-transparent border-transparent text-[#9898b8] hover:bg-surface hover:text-white'
              }`}
          >
            <div
              className={`w-5.5 h-5.5 rounded-md border flex items-center justify-center text-[11px] font-semibold flex-shrink-0 transition-all
                ${
                  isActive
                    ? 'bg-gemini border-gemini text-white'
                    : isDone
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : 'border-current opacity-60'
                }`}
              style={{ width: 22, height: 22 }}
            >
              {isDone && !isActive ? (
                <CheckCircle2 size={12} className="text-green-400" />
              ) : (
                step.id + 1
              )}
            </div>
            {step.label}
          </motion.button>
        )
      })}

      <div className="h-px bg-white/[0.08] my-2" />

      {/* AI Info Card */}
      <div className="bg-gemini/7 border border-gemini/18 rounded-xl p-3 mt-1">
        <h4 className="text-xs font-semibold text-gemini-2 mb-1.5">✦ Gemini AI</h4>
        <p className="text-[11px] text-[#5a5a7a] leading-relaxed">
          Generate bios, suggest skills, improve project descriptions, and create ATS-optimized
          resume summaries.
        </p>
      </div>
    </motion.aside>
  )
}
