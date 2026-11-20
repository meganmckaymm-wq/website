import { ArrowUpRight } from 'lucide-react';
import { projectHref } from '../data/content';
import Placeholder from './Placeholder';

/* Opens its own case study when the project has a slug; otherwise it is
   shown for reference only (no link, no hover prompt). */
export default function PortfolioCard({ project }) {
  const { title, category, tone, ratio, icon, image, video } = project;
  const opens = Boolean(project.slug);
  return (
    <article
      className={`group relative rounded-[2rem] bg-paper p-3 shadow-soft transition duration-300 ease-out ${
        opens ? 'hover:-translate-y-1.5 hover:-rotate-[0.6deg]' : ''
      }`}
    >
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <Placeholder
          tone={tone}
          icon={icon}
          label={title}
          src={image}
          video={video}
          alt={`${title} project preview`}
          className={`w-full ${ratio} ${opens ? 'transition-transform duration-700 ease-out group-hover:scale-105' : ''}`}
        />
        {opens && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid place-items-center bg-wine/0 transition duration-300 group-hover:bg-wine/35"
          >
            <span className="translate-y-3 rounded-full bg-paper px-5 py-2.5 font-display text-sm font-semibold opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              View case study
            </span>
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-wine/75">{category}</p>
          <h3 className="mt-1 font-display text-2xl font-semibold leading-tight">
            {opens ? (
              <a href={projectHref(project)} className="after:absolute after:inset-0 after:rounded-[2rem]">
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
        </div>
        {opens && (
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-wine text-paper transition duration-300 group-hover:rotate-45 group-hover:bg-blush group-hover:text-wine"
          >
            <ArrowUpRight className="size-5" />
          </span>
        )}
      </div>
    </article>
  );
}
