import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React from 'react';
import InternalIcon from '../icon/internal';
import { fireNonCancelableEvent } from '../internal/events';
import { getBaseProps } from '../internal/base-component';
import useFocusVisible from '../internal/hooks/focus-visible';
import styles from './styles.css.js';
import { getPaginationState, range } from './utils';
var defaultAriaLabels = {
    nextPageLabel: '',
    paginationLabel: '',
    previousPageLabel: '',
    pageLabel: function (pageNumber) { return "".concat(pageNumber); }
};
function PageButton(_a) {
    var className = _a.className, ariaLabel = _a.ariaLabel, disabled = _a.disabled, pageIndex = _a.pageIndex, _b = _a.isCurrent, isCurrent = _b === void 0 ? false : _b, children = _a.children, onClick = _a.onClick;
    var focusVisible = useFocusVisible();
    function handleClick(event) {
        event.preventDefault();
        onClick(pageIndex);
    }
    return (React.createElement("li", { className: styles['page-item'] },
        React.createElement("button", __assign({}, focusVisible, { className: clsx(className, styles.button, disabled && styles['button-disabled'], isCurrent && styles['button-current']), type: "button", "aria-label": ariaLabel, disabled: disabled, onClick: handleClick, "aria-current": isCurrent }), children)));
}
function PageNumber(_a) {
    var pageIndex = _a.pageIndex, rest = __rest(_a, ["pageIndex"]);
    return (React.createElement(PageButton, __assign({ className: styles['page-number'], pageIndex: pageIndex }, rest), pageIndex));
}
export default function InternalPagination(_a) {
    var _b, _c, _d;
    var openEnd = _a.openEnd, currentPageIndex = _a.currentPageIndex, ariaLabels = _a.ariaLabels, pagesCount = _a.pagesCount, disabled = _a.disabled, onChange = _a.onChange, onNextPageClick = _a.onNextPageClick, onPreviousPageClick = _a.onPreviousPageClick, _e = _a.__internalRootRef, __internalRootRef = _e === void 0 ? null : _e, rest = __rest(_a, ["openEnd", "currentPageIndex", "ariaLabels", "pagesCount", "disabled", "onChange", "onNextPageClick", "onPreviousPageClick", "__internalRootRef"]);
    var baseProps = getBaseProps(rest);
    var pageNumberLabelFn = (_b = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.pageLabel) !== null && _b !== void 0 ? _b : defaultAriaLabels.pageLabel;
    var _f = getPaginationState(currentPageIndex, pagesCount, openEnd), leftDots = _f.leftDots, leftIndex = _f.leftIndex, rightIndex = _f.rightIndex, rightDots = _f.rightDots;
    function handlePrevPageClick(requestedPageIndex) {
        handlePageClick(requestedPageIndex);
        fireNonCancelableEvent(onPreviousPageClick, {
            requestedPageAvailable: true,
            requestedPageIndex: requestedPageIndex
        });
    }
    function handleNextPageClick(requestedPageIndex) {
        handlePageClick(requestedPageIndex);
        fireNonCancelableEvent(onNextPageClick, {
            requestedPageAvailable: currentPageIndex < pagesCount,
            requestedPageIndex: requestedPageIndex
        });
    }
    function handlePageClick(requestedPageIndex) {
        fireNonCancelableEvent(onChange, { currentPageIndex: requestedPageIndex });
    }
    return (React.createElement("ul", __assign({ "aria-label": ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.paginationLabel }, baseProps, { className: clsx(baseProps.className, styles.root, disabled && styles['root-disabled']), ref: __internalRootRef }),
        React.createElement(PageButton, { className: styles.arrow, pageIndex: currentPageIndex - 1, ariaLabel: (_c = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.previousPageLabel) !== null && _c !== void 0 ? _c : defaultAriaLabels.nextPageLabel, disabled: disabled || currentPageIndex === 1, onClick: handlePrevPageClick },
            React.createElement(InternalIcon, { name: "angle-left", variant: disabled ? 'disabled' : 'normal' })),
        React.createElement(PageNumber, { pageIndex: 1, isCurrent: currentPageIndex === 1, disabled: disabled, ariaLabel: pageNumberLabelFn(1), onClick: handlePageClick }),
        leftDots && React.createElement("li", { className: styles.dots }, "..."),
        range(leftIndex, rightIndex).map(function (pageIndex) { return (React.createElement(PageNumber, { key: pageIndex, isCurrent: currentPageIndex === pageIndex, pageIndex: pageIndex, disabled: disabled, ariaLabel: pageNumberLabelFn(pageIndex), onClick: handlePageClick })); }),
        rightDots && React.createElement("li", { className: styles.dots }, "..."),
        !openEnd && pagesCount > 1 && (React.createElement(PageNumber, { isCurrent: currentPageIndex === pagesCount, pageIndex: pagesCount, disabled: disabled, ariaLabel: pageNumberLabelFn(pagesCount), onClick: handlePageClick })),
        React.createElement(PageButton, { className: styles.arrow, pageIndex: currentPageIndex + 1, ariaLabel: (_d = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.nextPageLabel) !== null && _d !== void 0 ? _d : defaultAriaLabels.nextPageLabel, disabled: disabled || (!openEnd && (pagesCount === 0 || currentPageIndex === pagesCount)), onClick: handleNextPageClick },
            React.createElement(InternalIcon, { name: "angle-right", variant: disabled ? 'disabled' : 'normal' }))));
}
//# sourceMappingURL=internal.js.map