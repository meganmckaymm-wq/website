import { MessageCircle, ClipboardList, Video, TrendingUp } from 'lucide-react';
import { howItWorks } from '../data/content';
import Reveal from './Reveal';
import SectionHeading, { Accent } from './SectionHeading';

const processIcons = { MessageCircle, ClipboardList, Video, TrendingUp };
const processTones = ['bg-sky', 'bg-blush', 'bg-butter', 'bg-sky'];

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="px-4 py-14 sm:py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            id="process-title"
            eyebrow="How it works"
            pill="butter"
            title={
              <>
                Easy to start, <Accent>easy to keep up.</Accent>
              </>
            }
            intro="You do not need a plan or a brief to get in touch. We work it out together, step by step."
          />
        </Reveal>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((st, i) => {
            const Icon = processIcons[st.icon];
            return (
              <li key={st.title}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="h-full rounded-[2rem] bg-paper p-6 shadow-soft">
                    <div className="flex items-center justify-between">
                      <span className={`grid size-14 place-items-center rounded-full ${processTones[i]}`}>
                        <Icon aria-hidden="true" className="size-6" />
                      </span>
                      <span className="font-serif text-4xl italic text-wine/40">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold">{st.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-wine">{st.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
