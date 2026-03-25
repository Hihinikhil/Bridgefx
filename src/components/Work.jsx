import { PlayIcon, PhotoIcon } from "./Icons";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? "http://localhost:1337";

function buildMediaUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

function isVideoMime(mime = "") {
  return mime.startsWith("video/");
}

function MediaArea({ item }) {
  const style = item.bg && !item.mediaUrl ? { background: item.bg } : {};

  if (item.mediaUrl && item.mediaType === "video") {
    return (
      <div
        className="vid-placeholder"
        style={{ padding: 0, overflow: "hidden", position: "relative" }}
      >
        <video
          src={item.mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* <div className="play-icon" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
          <PlayIcon />
        </div> */}
      </div>
    );
  }

  if (item.mediaUrl && item.mediaType === "image") {
    return (
      <div
        className="vid-placeholder"
        style={{ padding: 0, overflow: "hidden" }}
      >
        <img
          src={item.mediaUrl}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    );
  }

  return (
    <div className="vid-placeholder" style={style}>
      {item.isPhoto ? (
        <PhotoIcon />
      ) : (
        // <div className="play-icon">
        //   <PlayIcon />
        // </div>
        <></>
      )}
    </div>
  );
}

// Enrich raw item with mediaUrl/mediaType derived from Strapi media field
function withMedia(item) {
  if ("mediaUrl" in item) return item; // already normalised
  const file = item.media ?? null;
  const mediaUrl = file ? buildMediaUrl(file.url) : null;
  const mediaType = file ? (isVideoMime(file.mime) ? "video" : "image") : null;
  return { ...item, mediaUrl, mediaType };
}

export default function Work({ onViewAll, items = [] }) {
  const enriched = items.map(withMedia);
  const featuredOnly = enriched.filter((i) => i.featured);
  const horizontal = featuredOnly
    .filter((i) => i.layout === "horizontal")
    .slice(0, 2);
  const vertical = featuredOnly
    .filter((i) => i.layout === "vertical")
    .slice(0, 4);

  return (
    <section id="work">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Selected Works</p>
          <h2 className="section-title">
            ENGINEERED
            <br />
            NARRATIVES
          </h2>
        </div>

        <div className="work-grid-main">
          {horizontal.map((item, i) => (
            <div
              key={item.id ?? `h-${i}`}
              className="work-item horizontal reveal"
            >
              <MediaArea item={item} />
              {item.title && (
                <div className="work-overlay">
                  <h4 className="overlay-title">{item.title}</h4>
                  <span className="overlay-cat">{item.subtitle}</span>
                </div>
              )}
            </div>
          ))}

          <div className="work-row-v-alt">
            {vertical.map((item, i) => (
              <div
                key={item.id ?? `v-${i}`}
                className="work-item vertical reveal"
              >
                <MediaArea item={item} />
                {item.title && (
                  <div className="work-overlay">
                    <h4 className="overlay-title">{item.title}</h4>
                    <span className="overlay-cat">{item.subtitle}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="view-all-wrap reveal">
          <button
            className="hero-cta btn-outline"
            id="viewAllBtn"
            onClick={onViewAll}
          >
            VIEW ALL PROJECTS
          </button>
        </div>
      </div>
    </section>
  );
}
