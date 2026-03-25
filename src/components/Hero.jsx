export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="container hero-content">
        <p className="hero-small reveal"> Creative Agency </p>
        <h1 className="hero-title reveal">
          WE <span className="accent">BUILD</span>
          <br />
          THE <span className="stroke">BRIDGE</span>
        </h1>
        <p className="hero-desc reveal">
          Sophisticated post-production for visionary brands. We map the terrain
          between raw concepts and high-impact results.
        </p>
        <a href="#work" className="hero-cta reveal">
          Explore Portfolio
        </a>
      </div>
    </section>
  );
}
