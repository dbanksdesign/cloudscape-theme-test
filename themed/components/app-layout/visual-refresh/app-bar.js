// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { useAppLayoutInternals } from './context';
import { InternalButton } from '../../button/internal';
import styles from './styles.css.js';
import testutilStyles from '../test-classes/styles.css.js';
import { useFocusControl } from '../utils/use-focus-control';
/**
 * The CSS class 'awsui-context-content-header' needs to be added to the root element so
 * that the design tokens used are overridden with the appropriate values.
 */
export default function AppBar() {
    var _a, _b, _c, _d;
    var _e, _f, _g;
    var _h = useAppLayoutInternals(), ariaLabels = _h.ariaLabels, breadcrumbs = _h.breadcrumbs, contentHeader = _h.contentHeader, contentType = _h.contentType, dynamicOverlapHeight = _h.dynamicOverlapHeight, handleNavigationClick = _h.handleNavigationClick, handleToolsClick = _h.handleToolsClick, hasNotificationsContent = _h.hasNotificationsContent, hasStickyBackground = _h.hasStickyBackground, isMobile = _h.isMobile, navigationHide = _h.navigationHide, isNavigationOpen = _h.isNavigationOpen, isToolsOpen = _h.isToolsOpen, toolsHide = _h.toolsHide, isAnyPanelOpen = _h.isAnyPanelOpen;
    var focusRefsNav = useFocusControl(isNavigationOpen).refs;
    var focusRefsTools = useFocusControl(isToolsOpen, true).refs;
    if (navigationHide && !breadcrumbs && toolsHide) {
        return null;
    }
    return (React.createElement("section", { "aria-hidden": !isMobile && !breadcrumbs ? true : undefined, className: clsx(styles.appbar, (_a = {},
            _a[styles['has-breadcrumbs']] = breadcrumbs,
            _a[styles.unfocusable] = isMobile && isAnyPanelOpen,
            _a[testutilStyles['mobile-bar']] = isMobile,
            _a), 'awsui-context-content-header') },
        !navigationHide && isMobile && (React.createElement("nav", { className: clsx(styles['appbar-nav'], (_b = {}, _b[testutilStyles['drawer-closed']] = !isNavigationOpen, _b)), "aria-hidden": isNavigationOpen },
            React.createElement(InternalButton, { ariaLabel: (_e = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigationToggle) !== null && _e !== void 0 ? _e : undefined, ariaExpanded: isNavigationOpen ? undefined : false, iconName: "menu", formAction: "none", onClick: function () { return handleNavigationClick(true); }, variant: "icon", className: testutilStyles['navigation-toggle'], ref: focusRefsNav.toggle, disabled: isAnyPanelOpen, __nativeAttributes: { 'aria-haspopup': isNavigationOpen ? undefined : true } }))),
        breadcrumbs && (React.createElement("div", { className: clsx(styles.breadcrumbs, styles["content-type-".concat(contentType)], testutilStyles.breadcrumbs, (_c = {},
                _c[styles['has-dynamic-overlap-height']] = dynamicOverlapHeight > 0,
                _c[styles['has-header']] = contentHeader,
                _c[styles['has-notifications-content']] = hasNotificationsContent,
                _c[styles['has-sticky-background']] = hasStickyBackground,
                _c)) }, breadcrumbs)),
        !toolsHide && isMobile && (React.createElement("aside", { className: clsx(styles['appbar-tools'], (_d = {}, _d[testutilStyles['drawer-closed']] = !isToolsOpen, _d)), "aria-hidden": isToolsOpen, "aria-label": (_f = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.tools) !== null && _f !== void 0 ? _f : undefined },
            React.createElement(InternalButton, { className: testutilStyles['tools-toggle'], ariaExpanded: isToolsOpen, disabled: isAnyPanelOpen, ariaLabel: (_g = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.toolsToggle) !== null && _g !== void 0 ? _g : undefined, iconName: "status-info", formAction: "none", onClick: function () { return handleToolsClick(true); }, variant: "icon", ref: focusRefsTools.toggle, __nativeAttributes: { 'aria-haspopup': true } })))));
}
//# sourceMappingURL=app-bar.js.map