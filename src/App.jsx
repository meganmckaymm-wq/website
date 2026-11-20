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

const readHash = () => (typeof window === 'undefined' ? '' : window.location.hash.replace('#', ''));

/* Tiny hash router: "#project-<slug>" shows a case study, anything else is the home page. */
function useHash() {
  const [hash, setHash] = useState(readHash);
  useEffect(() => {
    const onChange = () => setHash(readHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function Site() {
  const hash = useHash();
  const slug = hash.startsWith('project-') ? hash.slice('project-'.length) : null;

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
