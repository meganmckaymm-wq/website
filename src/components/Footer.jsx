import { Linkedin } from 'lucide-react';
import { site, navLinks } from '../data/content';

export default function Footer() {
  const social = 'grid size-10 place-items-center rounded-full bg-blush transition hover:bg-wine hover:text-blush';
  return (
    <footer className="px-4 pb-10 pt-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 border-t border-wine/20 pt-8 md:flex-row md:justify-between">
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-bold">
          <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-butter text-sm">✿</span>
          {site.name}
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-display font-medium">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:underline hover:decoration-2 hover:underline-offset-4">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex gap-2">
          <li>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={social}>
              <Linkedin aria-hidden="true" className="size-5" />
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-6 text-center text-sm text-wine/80">
        &copy; {new Date().getFullYear()} {site.name}. Made with care in the Netherlands.
      </p>
    </footer>
  );
}
