import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, ClipboardList, ExternalLink, Pencil, Sparkles, Target, Trophy, User } from 'lucide-react';
import { projectHref } from '../data/content';
import { useContent } from '../content/ContentContext';
import Button from './Button';
import Reveal from './Reveal';

const heroTones = { blush: 'bg-blush', sky: 'bg-sky', butter: 'bg-butter', wine: 'bg-blush' };

const storySteps = [
  { key: 'brief', label: 'The brief', icon: ClipboardList },
  { key: 'challenge', label: 'The challenge', icon: Target },
  { key: 'role', label: 'My role', icon: User },
  { key: 'approach', label: 'The approach', icon: Sparkles },
  { key: 'outcome', label: 'The outcome', icon: Trophy },
];

/* Shows a video at its real shape so nothing is cropped. */
function useNaturalRatio(fallback) {
  const [ratio, setRatio] = useState(null);
  const onLoadedMetadata = (e) => {
    const { videoWidth: w, videoHeight: h } = e.currentTarget;
    if (w && h) setRatio(w / h);
  };
  return [ratio || fallback, onLoadedMetadata];
}

function Clip({ video }) {
  const [ratio, onLoadedMetadata] = useNaturalRatio(9 / 16);
  const wide = ratio > 1;
  return (
    <figure className={`shrink-0 snap-start ${wide ? 'w-[min(34rem,82vw)]' : 'w-52 sm:w-60'}`}>
      <video
        src={video.src}
        controls
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        aria-label={video.caption}
        style={{ aspectRatio: ratio }}
        className="w-full rounded-[1.5rem] bg-wine object-contain shadow-soft"
      />
      <figcaption className="mt-3 px-1 text-sm font-medium leading-snug text-wine">{video.caption}</figcaption>
    </figure>
  );
}

function HeroVideo({ p }) {
  const [ratio, onLoadedMetadata] = useNaturalRatio(9 / 16);
  const tall = ratio < 1;
  return (
    <div className={tall ? 'mx-auto w-[min(21rem,82vw)]' : 'w-full'}>
      <video
        src={p.video}
        poster={p.image}
        muted
        loop
        playsInline
        controls
        onLoadedMetadata={onLoadedMetadata}
        aria-label={`${p.title} film`}
        style={{ aspectRatio: ratio }}
        className="w-full rounded-[2rem] bg-wine object-contain shadow-soft"
      />
    </div>
  );
}

export default function ProjectPage({ slug }) {
  const { projects, cms, openEditor } = useContent();
  const opened = projects.filter((p) => p.slug);
  const index = opened.findIndex((p) => p.slug === slug);
  const p = opened[index];

  if (!p) {
    return (
      <section className="px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-bold">That project isn&rsquo;t here.</h1>
        <Button href="#work" className="mt-8">Back to all work</Button>
      </section>
    );
  }

  const next = opened[(index + 1) % opened.length];
  const gallery = p.gallery || [];
  const videos = p.videos || [];
  const lead = gallery[0];

  return (
    <article aria-labelledby="project-title" className="px-3 pb-10 pt-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <a href="#work" className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-display text-sm font-semibold hover:bg-blush/70">
          <ArrowLeft aria-hidden="true" className="size-4" /> All work
        </a>
        {cms && cms.canEdit && (
          <button
            type="button"
            onClick={() => openEditor(p.slug)}
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-wine px-4 py-2 font-display text-sm font-semibold text-paper"
          >
            <Pencil aria-hidden="true" className="size-4" /> Edit this project
          </button>
        )}

        <header className={`mt-3 overflow-hidden rounded-[2.5rem] p-6 sm:p-10 lg:p-14 ${heroTones[p.tone] || 'bg-blush'}`}>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="mb-4 inline-block rounded-full bg-paper px-4 py-1.5 font-display text-sm font-medium">
                {p.category} · {p.year}
              </p>
              <h1
                id="project-title"
                className="font-display text-[length:clamp(2.2rem,5vw,3.5rem)] font-bold leading-[0.98] tracking-tight [text-wrap:balance]"
              >
                {p.title}
              </h1>
              <p className="mt-5 max-w-xl text-xl leading-relaxed">{p.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {(p.tags || []).map((t) => (
                  <li key={t} className="rounded-full bg-paper/80 px-3.5 py-1.5 text-sm font-medium">{t}</li>
                ))}
              </ul>
              {(p.links || []).length > 0 && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3.5 font-display text-base font-semibold text-paper transition hover:-translate-y-0.5 hover:shadow-pop"
                    >
                      {l.label}
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="lg:col-span-6">
              {p.video ? (
                <HeroVideo p={p} />
              ) : (
                <div className="mx-auto max-h-[32rem] overflow-hidden rounded-[2rem] shadow-soft">
                  <img src={p.image} alt={`${p.title} cover`} className="h-full max-h-[32rem] w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </header>

        <section aria-label="The story" className="mt-8 grid gap-4 md:grid-cols-2">
          {storySteps
            .filter((s) => p[s.key])
            .map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.key} delay={(i % 2) * 80}>
                  <div className="h-full rounded-[2rem] bg-paper p-7 shadow-soft">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-butter">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em]">{s.label}</h2>
                    </div>
                    <p className="mt-4 text-lg leading-relaxed text-wine">{p[s.key]}</p>
                  </div>
                </Reveal>
              );
            })}
        </section>

        {videos.length > 0 && (
          <section aria-labelledby="videos-title" className="mt-14">
            <h2 id="videos-title" className="font-display text-[length:clamp(1.6rem,3vw,2.25rem)] font-bold tracking-tight">
              In motion
            </h2>
            <div
              role="region"
              aria-label={`${p.title} videos, scroll sideways`}
              tabIndex={0}
              className="-mx-1 mt-6 flex snap-x gap-5 overflow-x-auto px-1 pb-4"
            >
              {videos.map((v) => (
                <Clip key={v.src.slice(-24) + v.caption} video={v} />
              ))}
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section aria-labelledby="gallery-title" className="mt-14">
            <h2 id="gallery-title" className="font-display text-[length:clamp(1.6rem,3vw,2.25rem)] font-bold tracking-tight">
              The work
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Reveal className="sm:col-span-2">
                <img src={lead} alt={`${p.title}, main visual`} loading="lazy" className="w-full rounded-[2rem] shadow-soft" />
              </Reveal>
              {gallery.slice(1).map((src, i) => (
                <Reveal key={src.slice(-20) + i} delay={(i % 2) * 80}>
                  <img src={src} alt={`${p.title}, image ${i + 2}`} loading="lazy" className="w-full rounded-[2rem] shadow-soft" />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <nav aria-label="More projects" className="mt-16 grid gap-4 sm:grid-cols-2">
          <a
            href="#work"
            className="flex items-center justify-between rounded-[2rem] border-2 border-wine px-7 py-6 font-display text-xl font-semibold transition hover:bg-wine hover:text-paper"
          >
            All selected work <ArrowLeft aria-hidden="true" className="size-5" />
          </a>
          <a
            href={projectHref(next)}
            className="flex items-center justify-between rounded-[2rem] bg-butter px-7 py-6 font-display text-xl font-semibold transition hover:-translate-y-1 hover:shadow-soft"
          >
            <span>
              <span className="block text-sm font-medium uppercase tracking-[0.14em]">Next project</span>
              {next.title}
            </span>
            <ArrowUpRight aria-hidden="true" className="size-6" />
          </a>
        </nav>
      </div>
    </article>
  );
}
