import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React from 'react';
import SelectionControl from './selection-control';
import { focusMarkers } from './use-selection';
import { fireNonCancelableEvent } from '../internal/events';
import { getColumnKey } from './utils';
import { TableHeaderCell } from './header-cell';
import { useColumnWidths } from './use-column-widths';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import styles from './styles.css.js';
import headerCellStyles from './header-cell/styles.css.js';
import ScreenreaderOnly from '../internal/components/screenreader-only';
var Thead = React.forwardRef(function (_a, outerRef) {
    var containerWidth = _a.containerWidth, selectionType = _a.selectionType, selectAllProps = _a.selectAllProps, columnDefinitions = _a.columnDefinitions, sortingColumn = _a.sortingColumn, sortingDisabled = _a.sortingDisabled, sortingDescending = _a.sortingDescending, resizableColumns = _a.resizableColumns, variant = _a.variant, wrapLines = _a.wrapLines, onFocusMove = _a.onFocusMove, onCellFocus = _a.onCellFocus, onCellBlur = _a.onCellBlur, onSortingChange = _a.onSortingChange, onResizeFinish = _a.onResizeFinish, singleSelectionHeaderAriaLabel = _a.singleSelectionHeaderAriaLabel, stripedRows = _a.stripedRows, _b = _a.showFocusRing, showFocusRing = _b === void 0 ? null : _b, _c = _a.sticky, sticky = _c === void 0 ? false : _c, _d = _a.hidden, hidden = _d === void 0 ? false : _d, _e = _a.stuck, stuck = _e === void 0 ? false : _e;
    var isVisualRefresh = useVisualRefresh();
    var headerCellClass = clsx(headerCellStyles['header-cell'], headerCellStyles["header-cell-variant-".concat(variant)], sticky && headerCellStyles['header-cell-sticky'], stuck && headerCellStyles['header-cell-stuck'], stripedRows && headerCellStyles['has-striped-rows'], isVisualRefresh && headerCellStyles['is-visual-refresh']);
    var selectionCellClass = clsx(styles['selection-control'], styles['selection-control-header'], isVisualRefresh && styles['is-visual-refresh']);
    var _f = useColumnWidths(), columnWidths = _f.columnWidths, totalWidth = _f.totalWidth, updateColumn = _f.updateColumn;
    return (React.createElement("thead", { className: clsx(!hidden && styles['thead-active']) },
        React.createElement("tr", __assign({}, focusMarkers.all, { ref: outerRef, "aria-rowindex": 1 }),
            selectionType === 'multi' && (React.createElement("th", { className: clsx(headerCellClass, selectionCellClass, hidden && headerCellStyles['header-cell-hidden']), scope: "col" },
                React.createElement(SelectionControl, __assign({ onFocusDown: function (event) { return onFocusMove(event.target, -1, +1); } }, selectAllProps, (hidden ? { tabIndex: -1 } : {}))))),
            selectionType === 'single' && (React.createElement("th", { className: clsx(headerCellClass, selectionCellClass, hidden && headerCellStyles['header-cell-hidden']), scope: "col" },
                React.createElement(ScreenreaderOnly, null, singleSelectionHeaderAriaLabel))),
            columnDefinitions.map(function (column, colIndex) {
                var widthOverride;
                if (resizableColumns) {
                    if (columnWidths) {
                        // use stateful value if available
                        widthOverride = columnWidths[getColumnKey(column, colIndex)];
                    }
                    if (colIndex === columnDefinitions.length - 1 && containerWidth && containerWidth > totalWidth) {
                        // let the last column grow and fill the container width
                        widthOverride = 'auto';
                    }
                }
                return (React.createElement(TableHeaderCell, { key: getColumnKey(column, colIndex), className: headerCellClass, style: {
                        width: widthOverride || column.width,
                        minWidth: sticky ? undefined : column.minWidth,
                        maxWidth: resizableColumns || sticky ? undefined : column.maxWidth
                    }, tabIndex: sticky ? -1 : 0, showFocusRing: colIndex === showFocusRing, column: column, activeSortingColumn: sortingColumn, sortingDescending: sortingDescending, sortingDisabled: sortingDisabled, wrapLines: wrapLines, hidden: hidden, colIndex: colIndex, updateColumn: updateColumn, onResizeFinish: function () { return onResizeFinish(columnWidths); }, resizableColumns: resizableColumns, onClick: function (detail) { return fireNonCancelableEvent(onSortingChange, detail); }, onFocus: function () { return onCellFocus === null || onCellFocus === void 0 ? void 0 : onCellFocus(colIndex); }, onBlur: onCellBlur, isEditable: !!column.editConfig }));
            }))));
});
export default Thead;
//# sourceMappingURL=thead.js.map