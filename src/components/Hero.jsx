import { Heart, Sparkles } from 'lucide-react';
import { projectHref, site } from '../data/content';
import { useProjects } from '../content/ContentContext';
import Button from './Button';
import Placeholder from './Placeholder';

function Sticker() {
  return (
    <div className="absolute -top-3 left-[6%] hidden size-32 place-items-center rounded-full bg-butter shadow-soft lg:grid">
      <svg viewBox="0 0 120 120" className="absolute inset-0 animate-spinslow" aria-hidden="true">
        <defs>
          <path id="sticker-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-wine font-display text-[11px] font-semibold uppercase" letterSpacing="3.2">
          <textPath href="#sticker-circle">Social · Content · Strategy ·</textPath>
        </text>
      </svg>
      <Heart aria-hidden="true" className="size-7 fill-blush stroke-wine" />
    </div>
  );
}

function Collage() {
  const projects = useProjects();
  const garnish = projects.find((p) => p.slug === 'the-garnish-garden');
  const scrappy = projects.find((p) => p.slug === 'scrappy-books');
  return (
    <div className="relative mx-auto h-[460px] w-full max-w-md sm:h-[560px] lg:h-[620px] lg:max-w-none">
      <div aria-hidden="true" className="absolute right-[-6%] top-[8%] size-[70%] rounded-full bg-butter" />
      {garnish && (
      <a
        href={projectHref(garnish)}
        aria-label="Open The Garnish Garden case study"
        className="group absolute right-0 top-0 h-[86%] w-[76%] overflow-hidden rounded-t-full rounded-b-[2.5rem] shadow-soft"
      >
        <Placeholder
          tone="blush"
          icon={Sparkles}
          label="The Garnish Garden"
          src={garnish.image}
          video={garnish.video}
          alt="Harvesting microgreens for The Garnish Garden"
          className="h-full w-full transition duration-700 group-hover:scale-105"
        />
        <span className="absolute bottom-5 right-4 w-fit rounded-full bg-paper px-4 py-2 font-display text-sm font-semibold shadow-soft">
          The Garnish Garden
        </span>
      </a>
      )}
      {scrappy && (
      <a
        href={projectHref(scrappy)}
        aria-label="Open the Scrappy case study"
        className="absolute bottom-6 left-0 block w-[48%] animate-float rounded-2xl bg-white p-2.5 pb-9 shadow-soft"
        style={{ '--r': '-6deg', transform: 'rotate(-6deg)' }}
      >
        <Placeholder tone="blush" icon={Heart} label="Scrappy" src={scrappy.image} video={scrappy.video || (scrappy.videos && scrappy.videos[1] && scrappy.videos[1].src)} alt="Scrappy Books video" className="aspect-[4/5] w-full rounded-lg" />
        <span className="absolute bottom-2 left-0 right-0 text-center font-serif text-xl italic">scrappy books ✿</span>
      </a>
      )}
      <Sticker />
      <div className="absolute bottom-2 right-0 flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 font-display text-sm font-medium shadow-soft">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-wine" />
        Taking on new clients
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden px-4 pb-20 pt-8 sm:px-6 lg:pb-28 lg:pt-14">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mb-7 inline-block rounded-full bg-blush px-4 py-2 font-display text-sm font-medium tracking-wide">
            Hi, I&rsquo;m {site.first} · Social media &amp; creative strategy
          </p>
          <h1
            id="hero-title"
            className="font-display text-[length:clamp(2.2rem,4.6vw,3.5rem)] font-bold leading-[0.92] tracking-tight [text-wrap:balance]"
          >
            Social media that makes your brand{' '}
            <span className="mark-butter font-serif font-normal italic">worth following.</span>
          </h1>
          <p className="mt-7 max-w-xl text-xl leading-relaxed text-wine sm:text-2xl">
            I help lifestyle, beauty and sustainable brands show up consistently online, with strategy, content and design handled in one place. {site.tagline}
          </p>
          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
            <Button href="#contact" className="w-full sm:w-auto">Book an intro chat</Button>
            <Button href="#work" variant="secondary" arrow={false} className="w-full sm:w-auto">
              See my work
            </Button>
          </div>
          <ul className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-wine/20 pt-6">
            {[['216K', 'views reached'], ['10,000+', 'reached for a B2B brand'], ['ADCN', 'award finalist']].map(([n, l]) => (
              <li key={l}>
                <p className="font-display text-2xl font-bold sm:text-3xl">{n}</p>
                <p className="mt-1 text-sm leading-snug text-wine sm:text-base">{l}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <Collage />
        </div>
      </div>
    </section>
  );
}
