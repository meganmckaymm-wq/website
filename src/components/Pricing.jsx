import { Check } from 'lucide-react';
import { pricing } from '../data/content';
import Button from './Button';
import Reveal from './Reveal';
import SectionHeading, { Accent } from './SectionHeading';

const priceTones = { blush: 'bg-blush', sky: 'bg-sky', butter: 'bg-butter' };

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="px-4 py-14 sm:py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            id="pricing-title"
            eyebrow="Packages"
            title={
              <>
                Simple packages, <Accent>tailored to you.</Accent>
              </>
            }
            intro="Start with a direction or let me take over your content every month. Get in touch and I will send you the prices and help you pick the right fit."
          />
        </Reveal>
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricing.packages.map((p, i) => (
            <li key={p.name}>
              <Reveal delay={i * 90} className="h-full">
                <article className="flex h-full flex-col rounded-[2.5rem] bg-paper p-3 shadow-soft">
                  <div className={`rounded-[2rem] p-7 ${priceTones[p.tone]}`}>
                    <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                    <p className="mt-3 font-serif text-2xl italic">{p.per}</p>
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-5 pt-6">
                    <p className="text-lg leading-relaxed text-wine">{p.blurb}</p>
                    <ul className="mt-5 space-y-3 text-base">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-butter">
                            <Check aria-hidden="true" className="size-3.5" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <Button href="#prices" variant="secondary" arrow={false} className="w-full">
                        Request prices
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-wine">
            {pricing.addons} {pricing.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
