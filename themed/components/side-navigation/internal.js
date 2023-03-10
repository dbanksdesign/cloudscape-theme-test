import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import InternalExpandableSection from '../expandable-section/internal';
import InternalIcon from '../icon/internal';
import InternalBox from '../box/internal';
import styles from './styles.css.js';
import { isPlainLeftClick } from '../internal/events';
import useFocusVisible from '../internal/hooks/focus-visible';
import { hasActiveLink } from './util';
import { checkSafeUrl } from '../internal/utils/check-safe-url';
export function Header(_a) {
    var _b, _c;
    var definition = _a.definition, activeHref = _a.activeHref, fireFollow = _a.fireFollow;
    checkSafeUrl('SideNavigation', definition.href);
    var focusVisible = useFocusVisible();
    var onClick = useCallback(function (event) {
        if (isPlainLeftClick(event)) {
            fireFollow(definition, event);
        }
    }, [fireFollow, definition]);
    return (React.createElement(React.Fragment, null,
        React.createElement("h2", { className: styles.header },
            React.createElement("a", __assign({}, focusVisible, { href: definition.href, className: clsx(styles['header-link'], (_b = {}, _b[styles['header-link--has-logo']] = !!definition.logo, _b)), "aria-current": definition.href === activeHref ? 'page' : undefined, onClick: onClick }),
                definition.logo && (React.createElement("img", __assign({ className: clsx(styles['header-logo'], (_c = {},
                        _c[styles['header-logo--stretched']] = !definition.text,
                        _c)) }, definition.logo))),
                React.createElement("span", { className: styles['header-link-text'] }, definition.text))),
        React.createElement(Divider, { variant: "header" })));
}
export function ItemList(_a) {
    var variant = _a.variant, items = _a.items, activeHref = _a.activeHref, fireChange = _a.fireChange, fireFollow = _a.fireFollow;
    return (React.createElement("ul", { className: clsx(styles.list, styles["list-variant-".concat(variant)]) }, items.map(function (item, i) { return (React.createElement("li", { key: i, className: styles['list-item'] },
        item.type === 'link' && (React.createElement(Link, { definition: item, activeHref: activeHref, fireChange: fireChange, fireFollow: fireFollow })),
        item.type === 'section' && (React.createElement(Section, { definition: item, activeHref: activeHref, fireChange: fireChange, fireFollow: fireFollow, variant: variant })),
        item.type === 'section-group' && (React.createElement(SectionGroup, { definition: item, activeHref: activeHref, fireChange: fireChange, fireFollow: fireFollow })),
        item.type === 'link-group' && (React.createElement(LinkGroup, { definition: item, activeHref: activeHref, fireChange: fireChange, fireFollow: fireFollow })),
        item.type === 'expandable-link-group' && (React.createElement(ExpandableLinkGroup, { definition: item, activeHref: activeHref, fireChange: fireChange, fireFollow: fireFollow, variant: variant })),
        ((i === 0 && item.type === 'divider') || (items[i + 1] && items[i + 1].type === 'divider')) && (React.createElement(Divider, { variant: "default" })))); })));
}
function Divider(_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'default' : _b;
    return React.createElement("hr", { className: clsx(styles.divider, styles["divider-".concat(variant)]) });
}
function Link(_a) {
    var _b;
    var definition = _a.definition, expanded = _a.expanded, activeHref = _a.activeHref, fireFollow = _a.fireFollow;
    checkSafeUrl('SideNavigation', definition.href);
    var isActive = definition.href === activeHref;
    var focusVisible = useFocusVisible();
    var onClick = useCallback(function (event) {
        // Prevent the click event from toggling outer expandable sections.
        event.stopPropagation();
        if (isPlainLeftClick(event)) {
            fireFollow(definition, event);
        }
    }, [fireFollow, definition]);
    return (React.createElement(React.Fragment, null,
        React.createElement("a", __assign({}, focusVisible, { href: definition.href, className: clsx(styles.link, (_b = {}, _b[styles['link-active']] = isActive, _b)), target: definition.external ? '_blank' : undefined, rel: definition.external ? 'noopener noreferrer' : undefined, "aria-expanded": expanded, "aria-current": definition.href === activeHref ? 'page' : undefined, onClick: onClick }),
            definition.text,
            definition.external && (React.createElement("span", { "aria-label": definition.externalIconAriaLabel, role: definition.externalIconAriaLabel ? 'img' : undefined },
                React.createElement(InternalIcon, { name: "external", className: styles['external-icon'] })))),
        definition.info && React.createElement("span", { className: styles.info }, definition.info)));
}
function Section(_a) {
    var _b;
    var definition = _a.definition, activeHref = _a.activeHref, fireFollow = _a.fireFollow, fireChange = _a.fireChange, variant = _a.variant;
    var _c = useState((_b = definition.defaultExpanded) !== null && _b !== void 0 ? _b : true), expanded = _c[0], setExpanded = _c[1];
    var onExpandedChange = useCallback(function (e) {
        fireChange(definition, e.detail.expanded);
        setExpanded(e.detail.expanded);
    }, [definition, fireChange]);
    useEffect(function () {
        var _a;
        setExpanded((_a = definition.defaultExpanded) !== null && _a !== void 0 ? _a : true);
    }, [definition]);
    return (React.createElement(InternalExpandableSection, { variant: "footer", expanded: expanded, onChange: onExpandedChange, className: clsx(styles.section, variant === 'section-group' && styles['section--no-ident']), headerText: definition.text },
        React.createElement(ItemList, { variant: "section", items: definition.items, fireFollow: fireFollow, fireChange: fireChange, activeHref: activeHref })));
}
function SectionGroup(_a) {
    var definition = _a.definition, activeHref = _a.activeHref, fireFollow = _a.fireFollow, fireChange = _a.fireChange;
    return (React.createElement("div", { className: styles['section-group'] },
        React.createElement(InternalBox, { className: styles['section-group-title'], variant: "h3" }, definition.title),
        React.createElement(ItemList, { variant: "section-group", items: definition.items, fireFollow: fireFollow, fireChange: fireChange, activeHref: activeHref })));
}
function LinkGroup(_a) {
    var definition = _a.definition, activeHref = _a.activeHref, fireFollow = _a.fireFollow, fireChange = _a.fireChange;
    checkSafeUrl('SideNavigation', definition.href);
    return (React.createElement(React.Fragment, null,
        React.createElement(Link, { definition: { type: 'link', href: definition.href, text: definition.text }, fireFollow: function (_, event) { return fireFollow(definition, event); }, fireChange: fireChange, activeHref: activeHref }),
        React.createElement(ItemList, { variant: "link-group", items: definition.items, fireFollow: fireFollow, fireChange: fireChange, activeHref: activeHref })));
}
function ExpandableLinkGroup(_a) {
    var definition = _a.definition, fireFollow = _a.fireFollow, fireChange = _a.fireChange, activeHref = _a.activeHref, variant = _a.variant;
    // Check whether the definition contains an active link and memoize it to avoid
    // rechecking every time.
    var containsActiveLink = useMemo(function () {
        return activeHref ? hasActiveLink(definition.items, activeHref) : false;
    }, [activeHref, definition.items]);
    var _b = useState(function () {
        var _a;
        return (_a = definition.defaultExpanded) !== null && _a !== void 0 ? _a : (definition.href === activeHref || containsActiveLink);
    }), expanded = _b[0], setExpanded = _b[1];
    var _c = useState(), userExpanded = _c[0], setUserExpanded = _c[1];
    // Reset user expansion status when the items property is updated.
    useEffect(function () { return setUserExpanded(undefined); }, [definition]);
    // By default, the expandable section is open when there's an active link inside.
    useEffect(function () {
        setExpanded(definition.href === activeHref || containsActiveLink);
    }, [definition.href, containsActiveLink, activeHref]);
    // If the definition object itself is updated, reset the expansion state to default.
    useEffect(function () {
        if (definition.defaultExpanded !== undefined) {
            setExpanded(definition.defaultExpanded);
        }
    }, [definition]);
    var onExpandedChange = useCallback(function (e) {
        fireChange(definition, e.detail.expanded);
        setUserExpanded(e.detail.expanded);
    }, [definition, fireChange]);
    var onHeaderFollow = function (_, event) {
        fireFollow(definition, event);
        setUserExpanded(true);
        if (!expanded) {
            fireChange(definition, true);
        }
    };
    return (React.createElement(InternalExpandableSection, { className: clsx(styles['expandable-link-group'], variant === 'section-group' && styles['expandable-link-group--no-ident']), variant: "navigation", expanded: userExpanded !== null && userExpanded !== void 0 ? userExpanded : expanded, onChange: onExpandedChange, headerText: React.createElement(Link, { definition: { type: 'link', href: definition.href, text: definition.text }, expanded: userExpanded !== null && userExpanded !== void 0 ? userExpanded : expanded, fireFollow: onHeaderFollow, fireChange: fireChange, activeHref: activeHref }) },
        React.createElement(ItemList, { variant: "expandable-link-group", items: definition.items, fireFollow: fireFollow, fireChange: fireChange, activeHref: activeHref })));
}
//# sourceMappingURL=internal.js.map