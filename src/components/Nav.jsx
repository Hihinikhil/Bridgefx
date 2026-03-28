import { useEffect, useRef } from "react";

export default function Nav({ data }) {
  const navRef = useRef(null);
  const siteName = data?.siteName || "BRIDGEFX";

  useEffect(() => {
    let lastScroll = 0;
    const nav = navRef.current;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        nav.classList.remove("hidden");
        lastScroll = currentScroll;
        return;
      }
      if (currentScroll > lastScroll && currentScroll > 150) {
        nav.classList.add("hidden");
      } else {
        nav.classList.remove("hidden");
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} id="navbar">
      <div className="container nav-wrapper">
        <a href="#hero" className="logo">
          {siteName}<span>.</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#work">Projects</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#reviews">Impact</a>
          </li>
          <li>
            <a href="#pricing">Investment</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
