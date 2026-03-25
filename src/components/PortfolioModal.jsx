import { useStrapiData } from "../hooks/useStrapiData";
import { PlayIcon, PhotoIcon } from "./Icons";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? "http://localhost:1337";

// Human-friendly labels for known categories; unknown ones are auto-capitalised
const CATEGORY_LABELS = {
  brand: "Brand Films",
  social: "Social & Reels",
  photo: "Photos",
};

function buildFilters(items) {
  const seen = new Set();
  const dynamic = [];
  items.forEach((item) => {
    if (item.category && !seen.has(item.category)) {
      seen.add(item.category);
      dynamic.push({
        key: item.category,
        label:
          CATEGORY_LABELS[item.category] ??
          item.category.charAt(0).toUpperCase() + item.category.slice(1),
      });
    }
  });
  return [{ key: "all", label: "All" }, ...dynamic];
}

// Build an absolute URL for Strapi-hosted media
function buildMediaUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url; // already absolute
  return `${STRAPI_URL}${url}`;
}

// Determine if a mime type is a video
function isVideoMime(mime = "") {
  return mime.startsWith("video/");
}

// Normalise a Strapi document (v5 returns flat objects, not nested attributes)
function normalise(raw) {
  const file = raw.media ?? null;
  const mediaUrl = file ? buildMediaUrl(file.url) : null;
  const mediaType = file ? (isVideoMime(file.mime) ? "video" : "image") : null;

  return {
    id: raw.id ?? raw.documentId,
    title: raw.title ?? "",
    subtitle: raw.subtitle ?? "",
    category: raw.category ?? "brand",
    layout: raw.layout ?? "horizontal",
    isPhoto: raw.isPhoto ?? false,
    featured: raw.featured ?? false,
    bg: raw.bg ?? null,
    mediaUrl,
    mediaType,
  };
}

// Render the media area of a card (image / video / placeholder)
function MediaArea({ item, className = "vid-placeholder" }) {
  const style = item.bg && !item.mediaUrl ? { background: item.bg } : {};

  if (item.mediaUrl && item.mediaType === "video") {
    return (
      <div
        className={className}
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
      <div className={className} style={{ padding: 0, overflow: "hidden" }}>
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

  // Fallback placeholder when no media is uploaded
  return (
    <div className={className} style={style}>
      {item.isPhoto ? (
        <PhotoIcon />
      ) : (
        // <div className="play-icon">
        //   <PlayIcon size={20} />
        // </div>
        <></>
      )}
    </div>
  );
}

export function usePortfolioItems() {
  const { data, loading } = useStrapiData(
    "/portfolio-items?sort=order&pagination[limit]=50&populate=media",
    [],
  );
  const normalised = data.map((d) => ("mediaUrl" in d ? d : normalise(d)));
  return { items: normalised, loading };
}

export default function PortfolioModal({
  isOpen,
  onClose,
  items,
  activeFilter,
  setActiveFilter,
}) {
  const filters = buildFilters(items);
  const filtered =
    activeFilter === "all"
      ? items
      : items.filter((i) => i.category === activeFilter);

  return (
    <div
      className={`modal-overlay${isOpen ? " active" : ""}`}
      id="portfolioModal"
    >
      <button className="modal-close" id="closeModal" onClick={onClose}>
        &times;
      </button>
      <div className="modal-content-container">
        <div style={{ textAlign: "center" }}>
          <p
            className="section-label"
            style={{ justifyContent: "center", marginBottom: "1rem" }}
          >
            Full Archive
          </p>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            ALL PROJECTS
          </h2>
        </div>

        <div className="modal-filter-bar">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`modal-filter-btn${activeFilter === f.key ? " active" : ""}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="modal-portfolio-grid">
          {filtered.map((item) => (
            <div
              key={item.id ?? item.title}
              className={`modal-work-item ${item.layout}${item.isPhoto ? " photo" : ""}`}
              data-cat={item.category}
            >
              <MediaArea item={item} className="vid-placeholder" />
              <div className="work-overlay">
                <h4 className="overlay-title">{item.title}</h4>
                <span className="overlay-cat">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
