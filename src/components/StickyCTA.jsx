import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let nearContact = false;
    let scrolled = false;
    const update = () => setShow(scrolled && !nearContact);
    const onScroll = () => {
      scrolled = window.scrollY > 600;
      update();
    };
    let io = null;
    const el = document.getElementById('contact');
    if (el && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => {
        nearContact = e.isIntersecting;
        update();
      });
      io.observe(el);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 transition duration-300 md:hidden ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)' }}
    >
      <a
        href="#contact"
        tabIndex={show ? 0 : -1}
        className="inline-flex items-center gap-2 rounded-full bg-wine px-7 py-3.5 font-display font-semibold text-paper shadow-pop"
      >
        <Mail aria-hidden="true" className="size-5" />
        Book an intro chat
      </a>
    </div>
  );
}
