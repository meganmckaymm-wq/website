import { projectHref } from '../data/content';
import { useProjects } from '../content/ContentContext';
import Placeholder from './Placeholder';
import PortfolioCard from './PortfolioCard';
import Reveal from './Reveal';
import SectionHeading, { Accent } from './SectionHeading';

const tones = { blush: 'bg-blush', sky: 'bg-sky', butter: 'bg-butter', wine: 'bg-blush' };

/* Tier 1: the main feature. Big, with video and a peek at the brand book. */
function FeaturedCard({ project }) {
  const strip = (project.gallery || []).slice(0, 3);
  return (
    <article className="group relative overflow-hidden rounded-[2.5rem] bg-blush p-5 sm:p-8 lg:p-10">
      <div className="grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Placeholder
            tone={project.tone}
            icon={project.icon}
            label={project.title}
            src={project.image}
            video={project.video}
            alt={`${project.title} harvest video`}
            className="mx-auto aspect-[9/16] max-h-[34rem] w-full max-w-xs rounded-[2rem] shadow-soft transition duration-500 group-hover:-rotate-1"
          />
        </div>
        <div className="lg:col-span-8">
          <p className="mb-4 inline-block rounded-full bg-paper px-4 py-1.5 font-display text-sm font-medium">
            Featured project · {project.category}
          </p>
          <h3 className="font-display text-[length:clamp(2rem,4.4vw,3.25rem)] font-bold leading-[0.98] tracking-tight [text-wrap:balance]">
            <a href={projectHref(project)} className="after:absolute after:inset-0">
              {project.title}
            </a>
          </h3>
          <p className="mt-4 max-w-xl text-xl leading-relaxed">{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full bg-paper/80 px-3.5 py-1.5 text-sm font-medium">{t}</li>
            ))}
          </ul>
          <div className="mt-7 grid grid-cols-3 gap-3">
            {strip.map((src, i) => (
              <img key={src.slice(-20) + i} src={src} alt="" loading="lazy" className="aspect-[16/10] w-full rounded-2xl object-cover shadow-soft" />
            ))}
          </div>
          <span className="relative mt-7 inline-flex items-center rounded-full bg-wine px-6 py-3.5 font-display text-base font-semibold text-paper transition group-hover:shadow-pop">
            Read the case study
          </span>
        </div>
      </div>
    </article>
  );
}

/* Tier 2: second row, two large cards with a short summary. */
function MajorCard({ project }) {
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] p-5 sm:p-6 ${tones[project.tone]}`}>
      <Placeholder
        tone={project.tone}
        icon={project.icon}
        label={project.title}
        src={project.image}
        video={project.video}
        alt={`${project.title} preview`}
        className="aspect-[16/10] w-full rounded-[1.75rem] shadow-soft transition duration-500 group-hover:scale-[1.015]"
      />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-wine/80">{project.category}</p>
        <h3 className="mt-2 font-display text-[length:clamp(1.8rem,3vw,2.4rem)] font-bold leading-tight tracking-tight">
          <a href={projectHref(project)} className="after:absolute after:inset-0">
            {project.title}
          </a>
        </h3>
        <p className="mt-3 text-lg leading-relaxed">{project.summary}</p>
        <span className="relative mt-auto inline-flex w-fit items-center pt-6">
          <span className="rounded-full bg-wine px-5 py-3 font-display text-sm font-semibold text-paper transition group-hover:shadow-pop">
            Read the case study
          </span>
        </span>
      </div>
    </article>
  );
}

export default function Work() {
  const projects = useProjects();
  const featured = projects.filter((p) => p.tier === 1);
  const major = projects.filter((p) => p.tier === 2);
  const rest = projects.filter((p) => p.tier >= 3);
  return (
    <section id="work" aria-labelledby="work-title" className="bg-butter px-4 py-14 sm:py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            pill="paper"
            intro="Open any project to see the brief, my role, my approach and the work itself."
            title={
              <>
                Little worlds, <Accent>built post by post.</Accent>
              </>
            }
          />
        </Reveal>

        <div className="mt-14 space-y-6">
          {featured.map((p) => (
            <Reveal key={p.slug}>
              <FeaturedCard project={p} />
            </Reveal>
          ))}
          <div className="grid gap-6 lg:grid-cols-2">
            {major.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <MajorCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>

        <h3 className="mt-16 font-display text-sm font-semibold uppercase tracking-[0.18em]">More projects</h3>
        <div className="mt-6 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80} className="mb-6 break-inside-avoid">
              <PortfolioCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
