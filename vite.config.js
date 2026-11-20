import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set by the GitHub Pages workflow (for example "/website/"). Locally it stays "/".
const base = process.env.VITE_BASE || '/';

// Project files point at "/images/..." and "/videos/...". When the site is served from a
// sub-folder (GitHub Pages), this adds that folder in front so the media still loads.
const prefixMedia = {
  name: 'prefix-media-paths',
  enforce: 'pre',
  transform(code, id) {
    if (base === '/' || !/\/src\/.*\.jsx?$/.test(id)) return null;
    return code.replace(/(['"`])\/(images|videos)\//g, `$1${base}$2/`);
  },
};

export default defineConfig({ base, plugins: [prefixMedia, react()] });
