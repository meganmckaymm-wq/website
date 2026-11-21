import { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Globe, X } from 'lucide-react';
import { site } from '../data/content';

const siteUrl = 'https://meganmckay.netlify.app/';

/* The "Prices" tab: any link to "#prices" opens this panel with contact details. */
export default function PricesDialog() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href="#prices"]');
      if (!a) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const rows = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: <Mail aria-hidden="true" className="size-5" />, tone: 'bg-butter' },
    { label: 'Website', value: 'meganmckay.netlify.app', href: siteUrl, icon: <Globe aria-hidden="true" className="size-5" />, tone: 'bg-sky', external: true },
    { label: 'LinkedIn', value: 'Megan McKay', href: site.socials.linkedin, icon: <Linkedin aria-hidden="true" className="size-5" />, tone: 'bg-blush', external: true },
  ];

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="prices-title">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-wine/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-[2rem] bg-paper p-6 shadow-soft sm:p-9">
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-blush"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-wine/70">Prices</p>
        <h2 id="prices-title" className="mt-2 pr-12 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Get in touch for <span className="font-serif font-normal italic">prices.</span>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-wine">
          Every brand is different, so I send prices after a quick message. Tell me about your brand and I will reply personally.
        </p>
        <ul className="mt-7 space-y-3">
          {rows.map((r) => (
            <li key={r.label}>
              <a
                href={r.href}
                {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition hover:-translate-y-0.5 ${r.tone}`}
              >
                <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-paper">{r.icon}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold uppercase tracking-wider text-wine/70">{r.label}</span>
                  <span className="block break-words font-display text-lg font-semibold">{r.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
