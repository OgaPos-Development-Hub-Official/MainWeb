import { useEffect, useMemo, useState } from "react";
import "./styles/coming-soon.css";

export default function App() {
  // === Countdown target date (edit as needed) ===
  const target = useMemo(() => new Date("2025-12-01T09:00:00"), []);

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  function getTimeLeft(date) {
    const diff = Math.max(0, date.getTime() - Date.now());
    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / (3600 * 24));
    const hours = Math.floor((s % (3600 * 24)) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    return { days, hours, minutes, seconds, ended: diff === 0 };
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Basic validation
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 120;
    if (!ok) {
      setStatus({ type: "error", msg: "Please enter a valid email." });
      return;
    }

    // TODO: Hook to your backend or email service here
    // Example: fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) })
    setTimeout(() => {
      setStatus({ type: "success", msg: "Thanks! We’ll keep you posted." });
      setEmail("");
    }, 500);
  }

  return (
    <main
      className="ha-wrap"
      role="main"
      aria-label="Health Assurance Coming Soon"
    >
      <div className="ha-noise" aria-hidden="true" />
      <header className="ha-header">
        <div className="ha-logo" aria-hidden="true">
          HA
        </div>
        <h1 className="ha-title">Health Assurance</h1>
        <p className="ha-tagline">
          We’re building a better way to care — simple, secure, and always on
          your side.
        </p>
      </header>

      <section className="ha-card">
        <h2 className="ha-subtitle">We’re launching soon</h2>

        <div className="ha-countdown" aria-live="polite">
          {timeLeft.ended ? (
            <span className="ha-live">We’re live! 🎉</span>
          ) : (
            <>
              <TimeBox label="Days" value={timeLeft.days} />
              <TimeBox label="Hours" value={timeLeft.hours} />
              <TimeBox label="Minutes" value={timeLeft.minutes} />
              <TimeBox label="Seconds" value={timeLeft.seconds} />
            </>
          )}
        </div>

        <form className="ha-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email to get notified"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="email-help"
            required
          />
          <button type="submit" className="ha-btn">
            Notify Me
          </button>
          <small id="email-help" className="ha-help">
            No spam. Unsubscribe anytime.
          </small>
          {status.msg && (
            <div
              className={`ha-status ${
                status.type === "error" ? "error" : "success"
              }`}
              role="status"
            >
              {status.msg}
            </div>
          )}
        </form>
      </section>

      <footer className="ha-footer">
        <div className="ha-social">
          <a href="#" aria-label="Health Assurance on Twitter">
            Twitter
          </a>
          <a href="#" aria-label="Health Assurance on LinkedIn">
            LinkedIn
          </a>
          <a
            href="mailto:hello@healthassurance.ng"
            aria-label="Email Health Assurance"
          >
            hello@healthassurance.ng
          </a>
        </div>
        <p className="ha-copy">
          © {new Date().getFullYear()} Health Assurance. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

function TimeBox({ label, value }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="ha-timebox" role="group" aria-label={label}>
      <div className="ha-time">{v}</div>
      <div className="ha-label">{label}</div>
    </div>
  );
}
