// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { AppLayoutButton, togglesConfig } from '../toggles';
import styles from './styles.css.js';
import sharedStyles from '../styles.css.js';
import testutilStyles from '../test-classes/styles.css.js';
var MobileToggle = React.forwardRef(function (_a, ref) {
    var className = _a.className, ariaLabels = _a.ariaLabels, type = _a.type, disabled = _a.disabled, onClick = _a.onClick;
    var _b = togglesConfig[type], TagName = _b.TagName, iconName = _b.iconName, getLabels = _b.getLabels;
    var _c = getLabels(ariaLabels), mainLabel = _c.mainLabel, openLabel = _c.openLabel;
    return (React.createElement(TagName, { className: clsx(styles['mobile-toggle']), "aria-hidden": disabled, "aria-label": mainLabel, onClick: function (e) { return e.target === e.currentTarget && onClick(); } },
        React.createElement(AppLayoutButton, { ref: ref, className: className, iconName: iconName, onClick: onClick, ariaLabel: openLabel, disabled: disabled, ariaExpanded: disabled })));
});
export function MobileToolbar(_a) {
    var _b = _a.ariaLabels, ariaLabels = _b === void 0 ? {} : _b, toggleRefs = _a.toggleRefs, topOffset = _a.topOffset, navigationHide = _a.navigationHide, toolsHide = _a.toolsHide, _c = _a.anyPanelOpen, anyPanelOpen = _c === void 0 ? false : _c, unfocusable = _a.unfocusable, children = _a.children, onNavigationOpen = _a.onNavigationOpen, onToolsOpen = _a.onToolsOpen;
    useEffect(function () {
        if (anyPanelOpen) {
            document.body.classList.add(styles['block-body-scroll']);
            return function () {
                document.body.classList.remove(styles['block-body-scroll']);
            };
        }
        else {
            document.body.classList.remove(styles['block-body-scroll']);
        }
    }, [anyPanelOpen]);
    return (React.createElement("div", { className: clsx(styles['mobile-bar'], unfocusable && sharedStyles.unfocusable), style: { top: topOffset } },
        !navigationHide && (React.createElement(MobileToggle, { ref: toggleRefs.navigation, type: "navigation", className: clsx(sharedStyles['navigation-toggle'], testutilStyles['navigation-toggle']), ariaLabels: ariaLabels, disabled: anyPanelOpen, onClick: onNavigationOpen })),
        React.createElement("div", { className: styles['mobile-bar-breadcrumbs'] }, children && React.createElement("div", { className: clsx(sharedStyles.breadcrumbs, testutilStyles.breadcrumbs) }, children)),
        !toolsHide && (React.createElement(MobileToggle, { ref: toggleRefs.tools, type: "tools", className: clsx(sharedStyles['tools-toggle'], testutilStyles['tools-toggle']), ariaLabels: ariaLabels, disabled: anyPanelOpen, onClick: onToolsOpen }))));
}
//# sourceMappingURL=index.js.map