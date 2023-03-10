import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef } from 'react';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import clsx from 'clsx';
import { getBaseProps } from '../internal/base-component';
import { fireNonCancelableEvent } from '../internal/events';
import { KeyCode } from '../internal/keycode';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { InternalButton } from '../button/internal';
import InternalHeader from '../header/internal';
import Portal from '../internal/components/portal';
import { useContainerBreakpoints } from '../internal/hooks/container-queries';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import { disableBodyScrolling, enableBodyScrolling } from './body-scroll';
import styles from './styles.css.js';
import FocusLock from '../internal/components/focus-lock';
export default function InternalModal(_a) {
    var _b, _c;
    var size = _a.size, visible = _a.visible, closeAriaLabel = _a.closeAriaLabel, header = _a.header, children = _a.children, footer = _a.footer, disableContentPaddings = _a.disableContentPaddings, onDismiss = _a.onDismiss, modalRoot = _a.modalRoot, _d = _a.__internalRootRef, __internalRootRef = _d === void 0 ? null : _d, rest = __rest(_a, ["size", "visible", "closeAriaLabel", "header", "children", "footer", "disableContentPaddings", "onDismiss", "modalRoot", "__internalRootRef"]);
    var instanceUniqueId = useUniqueId();
    var headerId = "".concat(rest.id || instanceUniqueId, "-header");
    var lastMouseDownElementRef = useRef(null);
    var _e = useContainerBreakpoints(['xs']), breakpoint = _e[0], breakpointsRef = _e[1];
    var refObject = useRef(null);
    var mergedRef = useMergeRefs(breakpointsRef, refObject, __internalRootRef);
    var isRefresh = useVisualRefresh();
    var baseProps = getBaseProps(rest);
    // enable body scroll and restore focus if unmounting while visible
    useEffect(function () {
        return function () {
            enableBodyScrolling();
        };
    }, []);
    // enable / disable body scroll
    useEffect(function () {
        if (visible) {
            disableBodyScrolling();
        }
        else {
            enableBodyScrolling();
        }
    }, [visible]);
    // Because we hide the element with styles (and not actually detach it from DOM), we need to scroll to top
    useEffect(function () {
        if (visible && refObject.current) {
            refObject.current.scrollTop = 0;
        }
    }, [visible]);
    var dismiss = function (reason) { return fireNonCancelableEvent(onDismiss, { reason: reason }); };
    var onOverlayMouseDown = function (event) {
        lastMouseDownElementRef.current = event.target;
    };
    var onOverlayClick = function (event) {
        var overlay = refObject.current;
        var lastClicked = lastMouseDownElementRef.current;
        if (event.target === overlay && lastClicked === overlay) {
            dismiss('overlay');
        }
    };
    var onCloseButtonClick = function () { return dismiss('closeButton'); };
    var escKeyHandler = function (event) {
        if (event.keyCode === KeyCode.escape) {
            dismiss('keyboard');
        }
    };
    return (React.createElement(Portal, { container: modalRoot },
        React.createElement("div", __assign({}, baseProps, { className: clsx(styles.root, (_b = {}, _b[styles.hidden] = !visible, _b), baseProps.className, isRefresh && styles.refresh), role: "dialog", "aria-modal": true, "aria-labelledby": headerId, onMouseDown: onOverlayMouseDown, onClick: onOverlayClick, ref: mergedRef }),
            React.createElement(FocusLock, { disabled: !visible, autoFocus: true, restoreFocus: true, className: styles['focus-lock'] },
                React.createElement("div", { className: clsx(styles.dialog, styles[size], styles["breakpoint-".concat(breakpoint)], isRefresh && styles.refresh), onKeyDown: escKeyHandler, tabIndex: -1 },
                    React.createElement("div", { className: styles.container },
                        React.createElement("div", { className: styles.header },
                            React.createElement(InternalHeader, { variant: "h2", __disableActionsWrapping: true, actions: React.createElement(InternalButton, { ariaLabel: closeAriaLabel, className: styles['dismiss-control'], variant: "modal-dismiss", iconName: "close", formAction: "none", onClick: onCloseButtonClick }) },
                                React.createElement("span", { id: headerId, className: styles['header--text'] }, header))),
                        React.createElement("div", { className: clsx(styles.content, (_c = {}, _c[styles['no-paddings']] = disableContentPaddings, _c)) }, children),
                        footer && React.createElement("div", { className: styles.footer }, footer)))))));
}
//# sourceMappingURL=internal.js.map