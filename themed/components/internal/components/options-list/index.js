import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import { useMergeRefs } from '../../hooks/use-merge-refs';
import React, { useEffect, useRef } from 'react';
import { getBaseProps } from '../../base-component';
import { fireNonCancelableEvent, fireKeyboardEvent, } from '../../events';
import { findUpUntil } from '../../utils/dom';
import styles from './styles.css.js';
var BOTTOM_TRIGGER_OFFSET = 80;
var getItemIndex = function (containerRef, event) {
    var target = findUpUntil(event.target, function (element) { return element === containerRef.current || !!element.dataset.mouseTarget; });
    var mouseTarget = target === null || target === void 0 ? void 0 : target.dataset.mouseTarget;
    return mouseTarget ? parseInt(mouseTarget) : -1;
};
var OptionsList = function (_a, ref) {
    var _b;
    var open = _a.open, children = _a.children, _c = _a.nativeAttributes, nativeAttributes = _c === void 0 ? {} : _c, onKeyDown = _a.onKeyDown, onBlur = _a.onBlur, onFocus = _a.onFocus, onLoadMore = _a.onLoadMore, onMouseUp = _a.onMouseUp, onMouseMove = _a.onMouseMove, _d = _a.position, position = _d === void 0 ? 'relative' : _d, _e = _a.role, role = _e === void 0 ? 'listbox' : _e, _f = _a.decreaseTopMargin, decreaseTopMargin = _f === void 0 ? false : _f, ariaLabelledby = _a.ariaLabelledby, restProps = __rest(_a, ["open", "children", "nativeAttributes", "onKeyDown", "onBlur", "onFocus", "onLoadMore", "onMouseUp", "onMouseMove", "position", "role", "decreaseTopMargin", "ariaLabelledby"]);
    var baseProps = getBaseProps(restProps);
    var menuRef = useRef(null);
    var handleScroll = function () {
        var scrollContainer = menuRef === null || menuRef === void 0 ? void 0 : menuRef.current;
        if (scrollContainer) {
            var bottomEdgePosition = scrollContainer.scrollTop + scrollContainer.clientHeight;
            var remainingScrollHeight = scrollContainer.scrollHeight - bottomEdgePosition;
            if (remainingScrollHeight < BOTTOM_TRIGGER_OFFSET) {
                fireNonCancelableEvent(onLoadMore);
            }
        }
    };
    useEffect(function () {
        if (!open) {
            return;
        }
        handleScroll();
    });
    var className = clsx(styles['options-list'], (_b = {},
        _b[styles['decrease-top-margin']] = decreaseTopMargin,
        _b));
    var mergedRef = useMergeRefs(ref, menuRef);
    return (React.createElement("ul", __assign({}, baseProps, nativeAttributes, { className: className, ref: mergedRef, style: { position: position }, role: role, onScroll: handleScroll, onKeyDown: function (event) { return onKeyDown && fireKeyboardEvent(onKeyDown, event); }, onMouseMove: function (event) { return onMouseMove === null || onMouseMove === void 0 ? void 0 : onMouseMove(getItemIndex(menuRef, event)); }, onMouseUp: function (event) { return onMouseUp === null || onMouseUp === void 0 ? void 0 : onMouseUp(getItemIndex(menuRef, event)); }, onBlur: function (event) { return fireNonCancelableEvent(onBlur, { relatedTarget: event.relatedTarget }); }, onFocus: function () { return fireNonCancelableEvent(onFocus); }, tabIndex: -1, "aria-labelledby": ariaLabelledby }), open && children));
};
export default React.forwardRef(OptionsList);
//# sourceMappingURL=index.js.map