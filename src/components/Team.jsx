import { useStrapiData } from '../hooks/useStrapiData'

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337'

function buildMediaUrl(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

const FALLBACK = [
  { name: 'Nikhil',    role: 'Founder',  initials: 'AK' },
  { name: 'Janmejoy', role: 'Editor',   initials: 'SP' },
  { name: 'Dilesh',   role: 'Editor',   initials: 'RV' },
  { name: 'Siddharth',role: 'Designer', initials: 'NR' },
]

export default function Team() {
  const { data } = useStrapiData('/team-members?sort=order&populate=avatar', FALLBACK)

  const members = data.map(d => ({
    name:       d.name     ?? '',
    role:       d.role     ?? '',
    initials:   d.initials ?? '??',
    avatarUrl:  d.avatar ? buildMediaUrl(d.avatar.url) : null,
  }))

  return (
    <section id="team">
      <div className="container">
        <div className="reveal">
          <p className="section-label">The People</p>
          <h2 className="section-title">MEET THE TEAM</h2>
        </div>
        <div className="team-grid">
          {members.map((m, i) => (
            <div className="team-card reveal" key={`${m.initials}-${i}`}>
              <div className="team-photo">
                {m.avatarUrl ? (
                  <img src={m.avatarUrl} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <>
                    <div className="avatar">{m.initials}</div>
                    <div className="initials">{m.initials}</div>
                  </>
                )}
              </div>
              <div className="team-info">
                <h3 className="team-name">{m.name}</h3>
                <p className="team-role">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
