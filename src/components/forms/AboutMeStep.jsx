import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { TextAreaField, AIButton, FormNav, ApiKeyBanner } from '../ui/FormComponents'
import { generateBio } from '../../services/aiService'

export default function AboutMeStep() {
  const { profile, skills, experience, updateProfile, currentStep, setStep, apiKey, setApiKey, isLoading, setLoading } =
    usePortfolioStore()

  const handleGenerateBio = async () => {
    if (!apiKey) {
      toast.error('Please enter your Gemini API key first')
      return
    }
    setLoading('bio', true)
    try {
      const bio = await generateBio({ name: profile.name, title: profile.title, skills, experience }, apiKey)
      updateProfile('about', bio)
      toast.success('Bio generated!')
    } catch (err) {
      toast.error(err.message || 'Failed to generate bio')
    } finally {
      setLoading('bio', false)
    }
  }

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="font-head text-[22px] font-bold mb-1">About Me</h2>
        <p className="text-[#9898b8] text-[13px]">Your professional bio and introduction.</p>
      </div>

      <ApiKeyBanner apiKey={apiKey} onSave={setApiKey} />

      <div className="flex flex-col gap-4">
        <TextAreaField
          label="Bio"
          value={profile.about}
          onChange={(v) => updateProfile('about', v)}
          placeholder="Write a short professional bio about yourself..."
          rows={6}
        />

        <div className="flex gap-2">
          <AIButton onClick={handleGenerateBio} loading={isLoading.bio}>
            ✦ Generate Bio with Gemini
          </AIButton>
          {profile.about && (
            <AIButton
              onClick={() => {
                navigator.clipboard.writeText(profile.about)
                toast.success('Copied to clipboard')
              }}
              variant="green"
            >
              ⎘ Copy
            </AIButton>
          )}
        </div>

        <p className="text-[11px] text-[#5a5a7a] italic">
          Pro tip: Fill out Personal Info and Skills first for a better AI-generated bio.
        </p>
      </div>

      <FormNav step={currentStep} onPrev={() => setStep(0)} onNext={() => setStep(2)} />
    </motion.div>
  )
}
