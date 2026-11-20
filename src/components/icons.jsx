/* Lucide has no TikTok glyph, so this matches its stroke style. */
export function TikTokIcon({ className = 'size-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3v10.5a4.5 4.5 0 1 1-4.5-4.5" />
      <path d="M15 3c.4 2.6 2.1 4.2 5 4.4" />
    </svg>
  );
}
