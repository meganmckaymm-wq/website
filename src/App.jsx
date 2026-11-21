import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Experience from './components/Experience';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Work from './components/Work';
import ProjectPage from './components/ProjectPage';
import Niches from './components/Niches';
import Results from './components/Results';
import Process from './components/Process';
import StickyCTA from './components/StickyCTA';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { ContentProvider } from './content/ContentContext';

/* Routing. On a normal host a case study lives at /work/<slug>. Where the page cannot change its
   path (the Claude preview, GitHub Pages sub-folder) it falls back to "#project-<slug>". */
const pathMode =
  typeof window !== 'undefined' &&
  typeof window.claude === 'undefined' &&
  !/github\.io$/.test(window.location.hostname);

const readRoute = () => {
  if (typeof window === 'undefined') return { slug: null, hash: '' };
  const hash = window.location.hash.replace('#', '');
  if (pathMode) {
    const m = window.location.pathname.match(/^\/work\/([^/]+)\/?$/);
    if (m) return { slug: decodeURIComponent(m[1]), hash };
    if (hash.startsWith('project-')) {
      // old-style link: tidy it into /work/<slug>
      const slug = hash.slice('project-'.length);
      window.history.replaceState(null, '', `/work/${slug}`);
      return { slug, hash: '' };
    }
    return { slug: null, hash };
  }
  return { slug: hash.startsWith('project-') ? hash.slice('project-'.length) : null, hash };
};

function useRoute() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const update = () => setRoute(readRoute());
    const onClick = (e) => {
      if (!pathMode || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || (a.target && a.target !== '_self')) return;
      const href = a.getAttribute('href');
      const onProject = /^\/work\//.test(window.location.pathname);
      if (href.startsWith('/work/')) {
        e.preventDefault();
        window.history.pushState(null, '', href);
        update();
      } else if (href.startsWith('#') && href.length > 1 && onProject) {
        e.preventDefault();
        window.history.pushState(null, '', '/' + href);
        update();
      }
    };
    window.addEventListener('hashchange', update);
    window.addEventListener('popstate', update);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', update);
      window.removeEventListener('popstate', update);
      document.removeEventListener('click', onClick);
    };
  }, []);
  return route;
}

function Site() {
  const { slug, hash } = useRoute();

  useEffect(() => {
    const go = () => {
      if (slug) {
        window.scrollTo(0, 0);
        return;
      }
      const el = hash && hash !== 'main' ? document.getElementById(hash) : null;
      if (el) el.scrollIntoView();
      else if (!hash || hash === 'top') window.scrollTo(0, 0);
    };
    const id = window.requestAnimationFrame(go);
    return () => window.cancelAnimationFrame(id);
  }, [hash, slug]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-wine focus:px-5 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        {slug ? (
          <ProjectPage slug={slug} />
        ) : (
          <>
            <Hero />
            <Marquee />
            <Results />
            <Services />
            <Work />
            <Niches />
            <About />
            <Experience />
            <Process />
            <Pricing />
            <CTA />
          </>
        )}
      </main>
      {slug && <CTA />}
      <StickyCTA />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <Site />
    </ContentProvider>
  );
}
