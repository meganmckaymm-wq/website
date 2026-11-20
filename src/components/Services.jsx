import { services } from '../data/content';
import Reveal from './Reveal';
import SectionHeading, { Accent } from './SectionHeading';
import ServiceCard from './ServiceCard';

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="px-4 py-14 sm:py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="lg:ml-[8%]">
          <SectionHeading
            id="services-title"
            eyebrow="What I do"
            title={
              <>
                A creative team of one, <Accent>on your side.</Accent>
              </>
            }
            intro="Pick one service or let me run the whole feed. Everything is made to work together."
          />
        </Reveal>
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.title} className={i % 3 === 1 ? 'lg:mt-12' : ''}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <ServiceCard service={s} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
