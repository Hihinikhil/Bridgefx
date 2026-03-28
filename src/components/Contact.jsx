import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-header reveal">
          <p className="section-label" style={{ justifyContent: "center" }}>
            Connect
          </p>
          <h2 className="section-title">{contactData.contactTitle || "READY TO SCALE?"}</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            {contactData.contactSub || "Select your preferred method of crossing. We respond to serious inquiries within 12 hours."}
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info reveal">
            <div className="contact-method">
              <h3>Direct Chat</h3>
              <p style={{ marginBottom: "2rem", color: "var(--muted)" }}>
                Instant connection for project speed.
              </p>
              <a
                href={contactData.whatsappNumber ? `https://wa.me/${contactData.whatsappNumber}` : "https://wa.me/9460922273"}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-btn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82l.446.265c1.516.902 3.262 1.378 5.044 1.379 5.313 0 9.637-4.322 9.64-9.635.001-2.574-1.003-4.994-2.827-6.819-1.825-1.825-4.247-2.828-6.824-2.829-5.313 0-9.638 4.323-9.64 9.637 0 1.834.52 3.626 1.503 5.187l.291.46-1.11 4.053 4.147-1.087z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
            <div className="contact-method">
              <h3>Email</h3>
              <p style={{ color: "var(--text)" }}>hello@bridgeagency.com</p>
            </div>
          </div>

          <form
            ref={formRef}
            className="contact-form reveal"
            onSubmit={handleSubmit}
          >
            {/* Success Banner */}
            {status === "success" && (
              <div className="form-feedback form-feedback--success">
                ✅ Message sent! We'll get back to you within 12 hours.
              </div>
            )}

            {/* Error Banner */}
            {status === "error" && (
              <div className="form-feedback form-feedback--error">
                ❌ Something went wrong. Please try again or email us directly.
              </div>
            )}

            <div className="form-group">
              {/* name="from_name" must match your EmailJS template variable */}
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
                disabled={status === "loading"}
              />
            </div>
            <div className="form-group">
              {/* name="reply_to" lets you reply directly to the sender */}
              <input
                type="email"
                name="reply_to"
                placeholder="Email Address"
                required
                disabled={status === "loading"}
              />
            </div>
            <div className="form-group">
              {/* name="message" must match your EmailJS template variable */}
              <textarea
                rows="5"
                name="message"
                placeholder="Tell us about your project infrastructure..."
                required
                disabled={status === "loading"}
              />
            </div>
            <button
              type="submit"
              className="hero-cta"
              style={{ width: "100%", justifyContent: "center" }}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
