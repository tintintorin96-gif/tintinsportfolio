import Image from "next/image";
import { cn } from "@/lib/utils";

type ProjectMediaProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

const rasterExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"];

function isRaster(src: string) {
  const lower = src.toLowerCase();
  return rasterExtensions.some((ext) => lower.endsWith(ext));
}

export function ProjectMedia({
  src,
  alt,
  className,
  priority = false,
}: ProjectMediaProps) {
  if (isRaster(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        priority={priority}
        className={cn(
          "h-auto w-full rounded-[var(--radius)] border border-border object-cover",
          className,
        )}
        sizes="(max-width: 768px) 100vw, 720px"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn(
        "h-auto w-full rounded-[var(--radius)] border border-border bg-muted/20 object-contain",
        className,
      )}
      loading={priority ? "eager" : "lazy"}
    />
  );
}

export function ProjectMediaGallery({
  images,
  alt,
  priority = false,
}: {
  images: string[];
  alt: string;
  priority?: boolean;
}) {
  if (!images.length) return null;

  const [hero, ...rest] = images;

  return (
    <figure className="space-y-4">
      <ProjectMedia src={hero} alt={alt} priority={priority} />
      {rest.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {rest.map((src) => (
            <ProjectMedia
              key={src}
              src={src}
              alt={`${alt} — additional visual`}
            />
          ))}
        </div>
      ) : null}
    </figure>
  );
}
