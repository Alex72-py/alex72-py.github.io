import { useState } from "react";

type ArtImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  eager?: boolean;
};

export default function ArtImage({
  src,
  alt,
  width,
  height,
  className = "",
  eager = false,
}: ArtImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return (
    <span className={`art-image ${className}`}>
      {!loaded && !failed && (
        <span className="image-loading" aria-hidden="true">
          Loading artwork…
        </span>
      )}
      {failed ? (
        <span className="image-error" role="status">
          <span>This artwork couldn’t load.</span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setFailed(false);
              setLoaded(false);
              setAttempt((value) => value + 1);
            }}
          >
            Retry image
          </button>
        </span>
      ) : (
        <img
          key={`${src}-${attempt}`}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </span>
  );
}
