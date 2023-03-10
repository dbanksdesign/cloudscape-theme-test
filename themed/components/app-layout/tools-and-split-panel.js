import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React from 'react';
import { Drawer } from './drawer';
import styles from './styles.css.js';
import testutilStyles from './test-classes/styles.css.js';
export function ToolsAndSplitPanel(_a) {
    var _b;
    var ariaLabels = _a.ariaLabels, drawerWidth = _a.drawerWidth, footerHeight = _a.footerHeight, headerHeight = _a.headerHeight, isHidden = _a.isHidden, isMobile = _a.isMobile, onToolsToggle = _a.onToolsToggle, panelHeightStyle = _a.panelHeightStyle, splitPanel = _a.splitPanel, toggleRefs = _a.toggleRefs, onLoseToolsFocus = _a.onLoseToolsFocus, tools = _a.tools, toolsHide = _a.toolsHide, toolsOpen = _a.toolsOpen, toolsWidth = _a.toolsWidth, splitPanelOpen = _a.splitPanelOpen;
    var splitPanelVisible = splitPanelOpen && Boolean(splitPanel);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: {
                width: drawerWidth
            } },
            React.createElement("div", { className: clsx(styles['panel-wrapper-outer'], (_b = {},
                    _b[styles.mobile] = isMobile,
                    _b[styles.open] = toolsOpen,
                    _b)), style: __assign({}, (isMobile ? { top: headerHeight, bottom: footerHeight } : panelHeightStyle)) },
                splitPanel,
                !toolsHide && (React.createElement(Drawer, { type: "tools", isMobile: isMobile, width: toolsWidth, isOpen: toolsOpen, onToggle: onToolsToggle, toggleRefs: toggleRefs, onLoseFocus: onLoseToolsFocus, isHidden: isHidden, contentClassName: clsx(styles.tools, testutilStyles.tools), closeClassName: clsx(styles['tools-close'], testutilStyles['tools-close']), toggleClassName: clsx(styles['tools-toggle'], testutilStyles['tools-toggle']), topOffset: headerHeight, bottomOffset: footerHeight, ariaLabels: ariaLabels, extendRight: 0, hasDividerWithSplitPanel: splitPanelVisible }, tools))))));
}
//# sourceMappingURL=tools-and-split-panel.js.map