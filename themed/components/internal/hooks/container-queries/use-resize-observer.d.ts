import React from 'react';
import { ContainerQueryEntry } from './interfaces';
type ElementReference = (() => Element | null) | React.RefObject<Element>;
/**
 * Attaches resize-observer to the referenced element.
 *
 * Examples:
 *     // With React reference
 *     const ref = useRef(null)
 *     useResizeObserver(ref, (entry) => setState(getWidth(entry)))
 *
 *     // With ID reference
 *     const getElement = useCallback(() => document.getElementById(id), [id])
 *     useResizeObserver(getElement, (entry) => setState(getWidth(entry)))
 *
 * @param elementRef React reference or memoized getter for the target element
 * @param onObserve Function to fire when observation occurs
 */
export declare function useResizeObserver(elementRef: ElementReference, onObserve: (entry: ContainerQueryEntry) => void): void;
export {};
//# sourceMappingURL=use-resize-observer.d.ts.map