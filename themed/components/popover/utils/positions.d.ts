import { PopoverProps, InternalPosition, BoundingOffset, BoundingBox } from '../interfaces';
export interface CalculatePosition {
    scrollable?: boolean;
    internalPosition: InternalPosition;
    boundingOffset: BoundingOffset;
}
export declare const PRIORITY_MAPPING: Record<PopoverProps.Position, InternalPosition[]>;
/**
 * Returns the area of the intersection of passed in rectangles or a null, if there is no intersection
 */
export declare function intersectRectangles(rectangles: BoundingOffset[]): number | null;
/**
 * A functions that returns the correct popover position based on screen dimensions.
 */
export declare function calculatePosition(preferred: PopoverProps.Position, trigger: BoundingOffset, arrow: BoundingBox, body: BoundingBox, container: BoundingOffset, viewport: BoundingOffset, renderWithPortal?: boolean): CalculatePosition;
//# sourceMappingURL=positions.d.ts.map