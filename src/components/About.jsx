import { approach, about, site } from '../data/content';
import Button from './Button';
import Portrait from './Portrait';
import Reveal from './Reveal';
import SectionHeading, { Accent } from './SectionHeading';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-3 py-6 sm:px-6">
      <div className="mx-auto max-w-[88rem] overflow-hidden rounded-[2.5rem] bg-sky px-5 py-14 sm:py-20 sm:px-10 lg:rounded-[4rem] lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-12">
          <Reveal className="relative mx-auto w-full max-w-md pb-10 lg:col-span-5 lg:max-w-none">
            <Portrait
              src={site.portrait}
              tone="blush"
              alt="Portrait of Megan"
              className="aspect-[4/5] w-full rotate-[-3deg] rounded-[2rem] shadow-soft"
            />
            <p className="absolute -left-2 top-6 rotate-[5deg] rounded-xl bg-paper px-4 py-2.5 font-serif text-xl italic shadow-soft sm:-left-5">
              {about.note}
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:pl-6">
            <SectionHeading
              id="about-title"
              eyebrow="About me"
              size="lg"
              pill="paper"
              title={
                <>
                  Strategy with a soft spot for the <Accent>details.</Accent>
                </>
              }
            />
            {about.paragraphs.map((t) => (
              <p key={t.slice(0, 20)} className="mt-6 max-w-xl text-xl leading-relaxed">
                {t}
              </p>
            ))}
            <ol className="mt-9 grid gap-4 sm:grid-cols-3">
              {approach.map((a, i) => (
                <li key={a.title} className="rounded-3xl bg-paper/80 p-5">
                  <span className="grid size-8 place-items-center rounded-full bg-wine font-display text-sm font-semibold text-paper">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{a.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-wine">{a.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em]">Tools I use</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {about.tools.map((tool) => (
                  <li key={tool} className="rounded-full bg-paper/80 px-3.5 py-1.5 text-sm font-medium">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            <Button href="#contact" className="mt-9">
              More about me
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
