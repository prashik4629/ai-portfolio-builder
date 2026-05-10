import { AnimatePresence } from 'framer-motion'
import { usePortfolioStore } from '../store/usePortfolioStore'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import PreviewPanel from '../components/preview/PreviewPanel'
import PersonalInfoStep from '../components/forms/PersonalInfoStep'
import AboutMeStep from '../components/forms/AboutMeStep'
import SkillsStep from '../components/forms/SkillsStep'
import ProjectsStep from '../components/forms/ProjectsStep'
import ExperienceStep from '../components/forms/ExperienceStep'
import SocialLinksStep from '../components/forms/SocialLinksStep'
import AIResumeStep from '../components/forms/AIResumeStep'

const STEP_COMPONENTS = [
  PersonalInfoStep,
  AboutMeStep,
  SkillsStep,
  ProjectsStep,
  ExperienceStep,
  SocialLinksStep,
  AIResumeStep,
]

export default function BuilderPage() {
  const currentStep = usePortfolioStore((s) => s.currentStep)
  const StepComponent = STEP_COMPONENTS[currentStep] || PersonalInfoStep

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div
        className="flex flex-1 overflow-hidden"
        style={{ display: 'grid', gridTemplateColumns: '260px 1fr 1fr' }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Form Panel */}
        <section
          className="overflow-y-auto p-7 scrollbar-thin border-r border-white/[0.08]"
          style={{ background: 'var(--bg2)' }}
        >
          <AnimatePresence mode="wait">
            <StepComponent key={currentStep} />
          </AnimatePresence>
        </section>

        {/* Preview Panel */}
        <section className="overflow-hidden">
          <PreviewPanel />
        </section>
      </div>
    </div>
  )
}
