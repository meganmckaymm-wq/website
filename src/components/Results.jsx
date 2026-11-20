import { results } from '../data/content';
import Reveal from './Reveal';
import Button from './Button';
import SectionHeading, { Accent } from './SectionHeading';

const resultTones = { sky: 'bg-sky', butter: 'bg-butter', paper: 'bg-paper', blush: 'bg-paper' };

export default function Results() {
  return (
    <section id="results" aria-labelledby="results-title" className="px-3 py-6 sm:px-6">
      <div className="mx-auto max-w-[88rem] rounded-[2.5rem] bg-blush px-5 py-14 sm:py-20 sm:px-10 lg:rounded-[4rem] lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              id="results-title"
              eyebrow="Proof"
              pill="paper"
              title={
                <>
                  Work that <Accent>moves numbers.</Accent>
                </>
              }
            />
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {results.map((r, i) => (
              <li key={r.label} className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
                <Reveal delay={i * 80} className="h-full">
                  <div className={`flex h-full flex-col justify-between rounded-[2rem] p-7 ${resultTones[r.tone]}`}>
                    <p className="font-display text-5xl font-bold leading-none tracking-tight">{r.big}</p>
                    <div className="mt-8">
                      <p className="font-display text-xl font-semibold">{r.label}</p>
                      <p className="mt-1 text-base leading-relaxed text-wine">{r.note}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <p className="font-display text-xl font-semibold">Want results like these for your brand?</p>
            <Button href="#contact">Let&rsquo;s talk</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
