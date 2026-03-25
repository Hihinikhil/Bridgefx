import { useStrapiData } from '../hooks/useStrapiData'
import { CheckIcon } from './Icons'

const FALLBACK = [
  { tag: 'Creators',    amount: '$500',    featured: false, buttonLabel: 'Get Started ↗', iconType: 'starter', features: ['2 Long forms', '4 Short forms -/per video', '2 Thumbnails'] },
  { tag: 'Customise ™', amount: '$XX,000', featured: true,  buttonLabel: 'Apply Now ↗',   iconType: 'diamond', features: ['Unlimited Long Form', 'Premium Thumbnails', 'Unlimited Short Form', 'Growth Guarantee'] },
  { tag: 'Brands',      amount: '$1,000',  featured: false, buttonLabel: 'Schedule Call ↗',iconType: 'brands',  features: ['4 Long forms', '4 Short forms -/per video', '4 Thumbnails'] },
]

const ICON_MAP = {
  starter: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path>
    </svg>
  ),
  diamond: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3h12l4 6-10 12L2 9l4-6z"></path>
    </svg>
  ),
  brands: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 14l6-6M4 14l-2 6 6-2M4 14l10-10 6 2-10 10M14 4l6 6M14 14l6 6"></path>
    </svg>
  ),
}

export default function Pricing() {
  const { data } = useStrapiData('/pricing-plans?sort=order', FALLBACK)

  const plans = data.map(d => ({
    tag:         d.tag         ?? '',
    amount:      d.amount      ?? '',
    featured:    d.featured    ?? false,
    buttonLabel: d.buttonLabel ?? 'Get Started ↗',
    iconType:    d.iconType    ?? 'starter',
    features:    Array.isArray(d.features) ? d.features : [],
  }))

  return (
    <section id="pricing">
      <div className="container">
        <div className="pricing-header reveal">
          <p className="section-label" style={{ justifyContent: 'center' }}>Plans</p>
          <h2 className="section-title">YOUR INVESTMENT</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Strategic sprints designed to transform expertise into influence with measurable returns.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div key={`${plan.tag}-${i}`} className={`price-card${plan.featured ? ' featured' : ''} reveal`}>
              <div className="price-icon-box">{ICON_MAP[plan.iconType] ?? ICON_MAP.starter}</div>
              <h3 className="price-tag"> {plan.tag} </h3>
              <div className="price-amount">{plan.amount}<span></span></div>
              <ul className="price-features">
                {plan.features.map(f => (
                  <li key={f}><CheckIcon /> {f}</li>
                ))}
              </ul>
              <a href="#contact" className="price-btn">{plan.buttonLabel}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
