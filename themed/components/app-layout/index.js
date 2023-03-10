import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { getBaseProps } from '../internal/base-component';
import { useControllable } from '../internal/hooks/use-controllable';
import { useMobile } from '../internal/hooks/use-mobile';
import { fireNonCancelableEvent } from '../internal/events';
import { applyDefaults } from './defaults';
import { Notifications } from './notifications';
import { MobileToolbar } from './mobile-toolbar';
import { useFocusControl } from './utils/use-focus-control';
import useWindowWidth from './utils/use-window-width';
import useContentHeight from './utils/use-content-height';
import styles from './styles.css.js';
import testutilStyles from './test-classes/styles.css.js';
import { findUpUntil } from '../internal/utils/dom';
import { AppLayoutContext } from '../internal/context/app-layout-context';
import { useContainerQuery } from '../internal/hooks/container-queries';
import { useStableEventHandler } from '../internal/hooks/use-stable-event-handler';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import { SplitPanelContextProvider, } from '../internal/context/split-panel-context';
import { CONSTRAINED_MAIN_PANEL_MIN_HEIGHT, CONSTRAINED_PAGE_HEIGHT, getSplitPanelDefaultSize, MAIN_PANEL_MIN_HEIGHT, } from '../split-panel/utils/size-utils';
import useBaseComponent from '../internal/hooks/use-base-component';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import ContentWrapper from './content-wrapper';
import { isMotionDisabled } from '../internal/motion';
import { useEffectOnUpdate } from '../internal/hooks/use-effect-on-update';
import { NavigationPanel } from './navigation-panel';
import { ToolsAndSplitPanel } from './tools-and-split-panel';
import { usePreviousFrameValue } from '../internal/hooks/use-previous-frame';
import useAppLayoutOffsets from './utils/use-content-width';
import { isDevelopment } from '../internal/is-development';
import { warnOnce } from '../internal/logging';
import RefreshedAppLayout from './visual-refresh';
var AppLayout = React.forwardRef(function (_a, ref) {
    var _b = _a.contentType, contentType = _b === void 0 ? 'default' : _b, _c = _a.headerSelector, headerSelector = _c === void 0 ? '#b #h' : _c, _d = _a.footerSelector, footerSelector = _d === void 0 ? '#b #f' : _d, rest = __rest(_a, ["contentType", "headerSelector", "footerSelector"]);
    var __internalRootRef = useBaseComponent('AppLayout').__internalRootRef;
    var isRefresh = useVisualRefresh();
    // This re-builds the props including the default values
    var props = __assign({ contentType: contentType, headerSelector: headerSelector, footerSelector: footerSelector }, rest);
    var baseProps = getBaseProps(rest);
    return (React.createElement("div", __assign({ ref: __internalRootRef }, baseProps), isRefresh ? React.createElement(RefreshedAppLayout, __assign({}, props, { ref: ref })) : React.createElement(OldAppLayout, __assign({}, props, { ref: ref }))));
});
var OldAppLayout = React.forwardRef(function (_a, ref) {
    var _b;
    var _c;
    var navigation = _a.navigation, _d = _a.navigationWidth, navigationWidth = _d === void 0 ? 280 : _d, navigationHide = _a.navigationHide, controlledNavigationOpen = _a.navigationOpen, tools = _a.tools, _e = _a.toolsWidth, toolsWidth = _e === void 0 ? 290 : _e, toolsHide = _a.toolsHide, controlledToolsOpen = _a.toolsOpen, breadcrumbs = _a.breadcrumbs, notifications = _a.notifications, stickyNotifications = _a.stickyNotifications, contentHeader = _a.contentHeader, disableContentHeaderOverlap = _a.disableContentHeaderOverlap, content = _a.content, _f = _a.contentType, contentType = _f === void 0 ? 'default' : _f, disableContentPaddings = _a.disableContentPaddings, disableBodyScroll = _a.disableBodyScroll, maxContentWidth = _a.maxContentWidth, minContentWidth = _a.minContentWidth, _g = _a.headerSelector, headerSelector = _g === void 0 ? '#b #h' : _g, _h = _a.footerSelector, footerSelector = _h === void 0 ? '#b #f' : _h, ariaLabels = _a.ariaLabels, splitPanel = _a.splitPanel, controlledSplitPanelSize = _a.splitPanelSize, controlledSplitPanelOpen = _a.splitPanelOpen, controlledSplitPanelPreferences = _a.splitPanelPreferences, onSplitPanelPreferencesChange = _a.onSplitPanelPreferencesChange, onSplitPanelResize = _a.onSplitPanelResize, onSplitPanelToggle = _a.onSplitPanelToggle, onNavigationChange = _a.onNavigationChange, onToolsChange = _a.onToolsChange;
    if (isDevelopment) {
        if (controlledToolsOpen && toolsHide) {
            warnOnce('AppLayout', "You have enabled both the `toolsOpen` prop and the `toolsHide` prop. This is not supported. Set `toolsOpen` to `false` when you set `toolsHide` to `true`.");
        }
    }
    var rootRef = useRef(null);
    var isMobile = useMobile();
    var isMotionEnabled = rootRef.current ? !isMotionDisabled(rootRef.current) : false;
    var defaults = applyDefaults(contentType, { maxContentWidth: maxContentWidth, minContentWidth: minContentWidth }, false);
    var _j = useControllable(controlledNavigationOpen, onNavigationChange, isMobile ? false : defaults.navigationOpen, { componentName: 'AppLayout', controlledProp: 'navigationOpen', changeHandler: 'onNavigationChange' }), _k = _j[0], navigationOpen = _k === void 0 ? false : _k, setNavigationOpen = _j[1];
    var _l = useControllable(controlledToolsOpen, onToolsChange, isMobile ? false : defaults.toolsOpen, { componentName: 'AppLayout', controlledProp: 'toolsOpen', changeHandler: 'onToolsChange' }), _m = _l[0], toolsOpen = _m === void 0 ? false : _m, setToolsOpen = _l[1];
    var onNavigationToggle = useCallback(function (open) {
        setNavigationOpen(open);
        fireNonCancelableEvent(onNavigationChange, { open: open });
    }, [setNavigationOpen, onNavigationChange]);
    var onToolsToggle = useCallback(function (open) {
        setToolsOpen(open);
        fireNonCancelableEvent(onToolsChange, { open: open });
    }, [setToolsOpen, onToolsChange]);
    var onNavigationClick = function (event) {
        var hasLink = findUpUntil(event.target, function (node) { return node.tagName === 'A' && !!node.href; });
        if (hasLink) {
            onNavigationToggle(false);
        }
    };
    var navigationVisible = !navigationHide && navigationOpen;
    var toolsVisible = !toolsHide && toolsOpen;
    var _o = useContentHeight(headerSelector, footerSelector, disableBodyScroll), contentHeightStyle = _o.contentHeightStyle, headerHeight = _o.headerHeight, footerHeight = _o.footerHeight, panelHeightStyle = _o.panelHeightStyle;
    var _p = useState(false), isSplitpanelForcedPosition = _p[0], setIsSplitpanelForcedPosition = _p[1];
    var _q = useContainerQuery(function (rect) { return rect.height; }), notificationsHeight = _q[0], notificationsRef = _q[1];
    var anyPanelOpen = navigationVisible || toolsVisible;
    var hasRenderedNotifications = notificationsHeight ? notificationsHeight > 0 : false;
    var stickyNotificationsHeight = stickyNotifications ? notificationsHeight : null;
    var _r = useControllable(controlledSplitPanelPreferences, onSplitPanelPreferencesChange, undefined, {
        componentName: 'AppLayout',
        controlledProp: 'splitPanelPreferences',
        changeHandler: 'onSplitPanelPreferencesChange'
    }), splitPanelPreferences = _r[0], setSplitPanelPreferences = _r[1];
    var _s = useControllable(controlledSplitPanelOpen, onSplitPanelToggle, false, {
        componentName: 'AppLayout',
        controlledProp: 'splitPanelOpen',
        changeHandler: 'onSplitPanelToggle'
    }), _t = _s[0], splitPanelOpen = _t === void 0 ? false : _t, setSplitPanelOpen = _s[1];
    var splitPanelPosition = (splitPanelPreferences === null || splitPanelPreferences === void 0 ? void 0 : splitPanelPreferences.position) || 'bottom';
    var _u = useState({
        displayed: false,
        ariaLabel: undefined
    }), splitPanelReportedToggle = _u[0], setSplitPanelReportedToggle = _u[1];
    var splitPanelDisplayed = !!(splitPanel && (splitPanelReportedToggle.displayed || splitPanelOpen));
    var closedDrawerWidth = 40;
    var effectiveNavigationWidth = navigationHide ? 0 : navigationOpen ? navigationWidth : closedDrawerWidth;
    var effectiveToolsWidth = toolsHide && (!splitPanelDisplayed || (splitPanelPreferences === null || splitPanelPreferences === void 0 ? void 0 : splitPanelPreferences.position) !== 'side')
        ? 0
        : toolsOpen
            ? toolsWidth
            : closedDrawerWidth;
    var defaultSplitPanelSize = getSplitPanelDefaultSize(splitPanelPosition);
    var _v = useControllable(controlledSplitPanelSize, onSplitPanelResize, defaultSplitPanelSize, {
        componentName: 'AppLayout',
        controlledProp: 'splitPanelSize',
        changeHandler: 'onSplitPanelResize'
    }), _w = _v[0], splitPanelSize = _w === void 0 ? defaultSplitPanelSize : _w, setSplitPanelSize = _v[1];
    var mainContentRef = useRef(null);
    var legacyScrollRootRef = useRef(null);
    var onSplitPanelPreferencesSet = useCallback(function (detail) {
        setSplitPanelPreferences(detail);
        fireNonCancelableEvent(onSplitPanelPreferencesChange, detail);
    }, [setSplitPanelPreferences, onSplitPanelPreferencesChange]);
    var onSplitPanelSizeSet = useCallback(function (detail) {
        setSplitPanelSize(detail.size);
        fireNonCancelableEvent(onSplitPanelResize, detail);
    }, [setSplitPanelSize, onSplitPanelResize]);
    var onToggle = useCallback(function () {
        setSplitPanelOpen(!splitPanelOpen);
        fireNonCancelableEvent(onSplitPanelToggle, { open: !splitPanelOpen });
    }, [setSplitPanelOpen, splitPanelOpen, onSplitPanelToggle]);
    var getSplitPanelMaxWidth = useStableEventHandler(function () {
        if (!mainContentRef.current || !defaults.minContentWidth) {
            return NaN;
        }
        var width = parseInt(getComputedStyle(mainContentRef.current).width);
        // when disableContentPaddings is true there is less available space,
        // so we subtract space-scaled-2x-xxxl * 2 for left and right padding
        var contentPadding = disableContentPaddings ? 80 : 0;
        var spaceAvailable = width - defaults.minContentWidth - contentPadding;
        var spaceTaken = finalSplitPanePosition === 'side' ? splitPanelSize : 0;
        return Math.max(0, spaceTaken + spaceAvailable);
    });
    var getSplitPanelMaxHeight = useStableEventHandler(function () {
        if (typeof document === 'undefined') {
            return 0; // render the split panel in its minimum possible size
        }
        else if (disableBodyScroll && legacyScrollRootRef.current) {
            var availableHeight = legacyScrollRootRef.current.clientHeight;
            return availableHeight < CONSTRAINED_PAGE_HEIGHT ? availableHeight : availableHeight - MAIN_PANEL_MIN_HEIGHT;
        }
        else {
            var availableHeight = document.documentElement.clientHeight - headerHeight - footerHeight;
            return availableHeight < CONSTRAINED_PAGE_HEIGHT
                ? availableHeight - CONSTRAINED_MAIN_PANEL_MIN_HEIGHT
                : availableHeight - MAIN_PANEL_MIN_HEIGHT;
        }
    });
    var finalSplitPanePosition = isSplitpanelForcedPosition ? 'bottom' : splitPanelPosition;
    var splitPaneAvailableOnTheSide = splitPanelDisplayed && finalSplitPanePosition === 'side';
    var splitPanelOpenOnTheSide = splitPaneAvailableOnTheSide && splitPanelOpen;
    var toggleButtonsBarWidth = 0;
    var windowWidth = useWindowWidth();
    var _x = useAppLayoutOffsets(rootRef.current), leftOffset = _x.left, rightOffset = _x.right;
    var contentWidthWithSplitPanel = windowWidth -
        leftOffset -
        rightOffset -
        effectiveToolsWidth -
        effectiveNavigationWidth -
        (disableContentPaddings ? 0 : toggleButtonsBarWidth);
    useEffect(function () {
        var contentWidth = contentWidthWithSplitPanel - splitPanelSize;
        setIsSplitpanelForcedPosition(isMobile || (defaults.minContentWidth || 0) > contentWidth);
        // This is a workaround to avoid a forced position due to splitPanelSize, which is
        // user controlled variable.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentWidthWithSplitPanel, defaults.minContentWidth, isMobile]);
    var navigationClosedWidth = navigationHide || isMobile ? 0 : closedDrawerWidth;
    var toolsClosedWidth = toolsHide || isMobile ? 0 : closedDrawerWidth;
    var _y = useState(), splitPanelLastInteraction = _y[0], setSplitPanelLastInteraction = _y[1];
    useEffectOnUpdate(function () { return setSplitPanelLastInteraction(splitPanelOpen ? { type: 'open' } : { type: 'close' }); }, [splitPanelOpen]);
    useEffectOnUpdate(function () { return setSplitPanelLastInteraction({ type: 'position' }); }, [splitPanelPosition]);
    var contentMaxWidthStyle = !isMobile ? { maxWidth: defaults.maxContentWidth } : undefined;
    var _z = useState(0), splitPanelReportedSize = _z[0], setSplitPanelReportedSize = _z[1];
    var _0 = useState(0), splitPanelReportedHeaderHeight = _0[0], setSplitPanelReportedHeaderHeight = _0[1];
    var splitPanelContext = {
        topOffset: headerHeight + (finalSplitPanePosition === 'bottom' ? stickyNotificationsHeight || 0 : 0),
        bottomOffset: footerHeight,
        leftOffset: leftOffset + (isMobile ? 0 : !navigationHide && navigationOpen ? navigationWidth : navigationClosedWidth),
        rightOffset: rightOffset + (isMobile ? 0 : !toolsHide && toolsOpen ? toolsWidth : toolsClosedWidth),
        position: finalSplitPanePosition,
        size: splitPanelSize,
        getMaxWidth: getSplitPanelMaxWidth,
        getMaxHeight: getSplitPanelMaxHeight,
        disableContentPaddings: disableContentPaddings,
        contentWidthStyles: contentMaxWidthStyle,
        isOpen: splitPanelOpen,
        isMobile: isMobile,
        isForcedPosition: isSplitpanelForcedPosition,
        lastInteraction: splitPanelLastInteraction,
        onResize: onSplitPanelSizeSet,
        onToggle: onToggle,
        onPreferencesChange: onSplitPanelPreferencesSet,
        setSplitPanelToggle: setSplitPanelReportedToggle,
        reportSize: setSplitPanelReportedSize,
        reportHeaderHeight: setSplitPanelReportedHeaderHeight
    };
    var splitPanelWrapped = splitPanel && (React.createElement(SplitPanelContextProvider, { value: splitPanelContext }, splitPanel));
    var contentWrapperProps = {
        contentType: contentType,
        navigationPadding: navigationHide || !!navigationOpen,
        toolsPadding: 
        // tools padding is displayed in one of the three cases
        // 1. Nothing on the that screen edge (no tools panel and no split panel)
        (toolsHide && (!splitPanelDisplayed || finalSplitPanePosition !== 'side')) ||
            // 2. Tools panel is present and open
            toolsVisible ||
            // 3. Split panel is open in side position
            splitPanelOpenOnTheSide,
        isMobile: isMobile
    };
    var navigationRefs = useFocusControl(navigationOpen).refs;
    var _1 = useFocusControl(toolsOpen, true), toolsRefs = _1.refs, focusToolsClose = _1.setFocus, loseToolsFocus = _1.loseFocus;
    useImperativeHandle(ref, function () { return ({
        openTools: function () { return onToolsToggle(true); },
        closeNavigationIfNecessary: function () {
            if (isMobile) {
                onNavigationToggle(false);
            }
        },
        focusToolsClose: focusToolsClose
    }); }, [isMobile, onNavigationToggle, onToolsToggle, focusToolsClose]);
    var splitPanelBottomOffset = (_c = (!splitPanelDisplayed || finalSplitPanePosition !== 'bottom'
        ? undefined
        : splitPanelOpen
            ? splitPanelReportedSize
            : splitPanelReportedHeaderHeight)) !== null && _c !== void 0 ? _c : undefined;
    var contentWidthStyles = !isMobile
        ? { minWidth: defaults.minContentWidth, maxWidth: defaults.maxContentWidth }
        : undefined;
    var isToolsDrawerHidden = disableContentPaddings;
    var toolsDrawerWidth = (function () {
        if (isMobile) {
            return 0;
        }
        var toolsPanelWidth = toolsHide ? 0 : toolsOpen ? toolsWidth : closedDrawerWidth;
        var splitPanelWidth = !splitPanelDisplayed || finalSplitPanePosition !== 'side'
            ? 0
            : splitPanelOpen
                ? splitPanelReportedSize
                : closedDrawerWidth;
        return toolsPanelWidth + splitPanelWidth;
    })();
    var navigationDrawerWidth = (function () {
        if (isMobile) {
            return 0;
        }
        return effectiveNavigationWidth;
    })();
    var previousContentWidth = usePreviousFrameValue(contentWidthWithSplitPanel - (splitPanelOpenOnTheSide ? splitPanelReportedSize : 0));
    var contentScaleX = (function () {
        if (isMobile || !isMotionEnabled || !disableContentPaddings || !previousContentWidth) {
            return undefined;
        }
    })();
    return (React.createElement("div", { className: clsx(styles.root, testutilStyles.root, disableBodyScroll && styles['root-no-scroll']), ref: rootRef },
        React.createElement("div", { className: styles['layout-wrapper'], style: contentHeightStyle },
            isMobile && (!toolsHide || !navigationHide || breadcrumbs) && (React.createElement(MobileToolbar, { anyPanelOpen: anyPanelOpen, toggleRefs: { navigation: navigationRefs.toggle, tools: toolsRefs.toggle }, topOffset: headerHeight, ariaLabels: ariaLabels, navigationHide: navigationHide, toolsHide: toolsHide, onNavigationOpen: function () { return onNavigationToggle(true); }, onToolsOpen: function () { return onToolsToggle(true); }, unfocusable: anyPanelOpen }, breadcrumbs)),
            React.createElement("div", { className: clsx(styles.layout, disableBodyScroll && styles['layout-no-scroll']) },
                !navigationHide && (React.createElement(NavigationPanel, { ariaLabels: ariaLabels, footerHeight: footerHeight, headerHeight: headerHeight, isHidden: disableContentPaddings, isMobile: isMobile, isMotionEnabled: isMotionEnabled, navigation: navigation, navigationDrawerWidth: navigationDrawerWidth, navigationOpen: navigationOpen, onClick: isMobile ? onNavigationClick : undefined, onNavigationToggle: onNavigationToggle, panelHeightStyle: panelHeightStyle, toggleRefs: navigationRefs, navigationWidth: navigationWidth })),
                React.createElement("main", { ref: legacyScrollRootRef, className: clsx(styles['layout-main'], (_b = {},
                        _b[styles['layout-main-scrollable']] = disableBodyScroll,
                        _b[testutilStyles['disable-body-scroll-root']] = disableBodyScroll,
                        _b[styles.unfocusable] = isMobile && anyPanelOpen,
                        _b)) },
                    React.createElement("div", { style: {
                            marginBottom: splitPanelBottomOffset,
                            transform: contentScaleX ? "scaleX(".concat(contentScaleX, ")") : undefined
                        } },
                        notifications && (React.createElement(Notifications, { testUtilsClassName: clsx(styles.notifications, testutilStyles.notifications), labels: ariaLabels, topOffset: disableBodyScroll ? 0 : headerHeight, sticky: !isMobile && stickyNotifications, ref: notificationsRef, isMobile: isMobile, navigationPadding: contentWrapperProps.navigationPadding, toolsPadding: contentWrapperProps.toolsPadding, contentWidthStyles: contentWidthStyles }, notifications)),
                        ((!isMobile && breadcrumbs) || contentHeader) && (React.createElement(ContentWrapper, __assign({}, contentWrapperProps, { contentWidthStyles: contentWidthStyles }),
                            !isMobile && breadcrumbs && (React.createElement("div", { className: clsx(styles.breadcrumbs, testutilStyles.breadcrumbs, styles['breadcrumbs-desktop']) }, breadcrumbs)),
                            contentHeader && (React.createElement("div", { className: clsx(styles['content-header-wrapper'], !hasRenderedNotifications &&
                                    (isMobile || !breadcrumbs) &&
                                    styles['content-extra-top-padding'], !hasRenderedNotifications && !breadcrumbs && styles['content-header-wrapper-first-child'], !disableContentHeaderOverlap && styles['content-header-wrapper-overlapped']) }, contentHeader)))),
                        React.createElement(ContentWrapper, __assign({}, contentWrapperProps, { ref: mainContentRef, disablePaddings: disableContentPaddings, 
                            // eslint-disable-next-line react/forbid-component-props
                            className: clsx(!disableContentPaddings && styles['content-wrapper'], !disableContentPaddings &&
                                (isMobile || !breadcrumbs) &&
                                !contentHeader &&
                                styles['content-extra-top-padding'], !hasRenderedNotifications &&
                                !breadcrumbs &&
                                !isMobile &&
                                !contentHeader &&
                                styles['content-wrapper-first-child']) }),
                            React.createElement("div", { className: clsx(styles.content, testutilStyles.content, !disableContentHeaderOverlap && contentHeader && styles['content-overlapped']), style: contentWidthStyles },
                                React.createElement(AppLayoutContext.Provider, { value: {
                                        stickyOffsetTop: (disableBodyScroll ? 0 : headerHeight) +
                                            (stickyNotificationsHeight !== null ? stickyNotificationsHeight : 0),
                                        stickyOffsetBottom: footerHeight + (splitPanelBottomOffset || 0),
                                        hasBreadcrumbs: !!breadcrumbs
                                    } }, content)))),
                    finalSplitPanePosition === 'bottom' && splitPanelWrapped),
                React.createElement(ToolsAndSplitPanel, { splitPanel: finalSplitPanePosition === 'side' ? splitPanelWrapped : undefined, ariaLabels: ariaLabels, closedDrawerWidth: closedDrawerWidth, contentHeightStyle: contentHeightStyle, disableContentPaddings: disableContentPaddings, drawerWidth: toolsDrawerWidth, footerHeight: footerHeight, headerHeight: headerHeight, isHidden: isToolsDrawerHidden, isMobile: isMobile, isMotionEnabled: isMotionEnabled, onToolsToggle: onToolsToggle, panelHeightStyle: panelHeightStyle, splitPanelOpen: splitPanelOpenOnTheSide, splitPanelReportedSize: splitPanelReportedSize, toggleRefs: toolsRefs, onLoseToolsFocus: loseToolsFocus, tools: tools, toolsHide: Boolean(toolsHide), toolsOpen: toolsOpen, toolsWidth: toolsWidth })))));
});
applyDisplayName(AppLayout, 'AppLayout');
export default AppLayout;
//# sourceMappingURL=index.js.map