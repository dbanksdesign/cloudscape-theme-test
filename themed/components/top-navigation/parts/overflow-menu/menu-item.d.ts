import React from 'react';
import { ButtonDropdownProps } from '../../../button-dropdown/interfaces';
import { TopNavigationProps } from '../../interfaces';
type UtilityMenuItemProps = TopNavigationProps.Utility & {
    index: number;
};
export declare const UtilityMenuItem: React.ForwardRefExoticComponent<UtilityMenuItemProps & React.RefAttributes<HTMLAnchorElement & HTMLButtonElement>>;
type SubmenuItemProps = ButtonDropdownProps.ItemOrGroup & {
    onItemClick: (item: ButtonDropdownProps.Item) => void;
};
export declare const SubmenuItem: (props: SubmenuItemProps) => JSX.Element;
export {};
//# sourceMappingURL=menu-item.d.ts.map