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
import InternalIcon from '../../icon/internal.js';
var Item = function (_a, ref) {
    var option = _a.option, highlighted = _a.highlighted, selected = _a.selected, filteringValue = _a.filteringValue, hasCheckbox = _a.hasCheckbox, virtualPosition = _a.virtualPosition, padBottom = _a.padBottom, isNextSelected = _a.isNextSelected, screenReaderContent = _a.screenReaderContent, ariaPosinset = _a.ariaPosinset, ariaSetsize = _a.ariaSetsize, highlightType = _a.highlightType, restProps = __rest(_a, ["option", "highlighted", "selected", "filteringValue", "hasCheckbox", "virtualPosition", "padBottom", "isNextSelected", "screenReaderContent", "ariaPosinset", "ariaSetsize", "highlightType"]);
    var baseProps = getBaseProps(restProps);
    var isParent = option.type === 'parent';
    var isChild = option.type === 'child';
    var wrappedOption = option.option;
    var disabled = option.disabled || wrappedOption.disabled;
    return (React.createElement(SelectableItem, __assign({ ariaSelected: Boolean(selected), selected: selected, isNextSelected: isNextSelected, highlighted: highlighted, disabled: option.disabled, isParent: isParent, isChild: isChild, ref: ref, virtualPosition: virtualPosition, padBottom: padBottom, screenReaderContent: screenReaderContent, ariaPosinset: ariaPosinset, ariaSetsize: ariaSetsize, highlightType: highlightType }, baseProps),
        React.createElement("div", { className: clsx(styles.item, !isParent && wrappedOption.labelTag && styles['show-label-tag']) },
            hasCheckbox && !isParent && (React.createElement("div", { className: styles.checkbox },
                React.createElement(CheckboxIcon, { checked: selected || false, disabled: option.disabled }))),
            isParent ? (wrappedOption.label || wrappedOption.value) : (React.createElement(Option, { option: __assign(__assign({}, wrappedOption), { disabled: disabled }), highlightedOption: highlighted, selectedOption: selected, highlightText: filteringValue })),
            !hasCheckbox && !isParent && selected && (React.createElement("div", { className: styles['selected-icon'] },
                React.createElement(InternalIcon, { name: "check" }))))));
};
export default React.memo(React.forwardRef(Item));
//# sourceMappingURL=item.js.map