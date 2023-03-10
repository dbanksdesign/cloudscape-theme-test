import React from 'react';
import { TableProps } from './interfaces';
import { SelectionControlProps } from './selection-control';
import { NonCancelableEventHandler } from '../internal/events';
export interface TheadProps {
    containerWidth: number | null;
    selectionType: TableProps.SelectionType | undefined;
    columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<any>>;
    sortingColumn: TableProps.SortingColumn<any> | undefined;
    sortingDescending: boolean | undefined;
    sortingDisabled: boolean | undefined;
    variant: TableProps.Variant;
    wrapLines: boolean | undefined;
    resizableColumns: boolean | undefined;
    selectAllProps: SelectionControlProps;
    onFocusMove: ((sourceElement: HTMLElement, fromIndex: number, direction: -1 | 1) => void) | undefined;
    onCellFocus?: (colIndex: number) => void;
    onCellBlur?: () => void;
    onResizeFinish: (newWidths: Record<string, number>) => void;
    showFocusRing?: number | null;
    onSortingChange: NonCancelableEventHandler<TableProps.SortingState<any>> | undefined;
    sticky?: boolean;
    hidden?: boolean;
    stuck?: boolean;
    singleSelectionHeaderAriaLabel?: string;
    stripedRows?: boolean;
}
declare const Thead: React.ForwardRefExoticComponent<TheadProps & React.RefAttributes<HTMLTableRowElement>>;
export default Thead;
//# sourceMappingURL=thead.d.ts.map