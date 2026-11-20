import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { site, navLinks } from '../data/content';
import Button from './Button';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky z-50 px-3 pt-3 sm:px-6" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition duration-300 sm:px-6 ${
          scrolled || open ? 'bg-paper/90 shadow-soft backdrop-blur' : 'bg-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-butter text-base">✿</span>
          {site.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 font-display text-[0.95rem] font-medium transition hover:bg-blush/70">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button href="#contact" className="hidden !px-5 !py-2.5 md:inline-flex" arrow={false}>
            Let&rsquo;s talk
          </Button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-blush md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="mx-auto mt-2 max-w-6xl rounded-[2rem] bg-paper p-5 shadow-soft md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 font-display text-2xl font-semibold hover:bg-blush/70"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
