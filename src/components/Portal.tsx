import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

/**
 * Modals render into <body> rather than in place.
 *
 * `.page-content` and the footer each establish a stacking context at z-index 1,
 * so a `fixed` overlay declared inside one of them can never paint above the
 * other no matter how high its own z-index goes. Escaping to <body> removes the
 * constraint entirely instead of trading one magic number for another.
 */
export default function Portal({ children }: { children: ReactNode }) {
  return createPortal(children, document.body);
}
