import { __assign, __rest, __spreadArray } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styles from './styles.css.js';
import clsx from 'clsx';
import InternalIcon from '../icon/internal';
import InternalButtonDropdown from '../button-dropdown/internal';
import { InternalButton } from '../button/internal';
import { BreadcrumbItem } from './item/item';
import { fireCancelableEvent } from '../internal/events';
import { getBaseProps } from '../internal/base-component';
import { useMobile } from '../internal/hooks/use-mobile';
import { checkSafeUrl } from '../internal/utils/check-safe-url';
var DropdownTrigger = function (clickHandler, ref, isDisabled, isExpanded, ariaLabel) {
    return (React.createElement(InternalButton, { disabled: isDisabled, onClick: function (event) {
            event.preventDefault();
            clickHandler();
        }, ref: ref, ariaExpanded: isExpanded, "aria-haspopup": true, ariaLabel: ariaLabel, variant: "breadcrumb-group", formAction: "none" }, "..."));
};
var EllipsisDropdown = function (_a) {
    var ariaLabel = _a.ariaLabel, dropdownItems = _a.dropdownItems, onDropdownItemClick = _a.onDropdownItemClick, onDropdownItemFollow = _a.onDropdownItemFollow;
    return (React.createElement("li", { className: styles.ellipsis },
        React.createElement(InternalButtonDropdown, { ariaLabel: ariaLabel, items: dropdownItems, onItemClick: onDropdownItemClick, onItemFollow: onDropdownItemFollow, customTriggerBuilder: DropdownTrigger }),
        React.createElement("span", { className: styles.icon },
            React.createElement(InternalIcon, { name: "angle-right" }))));
};
export var getEventDetail = function (item) { return ({
    item: item,
    text: item.text,
    href: item.href
}); };
export default function InternalBreadcrumbGroup(_a) {
    var _b = _a.items, items = _b === void 0 ? [] : _b, ariaLabel = _a.ariaLabel, expandAriaLabel = _a.expandAriaLabel, onClick = _a.onClick, onFollow = _a.onFollow, __internalRootRef = _a.__internalRootRef, props = __rest(_a, ["items", "ariaLabel", "expandAriaLabel", "onClick", "onFollow", "__internalRootRef"]);
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        checkSafeUrl('BreadcrumbGroup', item.href);
    }
    var baseProps = getBaseProps(props);
    var isMobile = useMobile();
    var breadcrumbItems = items.map(function (item, index) {
        return (React.createElement("li", { className: styles.item, key: index },
            React.createElement(BreadcrumbItem, { item: item, onClick: onClick, onFollow: onFollow, isCompressed: isMobile, isLast: index === items.length - 1, isDisplayed: !isMobile || index === items.length - 1 || index === 0 })));
    });
    var getEventItem = function (e) {
        var id = e.detail.id;
        return items[parseInt(id)];
    };
    // Add ellipsis
    if (breadcrumbItems.length >= 3) {
        var dropdownItems = items
            .slice(1, items.length - 1)
            .map(function (item, index) { return ({
            id: (index + 1).toString(),
            text: item.text,
            href: item.href || '#'
        }); });
        breadcrumbItems = __spreadArray([
            breadcrumbItems[0],
            React.createElement(EllipsisDropdown, { key: 'ellipsis', ariaLabel: expandAriaLabel, dropdownItems: dropdownItems, onDropdownItemClick: function (e) { return fireCancelableEvent(onClick, getEventDetail(getEventItem(e)), e); }, onDropdownItemFollow: function (e) { return fireCancelableEvent(onFollow, getEventDetail(getEventItem(e)), e); } })
        ], breadcrumbItems.slice(1), true);
    }
    return (React.createElement("nav", __assign({}, baseProps, { className: clsx(styles['breadcrumb-group'], isMobile && styles.mobile, baseProps.className), "aria-label": ariaLabel || undefined, ref: __internalRootRef }),
        React.createElement("ol", { className: styles['breadcrumb-group-list'] }, breadcrumbItems)));
}
//# sourceMappingURL=internal.js.map