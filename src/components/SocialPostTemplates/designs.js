/* Social post "My designs" and autosave, in IndexedDB database `wdp-spt-designs`
   (see src/lib/design-store.js for the record shapes). */
import { makeDesignStore, thumbFrom } from '@/lib/design-store';

const store = makeDesignStore('wdp-spt-designs');

export const { onDesignsChange, getAutosave, putAutosave, listDesigns, getDesign, saveDesign, deleteDesign, duplicateDesign } = store;
export { thumbFrom };
