import { useStrapiData } from "../hooks/useStrapiData";
import { StarIcon, PlayIcon } from "./Icons";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? "http://localhost:1337";

function buildMediaUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

const FALLBACK = [
  {
    authorName: "James Doherty",
    authorInitials: "JD",
    authorTitle: "Founder, TechFlow",
    type: "text",
    layout: "wide",
    quote:
      "Bridge didn't just edit our videos; they completely re-engineered our visual narrative. Our engagement metrics doubled in the first month, and the ROI on our ad spend has been unprecedented.",
  },
  {
    authorName: "Sarah Jenkins",
    authorInitials: "SJ",
    authorTitle: "CEO, Lumina Brands",
    type: "video",
    layout: "tall",
    quote: "",
  },
  {
    authorName: "Marcus Reed",
    authorInitials: "MR",
    authorTitle: "Creative Director",
    type: "text",
    layout: "square",
    quote:
      "The level of precision and architectural thinking they bring to post-production is unmatched.",
  },
  {
    authorName: "David Chen",
    authorInitials: "DC",
    authorTitle: "Marketing Head",
    type: "video",
    layout: "square",
    quote: "",
  },
];

const Stars = ({ size = 18 }) => (
  <div className="rev-stars">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} size={size} />
    ))}
  </div>
);

function layoutClass(layout) {
  if (layout === "wide") return "rev-wide";
  if (layout === "tall") return "rev-tall";
  return "rev-square";
}

export default function Reviews({ items }) {
  const reviews = (items?.length > 0 ? items : FALLBACK).map((d) => ({
    authorName: d.authorName ?? "",
    authorInitials: d.authorInitials ?? "??",
    authorTitle: d.authorTitle ?? "",
    type: d.type ?? "text",
    layout: d.layout ?? "square",
    quote: d.quote ?? "",
    avatarUrl: d.avatar ? buildMediaUrl(d.avatar.url) : null,
    videoUrl: d.reviewVideo ? buildMediaUrl(d.reviewVideo.url) : null,
  }));

  return (
    <section id="reviews">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Client Impact</p>
          <h2 className="section-title">THE VERDICT</h2>
        </div>

        <div className="reviews-bento">
          {reviews.map((r, i) =>
            r.type === "video" ? (
              <div
                key={`${r.authorName}-${i}`}
                className={`rev-card video ${layoutClass(r.layout)} reveal`}
              >
                <div
                  className="vid-placeholder"
                  style={
                    r.layout === "square" && !r.videoUrl
                      ? {
                          background:
                            "radial-gradient(circle at center, var(--border), var(--bg2))",
                          position: "relative",
                        }
                      : { position: "relative", overflow: "hidden" }
                  }
                >
                  {r.videoUrl ? (
                    <video
                      src={r.videoUrl}
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
                  ) : null}
                  {/* <div className="play-btn-small" style={r.videoUrl ? { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0 } : {}}>
                    <PlayIcon />
                  </div> */}
                </div>
                <div className="review-video-info">
                  <h4>{r.authorName}</h4>
                  <p>{r.authorTitle}</p>
                </div>
              </div>
            ) : (
              <div
                key={`${r.authorName}-${i}`}
                className={`rev-card ${layoutClass(r.layout)} reveal`}
              >
                <Stars size={r.layout === "wide" ? 18 : 16} />
                <p className="review-quote">&ldquo;{r.quote}&rdquo;</p>
                <div className="review-author">
                  <div
                    className="review-author-avatar"
                    style={
                      r.avatarUrl ? { padding: 0, overflow: "hidden" } : {}
                    }
                  >
                    {r.avatarUrl ? (
                      <img
                        src={r.avatarUrl}
                        alt={r.authorName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      r.authorInitials
                    )}
                  </div>
                  <div className="review-author-info">
                    <h4>{r.authorName}</h4>
                    <p>{r.authorTitle}</p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
