import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useRef } from 'react';
import AbstractSwitch from '../internal/components/abstract-switch';
import useForwardFocus from '../internal/hooks/forward-focus';
import { fireNonCancelableEvent } from '../internal/events';
import { getBaseProps } from '../internal/base-component';
import styles from './styles.css.js';
import { useFormFieldContext } from '../internal/context/form-field-context';
var InternalToggle = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var controlId = _a.controlId, checked = _a.checked, name = _a.name, disabled = _a.disabled, children = _a.children, description = _a.description, ariaLabel = _a.ariaLabel, onFocus = _a.onFocus, onBlur = _a.onBlur, onChange = _a.onChange, _d = _a.__internalRootRef, __internalRootRef = _d === void 0 ? null : _d, rest = __rest(_a, ["controlId", "checked", "name", "disabled", "children", "description", "ariaLabel", "onFocus", "onBlur", "onChange", "__internalRootRef"]);
    var _e = useFormFieldContext(rest), ariaDescribedby = _e.ariaDescribedby, ariaLabelledby = _e.ariaLabelledby;
    var baseProps = getBaseProps(rest);
    var checkboxRef = useRef(null);
    useForwardFocus(ref, checkboxRef);
    return (React.createElement(AbstractSwitch, __assign({}, baseProps, { className: clsx(styles.root, baseProps.className), controlClassName: clsx(styles['toggle-control'], (_b = {},
            _b[styles['toggle-control-checked']] = checked,
            _b[styles['toggle-control-disabled']] = disabled,
            _b)), outlineClassName: styles.outline, controlId: controlId, disabled: disabled, label: children, description: description, descriptionBottomPadding: true, ariaLabel: ariaLabel, ariaLabelledby: ariaLabelledby, ariaDescribedby: ariaDescribedby, nativeControl: function (nativeControlProps) { return (React.createElement("input", __assign({}, nativeControlProps, { ref: checkboxRef, type: "checkbox", checked: checked, name: name, onFocus: function () { return fireNonCancelableEvent(onFocus); }, onBlur: function () { return fireNonCancelableEvent(onBlur); }, 
            // empty handler to suppress React controllability warning
            onChange: function () { } }))); }, onClick: function () {
            var _a;
            (_a = checkboxRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            fireNonCancelableEvent(onChange, { checked: !checked });
        }, styledControl: 
        /*Using span, not div for HTML validity*/
        React.createElement("span", { className: clsx(styles['toggle-handle'], (_c = {},
                _c[styles['toggle-handle-checked']] = checked,
                _c[styles['toggle-handle-disabled']] = disabled,
                _c)) }), __internalRootRef: __internalRootRef })));
});
export default InternalToggle;
//# sourceMappingURL=internal.js.map