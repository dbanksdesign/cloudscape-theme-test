import { __assign, __rest, __spreadArray } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useFormFieldContext } from '../internal/context/form-field-context';
import { getBaseProps } from '../internal/base-component';
import { fireNonCancelableEvent } from '../internal/events';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { isGroup } from '../internal/components/option/utils/filter-options';
import DropdownFooter from '../internal/components/dropdown-footer/index.js';
import { prepareOptions } from '../internal/components/option/utils/prepare-options';
import Dropdown from '../internal/components/dropdown';
import { useDropdownStatus } from '../internal/components/dropdown-status';
import { useSelect } from '../select/utils/use-select';
import { useNativeSearch } from '../select/utils/use-native-search';
import { useLoadItems } from '../select/utils/use-load-items';
import { useAnnouncement } from '../select/utils/use-announcement';
import { findOptionIndex } from '../select/utils/connect-options';
import PlainList from '../select/parts/plain-list';
import VirtualList from '../select/parts/virtual-list';
import { checkOptionValueField } from '../select/utils/check-option-value-field.js';
import Filter from '../select/parts/filter';
import Trigger from '../select/parts/trigger';
import TokenGroup from '../token-group/index.js';
import styles from './styles.css.js';
import ScreenreaderOnly from '../internal/components/screenreader-only';
import { joinStrings } from '../internal/utils/strings';
var InternalMultiselect = React.forwardRef(function (_a, externalRef) {
    var _b;
    var _c = _a.options, options = _c === void 0 ? [] : _c, _d = _a.filteringType, filteringType = _d === void 0 ? 'none' : _d, filteringPlaceholder = _a.filteringPlaceholder, filteringAriaLabel = _a.filteringAriaLabel, filteringClearAriaLabel = _a.filteringClearAriaLabel, ariaRequired = _a.ariaRequired, placeholder = _a.placeholder, disabled = _a.disabled, ariaLabel = _a.ariaLabel, _e = _a.statusType, statusType = _e === void 0 ? 'finished' : _e, empty = _a.empty, loadingText = _a.loadingText, finishedText = _a.finishedText, errorText = _a.errorText, recoveryText = _a.recoveryText, noMatch = _a.noMatch, selectedAriaLabel = _a.selectedAriaLabel, renderHighlightedAriaLive = _a.renderHighlightedAriaLive, _f = _a.selectedOptions, selectedOptions = _f === void 0 ? [] : _f, deselectAriaLabel = _a.deselectAriaLabel, _g = _a.keepOpen, keepOpen = _g === void 0 ? true : _g, tokenLimit = _a.tokenLimit, i18nStrings = _a.i18nStrings, onBlur = _a.onBlur, onFocus = _a.onFocus, onLoadItems = _a.onLoadItems, onChange = _a.onChange, virtualScroll = _a.virtualScroll, _h = _a.hideTokens, hideTokens = _h === void 0 ? false : _h, expandToViewport = _a.expandToViewport, _j = _a.__internalRootRef, __internalRootRef = _j === void 0 ? null : _j, autoFocus = _a.autoFocus, restProps = __rest(_a, ["options", "filteringType", "filteringPlaceholder", "filteringAriaLabel", "filteringClearAriaLabel", "ariaRequired", "placeholder", "disabled", "ariaLabel", "statusType", "empty", "loadingText", "finishedText", "errorText", "recoveryText", "noMatch", "selectedAriaLabel", "renderHighlightedAriaLive", "selectedOptions", "deselectAriaLabel", "keepOpen", "tokenLimit", "i18nStrings", "onBlur", "onFocus", "onLoadItems", "onChange", "virtualScroll", "hideTokens", "expandToViewport", "__internalRootRef", "autoFocus"]);
    checkOptionValueField('Multiselect', 'options', options);
    var baseProps = getBaseProps(restProps);
    var formFieldContext = useFormFieldContext(restProps);
    var _k = useLoadItems({
        onLoadItems: onLoadItems,
        options: options,
        statusType: statusType
    }), handleLoadMore = _k.handleLoadMore, handleRecoveryClick = _k.handleRecoveryClick, fireLoadItems = _k.fireLoadItems;
    var useInteractiveGroups = true;
    var _l = useState(''), filteringValue = _l[0], setFilteringValue = _l[1];
    var _m = prepareOptions(options, filteringType, filteringValue), filteredOptions = _m.filteredOptions, parentMap = _m.parentMap;
    var updateSelectedOption = useCallback(function (option) {
        var filtered = filteredOptions.filter(function (item) { return item.type !== 'parent'; }).map(function (item) { return item.option; });
        // switch between selection and deselection behavior, ignores disabled options to prevent
        // getting stuck on one behavior when an option is disabled and its state cannot be changed
        var isAllChildrenSelected = function (optionsArray) {
            return optionsArray.every(function (item) { return findOptionIndex(selectedOptions, item) > -1 || item.disabled; });
        };
        var intersection = function (visibleOptions, options) {
            return visibleOptions.filter(function (item) { return findOptionIndex(options, item) > -1 && !item.disabled; });
        };
        var union = function (visibleOptions, options) {
            return visibleOptions.filter(function (item) { return findOptionIndex(options, item) === -1; }).concat(options);
        };
        var select = function (options, selectedOptions) {
            return union(selectedOptions, options);
        };
        var unselect = function (options, selectedOptions) {
            return selectedOptions.filter(function (option) { return findOptionIndex(options, option) === -1; });
        };
        var newSelectedOptions = __spreadArray([], selectedOptions, true);
        if (isGroup(option)) {
            var visibleOptions = intersection(__spreadArray([], option.options, true), filtered);
            newSelectedOptions = isAllChildrenSelected(visibleOptions)
                ? unselect(visibleOptions, newSelectedOptions)
                : select(visibleOptions, newSelectedOptions);
        }
        else {
            newSelectedOptions = isAllChildrenSelected([option])
                ? unselect([option], newSelectedOptions)
                : select([option], newSelectedOptions);
        }
        fireNonCancelableEvent(onChange, {
            selectedOptions: newSelectedOptions
        });
    }, [onChange, selectedOptions, filteredOptions]);
    var rootRef = useRef(null);
    var selfControlId = useUniqueId('trigger');
    var controlId = (_b = formFieldContext.controlId) !== null && _b !== void 0 ? _b : selfControlId;
    var multiSelectAriaLabelId = useUniqueId('multiselect-arialabel-');
    var scrollToIndex = useRef(null);
    var _o = useSelect({
        selectedOptions: selectedOptions,
        updateSelectedOption: updateSelectedOption,
        options: filteredOptions,
        filteringType: filteringType,
        onFocus: onFocus,
        onBlur: onBlur,
        externalRef: externalRef,
        keepOpen: keepOpen,
        fireLoadItems: fireLoadItems,
        setFilteringValue: setFilteringValue,
        useInteractiveGroups: useInteractiveGroups
    }), isOpen = _o.isOpen, highlightType = _o.highlightType, highlightedOption = _o.highlightedOption, highlightedIndex = _o.highlightedIndex, getTriggerProps = _o.getTriggerProps, getDropdownProps = _o.getDropdownProps, getFilterProps = _o.getFilterProps, getMenuProps = _o.getMenuProps, getOptionProps = _o.getOptionProps, highlightOption = _o.highlightOption, announceSelected = _o.announceSelected;
    var handleNativeSearch = useNativeSearch({
        isEnabled: filteringType === 'none' && isOpen,
        options: filteredOptions,
        highlightOption: highlightOption,
        highlightedOption: highlightedOption === null || highlightedOption === void 0 ? void 0 : highlightedOption.option,
        useInteractiveGroups: useInteractiveGroups
    });
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
    var filter = (React.createElement(Filter, __assign({ clearAriaLabel: filteringClearAriaLabel, filteringType: filteringType, placeholder: filteringPlaceholder, ariaLabel: filteringAriaLabel, ariaRequired: ariaRequired, value: filteringValue }, getFilterProps())));
    var trigger = (React.createElement(Trigger, __assign({ placeholder: placeholder, disabled: disabled, triggerProps: getTriggerProps(disabled, autoFocus), selectedOption: null, isOpen: isOpen }, formFieldContext, { controlId: controlId, ariaLabelledby: joinStrings(formFieldContext.ariaLabelledby, multiSelectAriaLabelId) })));
    var menuProps = __assign(__assign({}, getMenuProps()), { onLoadMore: handleLoadMore, ariaLabelledby: joinStrings(multiSelectAriaLabelId, controlId) });
    var announcement = useAnnouncement({
        announceSelected: announceSelected,
        highlightedOption: highlightedOption,
        getParent: function (option) { var _a; return (_a = parentMap.get(option)) === null || _a === void 0 ? void 0 : _a.option; },
        selectedAriaLabel: selectedAriaLabel,
        renderHighlightedAriaLive: renderHighlightedAriaLive
    });
    var tokens = selectedOptions.map(function (option) { return ({
        label: option.label,
        disabled: disabled || option.disabled,
        labelTag: option.labelTag,
        description: option.description,
        iconAlt: option.iconAlt,
        iconName: option.iconName,
        iconUrl: option.iconUrl,
        iconSvg: option.iconSvg,
        tags: option.tags,
        dismissLabel: deselectAriaLabel ? deselectAriaLabel(option) : undefined
    }); });
    useEffect(function () {
        var _a;
        (_a = scrollToIndex.current) === null || _a === void 0 ? void 0 : _a.call(scrollToIndex, highlightedIndex);
    }, [highlightedIndex]);
    var ListComponent = virtualScroll ? VirtualList : PlainList;
    var handleMouseDown = function (event) {
        var target = event.target;
        if (target !== document.activeElement) {
            // prevent currently focused element from losing it
            event.preventDefault();
        }
    };
    var showTokens = !hideTokens && tokens.length > 0;
    var handleTokenDismiss = function (_a) {
        var detail = _a.detail;
        var optionToDeselect = selectedOptions[detail.itemIndex];
        updateSelectedOption(optionToDeselect);
        var targetRef = getTriggerProps().ref;
        if (targetRef.current) {
            targetRef.current.focus();
        }
    };
    var tokenGroupI18nStrings = {
        limitShowFewer: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.tokenLimitShowFewer,
        limitShowMore: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.tokenLimitShowMore
    };
    var mergedRef = useMergeRefs(rootRef, __internalRootRef);
    return (React.createElement("div", __assign({}, baseProps, { ref: mergedRef, className: clsx(styles.root, baseProps.className), onKeyPress: handleNativeSearch }),
        React.createElement(Dropdown, __assign({}, getDropdownProps(), { open: isOpen, trigger: trigger, header: filter, onMouseDown: handleMouseDown, footer: dropdownStatus.isSticky ? React.createElement(DropdownFooter, { content: isOpen ? dropdownStatus.content : null }) : null, expandToViewport: expandToViewport }),
            React.createElement(ListComponent, { listBottom: !dropdownStatus.isSticky ? React.createElement(DropdownFooter, { content: isOpen ? dropdownStatus.content : null }) : null, menuProps: menuProps, getOptionProps: getOptionProps, filteredOptions: filteredOptions, filteringValue: filteringValue, ref: scrollToIndex, hasDropdownStatus: dropdownStatus.content !== null, checkboxes: true, useInteractiveGroups: useInteractiveGroups, screenReaderContent: announcement, highlightType: highlightType })),
        showTokens && (React.createElement(TokenGroup, { limit: tokenLimit, items: tokens, onDismiss: handleTokenDismiss, i18nStrings: tokenGroupI18nStrings })),
        React.createElement(ScreenreaderOnly, { id: multiSelectAriaLabelId }, ariaLabel)));
});
export default InternalMultiselect;
//# sourceMappingURL=internal.js.map