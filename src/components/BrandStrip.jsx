import { useStrapiData } from "../hooks/useStrapiData";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? "http://localhost:1337";

function buildMediaUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

export default function BrandStrip() {
  const { data } = useStrapiData("/brand-section?populate=*", {
    stats: [],
    logos: [],
  });

  const stats = (data.stats ?? []).map((s) => ({
    value: s.value ?? "",
    label: s.label ?? "",
  }));

  const rawLogos = (data.logos ?? [])
    .map((l) => ({
      id: l.id,
      url: buildMediaUrl(l.url),
      name: l.name ?? "Logo",
    }))
    .filter((l) => l.url);

  // Duplicate for seamless marquee effect
  const logos = [...rawLogos, ...rawLogos];
  return (
    <section id="brand-strip">
      <div className="marquee-wrapper mb-5">
        <div className="marquee-content">
          {logos.map((logo, index) => (
            <img
              key={`${logo.id}-${index}`}
              src={logo.url}
              alt={logo.name}
              className="brand-logo-img"
            />
          ))}
        </div>
      </div>
      <div className="container">
        <div className="brand-stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <h3 className="stat-value">{s.value}</h3>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
