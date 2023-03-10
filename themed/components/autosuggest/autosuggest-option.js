import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import OptionComponent from '../internal/components/option';
import SelectableItem from '../internal/components/selectable-item';
import { getBaseProps } from '../internal/base-component';
import { getTestOptionIndexes } from '../internal/components/options-list/utils/test-indexes';
import styles from './styles.css.js';
var AutosuggestOption = function (_a, ref) {
    var _b = _a.nativeAttributes, nativeAttributes = _b === void 0 ? {} : _b, highlightText = _a.highlightText, option = _a.option, highlighted = _a.highlighted, highlightType = _a.highlightType, enteredTextLabel = _a.enteredTextLabel, virtualPosition = _a.virtualPosition, padBottom = _a.padBottom, screenReaderContent = _a.screenReaderContent, ariaSetsize = _a.ariaSetsize, ariaPosinset = _a.ariaPosinset, rest = __rest(_a, ["nativeAttributes", "highlightText", "option", "highlighted", "highlightType", "enteredTextLabel", "virtualPosition", "padBottom", "screenReaderContent", "ariaSetsize", "ariaPosinset"]);
    var baseProps = getBaseProps(rest);
    var useEntered = 'type' in option && option.type === 'use-entered';
    var isParent = 'type' in option && option.type === 'parent';
    var isChild = 'type' in option && option.type === 'child';
    var _c = getTestOptionIndexes(option) || {}, throughIndex = _c.throughIndex, inGroupIndex = _c.inGroupIndex, groupIndex = _c.groupIndex;
    var optionContent;
    if (useEntered) {
        optionContent = enteredTextLabel(option.value || '');
    }
    else if (isParent) {
        optionContent = option.label;
    }
    else {
        var a11yProperties = {};
        if (nativeAttributes['aria-label']) {
            a11yProperties['aria-label'] = nativeAttributes['aria-label'];
        }
        optionContent = (React.createElement("div", __assign({}, a11yProperties),
            React.createElement(OptionComponent, { option: option, highlightedOption: highlighted, highlightText: highlightText })));
    }
    return (React.createElement(SelectableItem, __assign({}, baseProps, { className: styles.option, ariaSelected: highlighted, highlighted: highlighted, disabled: option.disabled, hasBackground: useEntered, isParent: isParent, isChild: isChild, virtualPosition: virtualPosition, "data-test-index": throughIndex, "data-in-group-index": inGroupIndex, "data-group-index": groupIndex, ref: ref, padBottom: padBottom, screenReaderContent: screenReaderContent, ariaSetsize: ariaSetsize, ariaPosinset: ariaPosinset, highlightType: highlightType }), optionContent));
};
export default React.memo(React.forwardRef(AutosuggestOption));
//# sourceMappingURL=autosuggest-option.js.map