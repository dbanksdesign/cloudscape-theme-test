import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
import { InternalButton } from '../button/internal';
import useFocusVisible from '../internal/hooks/focus-visible';
import { useContainerQuery } from '../internal/hooks/container-queries';
import { KeyCode } from '../internal/keycode';
import { onPaginationClick, hasHorizontalOverflow, hasLeftOverflow, hasRightOverflow, scrollIntoView, } from './scroll-utils';
import { isPlainLeftClick } from '../internal/events';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
export function TabHeaderBar(_a) {
    var _b, _c, _d;
    var onChange = _a.onChange, activeTabId = _a.activeTabId, tabs = _a.tabs, variant = _a.variant, idNamespace = _a.idNamespace, ariaLabel = _a.ariaLabel, ariaLabelledby = _a.ariaLabelledby, i18nStrings = _a.i18nStrings;
    var focusVisible = useFocusVisible();
    var headerBarRef = useRef(null);
    var activeTabHeaderRef = useRef(null);
    var leftOverflowButton = useRef(null);
    var isVisualRefresh = useVisualRefresh();
    var _e = useContainerQuery(function (rect) { return rect.width; }), widthChange = _e[0], containerRef = _e[1];
    var tabRefs = useRef(new Map());
    var _f = useState(false), horizontalOverflow = _f[0], setHorizontalOverflow = _f[1];
    var _g = useState(false), leftOverflow = _g[0], setLeftOverflow = _g[1];
    var _h = useState(false), rightOverflow = _h[0], setRightOverflow = _h[1];
    useEffect(function () {
        if (headerBarRef.current) {
            setHorizontalOverflow(hasHorizontalOverflow(headerBarRef.current, leftOverflowButton));
            setLeftOverflow(hasLeftOverflow(headerBarRef.current));
            setRightOverflow(hasRightOverflow(headerBarRef.current));
        }
    }, [widthChange, tabs]);
    var scrollIntoViewIfPossible = function (smooth) {
        if (!activeTabId) {
            return;
        }
        var activeTabRef = tabRefs.current.get(activeTabId);
        if (activeTabRef && headerBarRef.current) {
            scrollIntoView(activeTabRef, headerBarRef.current, smooth);
        }
    };
    useEffect(function () {
        // Delay scrollIntoView as the position is depending on parent elements
        // (effects are called inside-out in the component tree).
        // Wait one frame to allow parents to complete it's calculation.
        requestAnimationFrame(function () {
            scrollIntoViewIfPossible(false);
        });
        // Non-smooth scrolling should not be called upon activeId change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [horizontalOverflow, widthChange, tabs.length]);
    useEffect(function () {
        scrollIntoViewIfPossible(true);
        // Smooth scrolling should only be called upon activeId change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTabId]);
    useEffect(function () {
        var _a, _b;
        /*
         When the selected tab changes and we are currently already focused on a tab,
         move the focus to the newly selected tab.
        */
        if ((_a = headerBarRef.current) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement)) {
            if (document.activeElement !== activeTabHeaderRef.current) {
                (_b = activeTabHeaderRef.current) === null || _b === void 0 ? void 0 : _b.focus({ preventScroll: true });
            }
        }
    }, [activeTabId]);
    var onScroll = function () {
        if (headerBarRef.current) {
            setLeftOverflow(hasLeftOverflow(headerBarRef.current));
            setRightOverflow(hasRightOverflow(headerBarRef.current));
        }
    };
    var classes = clsx((_b = {},
        _b[styles['tabs-header']] = true,
        _b[styles['tabs-header-with-divider']] = variant === 'default' || isVisualRefresh,
        _b));
    var leftButtonClasses = clsx((_c = {},
        _c[styles['pagination-button']] = true,
        _c[styles['pagination-button-left']] = true,
        _c[styles['pagination-button-left-scrollable']] = leftOverflow,
        _c));
    var rightButtonClasses = clsx((_d = {},
        _d[styles['pagination-button']] = true,
        _d[styles['pagination-button-right']] = true,
        _d[styles['pagination-button-right-scrollable']] = rightOverflow,
        _d));
    return (
    //converted span to div as list should not be a child of span for HTML validation
    React.createElement("div", { className: classes, ref: containerRef },
        horizontalOverflow && (React.createElement("span", { ref: leftOverflowButton, className: leftButtonClasses },
            React.createElement(InternalButton, { formAction: "none", variant: "icon", iconName: "angle-left", disabled: !leftOverflow, onClick: function () { return onPaginationClick(headerBarRef, -1); }, ariaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.scrollLeftAriaLabel }))),
        React.createElement("ul", { role: "tablist", className: styles['tabs-header-list'], "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, ref: headerBarRef, onScroll: onScroll }, tabs.map(renderTabHeader)),
        horizontalOverflow && (React.createElement("span", { className: rightButtonClasses },
            React.createElement(InternalButton, { formAction: "none", variant: "icon", iconName: "angle-right", disabled: !rightOverflow, onClick: function () { return onPaginationClick(headerBarRef, 1); }, ariaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.scrollRightAriaLabel })))));
    function renderTabHeader(tab) {
        var _a;
        var enabledTabsWithCurrentTab = tabs.filter(function (tab) { return !tab.disabled || tab.id === activeTabId; });
        var highlightTab = function (enabledTabIndex) {
            var tab = enabledTabsWithCurrentTab[enabledTabIndex];
            if (tab.id === activeTabId) {
                return;
            }
            onChange({ activeTabId: tab.id, activeTabHref: tab.href });
        };
        var handleKeyDown = function (event) {
            var keyCode = event.keyCode;
            var specialKeys = [KeyCode.right, KeyCode.left, KeyCode.end, KeyCode.home, KeyCode.pageUp, KeyCode.pageDown];
            if (specialKeys.indexOf(keyCode) === -1) {
                return;
            }
            event.preventDefault();
            var activeIndex = enabledTabsWithCurrentTab.indexOf(tab);
            switch (keyCode) {
                case KeyCode.right:
                    if (activeIndex + 1 === enabledTabsWithCurrentTab.length) {
                        highlightTab(0);
                    }
                    else {
                        highlightTab(activeIndex + 1);
                    }
                    return;
                case KeyCode.left:
                    if (activeIndex === 0) {
                        highlightTab(enabledTabsWithCurrentTab.length - 1);
                    }
                    else {
                        highlightTab(activeIndex - 1);
                    }
                    return;
                case KeyCode.end:
                    highlightTab(enabledTabsWithCurrentTab.length - 1);
                    return;
                case KeyCode.home:
                    highlightTab(0);
                    return;
                case KeyCode.pageDown:
                    if (rightOverflow) {
                        onPaginationClick(headerBarRef, 1);
                    }
                    return;
                case KeyCode.pageUp:
                    if (leftOverflow) {
                        onPaginationClick(headerBarRef, -1);
                    }
                    return;
            }
        };
        var clickTab = function (event) {
            if (tab.disabled) {
                event.preventDefault();
                return;
            }
            // if the primary mouse button is clicked with a modifier key, the browser will handle opening a new tab
            var specialKey = !isPlainLeftClick(event);
            if (specialKey && tab.href) {
                return;
            }
            event.preventDefault();
            // for browsers that do not focus buttons on button click
            if (!tab.href) {
                var clickedTabRef = tabRefs.current.get(tab.id);
                if (clickedTabRef) {
                    var childElement = clickedTabRef.firstChild;
                    if (childElement && childElement !== document.activeElement) {
                        childElement.focus({ preventScroll: true });
                    }
                }
            }
            if (tab.id === activeTabId) {
                return;
            }
            onChange({ activeTabId: tab.id, activeTabHref: tab.href });
        };
        var classes = clsx((_a = {},
            _a[styles['tabs-tab-link']] = true,
            _a[styles.refresh] = isVisualRefresh,
            _a[styles['tabs-tab-active']] = activeTabId === tab.id && !tab.disabled,
            _a[styles['tabs-tab-disabled']] = tab.disabled,
            _a));
        var commonProps = __assign(__assign({ className: classes }, focusVisible), { role: 'tab', 'aria-selected': tab.id === activeTabId, 'aria-controls': "".concat(idNamespace, "-").concat(tab.id, "-panel"), 'data-testid': tab.id, id: getTabElementId({ namespace: idNamespace, tabId: tab.id }), children: React.createElement("span", { className: styles['tabs-tab-label'] }, tab.label) });
        if (tab.disabled) {
            commonProps['aria-disabled'] = 'true';
        }
        else {
            commonProps.onClick = clickTab;
        }
        if (tab.id === activeTabId) {
            commonProps.ref = activeTabHeaderRef;
            commonProps.tabIndex = 0;
            commonProps.onKeyDown = function (event) { return handleKeyDown(event); };
        }
        else {
            commonProps.tabIndex = -1;
        }
        var trigger = null;
        if (tab.href) {
            var anchorProps = commonProps;
            anchorProps.href = tab.href;
            trigger = React.createElement("a", __assign({}, anchorProps));
        }
        else {
            var buttonProps = commonProps;
            buttonProps.type = 'button';
            if (tab.disabled) {
                buttonProps.disabled = true;
            }
            trigger = React.createElement("button", __assign({}, buttonProps));
        }
        return (React.createElement("li", { ref: function (element) { return tabRefs.current.set(tab.id, element); }, className: styles['tabs-tab'], role: "presentation", key: tab.id }, trigger));
    }
}
export function getTabElementId(_a) {
    var namespace = _a.namespace, tabId = _a.tabId;
    return namespace + '-' + tabId;
}
//# sourceMappingURL=tab-header-bar.js.map