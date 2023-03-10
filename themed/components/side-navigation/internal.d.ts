import React from 'react';
import { SideNavigationProps } from './interfaces';
interface BaseItemComponentProps {
    activeHref?: string;
    fireChange: (item: SideNavigationProps.Section | SideNavigationProps.ExpandableLinkGroup, expanded: boolean) => void;
    fireFollow: (item: SideNavigationProps.Link | SideNavigationProps.Header | SideNavigationProps.LinkGroup | SideNavigationProps.ExpandableLinkGroup, event: React.SyntheticEvent | Event) => void;
}
export interface HeaderProps extends BaseItemComponentProps {
    definition: SideNavigationProps.Header;
}
export declare function Header({ definition, activeHref, fireFollow }: HeaderProps): JSX.Element;
export interface ItemListProps extends BaseItemComponentProps {
    items: ReadonlyArray<SideNavigationProps.Item>;
    variant: 'section' | 'section-group' | 'link-group' | 'expandable-link-group' | 'root';
}
export declare function ItemList({ variant, items, activeHref, fireChange, fireFollow }: ItemListProps): JSX.Element;
export {};
//# sourceMappingURL=internal.d.ts.map