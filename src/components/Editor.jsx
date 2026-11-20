import { useEffect, useState } from 'react';
import { ImagePlus, Pencil, Plus, Trash2, Video, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { defaultSlugs, packSrc, useContent } from '../content/ContentContext';

const SHAPES = [
  ['aspect-[16/9]', 'Wide'],
  ['aspect-[4/3]', 'Landscape'],
  ['aspect-square', 'Square'],
  ['aspect-[3/4]', 'Portrait'],
  ['aspect-[9/16]', 'Tall'],
];
const TIERS = [
  [1, 'Featured (biggest)'],
  [2, 'Major (large card)'],
  [3, 'Standard'],
];
const TEXT = [
  ['title', 'Title', 1],
  ['category', 'Label under the title (e.g. Branding · Social media)', 1],
  ['year', 'Year', 1],
  ['summary', 'One-line summary', 2],
  ['brief', 'The brief', 3],
  ['challenge', 'The challenge', 3],
  ['role', 'My role', 3],
  ['approach', 'The approach', 4],
  ['outcome', 'The outcome (optional)', 3],
];

const errText = (e) => {
  const c = e && e.code;
  if (c === 'too_large') return 'That file is over 20 MB. Please compress it and try again.';
  if (c === 'unsupported_type') return 'This browser cannot read that file. Try a JPG, PNG, MP4 or WebM.';
  if (c === 'too_long') return 'That video is longer than 2.5 minutes. Please trim it to a short clip and try again.';
  if (c === 'convert_unsupported') return 'This browser cannot convert that video. Try Chrome, or export it as an MP4 under 20 MB first.';
  if (c === 'quota_or_state') return 'The storage for this page is full.';
  if (c === 'not_granted') return 'You need edit access to this page to change it.';
  return 'Something went wrong (' + (c || 'unknown') + '). Please try again.';
};


const MAX_UPLOAD = 18 * 1024 * 1024;

const loadVideo = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement('video');
    v.muted = true;
    v.playsInline = true;
    v.preload = 'auto';
    const fail = () => {
      URL.revokeObjectURL(url);
      reject({ code: 'unsupported_type' });
    };
    v.onloadedmetadata = () => resolve({ v, url });
    v.onerror = fail;
    setTimeout(fail, 20000);
    v.src = url;
  });

/* Videos that are not MP4/WebM, or are over the upload limit, are re-recorded in the
   browser as a smaller WebM. It plays in real time, so a 30 second clip takes about 30 seconds. */
async function prepareVideo(file, onProgress) {
  const okType = file.type === 'video/mp4' || file.type === 'video/webm';
  if (okType && file.size <= MAX_UPLOAD) return file;
  if (typeof MediaRecorder === 'undefined') throw { code: 'convert_unsupported' };
  const { v, url } = await loadVideo(file);
  const dur = v.duration;
  if (!isFinite(dur) || dur > 150) {
    URL.revokeObjectURL(url);
    throw { code: 'too_long' };
  }
  const scale = Math.min(1, 1280 / Math.max(v.videoWidth, v.videoHeight));
  const w = Math.max(2, Math.round((v.videoWidth * scale) / 2) * 2);
  const h = Math.max(2, Math.round((v.videoHeight * scale) / 2) * 2);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const mime = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4'].find((t) => MediaRecorder.isTypeSupported(t));
  if (!mime) {
    URL.revokeObjectURL(url);
    throw { code: 'convert_unsupported' };
  }
  const bits = Math.max(400000, Math.min(3000000, Math.floor((15 * 1024 * 1024 * 8) / dur)));
  const rec = new MediaRecorder(canvas.captureStream(30), { mimeType: mime, videoBitsPerSecond: bits });
  const chunks = [];
  rec.ondataavailable = (e) => e.data && e.data.size && chunks.push(e.data);
  const stopped = new Promise((res) => {
    rec.onstop = res;
  });
  rec.start(1000);
  await v.play();
  await new Promise((res) => {
    let last = 0;
    const draw = () => {
      ctx.drawImage(v, 0, 0, w, h);
      if (v.currentTime - last > 0.5) {
        last = v.currentTime;
        onProgress(Math.min(0.99, v.currentTime / dur));
      }
      if (!v.ended) requestAnimationFrame(draw);
    };
    v.onended = res;
    draw();
  });
  rec.stop();
  await stopped;
  URL.revokeObjectURL(url);
  const blob = new Blob(chunks, { type: mime.split(';')[0] });
  if (blob.size > 19.5 * 1024 * 1024) throw { code: 'too_large' };
  return blob;
}

/* Pictures: big or unusual formats (HEIC, huge photos) are shrunk to a JPEG in the browser. */
async function prepareImage(file) {
  const okType = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type);
  if (okType && file.size <= 6 * 1024 * 1024) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 2400 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.86));
    if (!blob) throw new Error('no blob');
    return blob;
  } catch (e) {
    if (okType) return file;
    throw { code: 'unsupported_type' };
  }
}

const videoShape = (file) =>
  new Promise((resolve) => {
    const v = document.createElement('video');
    const u = URL.createObjectURL(file);
    const done = (r) => {
      URL.revokeObjectURL(u);
      resolve(r);
    };
    v.preload = 'metadata';
    v.onloadedmetadata = () => done(v.videoWidth > v.videoHeight ? 'aspect-[16/9]' : 'aspect-[9/16]');
    v.onerror = () => done('aspect-[9/16]');
    setTimeout(() => done('aspect-[9/16]'), 4000);
    v.src = u;
  });

const toDraft = (p) => ({
  title: p.title || '',
  category: p.category || '',
  year: p.year || '',
  summary: p.summary || '',
  brief: p.brief || '',
  challenge: p.challenge || '',
  role: p.role || '',
  approach: p.approach || '',
  outcome: p.outcome || '',
  tags: (p.tags || []).join(', '),
  links: (p.links || []).map((l) => ({ label: l.label, href: l.href })),
  image: p.image || '',
  video: p.video || '',
  gallery: [...(p.gallery || [])],
  videos: (p.videos || []).map((v) => ({ src: v.src, caption: v.caption || '', ratio: v.ratio || 'aspect-[9/16]' })),
  ratio: p.ratio || 'aspect-[4/3]',
  tier: p.tier || 3,
  hidden: Boolean(p.hidden),
});

const move = (arr, i, d) => {
  const j = i + d;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

const inputCls = 'w-full rounded-xl border-2 border-wine/25 bg-white px-3 py-2 text-base focus:border-wine focus:outline-none';
const smallBtn = 'inline-flex items-center gap-1.5 rounded-full border-2 border-wine px-3.5 py-1.5 text-sm font-semibold hover:bg-wine hover:text-paper';

function FilePick({ label, accept, multiple, onFiles, icon: Icon }) {
  return (
    <label className={`${smallBtn} cursor-pointer`}>
      <Icon aria-hidden="true" className="size-4" />
      {label}
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          e.target.value = '';
          if (files.length) onFiles(files);
        }}
      />
    </label>
  );
}

export default function Editor({ open, slug, onClose, onOpen }) {
  const { all, cms, overrides, openEditor } = useContent();
  const editable = all.filter((p) => p.slug);
  const current = editable.find((p) => p.slug === slug) || null;
  const [draft, setDraft] = useState(null);
  const [busy, setBusy] = useState('');
  const [msg, setMsg] = useState('');
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    setDraft(current ? toDraft(current) : null);
    setMsg('');
    setArmed(false);
  }, [slug, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));
  const isExtra = Boolean(current) && !defaultSlugs.includes(current.slug);

  const upload = async (files, kind) => {
    for (const f of files) {
      try {
        setBusy(`Uploading ${f.name}…`);
        setMsg('');
        const isVid = kind === 'video' || kind === 'cardVideo';
        const prepared = isVid ? await prepareVideo(f, (p) => setBusy(`Converting ${f.name} to a smaller video… ${Math.round(p * 100)}%. Keep this tab open.`)) : await prepareImage(f);
        const ratio = isVid ? await videoShape(prepared) : null;
        setBusy(`Uploading ${f.name}…`);
        const r = await cms.assets.upload(prepared);
        const src = '/_blob/' + r.id;
        setDraft((d) => {
          if (kind === 'cover') return { ...d, image: src };
          if (kind === 'cardVideo') return { ...d, video: src };
          if (kind === 'gallery') return { ...d, gallery: [...d.gallery, src] };
          return { ...d, videos: [...d.videos, { src, caption: f.name.replace(/\.[^.]+$/, ''), ratio }] };
        });
      } catch (e) {
        setMsg(errText(e));
      }
    }
    setBusy('');
  };

  const save = async () => {
    try {
      setBusy('Saving…');
      const data = {
        ...draft,
        image: packSrc(draft.image),
        video: packSrc(draft.video),
        gallery: draft.gallery.map(packSrc),
        videos: draft.videos.map((v) => ({ ...v, src: packSrc(v.src) })),
        tier: Number(draft.tier),
        tags: draft.tags.split(',').map((t) => t.trim()).filter(Boolean),
        links: draft.links.filter((l) => l.label && l.href),
      };
      await cms.db.doc('projects/' + current.slug).set(data);
      setMsg('Saved. Everyone who opens the page now sees this.');
    } catch (e) {
      setMsg('Could not save (' + ((e && e.code) || 'unknown') + '). ' + errText(e));
    }
    setBusy('');
  };

  const reset = async () => {
    try {
      setBusy('Resetting…');
      await cms.db.doc('projects/' + current.slug).delete();
      setMsg(isExtra ? 'Project deleted.' : 'Back to the original.');
      if (isExtra) openEditor(null);
    } catch (e) {
      setMsg(errText(e));
    }
    setArmed(false);
    setBusy('');
  };

  const addProject = async () => {
    const id = 'new-project-' + Date.now().toString(36);
    try {
      setBusy('Creating…');
      await cms.db.doc('projects/' + id).set({ title: 'New project', category: 'Branding', year: String(new Date().getFullYear()), summary: 'Write a one-line summary here.', tier: 3, ratio: 'aspect-[4/3]', tags: [], gallery: [], videos: [], image: '' });
      openEditor(id);
    } catch (e) {
      setMsg(errText(e));
    }
    setBusy('');
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => onOpen()}
          className="fixed z-[60] flex items-center gap-2 rounded-full bg-wine px-5 py-3 font-display text-sm font-semibold text-paper shadow-pop"
          style={{ left: 'max(16px, env(safe-area-inset-left, 0px))', bottom: 'max(16px, env(safe-area-inset-bottom, 0px))' }}
        >
          <Pencil aria-hidden="true" className="size-4" /> Edit site
        </button>
      )}
      {open && (
        <div className="fixed inset-0 z-[70] flex justify-end bg-wine/40" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <aside role="dialog" aria-modal="true" aria-label="Edit projects" className="flex h-full w-full max-w-xl flex-col bg-paper shadow-2xl">
            <div className="flex items-center justify-between border-b border-wine/15 px-5 py-4">
              <h2 className="font-display text-xl font-bold">Edit projects</h2>
              <button type="button" onClick={onClose} aria-label="Close editor" className="grid size-10 place-items-center rounded-full bg-blush">
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <div className="flex flex-wrap items-center gap-2">
                <select
                  aria-label="Choose a project"
                  value={slug || ''}
                  onChange={(e) => openEditor(e.target.value || null)}
                  className={`${inputCls} flex-1`}
                >
                  <option value="">Choose a project…</option>
                  {editable.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title}
                      {p.hidden ? ' (hidden)' : ''}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={addProject} disabled={Boolean(busy)} className={smallBtn}>
                  <Plus aria-hidden="true" className="size-4" /> New project
                </button>
              </div>

              {!draft && <p className="text-base text-wine">Pick a project to change its pictures, videos and wording, or add a new one.</p>}

              {draft && (
                <>
                  <section className="space-y-3">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em]">Pictures and videos</h3>
                    <div>
                      <p className="mb-2 text-sm font-medium">Cover picture</p>
                      <div className="flex items-center gap-3">
                        {draft.image ? <img src={draft.image} alt="" className="h-20 w-28 rounded-xl object-cover" /> : <span className="grid h-20 w-28 place-items-center rounded-xl bg-blush text-xs">No cover</span>}
                        <FilePick label={draft.image ? 'Replace' : 'Add cover'} accept="image/*,.heic" icon={ImagePlus} onFiles={(f) => upload(f.slice(0, 1), 'cover')} />
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Looping video on the project card (optional)</p>
                      <div className="flex items-center gap-3">
                        {draft.video && <video src={draft.video} muted preload="metadata" className="h-20 w-14 rounded-xl bg-wine object-cover" />}
                        <FilePick label={draft.video ? 'Replace' : 'Add video'} accept="video/*,.mov,.mp4,.webm" icon={Video} onFiles={(f) => upload(f.slice(0, 1), 'cardVideo')} />
                        {draft.video && (
                          <button type="button" className={smallBtn} onClick={() => set({ video: '' })}>
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Pictures on the project page</p>
                      <ul className="grid grid-cols-3 gap-2">
                        {draft.gallery.map((src, i) => (
                          <li key={src + i} className="rounded-xl bg-white p-1.5 shadow-soft">
                            <img src={src} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
                            <div className="mt-1.5 flex justify-between">
                              <button type="button" aria-label="Move earlier" className="grid size-8 place-items-center rounded-full hover:bg-blush" onClick={() => set({ gallery: move(draft.gallery, i, -1) })}>
                                <ArrowLeft aria-hidden="true" className="size-4" />
                              </button>
                              <button type="button" aria-label="Remove picture" className="grid size-8 place-items-center rounded-full hover:bg-blush" onClick={() => set({ gallery: draft.gallery.filter((_, k) => k !== i) })}>
                                <Trash2 aria-hidden="true" className="size-4" />
                              </button>
                              <button type="button" aria-label="Move later" className="grid size-8 place-items-center rounded-full hover:bg-blush" onClick={() => set({ gallery: move(draft.gallery, i, 1) })}>
                                <ArrowRight aria-hidden="true" className="size-4" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2">
                        <FilePick label="Add pictures" accept="image/*,.heic" multiple icon={ImagePlus} onFiles={(f) => upload(f, 'gallery')} />
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Videos on the project page</p>
                      <ul className="space-y-2">
                        {draft.videos.map((v, i) => (
                          <li key={v.src + i} className="flex items-center gap-3 rounded-xl bg-white p-2 shadow-soft">
                            <video src={v.src} muted preload="metadata" className="h-16 w-12 shrink-0 rounded-lg bg-wine object-cover" />
                            <input
                              aria-label="Video caption"
                              className={inputCls}
                              value={v.caption}
                              onChange={(e) => set({ videos: draft.videos.map((x, k) => (k === i ? { ...x, caption: e.target.value } : x)) })}
                            />
                            <button type="button" aria-label="Move earlier" className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-blush" onClick={() => set({ videos: move(draft.videos, i, -1) })}>
                              <ArrowLeft aria-hidden="true" className="size-4" />
                            </button>
                            <button type="button" aria-label="Move later" className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-blush" onClick={() => set({ videos: move(draft.videos, i, 1) })}>
                              <ArrowRight aria-hidden="true" className="size-4" />
                            </button>
                            <button type="button" aria-label="Remove video" className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-blush" onClick={() => set({ videos: draft.videos.filter((_, k) => k !== i) })}>
                              <Trash2 aria-hidden="true" className="size-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2">
                        <FilePick label="Add videos" accept="video/*,.mov,.mp4,.webm" multiple icon={Video} onFiles={(f) => upload(f, 'video')} />
                      </div>
                      <p className="mt-2 text-sm text-wine/80">Phone videos and large photos are shrunk automatically (videos take about as long as they last). Keep clips under 2.5 minutes.</p>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em]">Wording</h3>
                    {TEXT.map(([key, label, rows]) => (
                      <label key={key} className="block text-sm font-medium">
                        {label}
                        {rows === 1 ? (
                          <input className={`${inputCls} mt-1`} value={draft[key]} onChange={(e) => set({ [key]: e.target.value })} />
                        ) : (
                          <textarea rows={rows} className={`${inputCls} mt-1`} value={draft[key]} onChange={(e) => set({ [key]: e.target.value })} />
                        )}
                      </label>
                    ))}
                    <label className="block text-sm font-medium">
                      Tags (separate with commas)
                      <input className={`${inputCls} mt-1`} value={draft.tags} onChange={(e) => set({ tags: e.target.value })} />
                    </label>
                    <div>
                      <p className="mb-1 text-sm font-medium">Links (e.g. TikTok or an award page)</p>
                      {draft.links.map((l, i) => (
                        <div key={i} className="mb-2 flex gap-2">
                          <input aria-label="Link text" placeholder="Button text" className={inputCls} value={l.label} onChange={(e) => set({ links: draft.links.map((x, k) => (k === i ? { ...x, label: e.target.value } : x)) })} />
                          <input aria-label="Link address" placeholder="https://…" className={inputCls} value={l.href} onChange={(e) => set({ links: draft.links.map((x, k) => (k === i ? { ...x, href: e.target.value } : x)) })} />
                          <button type="button" aria-label="Remove link" className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-blush" onClick={() => set({ links: draft.links.filter((_, k) => k !== i) })}>
                            <Trash2 aria-hidden="true" className="size-4" />
                          </button>
                        </div>
                      ))}
                      <button type="button" className={smallBtn} onClick={() => set({ links: [...draft.links, { label: '', href: '' }] })}>
                        <Plus aria-hidden="true" className="size-4" /> Add link
                      </button>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em]">Layout</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="block text-sm font-medium">
                        Importance
                        <select className={`${inputCls} mt-1`} value={draft.tier} onChange={(e) => set({ tier: e.target.value })}>
                          {TIERS.map(([v, l]) => (
                            <option key={v} value={v}>{l}</option>
                          ))}
                        </select>
                      </label>
                      <label className="block text-sm font-medium">
                        Card shape
                        <select className={`${inputCls} mt-1`} value={draft.ratio} onChange={(e) => set({ ratio: e.target.value })}>
                          {SHAPES.map(([v, l]) => (
                            <option key={v} value={v}>{l}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input type="checkbox" checked={draft.hidden} onChange={(e) => set({ hidden: e.target.checked })} />
                      Hide this project from the website
                    </label>
                  </section>
                </>
              )}
            </div>
            {draft && (
              <div className="border-t border-wine/15 px-5 py-4">
                <p role="status" className="mb-3 min-h-[1.25rem] text-sm font-medium text-wine">
                  {busy || msg}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={save} disabled={Boolean(busy)} className="rounded-full bg-wine px-6 py-3 font-display text-base font-semibold text-paper disabled:opacity-50">
                    Save changes
                  </button>
                  {overrides[current.slug] &&
                    (armed ? (
                      <button type="button" onClick={reset} className="rounded-full bg-blush px-5 py-3 font-display text-base font-semibold">
                        {isExtra ? 'Yes, delete it' : 'Yes, reset it'}
                      </button>
                    ) : (
                      <button type="button" onClick={() => setArmed(true)} className="rounded-full border-2 border-wine px-5 py-3 font-display text-base font-semibold">
                        {isExtra ? 'Delete project' : 'Reset to original'}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
