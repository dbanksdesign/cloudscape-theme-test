import { TableProps } from '../interfaces';
type SortingStatus = 'sortable' | 'ascending' | 'descending';
export declare const getSortingStatus: (sortable: boolean, sorted: boolean, descending: boolean, disabled: boolean) => SortingStatus | undefined;
export declare const getSortingIconName: (sortingState: SortingStatus) => "caret-down-filled" | "caret-down" | "caret-up-filled";
export declare const getAriaSort: (sortingState: SortingStatus) => "none" | "ascending" | "descending";
export declare const isSorted: <T>(column: TableProps.ColumnDefinition<T>, sortingColumn: TableProps.SortingColumn<T>) => boolean;
export {};
//# sourceMappingURL=utils.d.ts.map