// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React from 'react';
import { AppLayoutButton, CloseButton, togglesConfig } from './toggles';
import styles from './styles.css.js';
// This matches the design token awsui.$border-divider-section-width in Visual Refresh
var BORDER_WIDTH = 2;
// We are using two landmarks per drawer, i.e. two NAVs and two ASIDEs, because of several
// known bugs in NVDA that cause focus changes within a container to sometimes not be
// announced. As a result, we use one region for the open button and one region for the
// actual drawer content, always hiding the other one when it's not visible.
// An alternative solution to follow a more classic implementation here to only have one
// button that triggers the opening/closing of the drawer also did not work due to another
// series of bugs in NVDA (together with Firefox) which prevent the changed expanded state
// from being announced.
// Even with this workaround in place, the announcement of the close button when opening a
// panel in NVDA is not working correctly. The suspected root cause is one of the bugs below
// as well.
// Relevant tickets:
// * https://github.com/nvaccess/nvda/issues/6606
// * https://github.com/nvaccess/nvda/issues/5825
// * https://github.com/nvaccess/nvda/issues/5247
// * https://github.com/nvaccess/nvda/pull/8869 (reverted PR that was going to fix it)
export function Drawer(_a) {
    var _b;
    var contentClassName = _a.contentClassName, toggleClassName = _a.toggleClassName, closeClassName = _a.closeClassName, width = _a.width, type = _a.type, toggleRefs = _a.toggleRefs, topOffset = _a.topOffset, bottomOffset = _a.bottomOffset, ariaLabels = _a.ariaLabels, children = _a.children, isOpen = _a.isOpen, isHidden = _a.isHidden, isMobile = _a.isMobile, hasDividerWithSplitPanel = _a.hasDividerWithSplitPanel, onToggle = _a.onToggle, onClick = _a.onClick, onLoseFocus = _a.onLoseFocus, _c = _a.extendRight, extendRight = _c === void 0 ? 0 : _c;
    var _d = togglesConfig[type], TagName = _d.TagName, iconName = _d.iconName, getLabels = _d.getLabels;
    var _e = getLabels(ariaLabels), mainLabel = _e.mainLabel, closeLabel = _e.closeLabel, openLabel = _e.openLabel;
    var hasDividerWithButtonBar = isOpen && extendRight !== 0;
    var drawerContentWidthOpen = isMobile ? undefined : width;
    var drawerContentWidth = isOpen ? drawerContentWidthOpen : undefined;
    var drawerWidth = hasDividerWithButtonBar && drawerContentWidth ? drawerContentWidth + BORDER_WIDTH : drawerContentWidth;
    var closeIconName = 'close';
    var regularOpenButton = (React.createElement(TagName, { "aria-label": mainLabel, className: styles.toggle, "aria-hidden": isOpen },
        React.createElement(AppLayoutButton, { ref: toggleRefs.toggle, className: toggleClassName, iconName: iconName, ariaLabel: openLabel, onClick: function () { return onToggle(true); }, ariaExpanded: false })));
    return (React.createElement("div", { className: clsx(styles.drawer, (_b = {},
            _b[styles['drawer-closed']] = !isOpen,
            _b[styles['drawer-hidden']] = isHidden,
            _b[styles['drawer-mobile']] = isMobile,
            _b[styles['has-divider-with-splitpanel']] = hasDividerWithSplitPanel,
            _b[styles['opaque-background']] = hasDividerWithButtonBar,
            _b)), style: {
            width: drawerWidth,
            marginRight: isOpen ? -1 * extendRight : 0,
            paddingRight: isOpen ? extendRight : 0
        }, onBlur: onLoseFocus
            ? function (e) {
                if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
                    onLoseFocus(e);
                }
            }
            : undefined, onClick: function (event) {
            if (onClick) {
                onClick(event);
            }
            if (!isOpen) {
                // to prevent calling onToggle from the drawer when it's called from the toggle button
                if (event.target.tagName !== 'BUTTON') {
                    onToggle(true);
                }
            }
        } },
        React.createElement("div", { style: { width: drawerContentWidth, top: topOffset, bottom: bottomOffset }, className: clsx(styles['drawer-content'], contentClassName) },
            !isMobile && regularOpenButton,
            React.createElement(TagName, { "aria-label": mainLabel, "aria-hidden": !isOpen },
                React.createElement(CloseButton, { ref: toggleRefs.close, className: closeClassName, ariaLabel: closeLabel, onClick: function () { return onToggle(false); }, iconName: closeIconName }),
                children))));
}
//# sourceMappingURL=drawer.js.map