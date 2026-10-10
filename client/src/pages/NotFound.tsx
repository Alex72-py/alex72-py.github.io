import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found | Alex";
    const robots = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    const previous = robots?.content;
    if (robots) robots.content = "noindex, follow";
    return () => {
      if (robots && previous) robots.content = previous;
    };
  }, []);
  return (
    <main className="page-width not-found">
      <span className="not-found-number">404</span>
      <p className="small-label">PAGE NOT FOUND</p>
      <h1>That page isn’t in my sketchbook.</h1>
      <p>
        You can head back to my portfolio for the artwork, current commission
        status, and contact details.
      </p>
      <a href={import.meta.env.BASE_URL} className="primary-button">
        <ArrowLeft size={17} />
        Back to my portfolio
      </a>
    </main>
  );
}
