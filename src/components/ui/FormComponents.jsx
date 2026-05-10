import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

// ── InputField ──────────────────────────────────────────────
export function InputField({ label, value, onChange, placeholder, type = 'text', className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-[12px] font-medium text-[#9898b8] tracking-wide">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-surface border border-white/14 rounded-[10px] text-[#f0f0f8] text-[13px] px-3.5 py-2.5 outline-none transition-all
          focus:border-gemini focus:shadow-[0_0_0_3px_rgba(66,133,244,0.15)] w-full"
      />
    </div>
  )
}

// ── TextAreaField ────────────────────────────────────────────
export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-[12px] font-medium text-[#9898b8] tracking-wide">{label}</label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="bg-surface border border-white/14 rounded-[10px] text-[#f0f0f8] text-[13px] px-3.5 py-2.5 outline-none transition-all resize-y
          focus:border-gemini focus:shadow-[0_0_0_3px_rgba(66,133,244,0.15)] w-full"
      />
    </div>
  )
}

// ── AIButton ─────────────────────────────────────────────────
export function AIButton({ onClick, loading, children, variant = 'default', className = '' }) {
  const variants = {
    default:
      'bg-gemini/10 border-gemini/28 text-gemini-2 hover:bg-gemini/18 hover:border-gemini',
    green: 'bg-green-500/8 border-green-500/25 text-green-400 hover:bg-green-500/18 hover:border-green-400',
  }

  return (
    <motion.button
      whileHover={{ scale: loading ? 1 : 1.01 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-[12px] font-medium cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${className}`}
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : null}
      {children}
    </motion.button>
  )
}

// ── FormNav ───────────────────────────────────────────────────
export function FormNav({ step, totalSteps = 7, onPrev, onNext }) {
  return (
    <div className="flex gap-2.5 mt-6 pt-5 border-t border-white/[0.08]">
      {step > 0 && (
        <button
          onClick={onPrev}
          className="px-5 py-2.5 bg-surface border border-white/14 rounded-[10px] text-[#9898b8] text-[13px] hover:text-white transition-all cursor-pointer"
        >
          ← Back
        </button>
      )}
      {step < totalSteps - 1 && (
        <motion.button
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="ml-auto px-6 py-2.5 bg-gemini border-none rounded-[10px] text-white text-[13px] font-medium cursor-pointer"
        >
          Next →
        </motion.button>
      )}
    </div>
  )
}

// ── ApiKeyBanner ───────────────────────────────────────────────
export function ApiKeyBanner({ apiKey, onSave }) {
  const [localKey, setLocalKey] = window.React?.useState
    ? window.React.useState(apiKey)
    : [apiKey, () => {}]

  return (
    <div className="bg-gemini/7 border border-gemini/20 rounded-[10px] p-3 mb-4 text-[12px] text-[#9898b8] leading-relaxed">
      <strong className="text-gemini-2">Gemini API Key required</strong> for AI features.{' '}
      <a
        href="https://aistudio.google.com/app/apikey"
        target="_blank"
        rel="noreferrer"
        className="text-gemini underline"
      >
        Get yours free →
      </a>
      <div className="text-[11px] text-[#5a5a7a] mt-1">Uses gemini-1.5-flash model.</div>
      {!apiKey && (
        <div className="flex gap-2 mt-2">
          <input
            type="password"
            placeholder="AIza..."
            defaultValue={apiKey}
            onChange={(e) => setLocalKey && setLocalKey(e.target.value)}
            id="apikeyinput"
            className="flex-1 bg-surface border border-white/14 rounded-lg text-[#f0f0f8] text-[12px] px-3 py-1.5 outline-none focus:border-gemini"
          />
          <button
            onClick={() => {
              const el = document.getElementById('apikeyinput')
              onSave(el?.value || '')
            }}
            className="px-3 py-1.5 bg-gemini rounded-lg text-white text-[12px] cursor-pointer"
          >
            Save
          </button>
        </div>
      )}
      {apiKey && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-green-400 text-[11px]">✓ API key saved</span>
          <button
            onClick={() => onSave('')}
            className="text-[11px] text-[#5a5a7a] underline cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

// ── SkillTag ───────────────────────────────────────────────────
export function SkillTag({ skill, onRemove }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-white/14 text-[12px] text-[#9898b8]"
    >
      {skill}
      <button
        onClick={() => onRemove(skill)}
        className="text-[#5a5a7a] hover:text-red-400 text-sm leading-none cursor-pointer transition-colors"
      >
        ×
      </button>
    </motion.span>
  )
}
