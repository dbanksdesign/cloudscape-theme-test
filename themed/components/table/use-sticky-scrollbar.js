// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ResizeObserver } from '@juggle/resize-observer';
import { useEffect, useState } from 'react';
import styles from './styles.css.js';
import { getOverflowParentDimensions, getOverflowParents } from '../internal/utils/scrollable-containers';
import { browserScrollbarSize } from '../internal/utils/browser-scrollbar-size';
import { supportsStickyPosition, getContainingBlock } from '../internal/utils/dom';
var updatePosition = function (tableEl, wrapperEl, scrollbarEl, scrollbarContentEl, hasContainingBlock, consideredFooterHeight) {
    if (!tableEl || !scrollbarEl || !wrapperEl) {
        return;
    }
    // parent is either some container or document itself
    var parent = getOverflowParentDimensions(wrapperEl)[0];
    var parentBottom = parent.top + parent.height;
    // table bottom is visible when
    // 1. table bottom reached end of the window
    // 2. table bottom is not overlapped by footer
    var _a = tableEl.getBoundingClientRect(), tableTop = _a.top, tableBottom = _a.bottom, tableWidth = _a.width;
    var wrapperWidth = wrapperEl.getBoundingClientRect().width;
    //scrollbar correction is needed for
    // #1 when scrollbars are constantly visible,
    // we want no visible break when switching between fake and real scrollbars
    // #2 when scrollbars are visible only on scrolling and half transparent (on mac)
    // we want to avoid any overlap between fake and real scrollbar
    // using 15 px as a height of transparent scrollbar on mac
    var scrollbarHeight = browserScrollbarSize().height;
    var scrollBarCorrection = scrollbarHeight > 0 ? scrollbarHeight : -15 / 2;
    var tableBottomIsVisible = parentBottom - consideredFooterHeight >= tableBottom + scrollBarCorrection;
    var tableTopIsHidden = tableTop >= parentBottom - consideredFooterHeight - scrollBarCorrection;
    var areaIsScrollable = tableWidth > wrapperWidth;
    if (tableBottomIsVisible || tableTopIsHidden || !areaIsScrollable) {
        scrollbarEl.classList.remove(styles['sticky-scrollbar-visible']);
    }
    else {
        // when scrollbar is not displayed scrollLeft property cannot be set by useScrollSync
        // that's why syncing it separately
        if (!scrollbarEl.classList.contains(styles['sticky-scrollbar-visible'])) {
            requestAnimationFrame(function () {
                scrollbarEl.scrollLeft = wrapperEl.scrollLeft;
            });
        }
        scrollbarEl.classList.add(styles['sticky-scrollbar-visible']);
    }
    if (scrollbarHeight && scrollbarEl && scrollbarContentEl) {
        scrollbarEl.style.height = "".concat(scrollbarHeight, "px");
        scrollbarContentEl.style.height = "".concat(scrollbarHeight, "px");
    }
    if (tableEl && wrapperEl && scrollbarContentEl && scrollbarEl) {
        var parent_1 = getOverflowParentDimensions(wrapperEl)[0];
        var wrapperElRect = wrapperEl.getBoundingClientRect();
        var tableElRect = tableEl.getBoundingClientRect();
        scrollbarEl.style.width = "".concat(wrapperElRect.width, "px");
        scrollbarContentEl.style.width = "".concat(tableElRect.width, "px");
        // when using sticky scrollbars in containers
        // we agreed to ignore dynamic bottom calculations for footer overlap
        scrollbarEl.style.left = hasContainingBlock ? '0px' : "".concat(wrapperElRect.left, "px");
        scrollbarEl.style.top = hasContainingBlock
            ? '0px'
            : "".concat(Math.min(parent_1.top + parent_1.height, window.innerHeight - consideredFooterHeight), "px");
    }
};
export function useStickyScrollbar(scrollbarRef, scrollbarContentRef, tableRef, wrapperRef, footerHeight) {
    // We don't take into account containing-block calculations because that would
    // unnecessarily overcomplicate the position logic. For now, we assume that a
    // containing block, if present, is below the app layout and above the overflow
    // parent, which is a pretty safe assumption.
    var _a = useState(false), hasContainingBlock = _a[0], setHasContainingBlock = _a[1];
    // We don't take into account footer height when the overflow parent is child of document body.
    // Because in this case, we think the footer is outside the overflow parent.
    var _b = useState(false), hasOverflowParent = _b[0], setHasOverflowParent = _b[1];
    var consideredFooterHeight = hasContainingBlock || hasOverflowParent ? 0 : footerHeight;
    useEffect(function () {
        if (supportsStickyPosition()) {
            var scrollHandler_1 = function () {
                updatePosition(tableRef.current, wrapperRef.current, scrollbarRef.current, scrollbarContentRef.current, hasContainingBlock, consideredFooterHeight);
            };
            scrollHandler_1();
            window.addEventListener('scroll', scrollHandler_1, true);
            return function () {
                window.removeEventListener('scroll', scrollHandler_1, true);
            };
        }
    }, [scrollbarRef, tableRef, wrapperRef, consideredFooterHeight, scrollbarContentRef, hasContainingBlock]);
    var wrapperEl = wrapperRef.current;
    useEffect(function () {
        if (wrapperEl && supportsStickyPosition()) {
            setHasContainingBlock(!!getContainingBlock(wrapperEl));
            setHasOverflowParent(!!getOverflowParents(wrapperEl)[0]);
        }
    }, [wrapperEl]);
    useEffect(function () {
        if (supportsStickyPosition() && tableRef.current) {
            var observer_1 = new ResizeObserver(function (entries) {
                if (scrollbarContentRef.current) {
                    scrollbarContentRef.current.style.width = "".concat(entries[0].borderBoxSize[0].inlineSize, "px");
                    updatePosition(tableRef.current, wrapperRef.current, scrollbarRef.current, scrollbarContentRef.current, hasContainingBlock, consideredFooterHeight);
                }
            });
            observer_1.observe(tableRef.current);
            return function () {
                observer_1.disconnect();
            };
        }
    }, [scrollbarContentRef, scrollbarRef, tableRef, wrapperRef, consideredFooterHeight, hasContainingBlock]);
    useEffect(function () {
        if (supportsStickyPosition()) {
            var resizeHandler_1 = function () {
                updatePosition(tableRef.current, wrapperRef.current, scrollbarRef.current, scrollbarContentRef.current, hasContainingBlock, consideredFooterHeight);
            };
            window.addEventListener('resize', resizeHandler_1);
            return function () {
                window.removeEventListener('resize', resizeHandler_1);
            };
        }
    }, [tableRef, wrapperRef, scrollbarRef, scrollbarContentRef, hasContainingBlock, consideredFooterHeight]);
}
//# sourceMappingURL=use-sticky-scrollbar.js.map