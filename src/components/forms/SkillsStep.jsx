import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { AIButton, FormNav, SkillTag, ApiKeyBanner } from '../ui/FormComponents'
import { suggestSkills } from '../../services/aiService'

export default function SkillsStep() {
  const { skills, addSkill, removeSkill, setSkills, profile, currentStep, setStep, apiKey, setApiKey, isLoading, setLoading } =
    usePortfolioStore()
  const [newSkill, setNewSkill] = useState('')

  const handleAdd = () => {
    if (!newSkill.trim()) return
    addSkill(newSkill)
    setNewSkill('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  const handleSuggest = async () => {
    if (!apiKey) {
      toast.error('Please enter your Gemini API key first')
      return
    }
    setLoading('skills', true)
    try {
      const suggested = await suggestSkills({ title: profile.title, skills }, apiKey)
      let added = 0
      suggested.forEach((s) => {
        if (!skills.includes(s)) {
          addSkill(s)
          added++
        }
      })
      toast.success(`Added ${added} new skill suggestions!`)
    } catch (err) {
      toast.error(err.message || 'Failed to suggest skills')
    } finally {
      setLoading('skills', false)
    }
  }

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="font-head text-[22px] font-bold mb-1">Skills</h2>
        <p className="text-[#9898b8] text-[13px]">Your technical toolkit.</p>
      </div>

      <ApiKeyBanner apiKey={apiKey} onSave={setApiKey} />

      <div className="flex flex-col gap-4">
        {/* Add skill input */}
        <div>
          <label className="text-[12px] font-medium text-[#9898b8] tracking-wide block mb-1.5">
            Add Skill
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. React, TypeScript, AWS..."
              className="flex-1 bg-surface border border-white/14 rounded-[10px] text-[#f0f0f8] text-[13px] px-3.5 py-2.5 outline-none focus:border-gemini focus:shadow-[0_0_0_3px_rgba(66,133,244,0.15)]"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-gemini border-none rounded-[10px] text-white text-[13px] font-medium cursor-pointer hover:opacity-85 transition-opacity whitespace-nowrap"
            >
              Add
            </button>
          </div>
        </div>

        {/* Skills display */}
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          <AnimatePresence>
            {skills.length === 0 ? (
              <span className="text-[12px] text-[#5a5a7a]">No skills yet — add some above or use AI suggestions</span>
            ) : (
              skills.map((skill) => (
                <SkillTag key={skill} skill={skill} onRemove={removeSkill} />
              ))
            )}
          </AnimatePresence>
        </div>

        {skills.length > 0 && (
          <button
            onClick={() => setSkills([])}
            className="text-[11px] text-[#5a5a7a] underline cursor-pointer w-fit"
          >
            Clear all
          </button>
        )}

        <AIButton onClick={handleSuggest} loading={isLoading.skills}>
          ✦ Suggest Skills for {profile.title || 'my role'}
        </AIButton>
      </div>

      <FormNav step={currentStep} onPrev={() => setStep(1)} onNext={() => setStep(3)} />
    </motion.div>
  )
}
