import { useStrapiData } from '../hooks/useStrapiData'

const FALLBACK_SERVICES = [
  {
    title: 'VIDEO EDITING', iconType: 'video', order: 1,
    description: 'Cinematic post-production designed to hold attention and drive conversion across digital platforms.',
    tags: ['Motion Design', 'Color Grading', 'VFX & Cleanup', 'Content Strategy'],
  },
  {
    title: 'GRAPHIC DESIGN', iconType: 'design', order: 2,
    description: 'Bold visual identities and high-conversion assets that define premium brand presence.',
    tags: ['Thumbnails', 'Logo Systems', 'Social Media Kits', 'Brand Guidelines'],
  },
]

const VIDEO_ICON = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path>
    <rect x="3" y="6" width="12" height="12" rx="2"></rect>
  </svg>
)

const DESIGN_ICON = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 22h20L12 2z"></path>
    <circle cx="12" cy="14" r="3"></circle>
  </svg>
)

function getIcon(iconType) {
  return iconType === 'design' ? DESIGN_ICON : VIDEO_ICON
}

export default function Services() {
  const { data } = useStrapiData('/services?sort=order', FALLBACK_SERVICES)

  const services = data.map(d => ({
    title:       d.title       ?? '',
    description: d.description ?? '',
    tags:        Array.isArray(d.tags) ? d.tags : [],
    iconType:    d.iconType    ?? 'video',
  }))

  return (
    <section id="services">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Core Crafts</p>
          <h2 className="section-title">OUR SERVICES</h2>
        </div>

        <div className="services-grid">
          {services.map((svc, i) => (
            <div className="svc-card reveal" key={`${svc.title}-${i}`}>
              <div className="svc-icon">{getIcon(svc.iconType)}</div>
              <h3 className="section-title" style={{ fontSize: '2rem' }}>{svc.title}</h3>
              <p className="section-sub">{svc.description}</p>
              <ul className="svc-list">
                {svc.tags.map(tag => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
