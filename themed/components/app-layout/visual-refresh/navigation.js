import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { useAppLayoutInternals } from './context';
import { InternalButton } from '../../button/internal';
import TriggerButton from './trigger-button';
import styles from './styles.css.js';
import testutilStyles from '../test-classes/styles.css.js';
import { useFocusControl } from '../utils/use-focus-control';
import { Transition } from '../../internal/components/transition';
import { findUpUntil } from '../../internal/utils/dom';
import customCssProps from '../../internal/generated/custom-css-properties';
/**
 * The Navigation component consists of the following elements:
 * the container, or root element, that sits as a direct child to the Layout grid definition;
 * the show navigation form that contains the trigger for the drawer in large viewports;
 * the navigation, or drawer, that contains the hide navigation form and the children
 * passed through the API;
 */
export default function Navigation() {
    var _a = useAppLayoutInternals(), ariaLabels = _a.ariaLabels, handleNavigationClick = _a.handleNavigationClick, isMobile = _a.isMobile, isNavigationOpen = _a.isNavigationOpen, navigation = _a.navigation, navigationHide = _a.navigationHide, navigationWidth = _a.navigationWidth, isToolsOpen = _a.isToolsOpen, isAnyPanelOpen = _a.isAnyPanelOpen, toolsHide = _a.toolsHide;
    var focusRefs = useFocusControl(isNavigationOpen).refs;
    if (navigationHide) {
        return null;
    }
    // Close the Navigation drawer on mobile when a user clicks a link inside.
    var onNavigationClick = function (event) {
        var hasLink = findUpUntil(event.target, function (node) { return node.tagName === 'A' && !!node.href; });
        if (hasLink && isMobile) {
            handleNavigationClick(false);
        }
    };
    var isUnfocusable = isMobile && isAnyPanelOpen && isToolsOpen && !toolsHide;
    return (React.createElement(Transition, { "in": isNavigationOpen }, function (state, transitionEventsRef) {
        var _a, _b, _c, _d;
        var _e, _f, _g;
        return (React.createElement("div", { className: clsx(styles['navigation-container'], (_a = {},
                _a[testutilStyles['drawer-closed']] = !isNavigationOpen,
                _a[styles.unfocusable] = isUnfocusable,
                _a)), 
            // Overwrite the default nav width (depends on breakpoints) only when the `navigationWidth` property is set.
            style: __assign({}, (navigationWidth && (_b = {}, _b[customCssProps.navigationWidth] = "".concat(navigationWidth, "px"), _b))) },
            !isMobile && (React.createElement("nav", { "aria-hidden": isMobile || isNavigationOpen ? true : false, "aria-label": (_e = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigation) !== null && _e !== void 0 ? _e : undefined, className: clsx(styles['show-navigation'], (_c = {},
                    _c[styles.animating] = state === 'exiting',
                    _c[styles['is-navigation-open']] = isNavigationOpen,
                    _c)), ref: state === 'exiting' ? transitionEventsRef : undefined },
                React.createElement(TriggerButton, { ariaLabel: ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigationToggle, iconName: "menu", className: testutilStyles['navigation-toggle'], onClick: function () { return handleNavigationClick(true); }, ref: focusRefs.toggle }))),
            React.createElement("nav", { "aria-label": (_f = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigation) !== null && _f !== void 0 ? _f : undefined, className: clsx(styles.navigation, (_d = {},
                    _d[styles.animating] = state === 'entering',
                    _d[styles['is-navigation-open']] = isNavigationOpen,
                    _d), testutilStyles.navigation), ref: state !== 'exiting' ? transitionEventsRef : undefined, "aria-hidden": !isNavigationOpen, onClick: function (event) {
                    onNavigationClick && onNavigationClick(event);
                } },
                React.createElement("div", { className: clsx(styles['animated-content']) },
                    React.createElement("div", { className: clsx(styles['hide-navigation']) },
                        React.createElement(InternalButton, { ariaLabel: (_g = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigationClose) !== null && _g !== void 0 ? _g : undefined, iconName: isMobile ? 'close' : 'angle-left', onClick: function () { return handleNavigationClick(false); }, variant: "icon", formAction: "none", className: testutilStyles['navigation-close'], ref: focusRefs.close })),
                    navigation))));
    }));
}
//# sourceMappingURL=navigation.js.map