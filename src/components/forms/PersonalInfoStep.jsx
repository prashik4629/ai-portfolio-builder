import { usePortfolioStore } from '../../store/usePortfolioStore'
import { InputField, FormNav } from '../ui/FormComponents'
import { motion } from 'framer-motion'

export default function PersonalInfoStep() {
  const { profile, updateProfile, currentStep, setStep } = usePortfolioStore()

  return (
    <motion.div
      key="step0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="font-head text-[22px] font-bold mb-1">Personal Info</h2>
        <p className="text-[#9898b8] text-[13px]">Tell us who you are.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Full Name"
            value={profile.name}
            onChange={(v) => updateProfile('name', v)}
            placeholder="Jane Doe"
          />
          <InputField
            label="Job Title"
            value={profile.title}
            onChange={(v) => updateProfile('title', v)}
            placeholder="Senior Frontend Developer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Email"
            type="email"
            value={profile.email}
            onChange={(v) => updateProfile('email', v)}
            placeholder="jane@example.com"
          />
          <InputField
            label="Phone"
            value={profile.phone}
            onChange={(v) => updateProfile('phone', v)}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <InputField
          label="Location"
          value={profile.location}
          onChange={(v) => updateProfile('location', v)}
          placeholder="San Francisco, CA"
        />
      </div>

      <FormNav step={currentStep} onNext={() => setStep(1)} />
    </motion.div>
  )
}
