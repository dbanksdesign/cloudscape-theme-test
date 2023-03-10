import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useRef } from 'react';
import InternalInput from '../input/internal';
import { getBaseProps } from '../internal/base-component';
import useForwardFocus from '../internal/hooks/forward-focus';
import { fireNonCancelableEvent } from '../internal/events';
import styles from './styles.css.js';
var InternalTextFilter = React.forwardRef(function (_a, ref) {
    var filteringText = _a.filteringText, filteringAriaLabel = _a.filteringAriaLabel, filteringPlaceholder = _a.filteringPlaceholder, filteringClearAriaLabel = _a.filteringClearAriaLabel, disabled = _a.disabled, countText = _a.countText, onChange = _a.onChange, onDelayedChange = _a.onDelayedChange, __internalRootRef = _a.__internalRootRef, rest = __rest(_a, ["filteringText", "filteringAriaLabel", "filteringPlaceholder", "filteringClearAriaLabel", "disabled", "countText", "onChange", "onDelayedChange", "__internalRootRef"]);
    var inputRef = useRef(null);
    var baseProps = getBaseProps(rest);
    useForwardFocus(ref, inputRef);
    var showResults = filteringText && countText && !disabled;
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(baseProps.className, styles.root), ref: __internalRootRef }),
        React.createElement(InternalInput, { ref: inputRef, className: styles.input, type: "search", ariaLabel: filteringAriaLabel, placeholder: filteringPlaceholder, value: filteringText, disabled: disabled, autoComplete: false, clearAriaLabel: filteringClearAriaLabel, onChange: function (event) { return fireNonCancelableEvent(onChange, { filteringText: event.detail.value }); }, __onDelayedInput: function (event) { return fireNonCancelableEvent(onDelayedChange, { filteringText: event.detail.value }); } }),
        React.createElement("span", { "aria-live": "polite", "aria-atomic": "true", className: clsx(styles.results, showResults && styles['results-visible']) }, showResults ? countText : '')));
});
export default InternalTextFilter;
//# sourceMappingURL=internal.js.map