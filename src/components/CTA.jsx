import { Linkedin, Mail } from 'lucide-react';
import { site } from '../data/content';
import Button from './Button';
import Reveal from './Reveal';
import { Accent } from './SectionHeading';

const socials = [
  { label: 'LinkedIn', href: site.socials.linkedin, icon: <Linkedin aria-hidden="true" className="size-5" /> },
];

export default function CTA() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-3 py-16 sm:px-6 lg:py-24">
      <Reveal className="on-wine relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-wine px-6 py-16 text-paper sm:px-12 lg:rounded-[4rem] lg:px-20 lg:py-28">
        <div aria-hidden="true" className="absolute -bottom-20 -right-16 hidden size-80 rounded-full bg-sky lg:block" />
        <div aria-hidden="true" className="absolute -bottom-32 right-60 hidden size-72 rounded-full bg-blush lg:block" />
        <div aria-hidden="true" className="absolute bottom-40 right-8 hidden size-24 rounded-full bg-butter lg:block" />

        <div aria-hidden="true" className="mb-8 flex gap-2 lg:hidden">
          <span className="size-8 rounded-full bg-sky" />
          <span className="size-8 rounded-full bg-blush" />
          <span className="size-8 rounded-full bg-butter" />
        </div>

        <div className="relative max-w-4xl">
          <h2
            id="contact-title"
            className="font-display text-[length:clamp(2.2rem,4.8vw,3.75rem)] font-bold leading-[0.95] tracking-tight [text-wrap:balance]"
          >
            Let&rsquo;s create something <span className="font-serif font-normal italic text-butter">together.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-blush sm:text-xl">
            Tell me about your brand and what you want social media to do for you. I read every message and reply personally.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={`mailto:${site.email}`} variant="light" arrow={false}>
              <Mail aria-hidden="true" className="size-5" />
              {site.email}
            </Button>
          </div>
          <ol className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            {['You send me a short message', 'I reply personally', 'We book an intro chat'].map((t, i) => (
              <li key={t} className="flex items-center gap-3 font-display font-medium text-blush">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-butter text-sm font-bold text-wine">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <ul className="mt-8 flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-blush/60 px-5 py-3 font-display font-medium text-blush transition hover:-translate-y-0.5 hover:bg-blush hover:text-wine"
                >
                  {s.icon}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
