import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { getBaseProps } from '../internal/base-component';
import { fireCancelableEvent, isPlainLeftClick } from '../internal/events';
import VisualContext from '../internal/components/visual-context';
import Portal from '../internal/components/portal';
import useFocusVisible from '../internal/hooks/focus-visible';
import { useEffectOnUpdate } from '../internal/hooks/use-effect-on-update';
import { useTopNavigation } from './use-top-navigation.js';
import Utility from './parts/utility';
import OverflowMenu from './parts/overflow-menu';
import { ButtonTrigger } from '../internal/components/menu-dropdown';
import styles from './styles.css.js';
import { checkSafeUrl } from '../internal/utils/check-safe-url';
export default function InternalTopNavigation(_a) {
    var __internalRootRef = _a.__internalRootRef, identity = _a.identity, i18nStrings = _a.i18nStrings, utilities = _a.utilities, search = _a.search, restProps = __rest(_a, ["__internalRootRef", "identity", "i18nStrings", "utilities", "search"]);
    checkSafeUrl('TopNavigation', identity.href);
    var baseProps = getBaseProps(restProps);
    var _b = useTopNavigation({ identity: identity, search: search, utilities: utilities }), mainRef = _b.mainRef, virtualRef = _b.virtualRef, breakpoint = _b.breakpoint, responsiveState = _b.responsiveState, isSearchExpanded = _b.isSearchExpanded, onSearchUtilityClick = _b.onSearchUtilityClick;
    var _c = useState(false), overflowMenuOpen = _c[0], setOverflowMenuOpen = _c[1];
    var overflowMenuTriggerRef = useRef(null);
    var isNarrowViewport = breakpoint === 'default';
    var isMediumViewport = breakpoint === 'xxs';
    var isLargeViewport = breakpoint === 's';
    var onIdentityClick = function (event) {
        if (isPlainLeftClick(event)) {
            fireCancelableEvent(identity.onFollow, {}, event);
        }
    };
    var toggleOverflowMenu = function () {
        setOverflowMenuOpen(function (overflowMenuOpen) { return !overflowMenuOpen; });
    };
    var focusVisible = useFocusVisible();
    var menuTriggerVisible = !isSearchExpanded && responsiveState.hideUtilities;
    useEffect(function () {
        setOverflowMenuOpen(false);
    }, [menuTriggerVisible]);
    useEffectOnUpdate(function () {
        var _a;
        if (!overflowMenuOpen) {
            (_a = overflowMenuTriggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [overflowMenuOpen]);
    // Render the top nav twice; once as the top nav that users can see, and another
    // "virtual" top nav used just for calculations. The virtual top nav doesn't react to
    // layout changes and renders two sets of utilities: one with labels and one without.
    var content = function (isVirtual) {
        var _a, _b, _c, _d;
        var _e, _f;
        var Wrapper = isVirtual ? 'div' : 'header';
        var showIdentity = isVirtual || !isSearchExpanded;
        var showTitle = isVirtual || !responsiveState.hideTitle;
        var showSearchSlot = search && (isVirtual || !responsiveState.hideSearch || isSearchExpanded);
        var showSearchUtility = isVirtual || (search && responsiveState.hideSearch);
        var showUtilities = isVirtual || !isSearchExpanded;
        var showMenuTrigger = isVirtual || menuTriggerVisible;
        return (React.createElement(Wrapper, { ref: isVirtual ? virtualRef : mainRef, "aria-hidden": isVirtual ? true : undefined, 
            // Wrapper is an alias for "div" or "header".
            // eslint-disable-next-line react/forbid-component-props
            className: clsx(styles['top-navigation'], (_a = {},
                _a[styles.virtual] = isVirtual,
                _a[styles.hidden] = isVirtual,
                _a[styles.narrow] = isNarrowViewport,
                _a[styles.medium] = isMediumViewport,
                _a)) },
            React.createElement("div", { className: styles['padding-box'] },
                showIdentity && (React.createElement("div", { className: clsx(styles.identity, !identity.logo && styles['no-logo']) },
                    React.createElement("a", __assign({}, focusVisible, { className: styles['identity-link'], href: identity.href, onClick: onIdentityClick }),
                        identity.logo && (React.createElement("img", { role: "img", src: (_e = identity.logo) === null || _e === void 0 ? void 0 : _e.src, alt: (_f = identity.logo) === null || _f === void 0 ? void 0 : _f.alt, className: clsx(styles.logo, (_b = {},
                                _b[styles.narrow] = isNarrowViewport,
                                _b)) })),
                        showTitle && React.createElement("span", { className: styles.title }, identity.title)))),
                showSearchSlot && (React.createElement("div", { className: styles.inputs },
                    React.createElement("div", { className: clsx(styles.search, !isVirtual && isSearchExpanded && styles['search-expanded']) }, search))),
                React.createElement("div", { className: styles.utilities },
                    showSearchUtility && (React.createElement("div", { className: clsx(styles['utility-wrapper'], styles['utility-type-button'], styles['utility-type-button-link'], (_c = {},
                            _c[styles.narrow] = isNarrowViewport,
                            _c[styles.medium] = isMediumViewport,
                            _c)), "data-utility-special": "search" },
                        React.createElement(Utility, { hideText: true, definition: {
                                type: 'button',
                                iconName: isSearchExpanded ? 'close' : 'search',
                                ariaLabel: isSearchExpanded
                                    ? i18nStrings.searchDismissIconAriaLabel
                                    : i18nStrings.searchIconAriaLabel,
                                onClick: onSearchUtilityClick
                            } }))),
                    showUtilities &&
                        utilities
                            .filter(function (_utility, i) {
                            return isVirtual || !responsiveState.hideUtilities || responsiveState.hideUtilities.indexOf(i) === -1;
                        })
                            .map(function (utility, i) {
                            var _a;
                            var _b;
                            var hideText = !!responsiveState.hideUtilityText;
                            var isLast = (isVirtual || !showMenuTrigger) && i === utilities.length - 1;
                            var offsetRight = isLast && isLargeViewport ? 'xxl' : isLast ? 'l' : undefined;
                            return (React.createElement("div", { key: i, className: clsx(styles['utility-wrapper'], styles["utility-type-".concat(utility.type)], utility.type === 'button' && styles["utility-type-button-".concat((_b = utility.variant) !== null && _b !== void 0 ? _b : 'link')], (_a = {},
                                    _a[styles.narrow] = isNarrowViewport,
                                    _a[styles.medium] = isMediumViewport,
                                    _a)), "data-utility-index": i, "data-utility-hide": "".concat(hideText) },
                                React.createElement(Utility, { hideText: hideText, definition: utility, offsetRight: offsetRight })));
                        }),
                    isVirtual &&
                        utilities.map(function (utility, i) {
                            var _a;
                            var _b;
                            var hideText = !responsiveState.hideUtilityText;
                            var isLast = !showMenuTrigger && i === utilities.length - 1;
                            var offsetRight = isLast && isLargeViewport ? 'xxl' : isLast ? 'l' : undefined;
                            return (React.createElement("div", { key: i, className: clsx(styles['utility-wrapper'], styles["utility-type-".concat(utility.type)], utility.type === 'button' && styles["utility-type-button-".concat((_b = utility.variant) !== null && _b !== void 0 ? _b : 'link')], (_a = {},
                                    _a[styles.narrow] = isNarrowViewport,
                                    _a[styles.medium] = isMediumViewport,
                                    _a)), "data-utility-index": i, "data-utility-hide": "".concat(hideText) },
                                React.createElement(Utility, { hideText: hideText, definition: utility, offsetRight: offsetRight })));
                        }),
                    showMenuTrigger && (React.createElement("div", { className: clsx(styles['utility-wrapper'], styles['utility-type-menu-dropdown'], (_d = {},
                            _d[styles.narrow] = isNarrowViewport,
                            _d[styles.medium] = isMediumViewport,
                            _d)), "data-utility-special": "menu-trigger" },
                        React.createElement(ButtonTrigger, { expanded: overflowMenuOpen, onClick: toggleOverflowMenu, offsetRight: "l", ref: !isVirtual ? overflowMenuTriggerRef : undefined }, i18nStrings.overflowMenuTriggerText)))))));
    };
    return (React.createElement("div", __assign({}, baseProps, { ref: __internalRootRef }),
        React.createElement(VisualContext, { contextName: "top-navigation" },
            content(false),
            React.createElement(Portal, null, content(true)),
            menuTriggerVisible && overflowMenuOpen && (React.createElement("div", { className: styles['overflow-menu-drawer'] },
                React.createElement(OverflowMenu, { headerText: i18nStrings.overflowMenuTitleText, dismissIconAriaLabel: i18nStrings.overflowMenuDismissIconAriaLabel, backIconAriaLabel: i18nStrings.overflowMenuBackIconAriaLabel, items: utilities.filter(function (utility, i) {
                        return (!responsiveState.hideUtilities || responsiveState.hideUtilities.indexOf(i) !== -1) &&
                            !utility.disableUtilityCollapse;
                    }), onClose: toggleOverflowMenu }))))));
}
//# sourceMappingURL=internal.js.map