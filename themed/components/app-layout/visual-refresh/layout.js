import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { useAppLayoutInternals } from './context';
import styles from './styles.css.js';
import testutilStyles from '../test-classes/styles.css.js';
import customCssProps from '../../internal/generated/custom-css-properties';
/**
 * The layoutElement ref will be used by the resize observers to calculate the offset from
 * the top and bottom of the viewport based on the header and footer elements. This is to
 * ensure the Layout component minimum height will fill 100% of the viewport less those
 * cumulative heights.
 */
export default function Layout(_a) {
    var _b, _c, _d, _e, _f, _g;
    var children = _a.children;
    var _h = useAppLayoutInternals(), contentHeader = _h.contentHeader, contentType = _h.contentType, disableBodyScroll = _h.disableBodyScroll, disableContentHeaderOverlap = _h.disableContentHeaderOverlap, dynamicOverlapHeight = _h.dynamicOverlapHeight, footerHeight = _h.footerHeight, hasNotificationsContent = _h.hasNotificationsContent, headerHeight = _h.headerHeight, isNavigationOpen = _h.isNavigationOpen, isSplitPanelOpen = _h.isSplitPanelOpen, isToolsOpen = _h.isToolsOpen, layoutElement = _h.layoutElement, layoutWidth = _h.layoutWidth, mainOffsetLeft = _h.mainOffsetLeft, maxContentWidth = _h.maxContentWidth, minContentWidth = _h.minContentWidth, navigationHide = _h.navigationHide, notificationsHeight = _h.notificationsHeight, splitPanelPosition = _h.splitPanelPosition, stickyNotifications = _h.stickyNotifications, splitPanelDisplayed = _h.splitPanelDisplayed, toolsHide = _h.toolsHide;
    var isOverlapDisabled = getOverlapDisabled(dynamicOverlapHeight, contentHeader, disableContentHeaderOverlap);
    // Content gaps on the left and right are used with the minmax function in the CSS grid column definition
    var hasContentGapLeft = getContentGapLeft(isNavigationOpen, navigationHide);
    var hasContentGapRight = getContentGapRight(splitPanelPosition, isSplitPanelOpen, isToolsOpen, splitPanelDisplayed, toolsHide);
    return (React.createElement("main", { className: clsx(styles.layout, styles["content-type-".concat(contentType)], styles["split-panel-position-".concat(splitPanelPosition !== null && splitPanelPosition !== void 0 ? splitPanelPosition : 'bottom')], (_b = {},
            _b[styles['disable-body-scroll']] = disableBodyScroll,
            _b[testutilStyles['disable-body-scroll-root']] = disableBodyScroll,
            _b[styles['has-content-gap-left']] = hasContentGapLeft,
            _b[styles['has-content-gap-right']] = hasContentGapRight,
            _b[styles['has-max-content-width']] = maxContentWidth && maxContentWidth > 0,
            _b[styles['has-split-panel']] = splitPanelDisplayed,
            _b[styles['has-sticky-notifications']] = stickyNotifications && hasNotificationsContent,
            _b[styles['is-overlap-disabled']] = isOverlapDisabled,
            _b), testutilStyles.root), ref: layoutElement, style: __assign(__assign(__assign(__assign((_c = {}, _c[customCssProps.headerHeight] = "".concat(headerHeight, "px"), _c[customCssProps.footerHeight] = "".concat(footerHeight, "px"), _c[customCssProps.layoutWidth] = "".concat(layoutWidth, "px"), _c[customCssProps.mainOffsetLeft] = "".concat(mainOffsetLeft, "px"), _c), (maxContentWidth && (_d = {}, _d[customCssProps.maxContentWidth] = "".concat(maxContentWidth, "px"), _d))), (minContentWidth && (_e = {}, _e[customCssProps.minContentWidth] = "".concat(minContentWidth, "px"), _e))), (_f = {}, _f[customCssProps.notificationsHeight] = "".concat(notificationsHeight, "px"), _f)), (!isOverlapDisabled &&
            dynamicOverlapHeight > 0 && (_g = {}, _g[customCssProps.overlapHeight] = "".concat(dynamicOverlapHeight, "px"), _g))) }, children));
}
/**
 * When the Navigation and Tools are present the grid definition has the center column
 * touch the first and last columns with no gap. The forms with the circular buttons
 * for Navigation and Tools have internal padding which creates the necessary
 * horizontal space when the drawers are closed. The remaining conditions below
 * determine the necessity of utilizing the content gap left property to create
 * horizontal space between the center column and its adjacent siblings.
 */
function getContentGapRight(splitPanelPosition, isSplitPanelOpen, isToolsOpen, splitPanelDisplayed, toolsHide) {
    var hasContentGapRight = false;
    // Main is touching the edge of the Layout and needs a content gap
    if (!splitPanelDisplayed && toolsHide) {
        hasContentGapRight = true;
    }
    // Main is touching the Tools drawer and needs a content gap
    if ((!splitPanelDisplayed || !isSplitPanelOpen) && !toolsHide && isToolsOpen) {
        hasContentGapRight = true;
    }
    // Main is touching the edge of the Layout and needs a content gap
    if (splitPanelDisplayed && splitPanelPosition === 'bottom' && (isToolsOpen || toolsHide)) {
        hasContentGapRight = true;
    }
    // Main is touching the Split Panel drawer and needs a content gap
    if (splitPanelDisplayed && isSplitPanelOpen && splitPanelPosition === 'side') {
        hasContentGapRight = true;
    }
    return hasContentGapRight;
}
/**
 * Additional function to determine whether or not a content gap is needed
 * on the left (see the getContentGapRight function). The same render logic applies
 * regarding the center column touching an adjacent sibling but the only
 * component state that needs to be tracked is the Navigation.
 */
function getContentGapLeft(isNavigationOpen, navigationHide) {
    return isNavigationOpen || navigationHide ? true : false;
}
/**
 * Determine whether the overlap between the contentHeader and content slots should be disabled.
 * The disableContentHeaderOverlap property is absolute and will always disable the overlap
 * if it is set to true. If there is no contentHeader then the overlap should be disabled
 * unless there is a dynamicOverlapHeight. The dynamicOverlapHeight property is set by a
 * component in the content slot that needs to manually control the overlap height. Components
 * such as the Table (full page variant), Wizard, ContentLayout use this property and will
 * retain the overlap even if there is nothing rendered in the contentHeader slot.
 */
function getOverlapDisabled(dynamicOverlapHeight, contentHeader, disableContentHeaderOverlap) {
    var isOverlapDisabled = false;
    if (disableContentHeaderOverlap) {
        isOverlapDisabled = true;
    }
    else if (!contentHeader && dynamicOverlapHeight <= 0) {
        isOverlapDisabled = true;
    }
    return isOverlapDisabled;
}
//# sourceMappingURL=layout.js.map