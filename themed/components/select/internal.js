import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
import Dropdown from '../internal/components/dropdown';
import { useDropdownStatus } from '../internal/components/dropdown-status';
import Filter from './parts/filter';
import Trigger from './parts/trigger';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { getBaseProps } from '../internal/base-component';
import { prepareOptions } from '../internal/components/option/utils/prepare-options';
import { useSelect } from './utils/use-select';
import { checkOptionValueField } from './utils/check-option-value-field';
import { useNativeSearch } from './utils/use-native-search';
import { fireNonCancelableEvent } from '../internal/events';
import { useLoadItems } from './utils/use-load-items';
import { useAnnouncement } from './utils/use-announcement';
import { useFormFieldContext } from '../internal/context/form-field-context';
import PlainList from './parts/plain-list';
import VirtualList from './parts/virtual-list';
import DropdownFooter from '../internal/components/dropdown-footer';
import checkControlled from '../internal/hooks/check-controlled';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import ScreenreaderOnly from '../internal/components/screenreader-only/index.js';
import { joinStrings } from '../internal/utils/strings/join-strings.js';
var InternalSelect = React.forwardRef(function (_a, externalRef) {
    var _b;
    var options = _a.options, _c = _a.filteringType, filteringType = _c === void 0 ? 'none' : _c, filteringPlaceholder = _a.filteringPlaceholder, filteringAriaLabel = _a.filteringAriaLabel, filteringClearAriaLabel = _a.filteringClearAriaLabel, ariaRequired = _a.ariaRequired, placeholder = _a.placeholder, disabled = _a.disabled, ariaLabel = _a.ariaLabel, _d = _a.statusType, statusType = _d === void 0 ? 'finished' : _d, empty = _a.empty, loadingText = _a.loadingText, finishedText = _a.finishedText, errorText = _a.errorText, recoveryText = _a.recoveryText, noMatch = _a.noMatch, _e = _a.triggerVariant, triggerVariant = _e === void 0 ? 'label' : _e, selectedAriaLabel = _a.selectedAriaLabel, renderHighlightedAriaLive = _a.renderHighlightedAriaLive, selectedOption = _a.selectedOption, onBlur = _a.onBlur, onFocus = _a.onFocus, onLoadItems = _a.onLoadItems, onChange = _a.onChange, virtualScroll = _a.virtualScroll, expandToViewport = _a.expandToViewport, autoFocus = _a.autoFocus, __inFilteringToken = _a.__inFilteringToken, _f = _a.__internalRootRef, __internalRootRef = _f === void 0 ? null : _f, restProps = __rest(_a, ["options", "filteringType", "filteringPlaceholder", "filteringAriaLabel", "filteringClearAriaLabel", "ariaRequired", "placeholder", "disabled", "ariaLabel", "statusType", "empty", "loadingText", "finishedText", "errorText", "recoveryText", "noMatch", "triggerVariant", "selectedAriaLabel", "renderHighlightedAriaLive", "selectedOption", "onBlur", "onFocus", "onLoadItems", "onChange", "virtualScroll", "expandToViewport", "autoFocus", "__inFilteringToken", "__internalRootRef"]);
    var baseProps = getBaseProps(restProps);
    var formFieldContext = useFormFieldContext(restProps);
    var _g = useLoadItems({
        onLoadItems: onLoadItems,
        options: options,
        statusType: statusType
    }), handleLoadMore = _g.handleLoadMore, handleRecoveryClick = _g.handleRecoveryClick, fireLoadItems = _g.fireLoadItems;
    checkControlled('Select', 'selectedOption', selectedOption, 'onChange', onChange);
    checkOptionValueField('Select', 'options', options);
    var _h = useState(''), filteringValue = _h[0], setFilteringValue = _h[1];
    var _j = prepareOptions(options, filteringType, filteringValue), filteredOptions = _j.filteredOptions, parentMap = _j.parentMap;
    var rootRef = useRef(null);
    var triggerRef = useRef(null);
    var selfControlId = useUniqueId('trigger');
    var controlId = (_b = formFieldContext.controlId) !== null && _b !== void 0 ? _b : selfControlId;
    var scrollToIndex = useRef(null);
    var _k = useSelect({
        selectedOptions: selectedOption ? [selectedOption] : [],
        updateSelectedOption: function (option) { return fireNonCancelableEvent(onChange, { selectedOption: option }); },
        options: filteredOptions,
        filteringType: filteringType,
        onBlur: onBlur,
        onFocus: onFocus,
        externalRef: externalRef,
        fireLoadItems: fireLoadItems,
        setFilteringValue: setFilteringValue
    }), isOpen = _k.isOpen, highlightType = _k.highlightType, highlightedOption = _k.highlightedOption, highlightedIndex = _k.highlightedIndex, getTriggerProps = _k.getTriggerProps, getDropdownProps = _k.getDropdownProps, getFilterProps = _k.getFilterProps, getMenuProps = _k.getMenuProps, getOptionProps = _k.getOptionProps, highlightOption = _k.highlightOption, selectOption = _k.selectOption, announceSelected = _k.announceSelected;
    var handleNativeSearch = useNativeSearch({
        isEnabled: filteringType === 'none',
        options: filteredOptions,
        highlightOption: !isOpen ? selectOption : highlightOption,
        highlightedOption: !isOpen ? selectedOption : highlightedOption === null || highlightedOption === void 0 ? void 0 : highlightedOption.option
    });
    var selectAriaLabelId = useUniqueId('select-arialabel-');
    useEffect(function () {
        var _a;
        (_a = scrollToIndex.current) === null || _a === void 0 ? void 0 : _a.call(scrollToIndex, highlightedIndex);
    }, [highlightedIndex]);
    var filter = (React.createElement(Filter, __assign({ clearAriaLabel: filteringClearAriaLabel, filteringType: filteringType, placeholder: filteringPlaceholder, ariaLabel: filteringAriaLabel, ariaRequired: ariaRequired, value: filteringValue }, getFilterProps())));
    var trigger = (React.createElement(Trigger, __assign({ ref: triggerRef, placeholder: placeholder, disabled: disabled, triggerVariant: triggerVariant, triggerProps: getTriggerProps(disabled, autoFocus), selectedOption: selectedOption, isOpen: isOpen, inFilteringToken: __inFilteringToken }, formFieldContext, { controlId: controlId, ariaLabelledby: joinStrings(formFieldContext.ariaLabelledby, selectAriaLabelId) })));
    var menuProps = __assign(__assign({}, getMenuProps()), { onLoadMore: handleLoadMore, ariaLabelledby: joinStrings(selectAriaLabelId, controlId) });
    var isEmpty = !options || options.length === 0;
    var isNoMatch = filteredOptions && filteredOptions.length === 0;
    var dropdownStatus = useDropdownStatus({
        statusType: statusType,
        empty: empty,
        loadingText: loadingText,
        finishedText: finishedText,
        errorText: errorText,
        recoveryText: recoveryText,
        isEmpty: isEmpty,
        isNoMatch: isNoMatch,
        noMatch: noMatch,
        onRecoveryClick: handleRecoveryClick,
        errorIconAriaLabel: restProps.errorIconAriaLabel
    });
    var announcement = useAnnouncement({
        announceSelected: announceSelected,
        highlightedOption: highlightedOption,
        getParent: function (option) { var _a; return (_a = parentMap.get(option)) === null || _a === void 0 ? void 0 : _a.option; },
        selectedAriaLabel: selectedAriaLabel,
        renderHighlightedAriaLive: renderHighlightedAriaLive
    });
    var ListComponent = virtualScroll ? VirtualList : PlainList;
    var handleMouseDown = function (event) {
        var target = event.target;
        if (target !== document.activeElement) {
            // prevent currently focused element from losing it
            event.preventDefault();
        }
    };
    var mergedRef = useMergeRefs(rootRef, __internalRootRef);
    return (React.createElement("div", __assign({}, baseProps, { ref: mergedRef, className: clsx(styles.root, baseProps.className), onKeyPress: handleNativeSearch }),
        React.createElement(Dropdown, __assign({}, getDropdownProps(), { open: isOpen, stretchTriggerHeight: __inFilteringToken, trigger: trigger, header: filter, onMouseDown: handleMouseDown, footer: dropdownStatus.isSticky ? React.createElement(DropdownFooter, { content: isOpen ? dropdownStatus.content : null }) : null, expandToViewport: expandToViewport }),
            React.createElement(ListComponent, { listBottom: !dropdownStatus.isSticky ? React.createElement(DropdownFooter, { content: isOpen ? dropdownStatus.content : null }) : null, menuProps: menuProps, getOptionProps: getOptionProps, filteredOptions: filteredOptions, filteringValue: filteringValue, ref: scrollToIndex, hasDropdownStatus: dropdownStatus.content !== null, screenReaderContent: announcement, highlightType: highlightType })),
        React.createElement(ScreenreaderOnly, { id: selectAriaLabelId }, ariaLabel)));
});
export default InternalSelect;
//# sourceMappingURL=internal.js.map