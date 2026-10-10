import { useEffect } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function Terms() {
  const base = import.meta.env.BASE_URL;
  useEffect(() => {
    document.title = "Commission Terms | Alex";
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `${portfolio.siteUrl}/terms`);
  }, []);
  return (
    <div className="page-width">
      <header className="notes-header">
        <a href={base}>
          <ArrowLeft size={16} />
          Back to my portfolio
        </a>
        <a href={base} className="wordmark" aria-label="Alex’s portfolio">
          alex<span className="wordmark-period">.</span>
        </a>
      </header>
      <main className="notes-layout">
        <div className="notes-intro">
          <p className="small-label">COMMISSION TERMS</p>
          <h1>
            Before the
            <br />
            <em>first line.</em>
          </h1>
          <p>
            A few personal rules so we both know what to expect. Please read
            these before confirming a commission with me.
          </p>
          <a
            className="text-link"
            href={`mailto:${portfolio.artist.email}?subject=Question%20about%20commission%20terms`}
          >
            <Mail size={16} />
            Questions? Email me
          </a>
        </div>
        <div className="terms-list">
          {portfolio.terms.map((term, index) => (
            <article key={term.title}>
              <span className="term-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{term.title}</h2>
                <p>{term.content}</p>
              </div>
            </article>
          ))}
          <p className="terms-acknowledgment">
            By confirming a commission with me, you acknowledge these commission
            terms.
          </p>
        </div>
      </main>
      <footer className="notes-footer">
        <p>Alex / personal freelance artwork</p>
        <a href={`${base}#contact`} className="text-link">
          Back to contact
        </a>
      </footer>
    </div>
  );
}
