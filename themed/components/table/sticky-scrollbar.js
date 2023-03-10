// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef } from 'react';
import { useAppLayoutContext } from '../internal/context/app-layout-context';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useStickyScrollbar } from './use-sticky-scrollbar';
import styles from './styles.css.js';
export default forwardRef(StickyScrollbar);
function StickyScrollbar(_a, ref) {
    var wrapperRef = _a.wrapperRef, tableRef = _a.tableRef, onScroll = _a.onScroll;
    var scrollbarRef = React.useRef(null);
    var scrollbarContentRef = React.useRef(null);
    var mergedRef = useMergeRefs(ref, scrollbarRef);
    /**
     * Use the appropriate AppLayout context (Classic or Visual Refresh) to determine
     * the offsetBottom value to be used in the useStickyScrollbar hook.
     */
    var stickyOffsetBottom = useAppLayoutContext().stickyOffsetBottom;
    useStickyScrollbar(scrollbarRef, scrollbarContentRef, tableRef, wrapperRef, stickyOffsetBottom);
    return (React.createElement("div", { ref: mergedRef, className: styles['sticky-scrollbar'], onScroll: onScroll },
        React.createElement("div", { ref: scrollbarContentRef, className: styles['sticky-scrollbar-content'] })));
}
//# sourceMappingURL=sticky-scrollbar.js.map