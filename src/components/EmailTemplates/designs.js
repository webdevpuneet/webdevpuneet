/* Email "My designs" and autosave, in IndexedDB database `wdp-email-designs`
   (see src/lib/design-store.js for the record shapes). */
import { makeDesignStore } from '@/lib/design-store';

export const emailDesignStore = makeDesignStore('wdp-email-designs');
