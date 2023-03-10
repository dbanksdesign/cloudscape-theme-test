import { isInteractive, isGroupInteractive, isGroup } from '../../internal/components/option/utils/filter-options';
import { useEffect, useRef } from 'react';
import { useHighlightedOption } from '../../internal/components/options-list/utils/use-highlight-option';
import { useOpenState } from '../../internal/components/options-list/utils/use-open-state';
import { useMenuKeyboard, useTriggerKeyboard } from '../../internal/components/options-list/utils/use-keyboard';
import { getOptionId } from '../../internal/components/options-list/utils/use-ids';
import { connectOptionsByValue } from './connect-options';
import useForwardFocus from '../../internal/hooks/forward-focus';
import { usePrevious } from '../../internal/hooks/use-previous';
import { fireNonCancelableEvent } from '../../internal/events';
import { useUniqueId } from '../../internal/hooks/use-unique-id';
export function useSelect(_a) {
    var selectedOptions = _a.selectedOptions, updateSelectedOption = _a.updateSelectedOption, options = _a.options, filteringType = _a.filteringType, onBlur = _a.onBlur, onFocus = _a.onFocus, externalRef = _a.externalRef, keepOpen = _a.keepOpen, fireLoadItems = _a.fireLoadItems, setFilteringValue = _a.setFilteringValue, _b = _a.useInteractiveGroups, useInteractiveGroups = _b === void 0 ? false : _b;
    var interactivityCheck = useInteractiveGroups ? isGroupInteractive : isInteractive;
    var isHighlightable = function (option) { return !!option && (useInteractiveGroups || option.type !== 'parent'); };
    var filterRef = useRef(null);
    var triggerRef = useRef(null);
    var menuRef = useRef(null);
    var hasFilter = filteringType !== 'none';
    var activeRef = hasFilter ? filterRef : menuRef;
    var isSelectingUsingSpace = useRef(false);
    var __selectedOptions = connectOptionsByValue(options, selectedOptions);
    var __selectedValuesSet = selectedOptions.reduce(function (selectedValuesSet, item) {
        if (item.value) {
            selectedValuesSet.add(item.value);
        }
        return selectedValuesSet;
    }, new Set());
    var _c = useHighlightedOption({ options: options, isHighlightable: isHighlightable }), _d = _c[0], highlightType = _d.highlightType, highlightedOption = _d.highlightedOption, highlightedIndex = _d.highlightedIndex, _e = _c[1], moveHighlightWithKeyboard = _e.moveHighlightWithKeyboard, resetHighlightWithKeyboard = _e.resetHighlightWithKeyboard, setHighlightedIndexWithMouse = _e.setHighlightedIndexWithMouse, highlightOptionWithKeyboard = _e.highlightOptionWithKeyboard, goHomeWithKeyboard = _e.goHomeWithKeyboard, goEndWithKeyboard = _e.goEndWithKeyboard;
    var _f = useOpenState({
        onOpen: function () { return fireLoadItems(''); },
        onClose: function () {
            resetHighlightWithKeyboard();
            setFilteringValue('');
        }
    }), isOpen = _f.isOpen, openDropdown = _f.openDropdown, closeDropdown = _f.closeDropdown, toggleDropdown = _f.toggleDropdown;
    var handleFocus = function () {
        fireNonCancelableEvent(onFocus, {});
    };
    var handleBlur = function () {
        fireNonCancelableEvent(onBlur, {});
        closeDropdown();
    };
    var hasSelectedOption = __selectedOptions.length > 0;
    var menuId = useUniqueId('option-list');
    var highlightedOptionId = getOptionId(menuId, highlightedIndex);
    var selectOption = function (option) {
        var _a;
        isSelectingUsingSpace.current = false;
        var optionToSelect = option || highlightedOption;
        if (!optionToSelect || !interactivityCheck(optionToSelect)) {
            return;
        }
        updateSelectedOption(optionToSelect.option);
        if (!keepOpen) {
            (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            closeDropdown();
        }
    };
    var activeKeyDownHandler = useMenuKeyboard({
        moveHighlight: moveHighlightWithKeyboard,
        selectOption: selectOption,
        goHome: goHomeWithKeyboard,
        goEnd: goEndWithKeyboard,
        closeDropdown: function () {
            var _a;
            (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            closeDropdown();
        },
        isSelectingUsingSpace: isSelectingUsingSpace,
        preventNativeSpace: !hasFilter
    });
    var triggerKeyDownHandler = useTriggerKeyboard({ openDropdown: openDropdown, goHome: goHomeWithKeyboard });
    var getDropdownProps = function () { return ({
        onFocus: handleFocus,
        onBlur: handleBlur
    }); };
    var getTriggerProps = function (disabled, autoFocus) {
        if (disabled === void 0) { disabled = false; }
        if (autoFocus === void 0) { autoFocus = false; }
        var triggerProps = {
            ref: triggerRef,
            onFocus: function () { return closeDropdown(); },
            autoFocus: autoFocus
        };
        if (!disabled) {
            triggerProps.onMouseDown = function (event) {
                var _a;
                event.preventDefault(); // prevent current focus from blurring as it immediately closes the dropdown
                if (isOpen) {
                    (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                }
                toggleDropdown();
            };
            triggerProps.onKeyDown = triggerKeyDownHandler;
        }
        return triggerProps;
    };
    var getFilterProps = function () {
        var _a;
        if (!hasFilter) {
            return {};
        }
        return {
            ref: filterRef,
            onKeyDown: activeKeyDownHandler,
            onChange: function (event) {
                setFilteringValue(event.detail.value);
                resetHighlightWithKeyboard();
            },
            __onDelayedInput: function (event) {
                fireLoadItems(event.detail.value);
            },
            __nativeAttributes: (_a = {
                    'aria-activedescendant': highlightedOptionId
                },
                _a['aria-owns'] = menuId,
                _a['aria-controls'] = menuId,
                _a)
        };
    };
    var getMenuProps = function () {
        var menuProps = {
            id: menuId,
            ref: menuRef,
            open: isOpen,
            onMouseUp: function (itemIndex) {
                if (itemIndex > -1) {
                    selectOption(options[itemIndex]);
                }
            },
            onMouseMove: function (itemIndex) {
                if (itemIndex > -1) {
                    setHighlightedIndexWithMouse(itemIndex);
                }
            }
        };
        if (!hasFilter) {
            menuProps.onKeyDown = activeKeyDownHandler;
            menuProps.nativeAttributes = {
                'aria-activedescendant': highlightedOptionId
            };
        }
        return menuProps;
    };
    var getGroupState = function (option) {
        var totalSelected = option.options.filter(function (item) { return !!item.value && __selectedValuesSet.has(item.value); }).length;
        var hasSelected = totalSelected > 0;
        var allSelected = totalSelected === option.options.length;
        return {
            selected: hasSelected && allSelected,
            indeterminate: hasSelected && !allSelected
        };
    };
    var getOptionProps = function (option, index) {
        var _a;
        var _b;
        var highlighted = option === highlightedOption;
        var groupState = isGroup(option.option) ? getGroupState(option.option) : undefined;
        var selected = __selectedOptions.indexOf(option) > -1 || !!(groupState === null || groupState === void 0 ? void 0 : groupState.selected);
        var nextOption = (_b = options[index + 1]) === null || _b === void 0 ? void 0 : _b.option;
        var isNextSelected = !!nextOption && isGroup(nextOption)
            ? getGroupState(nextOption).selected
            : __selectedOptions.indexOf(options[index + 1]) > -1;
        var optionProps = (_a = {
                key: index,
                option: option,
                highlighted: highlighted,
                selected: selected,
                isNextSelected: isNextSelected,
                indeterminate: !!(groupState === null || groupState === void 0 ? void 0 : groupState.indeterminate)
            },
            _a['data-mouse-target'] = isHighlightable(option) ? index : -1,
            _a.id = getOptionId(menuId, index),
            _a);
        return optionProps;
    };
    var prevOpen = usePrevious(isOpen);
    useEffect(function () {
        // highlight the first selected option, when opening the Select component without filter input
        // keep the focus in the filter input when opening, so that screenreader can recognize the combobox
        if (isOpen && !prevOpen && hasSelectedOption && !hasFilter) {
            setHighlightedIndexWithMouse(options.indexOf(__selectedOptions[0]));
        }
    }, [isOpen, __selectedOptions, hasSelectedOption, setHighlightedIndexWithMouse, options, prevOpen, hasFilter]);
    useEffect(function () {
        var _a;
        if (isOpen) {
            // dropdown-fit calculations ensure that the dropdown will fit inside the current
            // viewport, so prevent the browser from trying to scroll it into view (e.g. if
            // scroll-padding-top is set on a parent)
            (_a = activeRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
        }
    }, [isOpen, activeRef]);
    useForwardFocus(externalRef, triggerRef);
    var highlightedGroupSelected = !!highlightedOption && isGroup(highlightedOption.option) && getGroupState(highlightedOption.option).selected;
    var announceSelected = !!highlightedOption && (__selectedOptions.indexOf(highlightedOption) > -1 || highlightedGroupSelected);
    return {
        isOpen: isOpen,
        highlightedOption: highlightedOption,
        highlightedIndex: highlightedIndex,
        highlightType: highlightType,
        getTriggerProps: getTriggerProps,
        getDropdownProps: getDropdownProps,
        getMenuProps: getMenuProps,
        getFilterProps: getFilterProps,
        getOptionProps: getOptionProps,
        highlightOption: highlightOptionWithKeyboard,
        selectOption: selectOption,
        announceSelected: announceSelected
    };
}
//# sourceMappingURL=use-select.js.map