import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
import Option from '../../internal/components/option';
import SelectableItem from '../../internal/components/selectable-item';
import { getBaseProps } from '../../internal/base-component';
import CheckboxIcon from '../../internal/components/checkbox-icon';
var MultiSelectItem = function (_a, ref) {
    var _b;
    var option = _a.option, highlighted = _a.highlighted, selected = _a.selected, filteringValue = _a.filteringValue, hasCheckbox = _a.hasCheckbox, virtualPosition = _a.virtualPosition, padBottom = _a.padBottom, isNextSelected = _a.isNextSelected, indeterminate = _a.indeterminate, screenReaderContent = _a.screenReaderContent, ariaPosinset = _a.ariaPosinset, ariaSetsize = _a.ariaSetsize, highlightType = _a.highlightType, restProps = __rest(_a, ["option", "highlighted", "selected", "filteringValue", "hasCheckbox", "virtualPosition", "padBottom", "isNextSelected", "indeterminate", "screenReaderContent", "ariaPosinset", "ariaSetsize", "highlightType"]);
    var baseProps = getBaseProps(restProps);
    var isParent = option.type === 'parent';
    var isChild = option.type === 'child';
    var wrappedOption = option.option;
    var disabled = option.disabled || wrappedOption.disabled;
    var className = clsx(styles.item, (_b = {},
        _b[styles.disabled] = disabled,
        _b));
    return (React.createElement(SelectableItem, __assign({ ariaChecked: isParent && indeterminate ? 'mixed' : Boolean(selected), selected: selected, isNextSelected: isNextSelected, highlighted: highlighted, disabled: disabled, isParent: isParent, isChild: isChild, highlightType: highlightType, ref: ref, virtualPosition: virtualPosition, padBottom: padBottom, useInteractiveGroups: true, screenReaderContent: screenReaderContent, ariaPosinset: ariaPosinset, ariaSetsize: ariaSetsize }, baseProps),
        React.createElement("div", { className: className },
            hasCheckbox && (React.createElement("div", { className: styles.checkbox },
                React.createElement(CheckboxIcon, { checked: selected, indeterminate: isParent && indeterminate, disabled: option.disabled }))),
            React.createElement(Option, { option: __assign(__assign({}, wrappedOption), { disabled: disabled }), highlightedOption: highlighted, selectedOption: selected, highlightText: filteringValue, isGroupOption: isParent }))));
};
export default React.memo(React.forwardRef(MultiSelectItem));
//# sourceMappingURL=multiselect-item.js.map