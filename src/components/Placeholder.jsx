import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

const placeholderTones = {
  blush: 'bg-blush text-wine',
  sky: 'bg-sky text-wine',
  butter: 'bg-butter text-wine',
  wine: 'bg-wine text-blush',
  paper: 'bg-paper text-wine',
};

/* Image slot. Pass `src` to show a real photo; otherwise a tinted,
   dotted placeholder renders. Size and shape come from className. */
export default function Placeholder({
  tone = 'blush',
  icon: Icon = ImageIcon,
  label = 'Your image here',
  alt,
  src,
  video,
  className = '',
}) {
  const [still] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (video) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <video
          src={video}
          poster={src}
          aria-label={alt || label}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay={!still}
        />
      </div>
    );
  }
  if (src) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img src={src} alt={alt || ''} loading="lazy" className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div role="img" aria-label={alt || label} className={`relative flex items-center justify-center overflow-hidden ${placeholderTones[tone]} ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(currentColor 1.3px, transparent 1.5px)', backgroundSize: '16px 16px', opacity: 0.2 }}
      />
      <div className="relative flex flex-col items-center gap-2 px-3 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-paper/75 text-wine">
          <Icon aria-hidden="true" className="size-6" />
        </span>
        <span className="font-display text-[0.7rem] font-medium uppercase tracking-[0.18em]">{label}</span>
      </div>
    </div>
  );
}
