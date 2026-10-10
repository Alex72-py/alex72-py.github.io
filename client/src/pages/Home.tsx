import { useEffect, useRef, useState, type MouseEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Menu,
  Minus,
  Plus,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { portfolio } from "@/data/portfolio";
import ArtImage from "@/components/ArtImage";
import TiltMount from "@/components/TiltMount";
import { selectFeaturedIndices } from "@/lib/gallery.mjs";

const navItems = [
  ["The work", "work"],
  ["Commissions", "commissions"],
  ["The artist", "about"],
  ["Contact", "contact"],
] as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [planIndex, setPlanIndex] = useState(2);
  const [copyStatus, setCopyStatus] = useState("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOpen = portfolio.commissionStatus === "open";
  const status = portfolio.statusCopy[portfolio.commissionStatus];
  const artwork =
    selectedIndex === null ? null : portfolio.gallery[selectedIndex];
  const featuredIndices = selectFeaturedIndices(
    portfolio.gallery,
    portfolio.featuredArtworkIds,
  );
  const plan = portfolio.pricing[planIndex];
  const base = import.meta.env.BASE_URL;
  const emailSubject = isOpen
    ? `${portfolio.inquiry.subject}: ${plan.name}`
    : "Future commission availability";
  const emailBody = isOpen
    ? portfolio.inquiry.template.replace(
        "Preferred finish (Sketch / Line Art / Full Color):",
        `Preferred finish: ${plan.name}`,
      )
    : "Hi Alex, I’d like to ask about your future commission availability.\n\nCharacter and series:\nReference links:\nOther notes:";
  const emailHref = `mailto:${portfolio.artist.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  useEffect(() => {
    document.title = `Alex | Traditional Anime Art | ${status.label}`;
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    reveals.forEach((item) => {
      item.classList.add("motion-ready");
      observer.observe(item);
    });
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }),
      { rootMargin: "-20% 0px -55% 0px" },
    );
    navItems.forEach(([, id]) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, [status.label]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  function openArtwork(index: number, event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setSelectedIndex(index);
    setZoomed(false);
  }
  function nextArtwork(direction: number) {
    setSelectedIndex((index) =>
      index === null
        ? null
        : (index + direction + portfolio.gallery.length) %
          portfolio.gallery.length,
    );
    setZoomed(false);
  }
  async function copyText(text: string, kind: "discord" | "inquiry") {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(
        kind === "discord"
          ? "Discord username copied. Add zyxelan on Discord to message me."
          : "Inquiry outline copied. Paste it into your message and add your references.",
      );
      copyTimer.current = setTimeout(() => setCopyStatus(""), 6000);
    } catch {
      setCopyStatus(
        kind === "discord"
          ? "Copy wasn’t available. You can manually copy my Discord username: zyxelan."
          : "Copy wasn’t available. Open the inquiry outline below to select and copy the text manually.",
      );
    }
  }

  return (
    <div className="portfolio-page">
      <a href="#main-content" className="skip-link">
        Skip to the artwork
      </a>
      <header className="site-header">
        <div className="site-header-inner page-width">
          <a
            className="wordmark"
            href="#top"
            onClick={() => setMenuOpen(false)}
            aria-label="Alex, back to top"
          >
            alex<span className="wordmark-period">.</span>
            <span className="wordmark-label">ink on paper</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                className={activeSection === id ? "active" : ""}
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a
              href="#contact"
              className={`availability ${isOpen ? "is-open" : "is-closed"}`}
              aria-label={status.label}
            >
              <span className="status-dot" />
              <span className="availability-long">{status.label}</span>
              <span className="availability-short">{status.shortLabel}</span>
            </a>
            <button
              className="menu-toggle"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
              <span>{menuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-nav"
            className="mobile-nav page-width"
            aria-label="Mobile navigation"
          >
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
            <a href={`${base}terms`}>Commission terms</a>
          </nav>
        )}
      </header>

      <main id="main-content">
        <section id="top" className="hero page-width">
          <div className="hero-copy">
            <p className="small-label hero-label">
              ALEX / TRADITIONAL ANIME ART
            </p>
            <h1>
              {status.heading}
              <br />
              <em>{status.headingAccent}</em>
            </h1>
            <p className="hero-description">{status.description}</p>
            <div className="hero-links">
              <a href="#work" className="primary-button">
                See my work <ArrowDown size={18} />
              </a>
              <a href="#commissions" className="text-link">
                {isOpen ? "Commission details" : "For future commissions"}
              </a>
            </div>
            <p className="hero-note">{status.note}</p>
          </div>
          <div className="hero-art" aria-label="A glimpse into my sketchbook">
            <span className="hero-side-note">FROM MY SKETCHBOOK</span>
            {featuredIndices.map((index, position) => {
              const piece = portfolio.gallery[index];
              return (
                <div
                  key={piece.id}
                  className={`hero-mount ${position === 0 ? "hero-mount-front" : "hero-mount-back"} ${featuredIndices.length === 1 ? "hero-mount-only" : ""}`}
                >
                  <TiltMount>
                    <div className="paper-mount">
                      <ArtImage
                        src={piece.image}
                        alt={piece.alt}
                        width={piece.width}
                        height={piece.height}
                        eager
                      />
                      <button
                        className="art-open-button"
                        onClick={(event) => openArtwork(index, event)}
                        aria-label={`View ${piece.character} artwork`}
                      >
                        <span className="art-open-label">
                          View artwork <Plus size={16} />
                        </span>
                      </button>
                      <span className="mount-caption">
                        {piece.shortName} / {piece.series}
                      </span>
                    </div>
                  </TiltMount>
                </div>
              );
            })}
            <span className="hero-art-note handwritten">
              {featuredIndices.length
                ? "a few of my favorites"
                : "new pages to come"}
            </span>
          </div>
          <div className="hero-bottom">
            <span>Hand-drawn. Ohuhu markers. Anime fanart.</span>
            <a href="#work">
              The sketchbook <ArrowDown size={15} />
            </a>
          </div>
        </section>

        <section id="work" className="work-section page-width">
          <div className="section-heading reveal">
            <div>
              <p className="small-label">01 / THE WORK</p>
              <h2>
                Selected <em>pages.</em>
              </h2>
            </div>
            <p>
              Ink, paper, and characters I love.
              <br />
              Open any piece to see the whole drawing.
            </p>
          </div>
          {portfolio.gallery.length === 0 && (
            <p className="gallery-empty">
              New drawings will be added here. You can still read my commission
              details below.
            </p>
          )}
          <div className="gallery-grid">
            {portfolio.gallery.map((piece, index) => (
              <figure
                className={`gallery-piece gallery-piece-${index + 1} reveal`}
                key={piece.id}
              >
                <div className="gallery-mount">
                  <ArtImage
                    src={piece.image}
                    alt={piece.alt}
                    width={piece.width}
                    height={piece.height}
                  />
                  <button
                    className="art-open-button"
                    aria-label={`View ${piece.character} artwork in full`}
                    onClick={(event) => openArtwork(index, event)}
                  >
                    <span className="art-open-label">
                      View artwork <Plus size={17} />
                    </span>
                  </button>
                </div>
                <figcaption>
                  <div className="piece-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3>{piece.shortName}</h3>
                    <p>{piece.series}</p>
                  </div>
                  <span className="piece-medium">MARKER ON PAPER</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="gallery-end">
            <span>
              {portfolio.gallery.length}{" "}
              {portfolio.gallery.length === 1 ? "drawing" : "drawings"} from my
              sketchbook.
            </span>
            <span>All drawn by hand.</span>
          </div>
        </section>

        <section id="commissions" className="commission-section">
          <div className="page-width commission-layout">
            <div className="commission-intro reveal">
              <p className="small-label">02 / COMMISSIONS</p>
              <h2>
                A character.
                <br />
                Your idea.
                <br />
                <em>My drawing.</em>
              </h2>
              <p>
                Pick the finish that feels right. I’ll discuss the details with
                you before any work begins.
              </p>
              <div className="scope-list" aria-label="What I draw">
                {portfolio.drawList.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="commission-menu reveal">
              <div className="menu-caption">
                <span>Choose your finish</span>
                <span>USD / personal use</span>
              </div>
              <div
                className="price-list"
                role="radiogroup"
                aria-label="Commission finish"
              >
                {portfolio.pricing.map((item, index) => (
                  <button
                    type="button"
                    key={item.name}
                    role="radio"
                    aria-checked={index === planIndex}
                    tabIndex={index === planIndex ? 0 : -1}
                    className={`price-row ${index === planIndex ? "selected" : ""}`}
                    onClick={() => setPlanIndex(index)}
                    onKeyDown={(event) => {
                      if (
                        [
                          "ArrowDown",
                          "ArrowRight",
                          "ArrowUp",
                          "ArrowLeft",
                        ].includes(event.key)
                      ) {
                        event.preventDefault();
                        const direction = ["ArrowDown", "ArrowRight"].includes(
                          event.key,
                        )
                          ? 1
                          : -1;
                        const target =
                          (index + direction + portfolio.pricing.length) %
                          portfolio.pricing.length;
                        setPlanIndex(target);
                        (
                          event.currentTarget.parentElement?.children[
                            target
                          ] as HTMLElement
                        )?.focus();
                      }
                    }}
                  >
                    <span className="price-number">0{index + 1}</span>
                    <span className="price-name">
                      {item.name}
                      <span>{item.description}</span>
                    </span>
                    <span className="price-amount">{item.price}</span>
                    <span className="price-selector">
                      {index === planIndex ? (
                        <Minus size={18} />
                      ) : (
                        <Plus size={18} />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <div className="plan-details" aria-live="polite">
                <p>Included with {plan.name.toLowerCase()}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="price-note">{portfolio.pricingNote}</p>
              <a href={emailHref} className="primary-button dark-button">
                {isOpen ? `Ask about ${plan.name.toLowerCase()}` : status.cta}
                <Mail size={17} />
              </a>
              <div className="payment-note">
                50% upfront, balance before final delivery.
                <br />
                Payment via {portfolio.artist.paymentMethods.join(" / ")}.
              </div>
            </div>
          </div>
          <div id="process" className="page-width process-section">
            <div className="process-heading reveal">
              <p className="small-label">HOW WE’LL WORK TOGETHER</p>
              <p>A simple, personal process.</p>
            </div>
            <ol className="process-grid">
              {portfolio.process.map((step, index) => (
                <li key={step.title} className="reveal">
                  <span className="process-index">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className="about-section page-width">
          <div className="about-title reveal">
            <p className="small-label">03 / BEHIND THE INK</p>
            <h2>{portfolio.about.heading}</h2>
            <p className="handwritten about-signature">Alex</p>
          </div>
          <div className="about-copy reveal">
            <p className="about-lead">{portfolio.about.description}</p>
            <div className="schedule-note">
              <span className="small-label">A NOTE ON TIMING</span>
              <p>{portfolio.about.schedule}</p>
            </div>
            <p className="delivery-note">{portfolio.about.delivery}</p>
            <a className="text-link" href={`${base}terms`}>
              Read my commission terms <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="page-width">
            <div className="contact-topline">
              <p className="small-label">04 / SAY HELLO</p>
              <span
                className={`availability ${isOpen ? "is-open" : "is-closed"}`}
              >
                <span className="status-dot" />
                {status.label}
              </span>
            </div>
            <div className="contact-layout">
              <div className="contact-copy reveal">
                <h2>{status.contactHeading}</h2>
                <p>{status.contactDescription}</p>
                <p className="contact-quiet">
                  Personal-use fanart. Flexible timing.
                  <br />
                  Let’s make sure we’re on the same page.
                </p>
              </div>
              <div className="contact-actions reveal">
                <a href={emailHref} className="contact-row">
                  <span>
                    <span className="contact-channel">Email me</span>
                    <span className="contact-handle">
                      {portfolio.artist.email}
                    </span>
                  </span>
                  <Mail size={22} />
                </a>
                <button
                  type="button"
                  className="contact-row"
                  onClick={() => copyText(portfolio.artist.discord, "discord")}
                >
                  <span>
                    <span className="contact-channel">Find me on Discord</span>
                    <span className="contact-handle">
                      {portfolio.artist.discord}
                    </span>
                  </span>
                  <Copy size={21} />
                  <span className="sr-only">Copy Discord username</span>
                </button>
                <p className="copy-feedback" role="status">
                  {copyStatus || "Click the Discord row to copy my username."}
                </p>
                <details className="inquiry-details">
                  <summary>
                    What should I send?
                    <Plus className="details-plus" size={18} />
                  </summary>
                  <div>
                    <p>
                      A reference and a little context are enough to begin. This
                      outline is optional.
                    </p>
                    <pre>{emailBody}</pre>
                    <button
                      type="button"
                      className="outline-button"
                      onClick={() => copyText(emailBody, "inquiry")}
                    >
                      <Copy size={16} />
                      Copy inquiry outline
                    </button>
                  </div>
                </details>
                <a href={`${base}terms`} className="contact-terms">
                  Payment, changes & personal-use terms{" "}
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer page-width">
        <div className="footer-main">
          <a
            href="#top"
            className="footer-wordmark"
            aria-label="Alex, back to top"
          >
            alex.
          </a>
          <div className="social-links">
            {portfolio.socialLinks
              .filter((social) => social.url)
              .map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                  <ArrowUpRight size={15} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Alex. Artwork by me, characters by
            their respective owners.
          </span>
          <a href={`${base}terms`}>Commission terms</a>
          <span>Made for the love of anime.</span>
        </div>
      </footer>

      <Dialog.Root
        open={selectedIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedIndex(null);
            setZoomed(false);
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="lightbox-overlay" />
          <Dialog.Content
            className="lightbox"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              triggerRef.current?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                nextArtwork(event.key === "ArrowRight" ? 1 : -1);
              }
            }}
          >
            <div className="lightbox-header">
              <span className="small-label">
                THE SKETCHBOOK /{" "}
                {selectedIndex !== null
                  ? `${String(selectedIndex + 1).padStart(2, "0")} OF ${String(portfolio.gallery.length).padStart(2, "0")}`
                  : ""}
              </span>
              <div>
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => setZoomed(!zoomed)}
                  aria-label={zoomed ? "Fit artwork to screen" : "Zoom artwork"}
                >
                  {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                </button>
                <Dialog.Close
                  className="icon-button"
                  aria-label="Close artwork preview"
                >
                  <X size={22} />
                </Dialog.Close>
              </div>
            </div>
            {artwork && (
              <>
                <div
                  className={`lightbox-image-area ${zoomed ? "zoomed" : ""}`}
                >
                  <ArtImage
                    key={artwork.fullImage}
                    src={artwork.fullImage}
                    alt={artwork.alt}
                    eager
                  />
                </div>
                <div className="lightbox-footer">
                  <button
                    className="icon-button"
                    aria-label="Previous artwork"
                    onClick={() => nextArtwork(-1)}
                  >
                    <ArrowLeft size={22} />
                  </button>
                  <div className="lightbox-caption">
                    <Dialog.Title>{artwork.character}</Dialog.Title>
                    <Dialog.Description>
                      {artwork.series} · {artwork.title}
                    </Dialog.Description>
                  </div>
                  <button
                    className="icon-button"
                    aria-label="Next artwork"
                    onClick={() => nextArtwork(1)}
                  >
                    <ArrowRight size={22} />
                  </button>
                </div>
                <p className="lightbox-hint">
                  Arrow keys to browse. Escape to close.
                </p>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
