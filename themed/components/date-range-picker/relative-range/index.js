import { __spreadArray } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useState } from 'react';
import InternalBox from '../../box/internal';
import InternalFormField from '../../form-field/internal';
import InternalInput from '../../input/internal';
import InternalRadioGroup from '../../radio-group/internal';
import InternalSelect from '../../select/internal';
import InternalSpaceBetween from '../../space-between/internal';
import styles from './styles.css.js';
var dayUnits = ['day', 'week', 'month', 'year'];
var units = __spreadArray(['second', 'minute', 'hour'], dayUnits, true);
var CUSTOM_OPTION_SELECT_KEY = 'awsui-internal-custom-duration-key';
export default function RelativeRangePicker(_a) {
    var _b, _c;
    var _d;
    var dateOnly = _a.dateOnly, _e = _a.options, clientOptions = _e === void 0 ? [] : _e, initialRange = _a.initialSelection, onChangeRangeSize = _a.onChange, i18nStrings = _a.i18nStrings, isSingleGrid = _a.isSingleGrid;
    var radioOptions = clientOptions.map(function (option) { return ({
        value: option.key,
        label: i18nStrings.formatRelativeRange(option)
    }); });
    radioOptions.push({
        value: CUSTOM_OPTION_SELECT_KEY,
        label: i18nStrings.customRelativeRangeOptionLabel,
        description: i18nStrings.customRelativeRangeOptionDescription
    });
    var _f = useState(function () {
        var _a;
        if (initialRange && !initialRange.key) {
            return CUSTOM_OPTION_SELECT_KEY;
        }
        return (_a = initialRange === null || initialRange === void 0 ? void 0 : initialRange.key) !== null && _a !== void 0 ? _a : null;
    }), selectedRadio = _f[0], setSelectedRadio = _f[1];
    var _g = useState(function () {
        if (initialRange) {
            return initialRange.amount;
        }
        // NaN represents an empty duration
        return NaN;
    }), customDuration = _g[0], setCustomDuration = _g[1];
    var initialCustomTimeUnit = dateOnly ? 'day' : 'minute';
    var _h = useState((_d = initialRange === null || initialRange === void 0 ? void 0 : initialRange.unit) !== null && _d !== void 0 ? _d : initialCustomTimeUnit), customUnitOfTime = _h[0], setCustomUnitOfTime = _h[1];
    var showRadioControl = clientOptions.length > 0;
    var showCustomControls = clientOptions.length === 0 || selectedRadio === CUSTOM_OPTION_SELECT_KEY;
    return (React.createElement("div", null,
        React.createElement(InternalSpaceBetween, { size: "xs", direction: "vertical" },
            showRadioControl && (React.createElement(InternalFormField, { label: i18nStrings.relativeRangeSelectionHeading },
                React.createElement(InternalRadioGroup, { className: styles['relative-range-radio-group'], onChange: function (_a) {
                        var detail = _a.detail;
                        setSelectedRadio(detail.value);
                        if (detail.value === CUSTOM_OPTION_SELECT_KEY) {
                            setCustomDuration(NaN);
                            setCustomUnitOfTime(initialCustomTimeUnit);
                            onChangeRangeSize({
                                amount: NaN,
                                unit: initialCustomTimeUnit,
                                type: 'relative'
                            });
                        }
                        else {
                            var option = clientOptions.filter(function (o) { return o.key === detail.value; })[0];
                            onChangeRangeSize(option);
                        }
                    }, value: selectedRadio, items: radioOptions }))),
            showCustomControls && (React.createElement(InternalSpaceBetween, { direction: "vertical", size: "xs" },
                !showRadioControl && (React.createElement(InternalBox, { fontSize: "body-m", color: "text-body-secondary" }, i18nStrings.customRelativeRangeOptionDescription)),
                React.createElement("div", { className: clsx(styles['custom-range'], (_b = {},
                        _b[styles['custom-range--no-padding']] = !showRadioControl,
                        _b)) },
                    React.createElement("div", { className: clsx(styles['custom-range-form-controls'], (_c = {},
                            _c[styles.vertical] = isSingleGrid,
                            _c)) },
                        React.createElement("div", { className: styles['custom-range-duration'] },
                            React.createElement(InternalFormField, { label: i18nStrings.customRelativeRangeDurationLabel },
                                React.createElement(InternalInput, { type: "number", className: styles['custom-range-duration-input'], value: isNaN(customDuration) || customDuration === 0 ? '' : customDuration === null || customDuration === void 0 ? void 0 : customDuration.toString(), onChange: function (e) {
                                        var amount = Number(e.detail.value);
                                        setCustomDuration(amount);
                                        onChangeRangeSize({ amount: amount, unit: customUnitOfTime, type: 'relative' });
                                    }, placeholder: i18nStrings.customRelativeRangeDurationPlaceholder, __inheritFormFieldProps: true }))),
                        React.createElement("div", { className: styles['custom-range-unit'] },
                            React.createElement(InternalFormField, { label: i18nStrings.customRelativeRangeUnitLabel },
                                React.createElement(InternalSelect, { className: styles['custom-range-unit-select'], selectedOption: {
                                        value: customUnitOfTime,
                                        label: i18nStrings.formatUnit(customUnitOfTime, customDuration)
                                    }, onChange: function (e) {
                                        var unit = e.detail.selectedOption.value;
                                        setCustomUnitOfTime(unit);
                                        onChangeRangeSize({ amount: customDuration, unit: unit, type: 'relative' });
                                    }, options: (dateOnly ? dayUnits : units).map(function (unit) { return ({
                                        value: unit,
                                        label: i18nStrings.formatUnit(unit, customDuration)
                                    }); }), renderHighlightedAriaLive: function (option) { return option.label || option.value || ''; } }))))))))));
}
//# sourceMappingURL=index.js.map