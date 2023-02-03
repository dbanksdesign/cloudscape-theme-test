import React from 'react';
export declare const useVisualContext: (elementRef: React.RefObject<HTMLElement>) => string;
interface VisualContextProps {
    contextName: string;
    className?: string;
    children: React.ReactNode;
}
/**
 * This function returns only the className string needed to apply a
 * visual context to the DOM. It is used by the default export but
 * can also be imported directly for situations where the insertion
 * of a <div> node creates style problems.
 */
export declare function getVisualContextClassname(contextName: string): string;
export default function VisualContext({ contextName, className, children }: VisualContextProps): JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map