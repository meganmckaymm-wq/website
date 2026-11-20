import { ArrowUpRight } from 'lucide-react';

const serviceTones = {
  blush: { card: 'bg-blush text-wine', icon: 'bg-paper text-wine', tag: 'border-wine/40', blob: 'bg-paper/50', arrow: 'bg-wine text-blush' },
  butter: { card: 'bg-butter text-wine', icon: 'bg-paper text-wine', tag: 'border-wine/40', blob: 'bg-paper/50', arrow: 'bg-wine text-butter' },
  sky: { card: 'bg-sky text-wine', icon: 'bg-paper text-wine', tag: 'border-wine/40', blob: 'bg-paper/50', arrow: 'bg-wine text-sky' },
  wine: { card: 'bg-wine text-paper', icon: 'bg-butter text-wine', tag: 'border-blush/50 text-blush', blob: 'bg-blush/20', arrow: 'bg-blush text-wine' },
};

export default function ServiceCard({ service }) {
  const { title, text, tags, icon: Icon, tone } = service;
  const t = serviceTones[tone];
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 transition duration-300 ease-out hover:-translate-y-2 hover:-rotate-1 hover:shadow-soft ${t.card}`}
    >
      <div aria-hidden="true" className={`absolute -right-10 -top-10 size-40 rounded-full transition-transform duration-500 group-hover:scale-150 ${t.blob}`} />
      <span className={`relative grid size-14 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-12 ${t.icon}`}>
        <Icon aria-hidden="true" className="size-7" />
      </span>
      <h3 className="relative mt-10 font-display text-3xl sm:mt-16 font-semibold leading-tight">{title}</h3>
      <p className="relative mt-3 text-lg leading-relaxed">{text}</p>
      <ul className="relative mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag} className={`rounded-full border px-3 py-1 text-sm font-medium ${t.tag}`}>
            {tag}
          </li>
        ))}
      </ul>
      <span
        aria-hidden="true"
        className={`absolute bottom-6 right-6 grid size-10 place-items-center rounded-full opacity-0 transition duration-300 group-hover:rotate-45 group-hover:opacity-100 ${t.arrow}`}
      >
        <ArrowUpRight className="size-5" />
      </span>
    </article>
  );
}
