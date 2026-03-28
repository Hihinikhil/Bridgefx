export default function Footer({ data }) {
  const footerData = data || {};
  const siteName = footerData.siteName || "BRIDGEFX";
  return (
    <footer>
      <div className="container footer-wrap">
        <a href="#hero" className="logo">{siteName}<span>.</span></a>
        <div className="foot-links">
          <a href={footerData.twitterUrl || "#"} target="_blank" rel="noreferrer">X / Twitter</a>
          <a href={footerData.instagramUrl || "#"} target="_blank" rel="noreferrer">Instagram</a>
          <a href={footerData.linkedinUrl || "#"} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
