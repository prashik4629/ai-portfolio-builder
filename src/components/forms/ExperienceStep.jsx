import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { InputField, TextAreaField, FormNav } from '../ui/FormComponents'

function ExperienceCard({ exp, onUpdate, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-surface border border-white/14 rounded-xl p-4 mb-3 hover:border-gemini/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-[14px]">
          {exp.role || <span className="text-[#5a5a7a]">Position</span>}
          {exp.company && <span className="text-[#9898b8] font-normal"> @ {exp.company}</span>}
        </h4>
        <button
          onClick={onDelete}
          className="text-[#5a5a7a] hover:text-red-400 text-lg leading-none cursor-pointer transition-colors"
        >
          ×
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Job Title"
            value={exp.role}
            onChange={(v) => onUpdate('role', v)}
            placeholder="Senior Developer"
          />
          <InputField
            label="Company"
            value={exp.company}
            onChange={(v) => onUpdate('company', v)}
            placeholder="Acme Corp"
          />
        </div>

        <InputField
          label="Period"
          value={exp.period}
          onChange={(v) => onUpdate('period', v)}
          placeholder="Jan 2022 – Present"
        />

        <TextAreaField
          label="Description"
          value={exp.desc}
          onChange={(v) => onUpdate('desc', v)}
          placeholder="Key responsibilities and achievements..."
          rows={3}
        />
      </div>
    </motion.div>
  )
}

export default function ExperienceStep() {
  const { experience, addExperience, updateExperience, removeExperience, currentStep, setStep } =
    usePortfolioStore()

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="font-head text-[22px] font-bold mb-1">Experience</h2>
        <p className="text-[#9898b8] text-[13px]">List your work history.</p>
      </div>

      <AnimatePresence>
        {experience.map((exp) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            onUpdate={(field, value) => updateExperience(exp.id, field, value)}
            onDelete={() => removeExperience(exp.id)}
          />
        ))}
      </AnimatePresence>

      <button
        onClick={addExperience}
        className="w-full px-4 py-2.5 bg-gemini border-none rounded-[10px] text-white text-[13px] font-medium cursor-pointer hover:opacity-85 transition-opacity mt-1"
      >
        + Add Position
      </button>

      <FormNav step={currentStep} onPrev={() => setStep(3)} onNext={() => setStep(5)} />
    </motion.div>
  )
}
