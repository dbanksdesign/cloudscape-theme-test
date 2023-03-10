// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __assign, __rest } from "tslib";
import React, { useImperativeHandle, useRef } from 'react';
import { useAutosuggestItems } from './options-controller';
import { useDropdownStatus } from '../internal/components/dropdown-status';
import DropdownFooter from '../internal/components/dropdown-footer';
import { generateUniqueId, useUniqueId } from '../internal/hooks/use-unique-id';
import { fireCancelableEvent, fireNonCancelableEvent, } from '../internal/events';
import styles from './styles.css.js';
import { checkOptionValueField } from '../select/utils/check-option-value-field';
import checkControlled from '../internal/hooks/check-controlled';
import AutosuggestOptionsList from './options-list';
import { useAutosuggestLoadMore } from './load-more-controller';
import AutosuggestInput from '../internal/components/autosuggest-input';
import { useFormFieldContext } from '../contexts/form-field';
import clsx from 'clsx';
var InternalAutosuggest = React.forwardRef(function (props, ref) {
    var _a;
    var value = props.value, onChange = props.onChange, onBlur = props.onBlur, onFocus = props.onFocus, onKeyUp = props.onKeyUp, onLoadItems = props.onLoadItems, options = props.options, _b = props.filteringType, filteringType = _b === void 0 ? 'auto' : _b, _c = props.statusType, statusType = _c === void 0 ? 'finished' : _c, recoveryText = props.recoveryText, placeholder = props.placeholder, clearAriaLabel = props.clearAriaLabel, name = props.name, disabled = props.disabled, _d = props.disableBrowserAutocorrect, disableBrowserAutocorrect = _d === void 0 ? false : _d, autoFocus = props.autoFocus, readOnly = props.readOnly, ariaLabel = props.ariaLabel, ariaRequired = props.ariaRequired, enteredTextLabel = props.enteredTextLabel, onKeyDown = props.onKeyDown, virtualScroll = props.virtualScroll, expandToViewport = props.expandToViewport, onSelect = props.onSelect, selectedAriaLabel = props.selectedAriaLabel, renderHighlightedAriaLive = props.renderHighlightedAriaLive, __internalRootRef = props.__internalRootRef, restProps = __rest(props, ["value", "onChange", "onBlur", "onFocus", "onKeyUp", "onLoadItems", "options", "filteringType", "statusType", "recoveryText", "placeholder", "clearAriaLabel", "name", "disabled", "disableBrowserAutocorrect", "autoFocus", "readOnly", "ariaLabel", "ariaRequired", "enteredTextLabel", "onKeyDown", "virtualScroll", "expandToViewport", "onSelect", "selectedAriaLabel", "renderHighlightedAriaLive", "__internalRootRef"]);
    checkControlled('Autosuggest', 'value', value, 'onChange', onChange);
    checkOptionValueField('Autosuggest', 'options', options);
    var autosuggestInputRef = useRef(null);
    useImperativeHandle(ref, function () { return ({
        focus: function () { var _a; return (_a = autosuggestInputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); },
        select: function () { var _a; return (_a = autosuggestInputRef.current) === null || _a === void 0 ? void 0 : _a.select(); }
    }); }, []);
    var _e = useAutosuggestItems({
        options: options || [],
        filterValue: value,
        filterText: value,
        filteringType: filteringType,
        hideEnteredTextLabel: false,
        onSelectItem: function (option) {
            var _a;
            var value = option.value || '';
            fireNonCancelableEvent(onChange, { value: value });
            fireNonCancelableEvent(onSelect, { value: value });
            (_a = autosuggestInputRef.current) === null || _a === void 0 ? void 0 : _a.close();
        }
    }), autosuggestItemsState = _e[0], autosuggestItemsHandlers = _e[1];
    var autosuggestLoadMoreHandlers = useAutosuggestLoadMore({
        options: options,
        statusType: statusType,
        onLoadItems: function (detail) { return fireNonCancelableEvent(onLoadItems, detail); }
    });
    var handleChange = function (event) {
        autosuggestItemsHandlers.setShowAll(false);
        autosuggestItemsHandlers.resetHighlightWithKeyboard();
        fireNonCancelableEvent(onChange, event.detail);
    };
    var handleDelayedInput = function (event) {
        autosuggestLoadMoreHandlers.fireLoadMoreOnInputChange(event.detail.value);
    };
    var handleBlur = function () {
        fireNonCancelableEvent(onBlur, null);
    };
    var handleFocus = function () {
        autosuggestItemsHandlers.setShowAll(true);
        autosuggestLoadMoreHandlers.fireLoadMoreOnInputFocus();
        fireNonCancelableEvent(onFocus, null);
    };
    var handleKeyUp = function (e) {
        fireCancelableEvent(onKeyUp, e.detail);
    };
    var handleKeyDown = function (e) {
        fireCancelableEvent(onKeyDown, e.detail);
    };
    var handlePressArrowDown = function () {
        autosuggestItemsHandlers.moveHighlightWithKeyboard(1);
    };
    var handlePressArrowUp = function () {
        autosuggestItemsHandlers.moveHighlightWithKeyboard(-1);
    };
    var handlePressEnter = function () {
        return autosuggestItemsHandlers.selectHighlightedOptionWithKeyboard();
    };
    var handleCloseDropdown = function () {
        autosuggestItemsHandlers.resetHighlightWithKeyboard();
    };
    var handleRecoveryClick = function () {
        var _a;
        autosuggestLoadMoreHandlers.fireLoadMoreOnRecoveryClick();
        (_a = autosuggestInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    var formFieldContext = useFormFieldContext(restProps);
    var selfControlId = useUniqueId('input');
    var controlId = (_a = formFieldContext.controlId) !== null && _a !== void 0 ? _a : selfControlId;
    var listId = useUniqueId('list');
    var highlightedOptionId = autosuggestItemsState.highlightedOption ? generateUniqueId() : undefined;
    var isEmpty = !value && !autosuggestItemsState.items.length;
    var dropdownStatus = useDropdownStatus(__assign(__assign({}, props), { isEmpty: isEmpty, recoveryText: recoveryText, onRecoveryClick: handleRecoveryClick }));
    return (React.createElement(AutosuggestInput, __assign({}, restProps, { className: clsx(styles.root, restProps.className), ref: autosuggestInputRef, __internalRootRef: __internalRootRef, value: value, onChange: handleChange, onBlur: handleBlur, onFocus: handleFocus, onKeyUp: handleKeyUp, onKeyDown: handleKeyDown, name: name, controlId: controlId, placeholder: placeholder, disabled: disabled, readOnly: readOnly, autoFocus: autoFocus, ariaLabel: ariaLabel, ariaRequired: ariaRequired, clearAriaLabel: clearAriaLabel, disableBrowserAutocorrect: disableBrowserAutocorrect, expandToViewport: expandToViewport, ariaControls: listId, ariaActivedescendant: highlightedOptionId, dropdownExpanded: autosuggestItemsState.items.length > 1 || dropdownStatus.content !== null, dropdownContent: React.createElement(AutosuggestOptionsList, { autosuggestItemsState: autosuggestItemsState, autosuggestItemsHandlers: autosuggestItemsHandlers, highlightedOptionId: highlightedOptionId, highlightText: value, listId: listId, controlId: controlId, enteredTextLabel: enteredTextLabel, handleLoadMore: autosuggestLoadMoreHandlers.fireLoadMoreOnScroll, hasDropdownStatus: dropdownStatus.content !== null, virtualScroll: virtualScroll, selectedAriaLabel: selectedAriaLabel, renderHighlightedAriaLive: renderHighlightedAriaLive, listBottom: !dropdownStatus.isSticky ? React.createElement(DropdownFooter, { content: dropdownStatus.content }) : null }), dropdownFooter: dropdownStatus.isSticky ? (React.createElement(DropdownFooter, { content: dropdownStatus.content, hasItems: autosuggestItemsState.items.length >= 1 })) : null, loopFocus: statusType === 'error' && !!recoveryText, onCloseDropdown: handleCloseDropdown, onDelayedInput: handleDelayedInput, onPressArrowDown: handlePressArrowDown, onPressArrowUp: handlePressArrowUp, onPressEnter: handlePressEnter })));
});
export default InternalAutosuggest;
//# sourceMappingURL=internal.js.map