import { motion } from 'framer-motion'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { InputField, FormNav } from '../ui/FormComponents'

export default function SocialLinksStep() {
  const { profile, updateProfile, currentStep, setStep } = usePortfolioStore()

  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="font-head text-[22px] font-bold mb-1">Social Links</h2>
        <p className="text-[#9898b8] text-[13px]">Connect your professional profiles.</p>
      </div>

      <div className="flex flex-col gap-4">
        <InputField
          label="GitHub"
          value={profile.github}
          onChange={(v) => updateProfile('github', v)}
          placeholder="https://github.com/username"
        />
        <InputField
          label="LinkedIn"
          value={profile.linkedin}
          onChange={(v) => updateProfile('linkedin', v)}
          placeholder="https://linkedin.com/in/username"
        />
        <InputField
          label="Twitter / X"
          value={profile.twitter}
          onChange={(v) => updateProfile('twitter', v)}
          placeholder="https://x.com/username"
        />
        <InputField
          label="Personal Website"
          value={profile.website}
          onChange={(v) => updateProfile('website', v)}
          placeholder="https://mysite.dev"
        />
      </div>

      <FormNav step={currentStep} onPrev={() => setStep(4)} onNext={() => setStep(6)} />
    </motion.div>
  )
}
