import { Star } from 'lucide-react';

const avatars = { butter: 'bg-butter', sky: 'bg-sky', blush: 'bg-blush' };

export default function TestimonialCard({ item, className = '' }) {
  const { quote, name, company, tone } = item;
  return (
    <figure
      className={`relative h-full rounded-[2rem] bg-paper p-7 shadow-soft transition duration-300 ease-out hover:-translate-y-2 hover:rotate-0 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`grid size-14 place-items-center rounded-full border-4 border-paper font-display text-xl font-semibold shadow-soft ${avatars[tone]}`}
      >
        {name.charAt(0)}
      </span>
      <div role="img" aria-label="5 out of 5 stars" className="mt-5 flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} aria-hidden="true" className="size-5 fill-butter stroke-wine" strokeWidth={1.75} />
        ))}
      </div>
      <blockquote className="mt-4 font-serif text-[1.6rem] leading-snug">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-6">
        <span className="block font-display text-lg font-semibold">{name}</span>
        <span className="text-sm text-wine/80">{company}</span>
      </figcaption>
    </figure>
  );
}
