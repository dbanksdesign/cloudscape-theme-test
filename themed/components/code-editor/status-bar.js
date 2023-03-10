import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
import LiveRegion from '../internal/components/live-region/index';
import { TabButton } from './tab-button';
import { InternalButton } from '../button/internal';
import { useContainerQuery } from '../internal/hooks/container-queries/use-container-query';
function InternalStatusBar(_a) {
    var _b, _c;
    var languageLabel = _a.languageLabel, cursorPosition = _a.cursorPosition, paneStatus = _a.paneStatus, onErrorPaneToggle = _a.onErrorPaneToggle, onWarningPaneToggle = _a.onWarningPaneToggle, onTabFocus = _a.onTabFocus, onTabBlur = _a.onTabBlur, errorsTabRef = _a.errorsTabRef, warningsTabRef = _a.warningsTabRef, isTabFocused = _a.isTabFocused, paneId = _a.paneId, onPreferencesOpen = _a.onPreferencesOpen, i18nStrings = _a.i18nStrings, errorCount = _a.errorCount, warningCount = _a.warningCount, leftBarRef = _a.leftBarRef, isVirtual = _a.isVirtual, minifyCounters = _a.minifyCounters, isRefresh = _a.isRefresh;
    var errorText = "".concat(i18nStrings.errorsTab, ": ").concat(errorCount);
    var warningText = "".concat(i18nStrings.warningsTab, ": ").concat(warningCount);
    // Virtual status bar is inaccessible for screen readers and keyboard interactions.
    return (React.createElement("div", { className: clsx(styles['status-bar'], (_b = {},
            _b[styles['status-bar-with-hidden-pane']] = paneStatus === 'hidden',
            _b[styles['status-bar-virtual']] = isVirtual,
            _b)), "aria-hidden": isVirtual },
        React.createElement("div", { className: clsx(styles['status-bar__left'], (_c = {},
                _c[styles['status-bar__left-virtual']] = isVirtual,
                _c)), ref: leftBarRef },
            React.createElement("span", { className: styles['status-bar__language-mode'] }, languageLabel),
            React.createElement("span", { className: styles['status-bar__cursor-position'] }, cursorPosition),
            React.createElement("div", { role: "tablist" },
                React.createElement(TabButton, { text: minifyCounters ? " ".concat(errorCount) : errorText, className: styles['tab-button--errors'], iconName: "status-negative", disabled: errorCount === 0 || isVirtual, active: paneStatus === 'error', onClick: onErrorPaneToggle, onFocus: onTabFocus, onBlur: onTabBlur, ref: errorsTabRef, ariaLabel: errorText, paneId: paneId, isRefresh: isRefresh }),
                React.createElement("span", { className: styles['tab-button--divider'] }),
                React.createElement(TabButton, { text: minifyCounters ? " ".concat(warningCount) : warningText, className: styles['tab-button--warnings'], iconName: "status-warning", disabled: warningCount === 0 || isVirtual, active: paneStatus === 'warning', onClick: onWarningPaneToggle, onFocus: onTabFocus, onBlur: onTabBlur, ref: warningsTabRef, tabIndex: paneStatus === 'error' && isTabFocused ? -1 : undefined, ariaHidden: paneStatus === 'error' && isTabFocused ? true : undefined, ariaLabel: warningText, paneId: paneId, isRefresh: isRefresh })),
            React.createElement(LiveRegion, { assertive: true },
                React.createElement("span", null,
                    errorText,
                    " "),
                React.createElement("span", null, warningText))),
        React.createElement("div", { className: styles['status-bar__right'] },
            React.createElement("div", { className: styles['status-bar__cog-button'] },
                React.createElement(InternalButton, { disabled: isVirtual, formAction: "none", variant: "icon", iconName: "settings", iconAlt: "Settings", ariaLabel: i18nStrings.preferencesButtonAriaLabel, onClick: onPreferencesOpen, __nativeAttributes: {
                        tabIndex: paneStatus !== 'hidden' && isTabFocused ? -1 : undefined,
                        'aria-hidden': paneStatus !== 'hidden' && isTabFocused ? true : undefined
                    } })))));
}
export var StatusBar = function (props) {
    // create a virtual status bar, in order to calculate the width with full tab button text
    // and decide if tab button text needs to be reduced
    var _a = useContainerQuery(function (rect) { return rect.width; }), realWidth = _a[0], statusLeftBarRef = _a[1];
    var _b = useContainerQuery(function (rect) { return rect.width; }), virtualWidth = _b[0], virtualStatusLeftBarRef = _b[1];
    var minifyCounters = virtualWidth !== null && realWidth !== null && virtualWidth > realWidth;
    return (React.createElement(React.Fragment, null,
        React.createElement(InternalStatusBar, __assign({ isVirtual: false }, props, { leftBarRef: statusLeftBarRef, minifyCounters: minifyCounters })),
        React.createElement(InternalStatusBar, __assign({ isVirtual: true }, props, { leftBarRef: virtualStatusLeftBarRef, minifyCounters: false }))));
};
//# sourceMappingURL=status-bar.js.map