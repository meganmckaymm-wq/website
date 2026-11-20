import { education, experience, recognition } from '../data/content';
import Reveal from './Reveal';
import SectionHeading, { Accent } from './SectionHeading';
import { ArrowUpRight, Trophy } from 'lucide-react';

const expTones = { blush: 'bg-blush', sky: 'bg-sky', butter: 'bg-butter' };

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="px-4 py-14 sm:py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            id="experience-title"
            eyebrow="Experience"
            title={
              <>
                Real briefs, <Accent>real results.</Accent>
              </>
            }
          />
        </Reveal>
        <ol className="mt-12 grid gap-6 lg:grid-cols-3">
          {experience.map((e, i) => (
            <Reveal key={e.org} delay={i * 90}>
              <li className={`h-full rounded-[2rem] p-7 ${expTones[e.tone]}`}>
                <p className="font-display text-sm font-medium tracking-wide">{e.when}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">{e.role}</h3>
                <p className="mt-1 font-serif text-xl italic">
                  {e.org} · {e.place}
                </p>
                <ul className="mt-5 space-y-3 text-base leading-relaxed text-wine">
                  {e.points.map((pt) => (
                    <li key={pt.slice(0, 24)} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-wine" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="h-full rounded-[2rem] bg-paper p-7 shadow-soft">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em]">Education &amp; certificates</h3>
              <ul className="mt-5 divide-y divide-wine/15">
                {education.map((ed) => (
                  <li key={ed.title} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                    <div className="min-w-0">
                      <p className="font-display text-lg font-semibold leading-snug">{ed.title}</p>
                      <p className="text-base text-wine">
                        {ed.where}
                        {ed.note ? ` · ${ed.note}` : ''}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-wine/75">{ed.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-2">
            <a
              href={recognition.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between rounded-[2rem] bg-wine p-7 text-paper transition duration-300 hover:-translate-y-1.5 hover:shadow-pop"
            >
              <span className="grid size-12 place-items-center rounded-full bg-butter text-wine">
                <Trophy aria-hidden="true" className="size-6" />
              </span>
              <div className="mt-8">
                <h3 className="font-display text-2xl font-semibold leading-tight">{recognition.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-paper/90">{recognition.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-butter">
                  See the entry <ArrowUpRight aria-hidden="true" className="size-4 transition group-hover:rotate-45" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
