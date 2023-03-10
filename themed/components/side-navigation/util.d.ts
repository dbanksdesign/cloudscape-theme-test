import { SideNavigationProps } from './interfaces';
type ExpandableItem = SideNavigationProps.Section | SideNavigationProps.ExpandableLinkGroup;
export declare function hasActiveLink(items: ReadonlyArray<SideNavigationProps.Item>, activeHref: string): boolean;
export declare function generateExpandableItemsMapping(items: ReadonlyArray<SideNavigationProps.Item>, mapping?: WeakMap<SideNavigationProps.Item, ReadonlyArray<ExpandableItem>>, expandableParents?: ReadonlyArray<ExpandableItem>): WeakMap<SideNavigationProps.Item, ReadonlyArray<ExpandableItem>>;
export declare function checkDuplicateHrefs(items: ReadonlyArray<SideNavigationProps.Item>): void;
export {};
//# sourceMappingURL=util.d.ts.map