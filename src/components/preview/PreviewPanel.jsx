import { motion } from 'framer-motion'
import { usePortfolioStore } from '../../store/usePortfolioStore'

// ── Theme config ──────────────────────────────────────────────
const themes = {
  dark: {
    bg: 'linear-gradient(135deg, #0d0d18 0%, #0f0a1e 50%, #0a0f18 100%)',
    heroBg: 'linear-gradient(135deg, #0d0d18, #0f0a1e)',
    heroBefore: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(66,133,244,0.12), transparent)',
    avatarBg: 'linear-gradient(135deg, #4285f4, #1a73e8)',
    avatarShadow: '0 0 24px rgba(66,133,244,0.3)',
    nameColor: '#ffffff',
    titleColor: '#669df6',
    socialBg: 'rgba(255,255,255,0.08)',
    socialBorder: 'rgba(255,255,255,0.12)',
    socialColor: '#ccc',
    sectionBorder: 'rgba(255,255,255,0.08)',
    sectionTitleColor: '#669df6',
    aboutColor: '#b8b8d8',
    skillPillBg: 'rgba(66,133,244,0.12)',
    skillPillBorder: 'rgba(66,133,244,0.28)',
    skillPillColor: '#669df6',
    projectBg: '#1c1c28',
    projectBorder: 'rgba(255,255,255,0.14)',
    projectTitleColor: '#ffffff',
    projectDescColor: '#9898b8',
    techBg: 'rgba(34,34,58,0.8)',
    techColor: '#5a5a7a',
    techBorder: 'rgba(255,255,255,0.08)',
    expBorder: 'rgba(66,133,244,0.3)',
    expRoleColor: '#f0f0f8',
    expCompanyColor: '#669df6',
    expPeriodColor: '#5a5a7a',
    expDescColor: '#9898b8',
    contactIconBg: '#22223a',
    contactIconColor: '#669df6',
    contactColor: '#9898b8',
    resumeBg: 'rgba(66,133,244,0.06)',
    resumeBorder: 'rgba(66,133,244,0.15)',
    resumeColor: '#aaaacc',
    panelBg: '#16161f',
  },
  light: {
    bg: '#f8f8fc',
    heroBg: '#ffffff',
    avatarBg: '#1a73e8',
    avatarShadow: 'none',
    nameColor: '#0f0f1a',
    titleColor: '#1a73e8',
    socialBg: '#f0f4ff',
    socialBorder: '#dde8ff',
    socialColor: '#1a73e8',
    sectionBorder: '#e8e8f0',
    sectionTitleColor: '#1a1a2a',
    aboutColor: '#444',
    skillPillBg: '#eef2ff',
    skillPillBorder: '#c7d7ff',
    skillPillColor: '#1a73e8',
    projectBg: '#ffffff',
    projectBorder: '#e8e8f0',
    projectTitleColor: '#111',
    projectDescColor: '#555',
    techBg: '#f0f4ff',
    techColor: '#6677aa',
    techBorder: '#dde8ff',
    expBorder: '#c5d8fd',
    expRoleColor: '#111',
    expCompanyColor: '#1a73e8',
    expPeriodColor: '#8888a8',
    expDescColor: '#5a5a7a',
    contactIconBg: '#f0f4ff',
    contactIconColor: '#1a73e8',
    contactColor: '#444',
    resumeBg: '#f0f4ff',
    resumeBorder: '#dde8ff',
    resumeColor: '#4455aa',
    panelBg: '#f8f8fc',
  },
  gradient: {
    bg: '#0c0c1a',
    heroBg: 'linear-gradient(135deg, #0d0920, #120830, #0d1528)',
    avatarBg: 'linear-gradient(135deg, #9464ff, #22d3ee)',
    avatarShadow: '0 0 24px rgba(148,100,255,0.4)',
    nameColor: '#ffffff',
    titleColor: '#22d3ee',
    socialBg: 'rgba(148,100,255,0.1)',
    socialBorder: 'rgba(148,100,255,0.25)',
    socialColor: '#c4b5fd',
    sectionBorder: 'rgba(148,100,255,0.12)',
    sectionTitleColor: '#22d3ee',
    aboutColor: '#b8b8d8',
    skillPillBg: 'rgba(148,100,255,0.12)',
    skillPillBorder: 'rgba(148,100,255,0.28)',
    skillPillColor: '#c4b5fd',
    projectBg: 'rgba(30,20,60,0.6)',
    projectBorder: 'rgba(148,100,255,0.2)',
    projectTitleColor: '#fff',
    projectDescColor: '#9898b8',
    techBg: 'rgba(20,12,40,0.6)',
    techColor: '#7070a0',
    techBorder: 'rgba(148,100,255,0.15)',
    expBorder: 'rgba(148,100,255,0.3)',
    expRoleColor: '#f0f0f8',
    expCompanyColor: '#22d3ee',
    expPeriodColor: '#5a5a7a',
    expDescColor: '#9898b8',
    contactIconBg: 'rgba(148,100,255,0.12)',
    contactIconColor: '#c4b5fd',
    contactColor: '#9898b8',
    resumeBg: 'rgba(148,100,255,0.06)',
    resumeBorder: 'rgba(148,100,255,0.15)',
    resumeColor: '#a8a8cc',
    panelBg: '#0c0c1a',
  },
  minimal: {
    bg: '#ffffff',
    heroBg: '#fafafa',
    avatarBg: '#111',
    avatarShadow: 'none',
    nameColor: '#000',
    titleColor: '#333',
    socialBg: 'transparent',
    socialBorder: '#ccc',
    socialColor: '#333',
    sectionBorder: '#eee',
    sectionTitleColor: '#000',
    aboutColor: '#444',
    skillPillBg: '#f0f0f0',
    skillPillBorder: '#ddd',
    skillPillColor: '#333',
    projectBg: '#fafafa',
    projectBorder: '#eee',
    projectTitleColor: '#000',
    projectDescColor: '#555',
    techBg: 'transparent',
    techColor: '#888',
    techBorder: '#ddd',
    expBorder: '#ccc',
    expRoleColor: '#111',
    expCompanyColor: '#555',
    expPeriodColor: '#aaa',
    expDescColor: '#555',
    contactIconBg: '#f0f0f0',
    contactIconColor: '#333',
    contactColor: '#444',
    resumeBg: '#f9f9f9',
    resumeBorder: '#eee',
    resumeColor: '#555',
    panelBg: '#fff',
  },
}

function esc(str) {
  return (str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default function PreviewPanel() {
  const { profile, skills, projects, experience, generatedResume, theme } = usePortfolioStore()

  const t = themes[theme] || themes.dark
  const initials = profile.name
    ? profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  const socialLinks = [
    profile.github && { href: profile.github, label: 'GitHub' },
    profile.linkedin && { href: profile.linkedin, label: 'LinkedIn' },
    profile.website && { href: profile.website, label: 'Website' },
    profile.twitter && { href: profile.twitter, label: 'Twitter' },
  ].filter(Boolean)

  return (
    <div className="flex flex-col h-full" style={{ background: t.panelBg }}>
      {/* Preview Header */}
      <div
        className="sticky top-0 z-10 backdrop-blur-xl px-5 py-3 flex items-center justify-between border-b"
        style={{
          background: t.panelBg + 'e6',
          borderColor: t.sectionBorder,
        }}
      >
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest"
          style={{ color: t.expPeriodColor }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Live Preview
        </div>
        <span className="text-[11px]" style={{ color: t.expPeriodColor }}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
        </span>
      </div>

      {/* Scrollable Preview Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Hero */}
        <div
          className="px-9 py-16 text-center relative overflow-hidden border-b"
          style={{
            background: t.heroBg,
            borderColor: t.sectionBorder,
          }}
        >
          {t.heroBefore && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: t.heroBefore }}
            />
          )}
          <div
            className="w-18 h-18 rounded-full flex items-center justify-center font-head text-[26px] font-extrabold mx-auto mb-4 relative z-10"
            style={{
              width: 72, height: 72,
              background: t.avatarBg,
              color: '#fff',
              boxShadow: t.avatarShadow,
            }}
          >
            {initials}
          </div>
          <div
            className="font-head font-extrabold text-[28px] relative z-10 mb-1"
            style={{ color: t.nameColor }}
          >
            {profile.name || 'Your Name'}
          </div>
          <div className="text-[14px] relative z-10 mb-4" style={{ color: t.titleColor }}>
            {profile.title || 'Your Title'}
          </div>
          <div className="flex justify-center gap-3 flex-wrap relative z-10">
            {socialLinks.length > 0 ? (
              socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all"
                  style={{
                    background: t.socialBg,
                    border: `1px solid ${t.socialBorder}`,
                    color: t.socialColor,
                    textDecoration: 'none',
                  }}
                >
                  {s.label}
                </a>
              ))
            ) : (
              <>
                {['GitHub', 'LinkedIn'].map((l) => (
                  <span
                    key={l}
                    className="px-3.5 py-1.5 rounded-full text-[12px]"
                    style={{ background: t.socialBg, border: `1px solid ${t.socialBorder}`, color: t.socialColor }}
                  >
                    {l}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>

        {/* About */}
        <Section t={t} title="About">
          <p className="text-[14px] leading-[1.8]" style={{ color: t.aboutColor }}>
            {profile.about || (
              <span style={{ color: t.expPeriodColor }}>Write your bio in Step 2, or use Gemini AI to generate it.</span>
            )}
          </p>
        </Section>

        {/* Resume Summary */}
        {generatedResume && (
          <Section t={t} title="Resume Summary">
            <div
              className="text-[13px] leading-[1.7] p-4 rounded-lg font-[300] italic"
              style={{
                background: t.resumeBg,
                border: `1px solid ${t.resumeBorder}`,
                color: t.resumeColor,
              }}
            >
              {generatedResume}
            </div>
          </Section>
        )}

        {/* Skills */}
        <Section t={t} title="Skills">
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="px-3.5 py-1 rounded-full text-[12px] font-medium"
                  style={{
                    background: t.skillPillBg,
                    border: `1px solid ${t.skillPillBorder}`,
                    color: t.skillPillColor,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-[13px]" style={{ color: t.expPeriodColor }}>Add skills in Step 3</span>
          )}
        </Section>

        {/* Projects */}
        <Section t={t} title="Projects">
          {projects.filter((p) => p.name).length > 0 ? (
            <div className="flex flex-col gap-3">
              {projects.filter((p) => p.name).map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl p-4 transition-transform hover:-translate-y-0.5"
                  style={{
                    background: t.projectBg,
                    border: `1px solid ${t.projectBorder}`,
                  }}
                >
                  <h4 className="font-head font-bold text-[15px] mb-1.5" style={{ color: t.projectTitleColor }}>
                    {p.name}
                  </h4>
                  <p className="text-[13px] leading-[1.6] mb-2" style={{ color: t.projectDescColor }}>
                    {p.desc || 'No description yet.'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(p.tech || '').split(',').filter((t2) => t2.trim()).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2.5 py-0.5 rounded-xl"
                        style={{
                          background: t.techBg,
                          color: t.techColor,
                          border: `1px solid ${t.techBorder}`,
                        }}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-2 text-[12px]"
                      style={{ color: '#4285f4', textDecoration: 'none' }}
                    >
                      ↗ View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-[28px] mb-2">📁</div>
              <span className="text-[13px]" style={{ color: t.expPeriodColor }}>Add projects in Step 4</span>
            </div>
          )}
        </Section>

        {/* Experience */}
        <Section t={t} title="Experience">
          {experience.filter((e) => e.role).length > 0 ? (
            experience.filter((e) => e.role).map((e) => (
              <div
                key={e.id}
                className="border-l-2 pl-4 mb-4"
                style={{ borderColor: t.expBorder }}
              >
                <div className="font-semibold text-[14px] mb-0.5" style={{ color: t.expRoleColor }}>{e.role}</div>
                <div className="text-[13px] mb-1" style={{ color: t.expCompanyColor }}>{e.company}</div>
                <div className="text-[12px] mb-1.5" style={{ color: t.expPeriodColor }}>{e.period}</div>
                {e.desc && <div className="text-[13px] leading-[1.6]" style={{ color: t.expDescColor }}>{e.desc}</div>}
              </div>
            ))
          ) : (
            <span className="text-[13px]" style={{ color: t.expPeriodColor }}>Add experience in Step 5</span>
          )}
        </Section>

        {/* Contact */}
        <Section t={t} title="Contact">
          {[
            profile.email && { icon: '✉', text: profile.email },
            profile.phone && { icon: '☎', text: profile.phone },
            profile.location && { icon: '⊙', text: profile.location },
          ].filter(Boolean).length > 0 ? (
            <div className="flex flex-col gap-2.5">
              {[
                profile.email && { icon: '✉', text: profile.email },
                profile.phone && { icon: '☎', text: profile.phone },
                profile.location && { icon: '⊙', text: profile.location },
              ].filter(Boolean).map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 text-[13px]" style={{ color: t.contactColor }}>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[14px] flex-shrink-0"
                    style={{ background: t.contactIconBg, color: t.contactIconColor }}
                  >
                    {item.icon}
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-[13px]" style={{ color: t.expPeriodColor }}>Add contact info in Step 1</span>
          )}
        </Section>
      </div>
    </div>
  )
}

function Section({ t, title, children }) {
  return (
    <div className="px-9 py-8 border-b" style={{ borderColor: t.sectionBorder }}>
      <div
        className="font-head text-[12px] font-bold uppercase tracking-[0.12em] mb-4"
        style={{ color: t.sectionTitleColor }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}
