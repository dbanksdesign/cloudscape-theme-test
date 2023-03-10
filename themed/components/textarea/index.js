import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { getBaseProps } from '../internal/base-component';
import { fireKeyboardEvent, fireNonCancelableEvent } from '../internal/events';
import { useFormFieldContext } from '../internal/context/form-field-context';
import useForwardFocus from '../internal/hooks/forward-focus';
import clsx from 'clsx';
import styles from './styles.css.js';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import useBaseComponent from '../internal/hooks/use-base-component';
import { convertAutoComplete } from '../input/utils';
var Textarea = React.forwardRef(function (_a, ref) {
    var _b;
    var value = _a.value, _c = _a.autoComplete, autoComplete = _c === void 0 ? true : _c, disabled = _a.disabled, readOnly = _a.readOnly, disableBrowserAutocorrect = _a.disableBrowserAutocorrect, disableBrowserSpellcheck = _a.disableBrowserSpellcheck, spellcheck = _a.spellcheck, onKeyDown = _a.onKeyDown, onKeyUp = _a.onKeyUp, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, ariaRequired = _a.ariaRequired, name = _a.name, rows = _a.rows, placeholder = _a.placeholder, autoFocus = _a.autoFocus, ariaLabel = _a.ariaLabel, rest = __rest(_a, ["value", "autoComplete", "disabled", "readOnly", "disableBrowserAutocorrect", "disableBrowserSpellcheck", "spellcheck", "onKeyDown", "onKeyUp", "onChange", "onBlur", "onFocus", "ariaRequired", "name", "rows", "placeholder", "autoFocus", "ariaLabel"]);
    var __internalRootRef = useBaseComponent('Textarea').__internalRootRef;
    var _d = useFormFieldContext(rest), ariaLabelledby = _d.ariaLabelledby, ariaDescribedby = _d.ariaDescribedby, controlId = _d.controlId, invalid = _d.invalid;
    var baseProps = getBaseProps(rest);
    var textareaRef = useRef(null);
    useForwardFocus(ref, textareaRef);
    var attributes = {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
        'aria-required': ariaRequired ? 'true' : undefined,
        'aria-invalid': invalid ? 'true' : undefined,
        name: name,
        placeholder: placeholder,
        autoFocus: autoFocus,
        className: clsx(styles.textarea, (_b = {},
            _b[styles['textarea-readonly']] = readOnly,
            _b[styles['textarea-invalid']] = invalid,
            _b)),
        autoComplete: convertAutoComplete(autoComplete),
        spellCheck: spellcheck,
        disabled: disabled,
        readOnly: readOnly ? true : undefined,
        rows: rows || 3,
        onKeyDown: onKeyDown && (function (event) { return fireKeyboardEvent(onKeyDown, event); }),
        onKeyUp: onKeyUp && (function (event) { return fireKeyboardEvent(onKeyUp, event); }),
        // We set a default value on the component in order to force it into the controlled mode.
        value: value || '',
        onChange: onChange && (function (event) { return fireNonCancelableEvent(onChange, { value: event.target.value }); }),
        onBlur: onBlur && (function () { return fireNonCancelableEvent(onBlur); }),
        onFocus: onFocus && (function () { return fireNonCancelableEvent(onFocus); })
    };
    if (disableBrowserAutocorrect) {
        attributes.autoCorrect = 'off';
        attributes.autoCapitalize = 'off';
    }
    if (disableBrowserSpellcheck) {
        attributes.spellCheck = 'false';
    }
    return (React.createElement("span", __assign({}, baseProps, { className: clsx(styles.root, baseProps.className), ref: __internalRootRef }),
        React.createElement("textarea", __assign({ ref: textareaRef, id: controlId }, attributes))));
});
applyDisplayName(Textarea, 'Textarea');
export default Textarea;
//# sourceMappingURL=index.js.map