import React from 'react';
import { InternalPosition, PopoverProps } from './interfaces';
export interface PopoverContainerProps {
    /** References the element the container is positioned against. */
    trackRef: React.RefObject<Element>;
    /**
      Used to update the container position in case track or track position changes:
      
      const trackRef = useRef<Element>(null)
      return (<>
        <Track style={getPosition(selectedItemId)} ref={trackRef} />
        <PopoverContainer trackRef={trackRef} trackKey={selectedItemId} .../>
      </>)
    */
    trackKey?: string | number;
    position: PopoverProps.Position;
    zIndex?: React.CSSProperties['zIndex'];
    arrow: (position: InternalPosition | null) => React.ReactNode;
    children: React.ReactNode;
    renderWithPortal?: boolean;
    size: PopoverProps.Size;
    fixedWidth: boolean;
    variant?: 'annotation';
}
export default function PopoverContainer({ position, trackRef, trackKey, arrow, children, zIndex, renderWithPortal, size, fixedWidth, variant, }: PopoverContainerProps): JSX.Element;
//# sourceMappingURL=container.d.ts.map