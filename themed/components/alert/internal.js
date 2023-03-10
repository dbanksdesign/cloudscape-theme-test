import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { InternalButton } from '../button/internal';
import InternalIcon from '../icon/internal';
import { getBaseProps } from '../internal/base-component';
import VisualContext from '../internal/components/visual-context';
import styles from './styles.css.js';
import { fireNonCancelableEvent } from '../internal/events';
import { useContainerBreakpoints } from '../internal/hooks/container-queries';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
var typeToIcon = {
    error: 'status-negative',
    warning: 'status-warning',
    success: 'status-positive',
    info: 'status-info'
};
export default function InternalAlert(_a) {
    var _b;
    var type = _a.type, statusIconAriaLabel = _a.statusIconAriaLabel, _c = _a.visible, visible = _c === void 0 ? true : _c, dismissible = _a.dismissible, dismissAriaLabel = _a.dismissAriaLabel, children = _a.children, header = _a.header, buttonText = _a.buttonText, action = _a.action, onDismiss = _a.onDismiss, onButtonClick = _a.onButtonClick, _d = _a.__internalRootRef, __internalRootRef = _d === void 0 ? null : _d, rest = __rest(_a, ["type", "statusIconAriaLabel", "visible", "dismissible", "dismissAriaLabel", "children", "header", "buttonText", "action", "onDismiss", "onButtonClick", "__internalRootRef"]);
    var baseProps = getBaseProps(rest);
    var _e = useContainerBreakpoints(['xs']), breakpoint = _e[0], breakpointRef = _e[1];
    var mergedRef = useMergeRefs(breakpointRef, __internalRootRef);
    var isRefresh = useVisualRefresh();
    var size = isRefresh ? 'normal' : header && children ? 'big' : 'normal';
    var actionButton = action || (React.createElement(InternalButton, { className: styles['action-button'], onClick: function () { return fireNonCancelableEvent(onButtonClick); }, formAction: "none" }, buttonText));
    var hasAction = Boolean(action || buttonText);
    return (React.createElement("div", __assign({}, baseProps, { "aria-hidden": !visible, className: clsx(styles.root, (_b = {}, _b[styles.hidden] = !visible, _b), baseProps.className, styles["breakpoint-".concat(breakpoint)]), ref: mergedRef }),
        React.createElement(VisualContext, { contextName: "alert" },
            React.createElement("div", { className: clsx(styles.alert, styles["type-".concat(type)]) },
                React.createElement("div", { className: clsx(styles.icon, styles.text), role: "img", "aria-label": statusIconAriaLabel },
                    React.createElement(InternalIcon, { name: typeToIcon[type], size: size })),
                React.createElement("div", { className: styles.body },
                    React.createElement("div", { className: clsx(styles.message, styles.text) },
                        header && React.createElement("div", { className: styles.header }, header),
                        React.createElement("div", { className: styles.content }, children)),
                    hasAction && React.createElement("div", { className: styles.action }, actionButton)),
                dismissible && (React.createElement("div", { className: styles.dismiss },
                    React.createElement(InternalButton, { className: styles['dismiss-button'], variant: "icon", iconName: "close", formAction: "none", ariaLabel: dismissAriaLabel, onClick: function () { return fireNonCancelableEvent(onDismiss); } })))))));
}
//# sourceMappingURL=internal.js.map