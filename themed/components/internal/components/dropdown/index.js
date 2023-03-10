import { __spreadArray } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import styles from './styles.css.js';
import clsx from 'clsx';
import { useMergeRefs } from '../../hooks/use-merge-refs';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { fireNonCancelableEvent } from '../../events';
import { calculatePosition } from './dropdown-fit-handler';
import { Transition } from '../transition';
import { useVisualRefresh } from '../../hooks/use-visual-mode';
import { usePortalModeClasses } from '../../hooks/use-portal-mode-classes';
import { DropdownContextProvider } from './context';
import { useMobile } from '../../hooks/use-mobile';
import TabTrap from '../tab-trap/index.js';
import { getFirstFocusable, getLastFocusable } from '../focus-lock/utils.js';
var DropdownContainer = function (_a) {
    var children = _a.children, _b = _a.renderWithPortal, renderWithPortal = _b === void 0 ? false : _b, id = _a.id, open = _a.open;
    if (renderWithPortal) {
        if (open) {
            return createPortal(React.createElement("div", { id: id }, children), document.body);
        }
        else {
            return null;
        }
    }
    else {
        return React.createElement(React.Fragment, null, children);
    }
};
var TransitionContent = function (_a) {
    var _b;
    var state = _a.state, transitionRef = _a.transitionRef, dropdownClasses = _a.dropdownClasses, stretchWidth = _a.stretchWidth, interior = _a.interior, isRefresh = _a.isRefresh, dropdownRef = _a.dropdownRef, verticalContainerRef = _a.verticalContainerRef, expandToViewport = _a.expandToViewport, header = _a.header, children = _a.children, footer = _a.footer, position = _a.position, open = _a.open, onMouseDown = _a.onMouseDown;
    var contentRef = useMergeRefs(dropdownRef, transitionRef);
    return (React.createElement("div", { className: clsx(styles.dropdown, dropdownClasses, (_b = {},
            _b[styles.open] = open,
            _b[styles['with-limited-width']] = !stretchWidth,
            _b[styles['hide-upper-border']] = stretchWidth,
            _b[styles.interior] = interior,
            _b[styles['is-empty']] = !header && !children,
            _b[styles.refresh] = isRefresh,
            _b[styles['use-portal']] = expandToViewport && !interior,
            _b)), ref: contentRef, "data-open": open, "data-animating": state !== 'exited', "aria-hidden": !open, onMouseDown: onMouseDown },
        React.createElement("div", { className: clsx(styles['dropdown-content-wrapper'], isRefresh && styles.refresh) },
            React.createElement("div", { className: styles['ie11-wrapper'] },
                React.createElement("div", { ref: verticalContainerRef, className: styles['dropdown-content'] },
                    React.createElement(DropdownContextProvider, { position: position },
                        header,
                        children,
                        footer))))));
};
var Dropdown = function (_a) {
    var children = _a.children, trigger = _a.trigger, open = _a.open, onDropdownClose = _a.onDropdownClose, onMouseDown = _a.onMouseDown, header = _a.header, footer = _a.footer, dropdownId = _a.dropdownId, _b = _a.stretchTriggerHeight, stretchTriggerHeight = _b === void 0 ? false : _b, _c = _a.stretchWidth, stretchWidth = _c === void 0 ? true : _c, _d = _a.stretchHeight, stretchHeight = _d === void 0 ? false : _d, _e = _a.stretchToTriggerWidth, stretchToTriggerWidth = _e === void 0 ? true : _e, _f = _a.expandToViewport, expandToViewport = _f === void 0 ? false : _f, _g = _a.preferCenter, preferCenter = _g === void 0 ? false : _g, _h = _a.interior, interior = _h === void 0 ? false : _h, minWidth = _a.minWidth, _j = _a.scrollable, scrollable = _j === void 0 ? true : _j, _k = _a.loopFocus, loopFocus = _k === void 0 ? expandToViewport : _k, onFocus = _a.onFocus, onBlur = _a.onBlur, contentKey = _a.contentKey;
    var wrapperRef = useRef(null);
    var triggerRef = useRef(null);
    var dropdownRef = useRef(null);
    var dropdownContainerRef = useRef(null);
    // This container is only needed to apply max-height to. We can't move max-height to it's parent
    // because of an IE11 issue with flexbox. https://github.com/philipwalton/flexbugs/issues/216
    var verticalContainerRef = useRef(null);
    // To keep track of the initial position (drop up/down) which is kept the same during fixed repositioning
    var fixedPosition = useRef(null);
    var isRefresh = useVisualRefresh();
    var dropdownClasses = usePortalModeClasses(triggerRef);
    var _l = useState('bottom-right'), position = _l[0], setPosition = _l[1];
    var isMobile = useMobile();
    var setDropdownPosition = function (position, triggerBox, target, verticalContainer) {
        var entireWidth = !interior && stretchWidth;
        if (!stretchWidth) {
            // 1px offset for dropdowns where the dropdown itself needs a border, rather than on the items
            verticalContainer.style.maxHeight = "".concat(parseInt(position.height) + 1, "px");
        }
        else {
            verticalContainer.style.maxHeight = position.height;
        }
        if (entireWidth && !expandToViewport) {
            if (stretchToTriggerWidth) {
                target.classList.add(styles['occupy-entire-width']);
            }
        }
        else {
            target.style.width = position.width;
        }
        // Using styles for main dropdown to adjust its position as preferred alternative
        if (position.dropUp && !interior) {
            target.classList.add(styles['dropdown-drop-up']);
            if (!expandToViewport) {
                target.style.bottom = '100%';
            }
        }
        else {
            target.classList.remove(styles['dropdown-drop-up']);
        }
        target.classList.add(position.dropLeft ? styles['dropdown-drop-left'] : styles['dropdown-drop-right']);
        if (position.left && position.left !== 'auto') {
            target.style.left = position.left;
        }
        // Position normal overflow dropdowns with fixed positioning relative to viewport
        if (expandToViewport && !interior) {
            target.style.position = 'fixed';
            if (position.dropUp) {
                target.style.bottom = "calc(100% - ".concat(triggerBox.top, "px)");
            }
            else {
                target.style.top = "".concat(triggerBox.bottom, "px");
            }
            if (position.dropLeft) {
                target.style.left = "calc(".concat(triggerBox.right, "px - ").concat(position.width, ")");
            }
            else {
                target.style.left = "".concat(triggerBox.left, "px");
            }
            // Keep track of the initial dropdown position and direction.
            // Dropdown direction doesn't need to change as the user scrolls, just needs to stay attached to the trigger.
            fixedPosition.current = position;
            return;
        }
        // For an interior dropdown (the fly out) we need exact values for positioning
        // and classes are not enough
        // usage of relative position is impossible due to overwrite of overflow-x
        if (interior && isInteriorPosition(position)) {
            if (position.dropUp) {
                target.style.bottom = position.bottom;
            }
            else {
                target.style.top = position.top;
            }
            target.style.left = position.left;
        }
        if (position.dropUp && position.dropLeft) {
            setPosition('top-left');
        }
        else if (position.dropUp) {
            setPosition('top-right');
        }
        else if (position.dropLeft) {
            setPosition('bottom-left');
        }
        else {
            setPosition('bottom-right');
        }
    };
    var isOutsideDropdown = function (element) {
        return (!wrapperRef.current || !wrapperRef.current.contains(element)) &&
            (!dropdownContainerRef.current || !dropdownContainerRef.current.contains(element));
    };
    var focusHandler = function (event) {
        if (!event.relatedTarget || isOutsideDropdown(event.relatedTarget)) {
            fireNonCancelableEvent(onFocus, event);
        }
    };
    var blurHandler = function (event) {
        if (!event.relatedTarget || isOutsideDropdown(event.relatedTarget)) {
            fireNonCancelableEvent(onBlur, event);
        }
    };
    useLayoutEffect(function () {
        var onDropdownOpen = function () {
            if (open && dropdownRef.current && triggerRef.current && verticalContainerRef.current) {
                // calculate scroll width only for dropdowns that has a scrollbar and ignore it for date picker components
                if (scrollable) {
                    dropdownRef.current.classList.add(styles.nowrap);
                }
                setDropdownPosition.apply(void 0, __spreadArray(__spreadArray([], calculatePosition(dropdownRef.current, triggerRef.current, verticalContainerRef.current, interior, expandToViewport, preferCenter, stretchWidth, stretchHeight, isMobile, minWidth), false), [dropdownRef.current,
                    verticalContainerRef.current], false));
                if (scrollable) {
                    dropdownRef.current.classList.remove(styles.nowrap);
                }
            }
        };
        onDropdownOpen();
        if (open) {
            // window may scroll when dropdown opens, for example when soft keyboard shows up
            window.addEventListener('scroll', onDropdownOpen);
            // only listen to window scroll within very short time after the dropdown opens
            // do not want to interfere dropdown position on scroll afterwards
            var timeoutId_1 = setTimeout(function () {
                window.removeEventListener('scroll', onDropdownOpen);
            }, 500);
            return function () {
                clearTimeout(timeoutId_1);
                window.removeEventListener('scroll', onDropdownOpen);
            };
        }
        // See AWSUI-13040
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, dropdownRef, triggerRef, verticalContainerRef, interior, stretchWidth, isMobile, contentKey]);
    // subscribe to outside click
    useEffect(function () {
        if (!open) {
            return;
        }
        var clickListener = function (e) {
            var _a, _b;
            if (!((_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) && !((_b = triggerRef.current) === null || _b === void 0 ? void 0 : _b.contains(e.target))) {
                fireNonCancelableEvent(onDropdownClose);
            }
        };
        window.addEventListener('click', clickListener, true);
        return function () {
            window.removeEventListener('click', clickListener, true);
        };
    }, [open, onDropdownClose]);
    // sync dropdown position on scroll and resize
    useLayoutEffect(function () {
        if (!expandToViewport || !open) {
            return;
        }
        var updateDropdownPosition = function () {
            if (triggerRef.current && dropdownRef.current && verticalContainerRef.current) {
                var triggerRect = triggerRef.current.getBoundingClientRect();
                var target = dropdownRef.current;
                if (fixedPosition.current) {
                    if (fixedPosition.current.dropUp) {
                        dropdownRef.current.style.bottom = "calc(100% - ".concat(triggerRect.top, "px)");
                    }
                    else {
                        target.style.top = "".concat(triggerRect.bottom, "px");
                    }
                    if (fixedPosition.current.dropLeft) {
                        target.style.left = "calc(".concat(triggerRect.right, "px - ").concat(fixedPosition.current.width, ")");
                    }
                    else {
                        target.style.left = "".concat(triggerRect.left, "px");
                    }
                }
            }
        };
        updateDropdownPosition();
        window.addEventListener('scroll', updateDropdownPosition, true);
        window.addEventListener('resize', updateDropdownPosition, true);
        return function () {
            window.removeEventListener('scroll', updateDropdownPosition, true);
            window.removeEventListener('resize', updateDropdownPosition, true);
        };
    }, [open, expandToViewport]);
    return (React.createElement("div", { className: clsx(styles.root, interior && styles.interior, stretchTriggerHeight && styles['stretch-trigger-height']), ref: wrapperRef, onFocus: focusHandler, onBlur: blurHandler },
        React.createElement("div", { className: clsx(stretchTriggerHeight && styles['stretch-trigger-height']), ref: triggerRef }, trigger),
        React.createElement(TabTrap, { focusNextCallback: function () { var _a; return dropdownRef.current && ((_a = getFirstFocusable(dropdownRef.current)) === null || _a === void 0 ? void 0 : _a.focus()); }, disabled: !open || !loopFocus }),
        React.createElement(DropdownContainer, { renderWithPortal: expandToViewport && !interior, id: dropdownId, open: open },
            React.createElement(Transition, { "in": open !== null && open !== void 0 ? open : false, exit: false }, function (state, ref) { return (React.createElement("div", { ref: dropdownContainerRef },
                React.createElement(TabTrap, { focusNextCallback: function () { var _a; return triggerRef.current && ((_a = getLastFocusable(triggerRef.current)) === null || _a === void 0 ? void 0 : _a.focus()); }, disabled: !open || !loopFocus }),
                React.createElement(TransitionContent, { state: state, transitionRef: ref, dropdownClasses: dropdownClasses, open: open, stretchWidth: stretchWidth, interior: interior, header: header, expandToViewport: expandToViewport, footer: footer, onMouseDown: onMouseDown, isRefresh: isRefresh, dropdownRef: dropdownRef, verticalContainerRef: verticalContainerRef, position: position }, children),
                React.createElement(TabTrap, { focusNextCallback: function () { var _a; return triggerRef.current && ((_a = getFirstFocusable(triggerRef.current)) === null || _a === void 0 ? void 0 : _a.focus()); }, disabled: !open || !loopFocus }))); }))));
};
var isInteriorPosition = function (position) { return position.bottom !== undefined; };
export default Dropdown;
//# sourceMappingURL=index.js.map