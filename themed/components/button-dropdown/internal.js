import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
import { getBaseProps } from '../internal/base-component';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import Dropdown from '../internal/components/dropdown';
import ItemsList from './items-list';
import { useButtonDropdown } from './utils/use-button-dropdown';
import OptionsList from '../internal/components/options-list';
import { InternalButton } from '../button/internal';
import { useMobile } from '../internal/hooks/use-mobile';
import useForwardFocus from '../internal/hooks/forward-focus';
import InternalBox from '../box/internal';
import { checkSafeUrl } from '../internal/utils/check-safe-url';
var InternalButtonDropdown = React.forwardRef(function (_a, ref) {
    var items = _a.items, _b = _a.variant, variant = _b === void 0 ? 'normal' : _b, _c = _a.loading, loading = _c === void 0 ? false : _c, loadingText = _a.loadingText, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.expandableGroups, expandableGroups = _e === void 0 ? false : _e, children = _a.children, onItemClick = _a.onItemClick, onItemFollow = _a.onItemFollow, customTriggerBuilder = _a.customTriggerBuilder, expandToViewport = _a.expandToViewport, ariaLabel = _a.ariaLabel, title = _a.title, description = _a.description, preferCenter = _a.preferCenter, __internalRootRef = _a.__internalRootRef, props = __rest(_a, ["items", "variant", "loading", "loadingText", "disabled", "expandableGroups", "children", "onItemClick", "onItemFollow", "customTriggerBuilder", "expandToViewport", "ariaLabel", "title", "description", "preferCenter", "__internalRootRef"]);
    var isInRestrictedView = useMobile();
    var dropdownId = useUniqueId('dropdown');
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        checkSafeUrl('ButtonDropdown', item.href);
    }
    var _f = useButtonDropdown({
        items: items,
        onItemClick: onItemClick,
        onItemFollow: onItemFollow,
        onReturnFocus: function () { var _a; return (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.focus(); },
        expandToViewport: expandToViewport,
        hasExpandableGroups: expandableGroups,
        isInRestrictedView: isInRestrictedView
    }), isOpen = _f.isOpen, targetItem = _f.targetItem, isHighlighted = _f.isHighlighted, isKeyboardHighlight = _f.isKeyboardHighlight, isExpanded = _f.isExpanded, highlightItem = _f.highlightItem, onKeyDown = _f.onKeyDown, onKeyUp = _f.onKeyUp, onItemActivate = _f.onItemActivate, onGroupToggle = _f.onGroupToggle, toggleDropdown = _f.toggleDropdown, setIsUsingMouse = _f.setIsUsingMouse;
    var handleMouseEvent = function () {
        setIsUsingMouse(true);
    };
    var baseProps = getBaseProps(props);
    var dropdownRef = useRef(null);
    useForwardFocus(ref, dropdownRef);
    var clickHandler = function () {
        if (!loading && !disabled) {
            // Prevent moving highlight on mobiles to avoid disabled state reason popup if defined.
            toggleDropdown({ moveHighlightOnOpen: !isInRestrictedView });
        }
    };
    var canBeOpened = !loading && !disabled;
    var triggerVariant = variant === 'navigation' ? undefined : variant;
    var iconProps = variant === 'icon'
        ? {
            iconName: 'ellipsis'
        }
        : {
            iconName: 'caret-down-filled',
            iconAlign: 'right',
            __iconClass: canBeOpened && isOpen ? styles['rotate-up'] : styles['rotate-down']
        };
    var trigger = customTriggerBuilder ? (customTriggerBuilder(clickHandler, dropdownRef, disabled, isOpen, ariaLabel)) : (React.createElement(InternalButton, __assign({ ref: dropdownRef }, iconProps, { variant: triggerVariant, loading: loading, loadingText: loadingText, disabled: disabled, onClick: function (event) {
            event.preventDefault();
            clickHandler();
        }, ariaLabel: ariaLabel, "aria-haspopup": true, ariaExpanded: canBeOpened && isOpen, formAction: "none" }), children));
    var hasHeader = title || description;
    var headerId = useUniqueId('awsui-button-dropdown__header');
    return (React.createElement("div", __assign({}, baseProps, { onKeyDown: onKeyDown, onKeyUp: onKeyUp, onMouseDown: handleMouseEvent, onMouseMove: handleMouseEvent, className: clsx(styles['button-dropdown'], styles["variant-".concat(variant)], baseProps.className), "aria-owns": expandToViewport && isOpen ? dropdownId : undefined, ref: __internalRootRef }),
        React.createElement(Dropdown, { open: canBeOpened && isOpen, stretchWidth: false, stretchTriggerHeight: variant === 'navigation', expandToViewport: expandToViewport, preferCenter: preferCenter, onDropdownClose: function () { return toggleDropdown(); }, trigger: trigger, dropdownId: dropdownId },
            hasHeader && (React.createElement("div", { className: styles.header, id: headerId },
                title && (React.createElement("div", { className: styles.title },
                    React.createElement(InternalBox, { fontSize: "heading-s", fontWeight: "bold", color: "inherit", tagOverride: "h2", margin: { vertical: 'n', horizontal: 'n' } }, title))),
                description && (React.createElement(InternalBox, { fontSize: "body-s" },
                    React.createElement("span", { className: styles.description }, description))))),
            React.createElement(OptionsList, { open: canBeOpened && isOpen, position: "static", role: "menu", decreaseTopMargin: true, ariaLabelledby: hasHeader ? headerId : undefined },
                React.createElement(ItemsList, { items: items, onItemActivate: onItemActivate, onGroupToggle: onGroupToggle, hasExpandableGroups: expandableGroups, targetItem: targetItem, isHighlighted: isHighlighted, isKeyboardHighlight: isKeyboardHighlight, isExpanded: isExpanded, highlightItem: highlightItem, expandToViewport: expandToViewport, variant: variant })))));
});
export default InternalButtonDropdown;
//# sourceMappingURL=internal.js.map