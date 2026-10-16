/* Export helpers shared by the editor, batch export and code panel */
import { SIZES, plainText } from './engine';

export const FORMATS = [
  { id: 'png',  label: 'PNG',  mime: 'image/png' },
  { id: 'jpeg', label: 'JPEG', mime: 'image/jpeg' },
  { id: 'webp', label: 'WebP', mime: 'image/webp' },
];
export const formatOf = id => FORMATS.find(f => f.id === id) || FORMATS[0];
export const sizeOf = id => SIZES.find(z => z.id === id) || SIZES[0];
export const slugify = t => plainText(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
export function canvasToBlob(canvas, format, quality) {
  const f = formatOf(format);
  return new Promise((resolve, reject) => canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Export failed'))), f.mime, f.id === 'png' ? undefined : quality));
}
