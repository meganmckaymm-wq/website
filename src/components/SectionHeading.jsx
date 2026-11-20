/* Italic serif accent used inside big headings. */
export function Accent({ children }) {
  return <span className="font-serif font-normal italic">{children}</span>;
}

const pills = {
  blush: 'bg-blush',
  sky: 'bg-sky',
  butter: 'bg-butter',
  paper: 'bg-paper',
};

export default function SectionHeading({ id, eyebrow, title, intro, pill = 'blush', className = '', size = 'xl' }) {
  const sizes = {
    xl: 'text-[length:clamp(1.9rem,3.6vw,2.75rem)]',
    lg: 'text-[length:clamp(1.9rem,3.4vw,2.6rem)]',
  };
  return (
    <div className={`max-w-4xl ${className}`}>
      <p className={`mb-5 inline-block rounded-full px-4 py-1.5 font-display text-sm font-medium tracking-wide ${pills[pill]}`}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`font-display ${sizes[size]} font-bold leading-[0.98] tracking-tight [text-wrap:balance]`}
      >
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-xl text-xl leading-relaxed text-wine">{intro}</p>}
    </div>
  );
}
