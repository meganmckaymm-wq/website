import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { projects } from '../data/content';
import Editor from '../components/Editor';

/* Projects come from data/content.js. On the live preview page, edits saved
   with the built-in editor are stored in the page's database and layered
   on top, so pictures, videos and wording can be changed without code.
   Anywhere else (your own computer) window.claude does not exist and the
   site simply shows content.js. */
const defaultProjects = projects;
export const defaultSlugs = defaultProjects.map((p) => p.slug);
/* Built-in pictures and videos can be inlined as huge data: strings in the live preview.
   They must never be written to the database, so saved edits store a short token
   (@<hash>) for them and the token is turned back into the real file on load. */
const hashStr = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 7) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16) + '-' + str.length.toString(16);
};
const registry = {};
defaultProjects.forEach((p) => {
  [p.image, p.video, ...(p.gallery || []), ...(p.videos || []).map((v) => v.src)].forEach((u) => {
    if (typeof u === 'string' && u.startsWith('data:')) registry[hashStr(u)] = u;
  });
});
export const packSrc = (u) => (typeof u === 'string' && u.startsWith('data:') ? '@' + hashStr(u) : u);
const unpackSrc = (u) => (typeof u === 'string' && u.startsWith('@') ? registry[u.slice(1)] || '' : u);
const unpackOverride = (o) => ({
  ...o,
  ...(o.image !== undefined ? { image: unpackSrc(o.image) } : {}),
  ...(o.video !== undefined ? { video: unpackSrc(o.video) } : {}),
  ...(o.gallery ? { gallery: o.gallery.map(unpackSrc).filter(Boolean) } : {}),
  ...(o.videos ? { videos: o.videos.map((v) => ({ ...v, src: unpackSrc(v.src) })).filter((v) => v.src) } : {}),
});

const ContentContext = createContext({ projects: defaultProjects, all: defaultProjects, cms: null, openEditor: () => {} });

export const useProjects = () => useContext(ContentContext).projects;
export const useContent = () => useContext(ContentContext);

export function ContentProvider({ children }) {
  const [overrides, setOverrides] = useState({});
  const [cms, setCms] = useState(null);
  const [editor, setEditor] = useState({ open: false, slug: null });

  useEffect(() => {
    let off = () => {};
    let dead = false;
    (async () => {
      const c = typeof window !== 'undefined' ? window.claude : null;
      if (!c || !c.use) return;
      try {
        const [db, assets, user] = await Promise.all([c.use('db'), c.use('assets'), c.use('user')]);
        if (dead || !db) return;
        let can = false;
        try {
          can = user ? await user.canEdit() : false;
        } catch (e) {
          can = false;
        }
        setCms({ db, assets: can ? assets : null, canEdit: Boolean(can && assets) });
        off = db.collection('projects').onSnapshot(
          (snap) => {
            const next = {};
            snap.docs.forEach((d) => {
              next[d.id] = d.data();
            });
            setOverrides(next);
          },
          () => {}
        );
      } catch (e) {
        /* no database here: show the built-in content */
      }
    })();
    return () => {
      dead = true;
      off();
    };
  }, []);

  const all = useMemo(() => {
    const base = defaultProjects.map((p) => (p.slug && overrides[p.slug] ? { ...p, ...unpackOverride(overrides[p.slug]) } : p));
    const extra = Object.keys(overrides)
      .filter((slug) => !defaultProjects.some((p) => p.slug === slug))
      .map((slug) => ({ slug, tier: 3, tone: 'blush', ratio: 'aspect-[4/3]', icon: Sparkles, year: '', tags: [], ...unpackOverride(overrides[slug]) }));
    return [...base, ...extra];
  }, [overrides]);
  const visible = useMemo(() => all.filter((p) => !p.hidden), [all]);

  const value = useMemo(
    () => ({
      projects: visible,
      all,
      cms,
      overrides,
      openEditor: (slug) => setEditor({ open: true, slug: slug || null }),
    }),
    [visible, all, cms, overrides]
  );

  return (
    <ContentContext.Provider value={value}>
      {children}
      {cms && cms.canEdit && <Editor open={editor.open} slug={editor.slug} onClose={() => setEditor({ open: false, slug: null })} onOpen={() => setEditor((e) => ({ ...e, open: true }))} />}
    </ContentContext.Provider>
  );
}
