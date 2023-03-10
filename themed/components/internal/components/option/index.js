import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
import { Label, LabelTag, Description, Tags, FilteringTags, OptionIcon } from './option-parts';
import { getBaseProps } from '../../base-component';
import { warnOnce } from '../../logging';
import { isDevelopment } from '../../is-development';
function validateStringValue(value, propertyName) {
    if (typeof value !== 'undefined' && typeof value !== 'string') {
        warnOnce('DropdownOption', "This component only supports string values, but \"option.".concat(propertyName, "\" has ").concat(typeof value, " type. The component may work incorrectly."));
    }
}
var Option = function (_a) {
    var _b, _c, _d, _e;
    var option = _a.option, highlightText = _a.highlightText, _f = _a.triggerVariant, triggerVariant = _f === void 0 ? false : _f, _g = _a.isGroupOption, isGroupOption = _g === void 0 ? false : _g, _h = _a.highlightedOption, highlightedOption = _h === void 0 ? false : _h, _j = _a.selectedOption, selectedOption = _j === void 0 ? false : _j, restProps = __rest(_a, ["option", "highlightText", "triggerVariant", "isGroupOption", "highlightedOption", "selectedOption"]);
    if (!option) {
        return null;
    }
    var disabled = option.disabled;
    var baseProps = getBaseProps(restProps);
    if (isDevelopment) {
        validateStringValue(option.label, 'label');
        validateStringValue(option.description, 'description');
        validateStringValue(option.labelTag, 'labelTag');
        (_b = option.tags) === null || _b === void 0 ? void 0 : _b.forEach(function (tag, index) {
            validateStringValue(tag, "tags[".concat(index, "]"));
        });
        (_c = option.filteringTags) === null || _c === void 0 ? void 0 : _c.forEach(function (tag, index) {
            validateStringValue(tag, "filteringTags[".concat(index, "]"));
        });
    }
    var className = clsx(styles.option, disabled && styles.disabled, isGroupOption && styles.parent);
    var icon = option.__customIcon || (React.createElement(OptionIcon, { name: option.iconName, url: option.iconUrl, svg: option.iconSvg, alt: option.iconAlt, size: option.description || option.tags ? 'big' : 'normal' }));
    return (React.createElement("span", __assign({ title: (_d = option.label) !== null && _d !== void 0 ? _d : option.value, "data-value": option.value, className: className, "aria-disabled": disabled }, baseProps),
        icon,
        React.createElement("span", { className: clsx(styles.content) },
            React.createElement("span", { className: clsx(styles['label-content']) },
                React.createElement(Label, { label: (_e = option.label) !== null && _e !== void 0 ? _e : option.value, prefix: option.__labelPrefix, highlightText: highlightText, triggerVariant: triggerVariant }),
                React.createElement(LabelTag, { labelTag: option.labelTag, highlightText: highlightText, triggerVariant: triggerVariant })),
            React.createElement(Description, { description: option.description, highlightedOption: highlightedOption, selectedOption: selectedOption, highlightText: highlightText, triggerVariant: triggerVariant }),
            React.createElement(Tags, { tags: option.tags, highlightedOption: highlightedOption, selectedOption: selectedOption, highlightText: highlightText, triggerVariant: triggerVariant }),
            React.createElement(FilteringTags, { filteringTags: option.filteringTags, highlightedOption: highlightedOption, selectedOption: selectedOption, highlightText: highlightText, triggerVariant: triggerVariant }))));
};
export default Option;
//# sourceMappingURL=index.js.map