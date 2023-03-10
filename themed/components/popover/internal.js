import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useRef, useState, useImperativeHandle } from 'react';
import clsx from 'clsx';
import { KeyCode } from '../internal/keycode';
import { getBaseProps } from '../internal/base-component';
import useFocusVisible from '../internal/hooks/focus-visible';
import Arrow from './arrow';
import Portal from '../internal/components/portal';
import PopoverContainer from './container';
import PopoverBody from './body';
import styles from './styles.css.js';
import { fireNonCancelableEvent } from '../internal/events/index';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { usePortalModeClasses } from '../internal/hooks/use-portal-mode-classes';
export default React.forwardRef(InternalPopover);
function InternalPopover(_a, ref) {
    var _b = _a.position, position = _b === void 0 ? 'right' : _b, _c = _a.size, size = _c === void 0 ? 'medium' : _c, _d = _a.fixedWidth, fixedWidth = _d === void 0 ? false : _d, _e = _a.triggerType, triggerType = _e === void 0 ? 'text' : _e, _f = _a.dismissButton, dismissButton = _f === void 0 ? true : _f, dismissAriaLabel = _a.dismissAriaLabel, children = _a.children, header = _a.header, content = _a.content, _g = _a.renderWithPortal, renderWithPortal = _g === void 0 ? false : _g, __onOpen = _a.__onOpen, _h = _a.__internalRootRef, __internalRootRef = _h === void 0 ? null : _h, restProps = __rest(_a, ["position", "size", "fixedWidth", "triggerType", "dismissButton", "dismissAriaLabel", "children", "header", "content", "renderWithPortal", "__onOpen", "__internalRootRef"]);
    var baseProps = getBaseProps(restProps);
    var focusVisible = useFocusVisible();
    var triggerRef = useRef(null);
    var popoverRef = useRef(null);
    var clickFrameId = useRef(null);
    var _j = useState(false), visible = _j[0], setVisible = _j[1];
    var focusTrigger = useCallback(function () {
        var _a;
        (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    var onTriggerClick = useCallback(function () {
        fireNonCancelableEvent(__onOpen);
        setVisible(true);
    }, [__onOpen]);
    var onDismiss = useCallback(function () {
        setVisible(false);
        focusTrigger();
    }, [focusTrigger]);
    var onTriggerKeyDown = useCallback(function (event) {
        if (event.keyCode === KeyCode.tab || event.keyCode === KeyCode.escape) {
            setVisible(false);
        }
    }, []);
    useImperativeHandle(ref, function () { return ({
        dismissPopover: onDismiss
    }); });
    useEffect(function () {
        if (!triggerRef.current) {
            return;
        }
        var document = triggerRef.current.ownerDocument;
        var onDocumentClick = function () {
            // Dismiss popover unless there was a click inside within the last animation frame.
            if (clickFrameId.current === null) {
                setVisible(false);
            }
        };
        // useCapture=false makes sure this listener is called after the one attached to the element.
        // the options.capture notation is unsupported by IE.
        document.addEventListener('mousedown', onDocumentClick, false);
        return function () {
            document.removeEventListener('mousedown', onDocumentClick, false);
        };
    }, []);
    var popoverClasses = usePortalModeClasses(triggerRef);
    var triggerProps = {
        // https://github.com/microsoft/TypeScript/issues/36659
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref: triggerRef,
        onClick: onTriggerClick,
        onKeyDown: onTriggerKeyDown,
        className: clsx(styles.trigger, styles["trigger-type-".concat(triggerType)])
    };
    var popoverContent = (React.createElement("div", { "aria-live": dismissButton ? undefined : 'polite', "aria-atomic": dismissButton ? undefined : true, className: clsx(popoverClasses, styles['popover-content']) }, visible && (React.createElement(PopoverContainer, { size: size, fixedWidth: fixedWidth, position: position, trackRef: triggerRef, arrow: function (position) { return React.createElement(Arrow, { position: position }); }, renderWithPortal: renderWithPortal, zIndex: renderWithPortal ? 7000 : undefined },
        React.createElement(PopoverBody, { dismissButton: dismissButton, dismissAriaLabel: dismissAriaLabel, header: header, onDismiss: onDismiss, overflowVisible: "both" }, content)))));
    var mergedRef = useMergeRefs(popoverRef, __internalRootRef);
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(styles.root, baseProps.className), ref: mergedRef, onMouseDown: function () {
            // Indicate there was a click inside popover recently, including nested portals.
            clickFrameId.current = requestAnimationFrame(function () {
                clickFrameId.current = null;
            });
        } }),
        triggerType === 'text' ? (React.createElement("button", __assign({}, triggerProps, { type: "button", "aria-haspopup": "dialog" }, focusVisible),
            React.createElement("span", { className: styles['trigger-inner-text'] }, children))) : (React.createElement("span", __assign({}, triggerProps), children)),
        renderWithPortal ? React.createElement(Portal, null, popoverContent) : popoverContent));
}
//# sourceMappingURL=internal.js.map