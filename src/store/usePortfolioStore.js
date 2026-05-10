import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultProfile = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  about: '',
  github: '',
  linkedin: '',
  twitter: '',
  website: '',
}

const defaultProject = (id) => ({
  id,
  name: '',
  url: '',
  desc: '',
  tech: '',
  order: id,
})

const defaultExperience = (id) => ({
  id,
  role: '',
  company: '',
  period: '',
  desc: '',
  order: id,
})

export const usePortfolioStore = create(
  persist(
    (set, get) => ({
      // Data
      profile: defaultProfile,
      skills: [],
      projects: [defaultProject(1)],
      experience: [defaultExperience(1)],
      generatedResume: '',

      // UI State
      currentStep: 0,
      theme: 'dark',
      apiKey: '',
      isLoading: {},

      // Profile actions
      updateProfile: (field, value) =>
        set((s) => ({ profile: { ...s.profile, [field]: value } })),

      // Skills actions
      addSkill: (skill) => {
        const trimmed = skill.trim()
        if (!trimmed) return
        set((s) => ({
          skills: s.skills.includes(trimmed) ? s.skills : [...s.skills, trimmed],
        }))
      },
      removeSkill: (skill) =>
        set((s) => ({ skills: s.skills.filter((sk) => sk !== skill) })),
      setSkills: (skills) => set({ skills }),

      // Projects actions
      addProject: () =>
        set((s) => {
          const id = Date.now()
          return { projects: [...s.projects, defaultProject(id)] }
        }),
      updateProject: (id, field, value) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, [field]: value } : p
          ),
        })),
      removeProject: (id) =>
        set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),
      setProjects: (projects) => set({ projects }),

      // Experience actions
      addExperience: () =>
        set((s) => {
          const id = Date.now()
          return { experience: [...s.experience, defaultExperience(id)] }
        }),
      updateExperience: (id, field, value) =>
        set((s) => ({
          experience: s.experience.map((e) =>
            e.id === id ? { ...e, [field]: value } : e
          ),
        })),
      removeExperience: (id) =>
        set((s) => ({ experience: s.experience.filter((e) => e.id !== id) })),
      setExperience: (experience) => set({ experience }),

      // AI
      setGeneratedResume: (text) => set({ generatedResume: text }),

      // UI
      setStep: (step) => set({ currentStep: step }),
      setTheme: (theme) => set({ theme }),
      setApiKey: (key) => set({ apiKey: key }),
      setLoading: (key, val) =>
        set((s) => ({ isLoading: { ...s.isLoading, [key]: val } })),

      // Progress calculation
      getProgress: () => {
        const { profile, skills, projects, experience } = get()
        let filled = 0
        const total = 10
        if (profile.name) filled++
        if (profile.title) filled++
        if (profile.email) filled++
        if (profile.about) filled++
        if (skills.length > 0) filled++
        if (projects.some((p) => p.name)) filled++
        if (experience.some((e) => e.role)) filled++
        if (profile.github || profile.linkedin) filled++
        if (profile.phone) filled++
        if (profile.location) filled++
        return Math.round((filled / total) * 100)
      },
    }),
    {
      name: 'portfolioai-storage',
      partialize: (state) => ({
        profile: state.profile,
        skills: state.skills,
        projects: state.projects,
        experience: state.experience,
        generatedResume: state.generatedResume,
        theme: state.theme,
      }),
    }
  )
)
