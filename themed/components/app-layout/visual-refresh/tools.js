// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { InternalButton } from '../../button/internal';
import { useAppLayoutInternals } from './context';
import TriggerButton from './trigger-button';
import styles from './styles.css.js';
import splitPanelStyles from '../../split-panel/styles.css.js';
import testutilStyles from '../test-classes/styles.css.js';
import { Transition } from '../../internal/components/transition';
import customCssProps from '../../internal/generated/custom-css-properties';
/**
 * The Tools component consists of the following elements:
 * the container, or root element, that sits as a direct child to the Layout grid definition;
 * the split panel, which exists only if there is a split panel in side position;
 * the tools, or drawer, that contains the hide tools form and the children passed through the API;
 * the show tools form that contains the triggers for both the drawer and the
 * split panel in large viewports;
 */
export default function Tools(_a) {
    var children = _a.children;
    var _b = useAppLayoutInternals(), ariaLabels = _b.ariaLabels, handleSplitPanelClick = _b.handleSplitPanelClick, handleToolsClick = _b.handleToolsClick, hasDefaultToolsWidth = _b.hasDefaultToolsWidth, isNavigationOpen = _b.isNavigationOpen, isMobile = _b.isMobile, isSplitPanelOpen = _b.isSplitPanelOpen, isToolsOpen = _b.isToolsOpen, splitPanelDisplayed = _b.splitPanelDisplayed, tools = _b.tools, toolsHide = _b.toolsHide, toolsWidth = _b.toolsWidth, isAnyPanelOpen = _b.isAnyPanelOpen, navigationHide = _b.navigationHide, toolsFocusControl = _b.toolsFocusControl, splitPanelPosition = _b.splitPanelPosition, splitPanelToggle = _b.splitPanelToggle;
    var hasSplitPanel = getSplitPanelStatus(splitPanelDisplayed, splitPanelPosition);
    var hasToolsForm = getToolsFormStatus(hasSplitPanel, isMobile, isSplitPanelOpen, isToolsOpen, toolsHide);
    var hasToolsFormPersistence = getToolsFormPersistence(hasSplitPanel, isSplitPanelOpen, isToolsOpen, toolsHide);
    var focusRefs = toolsFocusControl.refs;
    if (toolsHide && !hasSplitPanel) {
        return null;
    }
    var isUnfocusable = isMobile && isAnyPanelOpen && isNavigationOpen && !navigationHide;
    return (React.createElement(Transition, { "in": isToolsOpen !== null && isToolsOpen !== void 0 ? isToolsOpen : false }, function (state, transitionEventsRef) {
        var _a, _b, _c, _d;
        var _e, _f, _g;
        return (React.createElement("div", { className: clsx(styles['tools-container'], (_a = {},
                _a[testutilStyles['drawer-closed']] = !isToolsOpen,
                _a[styles.unfocusable] = isUnfocusable,
                _a)), style: (_b = {},
                _b[customCssProps.toolsAnimationStartingOpacity] = "".concat(hasSplitPanel && isSplitPanelOpen ? 1 : 0),
                // Overwrite the default tools width (depends on breakpoints) only when the `toolsWidth` property has been set.
                _b[customCssProps.toolsWidth] = hasDefaultToolsWidth ? '' : "".concat(toolsWidth, "px"),
                _b), onBlur: function (e) {
                if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
                    toolsFocusControl.loseFocus();
                }
            } },
            children,
            !toolsHide && (React.createElement("aside", { "aria-hidden": !isToolsOpen ? true : false, "aria-label": (_e = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.tools) !== null && _e !== void 0 ? _e : undefined, className: clsx(styles.tools, (_c = {},
                    _c[styles.animating] = state === 'entering',
                    _c[styles['has-tools-form-persistence']] = hasToolsFormPersistence,
                    _c[styles['is-tools-open']] = isToolsOpen,
                    _c), testutilStyles.tools), ref: state !== 'exiting' ? transitionEventsRef : undefined },
                React.createElement("div", { className: clsx(styles['animated-content']) },
                    React.createElement("div", { className: clsx(styles['hide-tools']) },
                        React.createElement(InternalButton, { ariaLabel: (_f = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.toolsClose) !== null && _f !== void 0 ? _f : undefined, iconName: isMobile ? 'close' : 'angle-right', onClick: function () { return handleToolsClick(false); }, variant: "icon", formAction: "none", className: testutilStyles['tools-close'], ref: focusRefs.close })),
                    tools))),
            !isMobile && (React.createElement("aside", { "aria-hidden": !hasToolsForm ? true : false, "aria-label": (_g = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.tools) !== null && _g !== void 0 ? _g : undefined, className: clsx(styles['show-tools'], (_d = {},
                    _d[styles.animating] = state === 'exiting',
                    _d[styles['has-tools-form']] = hasToolsForm,
                    _d[styles['has-tools-form-persistence']] = hasToolsFormPersistence,
                    _d), splitPanelStyles.root), ref: state === 'exiting' ? transitionEventsRef : undefined },
                !toolsHide && (React.createElement(TriggerButton, { ariaLabel: ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.toolsToggle, iconName: "status-info", onClick: function () { return handleToolsClick(!isToolsOpen); }, selected: hasSplitPanel && isToolsOpen, className: testutilStyles['tools-toggle'], ref: focusRefs.toggle })),
                hasSplitPanel && splitPanelToggle.displayed && (React.createElement(TriggerButton, { ariaLabel: splitPanelToggle.ariaLabel, iconName: "view-vertical", onClick: function () { return handleSplitPanelClick(); }, selected: hasSplitPanel && isSplitPanelOpen, className: splitPanelStyles['open-button'] }))))));
    }));
}
/**
 * Determine the default state of the Tools component. Mobile viewports should be
 * closed by default under all circumstances. If the toolsOpen prop has not been
 * set then it should be closed as well. Otherwise, default to the toolsOpen prop.
 */
export function getToolsDefaultState(isMobile, stateFromProps) {
    var isToolsOpen;
    if (isMobile || stateFromProps === undefined) {
        isToolsOpen = false;
    }
    else {
        isToolsOpen = stateFromProps;
    }
    return isToolsOpen;
}
/**
 * This simple function returns the presence of the split panel as a child of the
 * Tools component. It must exist and be in side position.
 */
function getSplitPanelStatus(splitPanelDisplayed, splitPanelPosition) {
    return splitPanelDisplayed && splitPanelPosition === 'side' ? true : false;
}
/**
 * By default the Tools form is styled as display: none; This behavior should
 * be unchanged in mobile viewports where the Tools form is always suppressed.
 * In large viewports, however the Tools form and its corresponding buttons
 * should be present in the UI under the below circumstances.
 */
function getToolsFormStatus(hasSplitPanel, isMobile, isSplitPanelOpen, isToolsOpen, toolsHide) {
    var hasToolsForm = false;
    if (!isMobile) {
        // Both the Split Panel and Tools button are needed
        if (hasSplitPanel && !toolsHide) {
            hasToolsForm = true;
        }
        // The Split Panel button is needed
        if (hasSplitPanel && !isSplitPanelOpen && toolsHide) {
            hasToolsForm = true;
        }
        // The Tools button is needed
        if (!hasSplitPanel && !toolsHide && !isToolsOpen) {
            hasToolsForm = true;
        }
    }
    return hasToolsForm;
}
/**
 * Under two scenarios the Tools form that contains the triggers
 * for the Tools content and the Split Panel may be persistent
 * in the UI (as opposed to disappearing when one of the drawers
 * is open). This will also add a white background as opposed to the
 * default transparent background. The buttons will present and in a
 * selected / not selected state.
 */
function getToolsFormPersistence(hasSplitPanel, isSplitPanelOpen, isToolsOpen, toolsHide) {
    var hasToolsFormPersistence = false;
    // Both Tools and Split Panel exist and one or both is open
    if (hasSplitPanel && !toolsHide && (isSplitPanelOpen || isToolsOpen)) {
        hasToolsFormPersistence = true;
    }
    return hasToolsFormPersistence;
}
//# sourceMappingURL=tools.js.map