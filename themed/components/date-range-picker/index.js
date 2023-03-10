import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.css.js';
import { normalizeLocale } from '../internal/utils/locale';
import useForwardFocus from '../internal/hooks/forward-focus';
import { KeyCode } from '../internal/keycode';
import clsx from 'clsx';
import { getBaseProps } from '../internal/base-component';
import checkControlled from '../internal/hooks/check-controlled';
import InternalBox from '../box/internal';
import { DateRangePickerDropdown } from './dropdown';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import Dropdown from '../internal/components/dropdown';
import { useFocusTracker } from '../internal/hooks/use-focus-tracker';
import { useMobile } from '../internal/hooks/use-mobile';
import ButtonTrigger from '../internal/components/button-trigger';
import { useFormFieldContext } from '../internal/context/form-field-context';
import InternalIcon from '../icon/internal';
import { normalizeTimeOffset, shiftTimeOffset } from './time-offset';
import useBaseComponent from '../internal/hooks/use-base-component';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { fireNonCancelableEvent } from '../internal/events/index.js';
import { isDevelopment } from '../internal/is-development.js';
import { warnOnce } from '../internal/logging.js';
import { usePrevious } from '../internal/hooks/use-previous/index.js';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { formatDateRange, isIsoDateOnly } from '../internal/utils/date-time';
import { formatValue } from './utils.js';
function renderDateRange(range, placeholder, formatRelativeRange, timeOffset) {
    if (!range) {
        return (React.createElement("span", { className: styles['label-text'], "aria-disabled": true }, placeholder));
    }
    var formatted = range.type === 'relative' ? (formatRelativeRange(range)) : (React.createElement(BreakSpaces, { text: formatDateRange(range.startDate, range.endDate, timeOffset) }));
    return (React.createElement(InternalBox, { fontWeight: "normal", display: "inline", color: "inherit", variant: "span" }, formatted));
}
function BreakSpaces(_a) {
    var text = _a.text;
    var tokens = text.split(/( )/);
    return (React.createElement(React.Fragment, null, tokens.map(function (token, index) { return (React.createElement(React.Fragment, { key: index },
        token.length > 1 ? React.createElement("span", { className: styles['label-token-nowrap'] }, token) : token,
        token === ' ' && React.createElement("wbr", null))); })));
}
function isDateOnly(value) {
    if (!value || value.type !== 'absolute') {
        return false;
    }
    return isIsoDateOnly(value.startDate) && isIsoDateOnly(value.endDate);
}
var DateRangePicker = React.forwardRef(function (_a, ref) {
    var _b;
    var _c, _d;
    var _e = _a.locale, locale = _e === void 0 ? '' : _e, startOfWeek = _a.startOfWeek, _f = _a.isDateEnabled, isDateEnabled = _f === void 0 ? function () { return true; } : _f, value = _a.value, placeholder = _a.placeholder, _g = _a.readOnly, readOnly = _g === void 0 ? false : _g, _h = _a.disabled, disabled = _h === void 0 ? false : _h, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, _j = _a.relativeOptions, relativeOptions = _j === void 0 ? [] : _j, i18nStrings = _a.i18nStrings, _k = _a.isValidRange, isValidRange = _k === void 0 ? function () { return ({ valid: true }); } : _k, _l = _a.showClearButton, showClearButton = _l === void 0 ? true : _l, _m = _a.dateOnly, dateOnly = _m === void 0 ? false : _m, timeOffset = _a.timeOffset, getTimeOffset = _a.getTimeOffset, _o = _a.timeInputFormat, timeInputFormat = _o === void 0 ? 'hh:mm:ss' : _o, _p = _a.expandToViewport, expandToViewport = _p === void 0 ? false : _p, _q = _a.rangeSelectorMode, rangeSelectorMode = _q === void 0 ? 'default' : _q, customAbsoluteRangeControl = _a.customAbsoluteRangeControl, rest = __rest(_a, ["locale", "startOfWeek", "isDateEnabled", "value", "placeholder", "readOnly", "disabled", "onChange", "onBlur", "onFocus", "relativeOptions", "i18nStrings", "isValidRange", "showClearButton", "dateOnly", "timeOffset", "getTimeOffset", "timeInputFormat", "expandToViewport", "rangeSelectorMode", "customAbsoluteRangeControl"]);
    var __internalRootRef = useBaseComponent('DateRangePicker').__internalRootRef;
    checkControlled('DateRangePicker', 'value', value, 'onChange', onChange);
    var normalizedTimeOffset = normalizeTimeOffset(value, getTimeOffset, timeOffset);
    value = isDateOnly(value) ? value : shiftTimeOffset(value, normalizedTimeOffset);
    var baseProps = getBaseProps(rest);
    var _r = useFormFieldContext(__assign({ ariaLabelledby: (_c = rest.ariaLabelledby) !== null && _c !== void 0 ? _c : i18nStrings.ariaLabelledby, ariaDescribedby: (_d = rest.ariaDescribedby) !== null && _d !== void 0 ? _d : i18nStrings.ariaDescribedby }, rest)), invalid = _r.invalid, controlId = _r.controlId, ariaDescribedby = _r.ariaDescribedby, ariaLabelledby = _r.ariaLabelledby;
    var isSingleGrid = useMobile();
    var triggerRef = useRef(null);
    useForwardFocus(ref, triggerRef);
    var rootRef = useRef(null);
    var dropdownId = useUniqueId('date-range-picker-dropdown');
    useFocusTracker({ rootRef: rootRef, onBlur: onBlur, onFocus: onFocus, viewportId: expandToViewport ? dropdownId : '' });
    var _s = useState(false), isDropDownOpen = _s[0], setIsDropDownOpen = _s[1];
    var normalizedLocale = normalizeLocale('DateRangePicker', locale);
    var closeDropdown = function (focusTrigger) {
        var _a;
        if (focusTrigger === void 0) { focusTrigger = false; }
        setIsDropDownOpen(false);
        if (focusTrigger) {
            (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    var onWrapperKeyDownHandler = function (event) {
        if (event.keyCode === KeyCode.escape) {
            closeDropdown(true);
        }
    };
    var onClear = function () {
        fireNonCancelableEvent(onChange, { value: null });
    };
    var onApply = function (newValue) {
        var validationResult = isValidRange(newValue);
        if ((validationResult === null || validationResult === void 0 ? void 0 : validationResult.valid) === false) {
            return validationResult;
        }
        if (isDevelopment) {
            if ((newValue === null || newValue === void 0 ? void 0 : newValue.type) === 'absolute') {
                var startDateWithoutTime = newValue.startDate.split('T')[0];
                var endDateWithoutTime = newValue.endDate.split('T')[0];
                if (!startDateWithoutTime || !endDateWithoutTime) {
                    warnOnce('DateRangePicker', 'You have provided an `isValidRange` prop that did not catch a missing start or end date.');
                }
            }
        }
        fireNonCancelableEvent(onChange, {
            value: formatValue(newValue, {
                dateOnly: dateOnly,
                timeOffset: normalizeTimeOffset(newValue, getTimeOffset, timeOffset)
            })
        });
        return validationResult || { valid: true };
    };
    var prevDateOnly = usePrevious(dateOnly);
    useEffect(function () {
        if (prevDateOnly !== undefined && prevDateOnly !== dateOnly) {
            warnOnce('DateRangePicker', "The provided `dateOnly` flag has been changed from \"".concat(prevDateOnly, "\" to \"").concat(dateOnly, "\" which can lead to unexpected value format. Consider using separate components."));
        }
    }, [prevDateOnly, dateOnly]);
    if (value && value.type !== 'absolute' && value.type !== 'relative') {
        warnOnce('DateRangePicker', 'You provided an invalid value. Reverting back to default.');
        value = null;
    }
    if (((value === null || value === void 0 ? void 0 : value.type) === 'absolute' && rangeSelectorMode === 'relative-only') ||
        ((value === null || value === void 0 ? void 0 : value.type) === 'relative' && rangeSelectorMode === 'absolute-only')) {
        warnOnce('DateRangePicker', 'The provided value does not correspond to the current range selector mode. Reverting back to default.');
        value = null;
    }
    var trigger = (React.createElement("div", { className: styles['trigger-wrapper'] },
        React.createElement(ButtonTrigger, { ref: triggerRef, id: controlId, invalid: invalid, ariaLabel: i18nStrings.ariaLabel, ariaDescribedby: ariaDescribedby, ariaLabelledby: ariaLabelledby, className: clsx(styles.label, (_b = {},
                _b[styles['label-enabled']] = !readOnly && !disabled,
                _b)), hideCaret: true, onClick: function () {
                if (!readOnly && !disabled) {
                    setIsDropDownOpen(true);
                }
            }, disabled: disabled, readOnly: readOnly, ariaHasPopup: "true" },
            React.createElement("span", { className: styles['trigger-flexbox'] },
                React.createElement("span", { className: styles['icon-wrapper'] },
                    React.createElement(InternalIcon, { name: "calendar", variant: disabled || readOnly ? 'disabled' : 'normal' })),
                renderDateRange(value, placeholder !== null && placeholder !== void 0 ? placeholder : '', i18nStrings.formatRelativeRange, normalizedTimeOffset)))));
    var mergedRef = useMergeRefs(rootRef, __internalRootRef);
    return (React.createElement("div", __assign({}, baseProps, { ref: mergedRef, className: clsx(baseProps.className, styles.root), onKeyDown: onWrapperKeyDownHandler }),
        React.createElement(Dropdown, { stretchWidth: true, stretchHeight: true, open: isDropDownOpen, onDropdownClose: function () { return closeDropdown(); }, trigger: trigger, stretchToTriggerWidth: false, expandToViewport: expandToViewport, dropdownId: dropdownId }, isDropDownOpen && (React.createElement(DateRangePickerDropdown, { startOfWeek: startOfWeek, locale: normalizedLocale, isSingleGrid: isSingleGrid, onDropdownClose: function () { return closeDropdown(true); }, value: value, showClearButton: showClearButton, isDateEnabled: isDateEnabled, i18nStrings: i18nStrings, onClear: onClear, onApply: onApply, relativeOptions: relativeOptions, isValidRange: isValidRange, dateOnly: dateOnly, timeInputFormat: timeInputFormat, rangeSelectorMode: rangeSelectorMode, ariaLabelledby: ariaLabelledby, ariaDescribedby: ariaDescribedby, customAbsoluteRangeControl: customAbsoluteRangeControl })))));
});
applyDisplayName(DateRangePicker, 'DateRangePicker');
export default DateRangePicker;
//# sourceMappingURL=index.js.map