import { testimonials } from '../data/content';
import Reveal from './Reveal';
import SectionHeading, { Accent } from './SectionHeading';
import TestimonialCard from './TestimonialCard';

const tilt = ['md:-rotate-2', 'md:rotate-1 lg:mt-10', 'md:-rotate-1'];

export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="px-3 py-6 sm:px-6">
      <div className="mx-auto max-w-[88rem] rounded-[2.5rem] bg-blush px-5 py-20 sm:px-10 lg:rounded-[4rem] lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              id="testimonials-title"
              eyebrow="Kind words"
              pill="paper"
              title={
                <>
                  Brands that <Accent>felt the difference.</Accent>
                </>
              }
            />
          </Reveal>
          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <li key={i} className={tilt[i]}>
                <Reveal delay={i * 100} className="h-full">
                  <TestimonialCard item={t} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
