import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { StickyHeaderContext } from '../container/use-sticky-header';
import Thead from './thead';
import { useStickyHeader } from './use-sticky-header';
import styles from './styles.css.js';
export default forwardRef(StickyHeader);
function StickyHeader(_a, ref) {
    var _b;
    var variant = _a.variant, theadProps = _a.theadProps, wrapperRef = _a.wrapperRef, theadRef = _a.theadRef, secondaryWrapperRef = _a.secondaryWrapperRef, onScroll = _a.onScroll, tableRef = _a.tableRef, tableHasHeader = _a.tableHasHeader;
    var secondaryTheadRef = useRef(null);
    var secondaryTableRef = useRef(null);
    var isStuck = useContext(StickyHeaderContext).isStuck;
    var _c = useState(null), focusedColumn = _c[0], setFocusedColumn = _c[1];
    var _d = useStickyHeader(tableRef, theadRef, secondaryTheadRef, secondaryTableRef, wrapperRef), scrollToRow = _d.scrollToRow, scrollToTop = _d.scrollToTop;
    useImperativeHandle(ref, function () { return ({ scrollToTop: scrollToTop, scrollToRow: scrollToRow, setFocusedColumn: setFocusedColumn }); });
    return (React.createElement("div", { className: clsx(styles['header-secondary'], styles["variant-".concat(variant)], (_b = {},
            _b[styles.stuck] = isStuck,
            _b[styles['table-has-header']] = tableHasHeader,
            _b)), "aria-hidden": true, 
        // Prevents receiving focus in Firefox. Focus on the overflowing table is sufficient
        // to scroll the table horizontally
        tabIndex: -1, ref: secondaryWrapperRef, onScroll: onScroll },
        React.createElement("table", { className: clsx(styles.table, styles['table-layout-fixed']), role: "table", ref: secondaryTableRef },
            React.createElement(Thead, __assign({ ref: secondaryTheadRef, sticky: true, stuck: isStuck, showFocusRing: focusedColumn }, theadProps)))));
}
//# sourceMappingURL=sticky-header.js.map