import { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import PortfolioModal, { usePortfolioItems } from './components/PortfolioModal'
import { useStrapiData } from './hooks/useStrapiData'
import BrandStrip from './components/BrandStrip'
import Services from './components/Services'
import Reviews from './components/Reviews'
import Pricing from './components/Pricing'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [modalOpen, setModalOpen]       = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  // Consolidated data fetching
  const { items: portfolioItems, loading: portfolioLoading } = usePortfolioItems()
  const { data: servicesItems,  loading: servicesLoading }  = useStrapiData('/services?sort=order')
  const { data: pricingItems,   loading: pricingLoading }   = useStrapiData('/pricing-plans?sort=order')
  const { data: brandData,      loading: brandLoading }     = useStrapiData('/brand-section?populate=*')
  const { data: reviewsItems,   loading: reviewsLoading }   = useStrapiData('/reviews?sort=order&populate=*')
  const { data: teamItems,      loading: teamLoading }      = useStrapiData('/team-members?sort=order&populate=avatar')

  const isLoading = portfolioLoading || servicesLoading || pricingLoading || brandLoading || reviewsLoading || teamLoading

  // Toggle body scroll lock when modal opens/closes
  useEffect(() => {
    document.body.classList.toggle('modal-open', modalOpen)
  }, [modalOpen])

  // Reveal animation: IntersectionObserver with stagger
  useEffect(() => {
    let staggerDelay = 0
    let staggerTimeout

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${staggerDelay}s`
            entry.target.classList.add('visible')
            staggerDelay += 0.15
            clearTimeout(staggerTimeout)
            staggerTimeout = setTimeout(() => { staggerDelay = 0 }, 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Attach once on mount; also attach after a short delay to catch late-renders
    const attach = () => document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    attach()
    const t = setTimeout(attach, 300)

    return () => { observer.disconnect(); clearTimeout(t) }
  }, [])

  return (
    <>
      <Preloader isLoading={isLoading} />
      <Nav />
      <Hero />
      <Work onViewAll={() => setModalOpen(true)} items={portfolioItems} />
      <PortfolioModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        items={portfolioItems}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <BrandStrip data={brandData} />
      <Services items={servicesItems} />
      <Reviews items={reviewsItems} />
      <Pricing items={pricingItems} />
      <Team items={teamItems} />
      <Contact />
      <Footer />
    </>
  )
}
