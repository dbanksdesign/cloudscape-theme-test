import React from 'react';
import { BaseComponentProps } from '../../base-component';
import { HighlightType } from '../options-list/utils/use-highlight-option.js';
export type SelectableItemProps = BaseComponentProps & {
    children: React.ReactNode;
    selected?: boolean;
    highlighted?: boolean;
    disabled?: boolean;
    hasBackground?: boolean;
    isParent?: boolean;
    isChild?: boolean;
    virtualPosition?: number;
    padBottom?: boolean;
    isNextSelected?: boolean;
    useInteractiveGroups?: boolean;
    screenReaderContent?: string;
    ariaPosinset?: number;
    ariaSetsize?: number;
    highlightType?: HighlightType;
} & ({
    ariaSelected?: boolean;
    ariaChecked?: never;
} | {
    ariaSelected?: never;
    ariaChecked?: boolean | 'mixed';
});
declare const _default: React.ForwardRefExoticComponent<SelectableItemProps & React.RefAttributes<HTMLDivElement>>;
export default _default;
//# sourceMappingURL=index.d.ts.map