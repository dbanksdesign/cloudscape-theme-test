// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import clsx from 'clsx';
import { useAppLayoutInternals } from './context';
import { SplitPanelContextProvider, } from '../../internal/context/split-panel-context';
import styles from './styles.css.js';
import { useEffectOnUpdate } from '../../internal/hooks/use-effect-on-update';
import { Transition } from '../../internal/components/transition';
import customCssProps from '../../internal/generated/custom-css-properties';
/**
 * If there is no Split Panel in the AppLayout context then the SplitPanel
 * will pass through the AppLayout children without the context.
 */
function SplitPanel(_a) {
    var children = _a.children;
    var _b = useAppLayoutInternals(), handleSplitPanelClick = _b.handleSplitPanelClick, handleSplitPanelPreferencesChange = _b.handleSplitPanelPreferencesChange, handleSplitPanelResize = _b.handleSplitPanelResize, isMobile = _b.isMobile, isSplitPanelForcedPosition = _b.isSplitPanelForcedPosition, isSplitPanelOpen = _b.isSplitPanelOpen, setSplitPanelReportedSize = _b.setSplitPanelReportedSize, setSplitPanelReportedHeaderHeight = _b.setSplitPanelReportedHeaderHeight, splitPanelPosition = _b.splitPanelPosition, splitPanelSize = _b.splitPanelSize, setSplitPanelToggle = _b.setSplitPanelToggle, headerHeight = _b.headerHeight, footerHeight = _b.footerHeight;
    var _c = useState(), splitPanelLastInteraction = _c[0], setSplitPanelLastInteraction = _c[1];
    useEffectOnUpdate(function () { return setSplitPanelLastInteraction(isSplitPanelOpen ? { type: 'open' } : { type: 'close' }); }, [isSplitPanelOpen]);
    useEffectOnUpdate(function () { return setSplitPanelLastInteraction({ type: 'position' }); }, [splitPanelPosition]);
    var context = {
        bottomOffset: 0,
        getMaxHeight: function () {
            var availableHeight = document.documentElement.clientHeight - headerHeight - footerHeight;
            // If the page is likely zoomed in at 200%, allow the split panel to fill the content area.
            return availableHeight < 400 ? availableHeight - 40 : availableHeight - 250;
        },
        getMaxWidth: function () { return document.documentElement.clientWidth; },
        isForcedPosition: isSplitPanelForcedPosition,
        isMobile: isMobile,
        isOpen: isSplitPanelOpen,
        leftOffset: 0,
        onPreferencesChange: handleSplitPanelPreferencesChange,
        onResize: handleSplitPanelResize,
        onToggle: handleSplitPanelClick,
        position: splitPanelPosition,
        reportSize: setSplitPanelReportedSize,
        reportHeaderHeight: setSplitPanelReportedHeaderHeight,
        rightOffset: 0,
        size: splitPanelSize || 0,
        topOffset: 0,
        setSplitPanelToggle: setSplitPanelToggle,
        lastInteraction: splitPanelLastInteraction
    };
    return React.createElement(SplitPanelContextProvider, { value: context }, children);
}
/**
 * This is the render function for the SplitPanel when it is in bottom position.
 * The Split Panel container will be another row entry in the grid definition in
 * the Layout component. The start and finish columns will be variable based
 * on the presence and state of the Navigation and Tools components.
 */
function SplitPanelBottom() {
    var _a = useAppLayoutInternals(), disableBodyScroll = _a.disableBodyScroll, isNavigationOpen = _a.isNavigationOpen, isSplitPanelOpen = _a.isSplitPanelOpen, isToolsOpen = _a.isToolsOpen, splitPanel = _a.splitPanel, splitPanelPosition = _a.splitPanelPosition, splitPanelReportedSize = _a.splitPanelReportedSize, splitPanelReportedHeaderHeight = _a.splitPanelReportedHeaderHeight;
    if (!splitPanel) {
        return null;
    }
    return (React.createElement(Transition, { "in": isSplitPanelOpen !== null && isSplitPanelOpen !== void 0 ? isSplitPanelOpen : false, exit: false }, function (state, transitionEventsRef) {
        var _a, _b;
        return (React.createElement("section", { className: clsx(styles['split-panel-bottom'], styles["position-".concat(splitPanelPosition)], (_a = {},
                _a[styles.animating] = state === 'entering',
                _a[styles['disable-body-scroll']] = disableBodyScroll,
                _a[styles['is-navigation-open']] = isNavigationOpen,
                _a[styles['is-split-panel-open']] = isSplitPanelOpen,
                _a[styles['is-tools-open']] = isToolsOpen,
                _a)), ref: transitionEventsRef, style: (_b = {},
                _b[customCssProps.splitPanelReportedSize] = "".concat(splitPanelReportedSize, "px"),
                _b[customCssProps.splitPanelReportedHeaderSize] = "".concat(splitPanelReportedHeaderHeight, "px"),
                _b) },
            React.createElement(SplitPanel, null),
            splitPanelPosition === 'bottom' && splitPanel));
    }));
}
/**
 * This is the render function for the SplitPanel when it is side position.
 * The Split Panel will not be within the grid defined in the Layout component
 * but instead a direct child of the Tools component. The width constraints
 * for this position are computed in the Tools component.
 */
function SplitPanelSide() {
    var _a = useAppLayoutInternals(), isSplitPanelOpen = _a.isSplitPanelOpen, splitPanel = _a.splitPanel, splitPanelPosition = _a.splitPanelPosition, splitPanelMaxWidth = _a.splitPanelMaxWidth, splitPanelMinWidth = _a.splitPanelMinWidth, splitPanelReportedSize = _a.splitPanelReportedSize;
    if (!splitPanel) {
        return null;
    }
    return (React.createElement(Transition, { "in": isSplitPanelOpen !== null && isSplitPanelOpen !== void 0 ? isSplitPanelOpen : false, exit: false }, function (state, transitionEventsRef) {
        var _a, _b;
        return (React.createElement("section", { "aria-hidden": !isSplitPanelOpen || splitPanelPosition === 'bottom' ? true : false, className: clsx(styles['split-panel-side'], styles["position-".concat(splitPanelPosition)], (_a = {},
                _a[styles.animating] = state === 'entering',
                _a[styles['is-split-panel-open']] = isSplitPanelOpen,
                _a)), ref: transitionEventsRef, style: (_b = {},
                _b[customCssProps.splitPanelMaxWidth] = "".concat(splitPanelMaxWidth, "px"),
                _b[customCssProps.splitPanelMinWidth] = "".concat(splitPanelMinWidth, "px"),
                _b[customCssProps.splitPanelReportedHeaderSize] = "".concat(splitPanelReportedSize, "px"),
                _b) },
            React.createElement("div", { className: clsx(styles['animated-content']) }, splitPanelPosition === 'side' && splitPanel)));
    }));
}
/**
 * This logic will determine what the Split Panel position should be. It reconciles the possibility
 * of being in forced position with the current selected position in the settings.
 */
export function getSplitPanelPosition(isSplitPanelForcedPosition, splitPanelPreferences) {
    var splitPanelPosition = 'bottom';
    if (!isSplitPanelForcedPosition && (splitPanelPreferences === null || splitPanelPreferences === void 0 ? void 0 : splitPanelPreferences.position) === 'side') {
        splitPanelPosition = 'side';
    }
    return splitPanelPosition;
}
SplitPanel.Bottom = SplitPanelBottom;
SplitPanel.Side = SplitPanelSide;
export default SplitPanel;
//# sourceMappingURL=split-panel.js.map