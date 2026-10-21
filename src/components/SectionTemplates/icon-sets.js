/* Open-source icon sets for the icon picker, loaded on demand from the @iconify-json packages
   on jsDelivr (the picker only needs the network while browsing a set; a chosen icon is saved
   inside the design). Licences: https://iconify.design/docs/icons/ */

export const ICON_SETS = [
  { id: 'lucide', label: 'Lucide', license: 'ISC', url: 'https://lucide.dev' },
  { id: 'tabler', label: 'Tabler', license: 'MIT', url: 'https://tabler.io/icons' },
  { id: 'heroicons', label: 'Heroicons', license: 'MIT', url: 'https://heroicons.com' },
  { id: 'ri', label: 'Remix', license: 'Apache 2.0', url: 'https://remixicon.com' },
  { id: 'ph', label: 'Phosphor', license: 'MIT', url: 'https://phosphoricons.com' },
  { id: 'simple-icons', label: 'Brand logos', license: 'CC0 (Simple Icons). Logos are trademarks of their owners', url: 'https://simpleicons.org' },
];

const cache = new Map();
const PH_WEIGHTS = /-(thin|light|bold|fill|duotone)$/;

/** [{ name, body, w, h }] for a set, fetched once */
export function loadIconSet(prefix) {
  if (!cache.has(prefix)) {
    cache.set(prefix, fetch(`https://cdn.jsdelivr.net/npm/@iconify-json/${prefix}/icons.json`)
      .then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(j => {
        const w0 = j.width || 24, h0 = j.height || w0;
        return Object.entries(j.icons || {})
          .filter(([name]) => prefix !== 'ph' || !PH_WEIGHTS.test(name))
          .map(([name, ic]) => ({ name, body: ic.body, w: ic.width || w0, h: ic.height || h0 }));
      })
      .catch(err => { cache.delete(prefix); throw err; }));
  }
  return cache.get(prefix);
}
