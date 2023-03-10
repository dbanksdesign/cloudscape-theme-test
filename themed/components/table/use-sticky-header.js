// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useLayoutEffect, useCallback } from 'react';
import { useResizeObserver } from '../internal/hooks/container-queries/use-resize-observer';
import stickyScrolling, { calculateScrollingOffset, scrollUpBy } from './sticky-scrolling';
import { useMobile } from '../internal/hooks/use-mobile';
function syncSizes(from, to) {
    var fromCells = Array.prototype.slice.apply(from.children);
    var toCells = Array.prototype.slice.apply(to.children);
    for (var i = 0; i < fromCells.length; i++) {
        var width = fromCells[i].style.width;
        // use auto if it is set by resizable columns or real size otherwise
        if (width !== 'auto') {
            width = "".concat(fromCells[i].offsetWidth, "px");
        }
        toCells[i].style.width = width;
    }
}
export var useStickyHeader = function (tableRef, theadRef, secondaryTheadRef, secondaryTableRef, tableWrapperRef) {
    var isMobile = useMobile();
    // Sync the sizes of the column header copies in the sticky header with the originals
    var syncColumnHeaderWidths = useCallback(function () {
        if (tableRef.current &&
            theadRef.current &&
            secondaryTheadRef.current &&
            secondaryTableRef.current &&
            tableWrapperRef.current) {
            syncSizes(theadRef.current, secondaryTheadRef.current);
            // Using the tableRef offsetWidth instead of the theadRef because in VR
            // the tableRef adds extra padding to the table and by default the theadRef will have a width
            // without the padding and will make the sticky header width incorrect.
            secondaryTableRef.current.style.width = "".concat(tableRef.current.offsetWidth, "px");
            tableWrapperRef.current.style.marginTop = "-".concat(theadRef.current.offsetHeight, "px");
        }
    }, [theadRef, secondaryTheadRef, secondaryTableRef, tableWrapperRef, tableRef]);
    useLayoutEffect(function () {
        syncColumnHeaderWidths();
    });
    useResizeObserver(theadRef, syncColumnHeaderWidths);
    var scrollToTop = function () {
        if (!isMobile && theadRef.current && secondaryTheadRef.current && tableWrapperRef.current) {
            var scrollDist = calculateScrollingOffset(theadRef.current, secondaryTheadRef.current);
            if (scrollDist > 0) {
                scrollUpBy(scrollDist, tableWrapperRef.current);
            }
        }
    };
    var scrollToItem = stickyScrolling(tableWrapperRef, secondaryTheadRef).scrollToItem;
    var scrollToRow = function (itemNode) {
        if (!isMobile) {
            scrollToItem(itemNode);
        }
    };
    return { scrollToRow: scrollToRow, scrollToTop: scrollToTop };
};
//# sourceMappingURL=use-sticky-header.js.map