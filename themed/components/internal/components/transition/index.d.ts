import React from 'react';
import { MutableRefObject } from 'react';
import { TransitionStatus as ReactTransitionGroupTransitionStatus } from 'react-transition-group';
export type TransitionStatus = ReactTransitionGroupTransitionStatus | 'enter' | 'exit';
export interface TransitionProps {
    in: boolean;
    exit?: boolean;
    disabled?: boolean;
    children: (state: TransitionStatus, transitioningElementRef: MutableRefObject<any>) => React.ReactNode;
    onStatusChange?: (status: TransitionStatus) => void;
    transitionChangeDelay?: {
        entering?: number;
    };
}
/**
 * This component is a wrapper around the CSSTransition component.
 *
 * It provides a second parameter in its rendering function that must be
 * attached to the node that is transitioning.
 */
export declare function Transition({ in: isIn, children, exit, onStatusChange, disabled, transitionChangeDelay, ...rest }: TransitionProps): JSX.Element;
//# sourceMappingURL=index.d.ts.map