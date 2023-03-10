import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { getBaseProps } from '../../base-component';
import InternalIcon from '../../../icon/internal';
import styles from './styles.css.js';
import { fireKeyboardEvent, fireCancelableEvent } from '../../events';
import useFocusVisible from '../../hooks/focus-visible';
var ButtonTrigger = function (_a, ref) {
    var children = _a.children, _b = _a.pressed, pressed = _b === void 0 ? false : _b, _c = _a.hideCaret, hideCaret = _c === void 0 ? false : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.readOnly, readOnly = _e === void 0 ? false : _e, _f = _a.invalid, invalid = _f === void 0 ? false : _f, inFilteringToken = _a.inFilteringToken, ariaHasPopup = _a.ariaHasPopup, ariaLabel = _a.ariaLabel, ariaLabelledby = _a.ariaLabelledby, ariaDescribedby = _a.ariaDescribedby, onKeyDown = _a.onKeyDown, onKeyUp = _a.onKeyUp, onMouseDown = _a.onMouseDown, onClick = _a.onClick, onFocus = _a.onFocus, onBlur = _a.onBlur, autoFocus = _a.autoFocus, restProps = __rest(_a, ["children", "pressed", "hideCaret", "disabled", "readOnly", "invalid", "inFilteringToken", "ariaHasPopup", "ariaLabel", "ariaLabelledby", "ariaDescribedby", "onKeyDown", "onKeyUp", "onMouseDown", "onClick", "onFocus", "onBlur", "autoFocus"]);
    var baseProps = getBaseProps(restProps);
    var focusVisible = useFocusVisible();
    var attributes = __assign(__assign(__assign({}, focusVisible), baseProps), { type: 'button', className: clsx(styles['button-trigger'], baseProps.className, pressed && styles.pressed, disabled && styles.disabled, invalid && styles.invalid, !hideCaret && styles['has-caret'], readOnly && styles['read-only'], inFilteringToken && styles['in-filtering-token']), disabled: disabled || readOnly, 'aria-expanded': pressed, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby, 'aria-haspopup': ariaHasPopup !== null && ariaHasPopup !== void 0 ? ariaHasPopup : 'listbox', onKeyDown: onKeyDown && (function (event) { return fireKeyboardEvent(onKeyDown, event); }), onKeyUp: onKeyUp && (function (event) { return fireKeyboardEvent(onKeyUp, event); }), onMouseDown: onMouseDown && (function (event) { return fireCancelableEvent(onMouseDown, {}, event); }), onClick: onClick && (function (event) { return fireCancelableEvent(onClick, {}, event); }), onFocus: onFocus && (function (event) { return fireCancelableEvent(onFocus, {}, event); }), onBlur: onBlur && (function (event) { return fireCancelableEvent(onBlur, { relatedTarget: event.relatedTarget }, event); }), autoFocus: autoFocus });
    if (invalid) {
        attributes['aria-invalid'] = invalid;
    }
    return (React.createElement("button", __assign({ ref: ref }, attributes),
        children,
        !hideCaret && (React.createElement("span", { className: styles.arrow },
            React.createElement(InternalIcon, { name: "caret-down-filled", variant: disabled ? 'disabled' : 'normal' })))));
};
export default React.forwardRef(ButtonTrigger);
//# sourceMappingURL=index.js.map