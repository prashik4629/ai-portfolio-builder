export function exportJSON(profile, skills, projects, experience) {
  const data = { profile, skills, projects, experience, exportedAt: new Date().toISOString() }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `portfolioai-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportHTML(profile, skills, projects, experience, theme, generatedResume) {
  const esc = (s) => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const initials = profile.name
    ? profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  const skillPills = skills.map((s) => `<span class="skill-pill">${esc(s)}</span>`).join('')
  const projectCards = projects
    .filter((p) => p.name)
    .map(
      (p) => `
      <div class="project-card">
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.desc)}</p>
        <div class="tech-tags">${(p.tech || '').split(',').filter(Boolean).map((t) => `<span class="tech">${esc(t.trim())}</span>`).join('')}</div>
        ${p.url ? `<a href="${esc(p.url)}" target="_blank">↗ View Project</a>` : ''}
      </div>`
    )
    .join('')

  const expCards = experience
    .filter((e) => e.role)
    .map(
      (e) => `
      <div class="exp-card">
        <div class="exp-role">${esc(e.role)}</div>
        <div class="exp-company">${esc(e.company)}</div>
        <div class="exp-period">${esc(e.period)}</div>
        ${e.desc ? `<div class="exp-desc">${esc(e.desc)}</div>` : ''}
      </div>`
    )
    .join('')

  const socialLinks = [
    profile.github && `<a href="${esc(profile.github)}" target="_blank">GitHub</a>`,
    profile.linkedin && `<a href="${esc(profile.linkedin)}" target="_blank">LinkedIn</a>`,
    profile.website && `<a href="${esc(profile.website)}" target="_blank">Website</a>`,
    profile.twitter && `<a href="${esc(profile.twitter)}" target="_blank">Twitter</a>`,
  ]
    .filter(Boolean)
    .join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${esc(profile.name || 'Portfolio')} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#0a0a0f;color:#f0f0f8;line-height:1.6}
.hero{background:linear-gradient(135deg,#0d0d18,#0f0a1e);padding:80px 40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.08)}
.avatar{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#4285f4,#1a73e8);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:#fff;margin:0 auto 20px;box-shadow:0 0 30px rgba(66,133,244,0.3)}
.name{font-family:'Syne',sans-serif;font-size:36px;font-weight:800;color:#fff;margin-bottom:8px}
.title{color:#669df6;font-size:16px;margin-bottom:20px}
.social{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
.social a{padding:6px 16px;border-radius:20px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:#ccc;text-decoration:none;font-size:13px}
.section{padding:40px;max-width:900px;margin:0 auto;border-bottom:1px solid rgba(255,255,255,0.08)}
.section-title{font-family:'Syne',sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#669df6;margin-bottom:20px}
.about{font-size:15px;line-height:1.8;color:#b8b8d8}
.skills{display:flex;flex-wrap:wrap;gap:8px}
.skill-pill{padding:5px 14px;border-radius:20px;background:rgba(66,133,244,0.12);border:1px solid rgba(66,133,244,0.28);color:#669df6;font-size:12px;font-weight:500}
.projects{display:flex;flex-direction:column;gap:16px}
.project-card{background:#1c1c28;border:1px solid rgba(255,255,255,0.14);border-radius:12px;padding:20px}
.project-card h3{font-family:'Syne',sans-serif;font-weight:700;font-size:16px;color:#fff;margin-bottom:8px}
.project-card p{font-size:13px;color:#9898b8;line-height:1.6;margin-bottom:12px}
.tech-tags{display:flex;flex-wrap:wrap;gap:6px}
.tech{font-size:11px;padding:3px 10px;border-radius:12px;background:#22223a;color:#5a5a7a;border:1px solid rgba(255,255,255,0.08)}
.project-card a{display:inline-block;margin-top:10px;font-size:12px;color:#4285f4;text-decoration:none}
.exp-card{border-left:2px solid rgba(66,133,244,0.3);padding-left:16px;margin-bottom:20px}
.exp-role{font-weight:600;font-size:15px;color:#f0f0f8;margin-bottom:4px}
.exp-company{font-size:13px;color:#669df6;margin-bottom:4px}
.exp-period{font-size:12px;color:#5a5a7a;margin-bottom:8px}
.exp-desc{font-size:13px;color:#9898b8;line-height:1.6}
.resume-box{background:rgba(66,133,244,0.06);border:1px solid rgba(66,133,244,0.15);border-radius:8px;padding:16px;font-size:13px;line-height:1.7;color:#aaaacc;font-style:italic}
</style>
</head>
<body>
<div class="hero">
  <div class="avatar">${initials}</div>
  <div class="name">${esc(profile.name || 'Your Name')}</div>
  <div class="title">${esc(profile.title || 'Developer')}</div>
  <div class="social">${socialLinks}</div>
</div>
${profile.about ? `<div class="section"><div class="section-title">About</div><div class="about">${esc(profile.about)}</div></div>` : ''}
${generatedResume ? `<div class="section"><div class="section-title">Resume Summary</div><div class="resume-box">${esc(generatedResume)}</div></div>` : ''}
${skills.length ? `<div class="section"><div class="section-title">Skills</div><div class="skills">${skillPills}</div></div>` : ''}
${projects.some((p) => p.name) ? `<div class="section"><div class="section-title">Projects</div><div class="projects">${projectCards}</div></div>` : ''}
${experience.some((e) => e.role) ? `<div class="section"><div class="section-title">Experience</div>${expCards}</div>` : ''}
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${(profile.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}-portfolio.html`
  a.click()
  URL.revokeObjectURL(url)
}
