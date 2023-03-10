import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef, useState } from 'react';
import Arrow from '../popover/arrow';
import PopoverContainer from '../popover/container';
import PopoverBody from '../popover/body';
import Portal from '../internal/components/portal';
import { usePortalModeClasses } from '../internal/hooks/use-portal-mode-classes';
import { useReducedMotion } from '../internal/hooks/use-visual-mode';
var DEFAULT_OPEN_TIMEOUT_IN_MS = 120;
export default function Tooltip(_a) {
    var children = _a.children, content = _a.content, _b = _a.position, position = _b === void 0 ? 'right' : _b;
    var ref = useRef(null);
    var isReducedMotion = useReducedMotion(ref);
    var _c = useTooltipOpen(isReducedMotion ? 0 : DEFAULT_OPEN_TIMEOUT_IN_MS), open = _c.open, triggerProps = _c.triggerProps;
    var portalClasses = usePortalModeClasses(ref);
    return (React.createElement("span", __assign({ ref: ref }, triggerProps),
        children,
        open && (React.createElement(Portal, null,
            React.createElement("span", { className: portalClasses },
                React.createElement(PopoverContainer, { size: "small", fixedWidth: false, position: position, trackRef: ref, arrow: function (position) { return React.createElement(Arrow, { position: position }); }, renderWithPortal: true, zIndex: 7000 },
                    React.createElement(PopoverBody, { dismissButton: false, dismissAriaLabel: undefined, header: null, onDismiss: function () { }, overflowVisible: "both" },
                        React.createElement("span", { "data-testid": "button-dropdown-disabled-reason", role: "tooltip" }, content))))))));
}
function useTooltipOpen(timeout) {
    var handle = useRef();
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var close = function () {
        clearTimeout(handle.current);
        setIsOpen(false);
    };
    var open = function () { return setIsOpen(true); };
    var openDelayed = function () {
        handle.current = setTimeout(open, timeout);
    };
    var onKeyDown = function (e) {
        if (isOpen && isEscape(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            close();
        }
    };
    var onFocus = openDelayed;
    var onBlur = close;
    return {
        open: isOpen,
        triggerProps: {
            onBlur: onBlur,
            onFocus: onFocus,
            onKeyDown: onKeyDown
        }
    };
}
var isEscape = function (key) { return key === 'Escape' || key === 'Esc'; };
//# sourceMappingURL=tooltip.js.map