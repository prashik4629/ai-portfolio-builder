import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { InputField, TextAreaField, AIButton, FormNav, ApiKeyBanner } from '../ui/FormComponents'
import { improveProjectDesc } from '../../services/aiService'

function ProjectCard({ project, onUpdate, onDelete, onImprove, loadingImprove }) {
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
          {project.name || <span className="text-[#5a5a7a]">Untitled Project</span>}
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
            label="Project Name"
            value={project.name}
            onChange={(v) => onUpdate('name', v)}
            placeholder="My Awesome App"
          />
          <InputField
            label="Live URL"
            value={project.url}
            onChange={(v) => onUpdate('url', v)}
            placeholder="https://..."
          />
        </div>

        <TextAreaField
          label="Description"
          value={project.desc}
          onChange={(v) => onUpdate('desc', v)}
          placeholder="What does it do? What problems does it solve?"
          rows={3}
        />

        <InputField
          label="Tech Stack"
          value={project.tech}
          onChange={(v) => onUpdate('tech', v)}
          placeholder="React, Node.js, PostgreSQL"
        />

        <AIButton onClick={onImprove} loading={loadingImprove}>
          ✦ Improve Description with Gemini
        </AIButton>
      </div>
    </motion.div>
  )
}

export default function ProjectsStep() {
  const { projects, addProject, updateProject, removeProject, currentStep, setStep, apiKey, setApiKey, isLoading, setLoading } =
    usePortfolioStore()

  const handleImprove = async (project) => {
    if (!apiKey) {
      toast.error('Please enter your Gemini API key first')
      return
    }
    const key = `proj-${project.id}`
    setLoading(key, true)
    try {
      const improved = await improveProjectDesc(project, apiKey)
      updateProject(project.id, 'desc', improved)
      toast.success('Description improved!')
    } catch (err) {
      toast.error(err.message || 'Failed to improve description')
    } finally {
      setLoading(key, false)
    }
  }

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="font-head text-[22px] font-bold mb-1">Projects</h2>
        <p className="text-[#9898b8] text-[13px]">Showcase your best work.</p>
      </div>

      <ApiKeyBanner apiKey={apiKey} onSave={setApiKey} />

      <AnimatePresence>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onUpdate={(field, value) => updateProject(project.id, field, value)}
            onDelete={() => removeProject(project.id)}
            onImprove={() => handleImprove(project)}
            loadingImprove={isLoading[`proj-${project.id}`]}
          />
        ))}
      </AnimatePresence>

      <button
        onClick={addProject}
        className="w-full px-4 py-2.5 bg-gemini border-none rounded-[10px] text-white text-[13px] font-medium cursor-pointer hover:opacity-85 transition-opacity mt-1"
      >
        + Add Project
      </button>

      <FormNav step={currentStep} onPrev={() => setStep(2)} onNext={() => setStep(4)} />
    </motion.div>
  )
}
