import React from 'react';
import { TableProps } from './interfaces';
import { TheadProps } from './thead';
export interface StickyHeaderRef {
    scrollToTop(): void;
    scrollToRow(node: null | HTMLElement): void;
    setFocusedColumn(columnIndex: null | number): void;
}
interface StickyHeaderProps {
    variant: TableProps.Variant;
    theadProps: TheadProps;
    wrapperRef: React.RefObject<HTMLDivElement>;
    theadRef: React.RefObject<HTMLTableRowElement>;
    secondaryWrapperRef: React.RefObject<HTMLDivElement>;
    tableRef: React.RefObject<HTMLTableElement>;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
    tableHasHeader?: boolean;
}
declare const _default: React.ForwardRefExoticComponent<StickyHeaderProps & React.RefAttributes<StickyHeaderRef>>;
export default _default;
//# sourceMappingURL=sticky-header.d.ts.map