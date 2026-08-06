import Image from "next/image";

/**
 * White Snow Republic emblem on a transparent background (generated from the
 * original dark logo). Reads cleanly on the dark header and footer — no backing
 * chip needed.
 */
export function Logo({
  className = "h-10 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-white.png"
      alt="Snow Republic Brewery"
      width={799}
      height={640}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
