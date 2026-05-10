import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { AIButton, FormNav, ApiKeyBanner } from '../ui/FormComponents'
import { generateResumeSummary } from '../../services/aiService'

export default function AIResumeStep() {
  const {
    profile, skills, projects, experience,
    generatedResume, setGeneratedResume,
    currentStep, setStep,
    apiKey, setApiKey,
    isLoading, setLoading,
  } = usePortfolioStore()

  const handleGenerate = async () => {
    if (!apiKey) {
      toast.error('Please enter your Gemini API key first')
      return
    }
    setLoading('resume', true)
    try {
      const summary = await generateResumeSummary(
        { name: profile.name, title: profile.title, skills, experience, projects, about: profile.about },
        apiKey
      )
      setGeneratedResume(summary)
      toast.success('Resume summary generated!')
    } catch (err) {
      toast.error(err.message || 'Failed to generate resume summary')
    } finally {
      setLoading('resume', false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResume)
    toast.success('Copied to clipboard!')
  }

  return (
    <motion.div
      key="step6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="font-head text-[22px] font-bold mb-1">AI Resume Summary</h2>
        <p className="text-[#9898b8] text-[13px]">
          Generate an ATS-optimized professional resume summary using Gemini.
        </p>
      </div>

      <ApiKeyBanner apiKey={apiKey} onSave={setApiKey} />

      <div className="flex flex-col gap-4">
        <div className="bg-surface border border-white/14 rounded-[10px] p-3.5 text-[12px] text-[#5a5a7a] leading-relaxed">
          <strong className="text-[#9898b8]">What this generates:</strong>
          <br />
          A 4–6 sentence ATS-optimized summary that highlights your role, skills, and key
          achievements. Perfect for the top of your resume or LinkedIn about section.
        </div>

        <div className="flex flex-wrap gap-2">
          <AIButton onClick={handleGenerate} loading={isLoading.resume}>
            ✦ Generate Resume Summary
          </AIButton>
          {generatedResume && (
            <AIButton onClick={handleCopy} variant="green">
              ⎘ Copy to Clipboard
            </AIButton>
          )}
        </div>

        {generatedResume && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-gemini/25 rounded-[10px] p-3.5 text-[13px] leading-[1.7] text-[#9898b8] whitespace-pre-wrap"
          >
            {generatedResume}
          </motion.div>
        )}

        <p className="text-[11px] text-[#5a5a7a] italic">
          Pro tip: Fill out Projects and Experience first for a stronger summary.
        </p>
      </div>

      <FormNav step={currentStep} onPrev={() => setStep(5)} />
    </motion.div>
  )
}
