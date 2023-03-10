import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React from 'react';
import InternalIcon from '../../icon/internal';
import useFocusVisible from '../../internal/hooks/focus-visible';
import { KeyCode } from '../../internal/keycode';
import { getAriaSort, getSortingIconName, getSortingStatus, isSorted } from './utils';
import styles from './styles.css.js';
import { Resizer } from '../resizer';
import { useUniqueId } from '../../internal/hooks/use-unique-id';
export function TableHeaderCell(_a) {
    var _b, _c, _d;
    var _e;
    var className = _a.className, style = _a.style, tabIndex = _a.tabIndex, column = _a.column, activeSortingColumn = _a.activeSortingColumn, sortingDescending = _a.sortingDescending, sortingDisabled = _a.sortingDisabled, wrapLines = _a.wrapLines, showFocusRing = _a.showFocusRing, hidden = _a.hidden, onClick = _a.onClick, colIndex = _a.colIndex, onFocus = _a.onFocus, onBlur = _a.onBlur, updateColumn = _a.updateColumn, resizableColumns = _a.resizableColumns, onResizeFinish = _a.onResizeFinish, isEditable = _a.isEditable;
    var focusVisible = useFocusVisible();
    var sortable = !!column.sortingComparator || !!column.sortingField;
    var sorted = !!activeSortingColumn && isSorted(column, activeSortingColumn);
    var sortingStatus = getSortingStatus(sortable, sorted, !!sortingDescending, !!sortingDisabled);
    var handleClick = function () {
        return onClick({
            sortingColumn: column,
            isDescending: sorted ? !sortingDescending : false
        });
    };
    // Elements with role="button" do not have the default behavior of <button>, where pressing
    // Enter or Space will trigger a click event. Therefore we need to add this ourselves.
    // The native <button> element cannot be used due to a misaligned implementation in Firefox:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=843003
    var handleKeyPress = function (_a) {
        var e = _a.nativeEvent;
        if (e.keyCode === KeyCode.enter || e.keyCode === KeyCode.space) {
            e.preventDefault();
            handleClick();
        }
    };
    var headerId = useUniqueId('table-header-');
    return (React.createElement("th", { className: clsx(className, (_b = {},
            _b[styles['header-cell-resizable']] = !!resizableColumns,
            _b[styles['header-cell-sortable']] = sortingStatus,
            _b[styles['header-cell-sorted']] = sortingStatus === 'ascending' || sortingStatus === 'descending',
            _b[styles['header-cell-disabled']] = sortingDisabled,
            _b[styles['header-cell-ascending']] = sortingStatus === 'ascending',
            _b[styles['header-cell-descending']] = sortingStatus === 'descending',
            _b[styles['header-cell-hidden']] = hidden,
            _b)), "aria-sort": sortingStatus && getAriaSort(sortingStatus), style: style, scope: "col" },
        React.createElement("div", __assign({ className: clsx(styles['header-cell-content'], (_c = {},
                _c[styles['header-cell-fake-focus']] = showFocusRing && focusVisible['data-awsui-focus-visible'],
                _c)), "aria-label": column.ariaLabel
                ? column.ariaLabel({
                    sorted: sorted,
                    descending: sorted && !!sortingDescending,
                    disabled: !!sortingDisabled
                })
                : undefined }, (sortingDisabled || !sortingStatus
            ? (_d = {}, _d['aria-disabled'] = 'true', _d) : __assign(__assign({ onKeyPress: handleKeyPress, tabIndex: tabIndex, role: 'button' }, focusVisible), { onClick: handleClick, onFocus: onFocus, onBlur: onBlur }))),
            React.createElement("div", { className: clsx(styles['header-cell-text'], wrapLines && styles['header-cell-text-wrap']), id: headerId },
                column.header,
                isEditable ? (React.createElement("span", { className: styles['edit-icon'], role: "img", "aria-label": (_e = column.editConfig) === null || _e === void 0 ? void 0 : _e.editIconAriaLabel },
                    React.createElement(InternalIcon, { name: "edit" }))) : null),
            sortingStatus && (React.createElement("span", { className: styles['sorting-icon'] },
                React.createElement(InternalIcon, { name: getSortingIconName(sortingStatus) })))),
        resizableColumns && (React.createElement(React.Fragment, null,
            React.createElement(Resizer, { onDragMove: function (newWidth) { return updateColumn(colIndex, newWidth); }, onFinish: onResizeFinish, ariaLabelledby: headerId, minWidth: typeof column.minWidth === 'string' ? parseInt(column.minWidth) : column.minWidth })))));
}
//# sourceMappingURL=index.js.map