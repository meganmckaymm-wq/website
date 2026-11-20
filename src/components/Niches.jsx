import { niches } from '../data/content';
import Placeholder from './Placeholder';
import Reveal from './Reveal';
import SectionHeading, { Accent } from './SectionHeading';

const nicheTones = {
  blush: 'bg-blush',
  sky: 'bg-sky',
  butter: 'bg-butter',
};

function NicheCard({ niche, large }) {
  const { title, text, chips, tone, icon, image } = niche;
  return (
    <article
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] p-8 transition duration-300 hover:-translate-y-1.5 hover:shadow-soft ${nicheTones[tone]} ${
        large ? 'min-h-[34rem] lg:p-12' : 'min-h-[18rem]'
      }`}
    >
      <div className="relative z-10 max-w-[22rem]">
        <h3
          className={`font-display font-bold leading-[0.98] tracking-tight [text-wrap:balance] ${
            large ? 'text-5xl sm:text-6xl lg:text-7xl' : 'text-4xl sm:text-5xl'
          }`}
        >
          {title}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-wine">{text}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {chips.map((c) => (
            <li key={c} className="rounded-full bg-paper/80 px-3 py-1 text-xs font-medium">
              {c}
            </li>
          ))}
        </ul>
      </div>
      <Placeholder
        tone="paper"
        icon={icon}
        label={title}
        src={image}
        alt={`${title} imagery, placeholder image`}
        className={`absolute rotate-6 rounded-[1.75rem] border-4 border-paper shadow-soft transition duration-500 group-hover:rotate-3 group-hover:scale-105 ${
          large
            ? '-bottom-8 -right-6 h-72 w-56 sm:right-6 sm:h-96 sm:w-72'
            : '-bottom-10 -right-6 hidden h-44 w-36 sm:block'
        }`}
      />
    </article>
  );
}

export default function Niches() {
  return (
    <section id="niche" aria-labelledby="niche-title" className="px-4 py-14 sm:py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="lg:ml-auto lg:text-right">
          <SectionHeading
            id="niche-title"
            eyebrow="Who I work with"
            className="lg:ml-auto"
            title={
              <>
                Brands with a <Accent>point of view.</Accent>
              </>
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-5 lg:grid-rows-2">
          <Reveal className="lg:col-span-3 lg:row-span-2">
            <NicheCard niche={niches[0]} large />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-2">
            <NicheCard niche={niches[1]} />
          </Reveal>
          <Reveal delay={200} className="lg:col-span-2">
            <NicheCard niche={niches[2]} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
