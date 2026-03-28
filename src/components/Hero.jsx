export default function Hero({ data }) {
  const heroData = data || {};
  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="container hero-content">
        <p className="hero-small reveal"> {heroData.heroSmall || "Creative Agency"} </p>
        <h1 className="hero-title reveal">
          {heroData.heroTitle ? (
            <span dangerouslySetInnerHTML={{ __html: heroData.heroTitle }} />
          ) : (
            <>
              WE <span className="accent">BUILD</span>
              <br />
              THE <span className="stroke">BRIDGE</span>
            </>
          )}
        </h1>
        <p className="hero-desc reveal">
          {heroData.heroDesc ||
            "Sophisticated post-production for visionary brands. We map the terrain between raw concepts and high-impact results."}
        </p>
        <a href="#work" className="hero-cta reveal">
          {heroData.heroCta || "Explore Portfolio"}
        </a>
      </div>
    </section>
  );
}
