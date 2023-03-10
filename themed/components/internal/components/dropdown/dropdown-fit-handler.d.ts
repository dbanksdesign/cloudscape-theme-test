import { Dimensions } from '../../utils/scrollable-containers';
interface AvailableSpace {
    above: number;
    below: number;
    left: number;
    right: number;
}
export interface DropdownPosition {
    height: string;
    width: string;
    dropUp: boolean;
    dropLeft: boolean;
    left: string;
}
export interface InteriorDropdownPosition extends DropdownPosition {
    bottom: string;
    top: string;
}
export declare const getAvailableSpace: (trigger: HTMLElement, dropdown: HTMLElement, overflowParents: ReadonlyArray<Dimensions>, stretchWidth?: boolean, stretchHeight?: boolean, isMobile?: boolean) => AvailableSpace;
export declare const getInteriorAvailableSpace: (trigger: HTMLElement, dropdown: HTMLElement, overflowParents: ReadonlyArray<Dimensions>, isMobile?: boolean) => AvailableSpace;
export declare const getDropdownPosition: (trigger: HTMLElement, dropdown: HTMLElement, overflowParents: ReadonlyArray<Dimensions>, minWidth?: number, preferCenter?: boolean, stretchWidth?: boolean, stretchHeight?: boolean, isMobile?: boolean) => DropdownPosition;
export declare const getInteriorDropdownPosition: (trigger: HTMLElement, dropdown: HTMLElement, overflowParents: ReadonlyArray<Dimensions>, isMobile?: boolean) => InteriorDropdownPosition;
export declare const calculatePosition: (dropdownElement: HTMLDivElement, triggerElement: HTMLDivElement, verticalContainerElement: HTMLDivElement, interior: boolean, expandToViewport: boolean, preferCenter: boolean, stretchWidth: boolean, stretchHeight: boolean, isMobile: boolean, minWidth?: number) => [DropdownPosition, DOMRect];
export {};
//# sourceMappingURL=dropdown-fit-handler.d.ts.map