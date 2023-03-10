import { __assign, __rest, __spreadArray } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useImperativeHandle, useLayoutEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { getBaseProps } from '../internal/base-component';
import { fireNonCancelableEvent } from '../internal/events';
import { useStableEventHandler } from '../internal/hooks/use-stable-event-handler';
import InternalAttributeEditor from '../attribute-editor/internal';
import InternalStatusIndicator from '../status-indicator/internal';
import InternalBox from '../box/internal';
import { FormFieldError } from '../form-field/internal';
import { TagControl, UndoButton } from './internal';
import { validate } from './validation';
import { findIndex, useMemoizedArray } from './utils';
import styles from './styles.css.js';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import useBaseComponent from '../internal/hooks/use-base-component';
import LiveRegion from '../internal/components/live-region';
var isItemRemovable = function (_a) {
    var tag = _a.tag;
    return !tag.markedForRemoval;
};
var TagEditor = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.tags, tags = _d === void 0 ? [] : _d, i18nStrings = _a.i18nStrings, _e = _a.loading, loading = _e === void 0 ? false : _e, _f = _a.tagLimit, tagLimit = _f === void 0 ? 50 : _f, allowedCharacterPattern = _a.allowedCharacterPattern, keysRequest = _a.keysRequest, valuesRequest = _a.valuesRequest, onChange = _a.onChange, restProps = __rest(_a, ["tags", "i18nStrings", "loading", "tagLimit", "allowedCharacterPattern", "keysRequest", "valuesRequest", "onChange"]);
    var baseComponentProps = useBaseComponent('TagEditor');
    var remainingTags = tagLimit - tags.filter(function (tag) { return !tag.markedForRemoval; }).length;
    var attributeEditorRef = useRef(null);
    var keyInputRefs = useRef([]);
    var valueInputRefs = useRef([]);
    var undoButtonRefs = useRef([]);
    var initialKeyOptionsRef = useRef([]);
    var keyDirtyStateRef = useRef([]);
    var focusEventRef = useRef();
    useLayoutEffect(function () {
        var _a;
        (_a = focusEventRef.current) === null || _a === void 0 ? void 0 : _a.apply(undefined);
        focusEventRef.current = undefined;
    });
    var errors = validate(tags, keyDirtyStateRef.current, i18nStrings, allowedCharacterPattern ? new RegExp(allowedCharacterPattern) : undefined);
    var internalTags = useMemoizedArray(tags.map(function (tag, i) { return ({ tag: tag, error: errors[i] }); }), function (prev, next) {
        var _a, _b, _c, _d;
        return prev.tag === next.tag && ((_a = prev.error) === null || _a === void 0 ? void 0 : _a.key) === ((_b = next.error) === null || _b === void 0 ? void 0 : _b.key) && ((_c = prev.error) === null || _c === void 0 ? void 0 : _c.value) === ((_d = next.error) === null || _d === void 0 ? void 0 : _d.value);
    });
    useImperativeHandle(ref, function () { return ({
        focus: function () {
            var _a, _b;
            var errorIndex = findIndex(internalTags, function (_a) {
                var error = _a.error;
                return (error === null || error === void 0 ? void 0 : error.key) || (error === null || error === void 0 ? void 0 : error.value);
            });
            if (errorIndex !== -1) {
                var refArray = ((_a = internalTags[errorIndex].error) === null || _a === void 0 ? void 0 : _a.key) ? keyInputRefs : valueInputRefs;
                (_b = refArray.current[errorIndex]) === null || _b === void 0 ? void 0 : _b.focus();
            }
        }
    }); }, [internalTags]);
    var validateAndFire = useCallback(function (newTags) {
        fireNonCancelableEvent(onChange, {
            tags: newTags,
            valid: !validate(newTags, keyDirtyStateRef.current, i18nStrings, allowedCharacterPattern ? new RegExp(allowedCharacterPattern) : undefined).some(function (error) { return error; })
        });
    }, [onChange, i18nStrings, allowedCharacterPattern]);
    var onAddButtonClick = function () {
        validateAndFire(__spreadArray(__spreadArray([], tags, true), [{ key: '', value: '', existing: false }], false));
        focusEventRef.current = function () {
            var _a;
            (_a = keyInputRefs.current[tags.length]) === null || _a === void 0 ? void 0 : _a.focus();
        };
    };
    var onRemoveButtonClick = useStableEventHandler(function (_a) {
        var _b;
        var detail = _a.detail;
        var existing = tags[detail.itemIndex].existing;
        validateAndFire(__spreadArray(__spreadArray(__spreadArray([], tags.slice(0, detail.itemIndex), true), (existing ? [__assign(__assign({}, tags[detail.itemIndex]), { markedForRemoval: true })] : []), true), tags.slice(detail.itemIndex + 1), true));
        if (existing) {
            focusEventRef.current = function () {
                var _a;
                (_a = undoButtonRefs.current[detail.itemIndex]) === null || _a === void 0 ? void 0 : _a.focus();
            };
        }
        else {
            keyDirtyStateRef.current.splice(detail.itemIndex, 1);
            (_b = keyInputRefs.current[detail.itemIndex]) === null || _b === void 0 ? void 0 : _b.focus();
        }
    });
    var onKeyChange = useStableEventHandler(function (value, row) {
        keyDirtyStateRef.current[row] = true;
        validateAndFire(__spreadArray(__spreadArray(__spreadArray([], tags.slice(0, row), true), [__assign(__assign({}, tags[row]), { key: value })], false), tags.slice(row + 1), true));
    });
    var onKeyBlur = useStableEventHandler(function (row) {
        keyDirtyStateRef.current[row] = true;
        // Force re-render by providing a new array reference
        validateAndFire(__spreadArray([], tags, true));
    });
    var onValueChange = useStableEventHandler(function (value, row) {
        validateAndFire(__spreadArray(__spreadArray(__spreadArray([], tags.slice(0, row), true), [__assign(__assign({}, tags[row]), { value: value })], false), tags.slice(row + 1), true));
    });
    var onUndoRemoval = useStableEventHandler(function (row) {
        validateAndFire(__spreadArray(__spreadArray(__spreadArray([], tags.slice(0, row), true), [__assign(__assign({}, tags[row]), { markedForRemoval: false })], false), tags.slice(row + 1), true));
        focusEventRef.current = function () {
            var _a;
            (_a = attributeEditorRef.current) === null || _a === void 0 ? void 0 : _a.focusRemoveButton(row);
        };
    });
    var definition = useMemo(function () { return [
        {
            label: i18nStrings.keyHeader,
            control: function (_a, row) {
                var tag = _a.tag;
                return (React.createElement(TagControl, { row: row, value: tag.key, readOnly: tag.existing, limit: 200, defaultOptions: [], placeholder: i18nStrings.keyPlaceholder, errorText: i18nStrings.keysSuggestionError, loadingText: i18nStrings.keysSuggestionLoading, suggestionText: i18nStrings.keySuggestion, tooManySuggestionText: i18nStrings.tooManyKeysSuggestion, enteredTextLabel: i18nStrings.enteredKeyLabel, clearAriaLabel: i18nStrings.clearAriaLabel, onRequest: keysRequest, onChange: onKeyChange, onBlur: onKeyBlur, initialOptionsRef: initialKeyOptionsRef, ref: function (ref) {
                        keyInputRefs.current[row] = ref;
                    } }));
            },
            errorText: function (_a) {
                var error = _a.error;
                return error === null || error === void 0 ? void 0 : error.key;
            }
        },
        {
            label: (React.createElement(React.Fragment, null,
                i18nStrings.valueHeader,
                " - ",
                React.createElement("i", null, i18nStrings.optional))),
            control: function (_a, row) {
                var _b;
                var tag = _a.tag;
                return tag.markedForRemoval ? (React.createElement("div", { role: "alert" },
                    React.createElement(InternalBox, { margin: { top: 'xxs' } },
                        i18nStrings.undoPrompt,
                        ' ',
                        React.createElement(UndoButton, { onClick: function () { return onUndoRemoval(row); }, ref: function (elem) {
                                undoButtonRefs.current[row] = elem;
                            } }, i18nStrings.undoButton)))) : (React.createElement(TagControl, { row: row, value: tag.value, readOnly: false, limit: 200, defaultOptions: (_b = tag.valueSuggestionOptions) !== null && _b !== void 0 ? _b : [], placeholder: i18nStrings.valuePlaceholder, errorText: i18nStrings.valuesSuggestionError, loadingText: i18nStrings.valuesSuggestionLoading, suggestionText: i18nStrings.valueSuggestion, tooManySuggestionText: i18nStrings.tooManyValuesSuggestion, enteredTextLabel: i18nStrings.enteredValueLabel, clearAriaLabel: i18nStrings.clearAriaLabel, filteringKey: tag.key, onRequest: valuesRequest && (function (value) { return valuesRequest(tag.key, value); }), onChange: onValueChange, ref: function (ref) {
                        valueInputRefs.current[row] = ref;
                    } }));
            },
            errorText: function (_a) {
                var error = _a.error;
                return error === null || error === void 0 ? void 0 : error.value;
            }
        },
    ]; }, [i18nStrings, keysRequest, onKeyChange, onKeyBlur, valuesRequest, onValueChange, onUndoRemoval]);
    if (loading) {
        return (React.createElement("div", { className: styles.root, ref: baseComponentProps.__internalRootRef },
            React.createElement(InternalStatusIndicator, { className: styles.loading, type: "loading" },
                React.createElement(LiveRegion, { visible: true }, i18nStrings.loading))));
    }
    var baseProps = getBaseProps(restProps);
    return (React.createElement(InternalAttributeEditor, __assign({}, baseProps, baseComponentProps, { ref: attributeEditorRef, className: clsx(styles.root, baseProps.className), items: internalTags, isItemRemovable: isItemRemovable, onAddButtonClick: onAddButtonClick, onRemoveButtonClick: onRemoveButtonClick, addButtonText: i18nStrings.addButton, removeButtonText: i18nStrings.removeButton, disableAddButton: remainingTags <= 0, empty: i18nStrings.emptyTags, additionalInfo: remainingTags < 0 ? (React.createElement(FormFieldError, { errorIconAriaLabel: i18nStrings.errorIconAriaLabel }, (_b = i18nStrings.tagLimitExceeded(tagLimit)) !== null && _b !== void 0 ? _b : '')) : remainingTags === 0 ? ((_c = i18nStrings.tagLimitReached(tagLimit)) !== null && _c !== void 0 ? _c : '') : (i18nStrings.tagLimit(remainingTags, tagLimit)), definition: definition, i18nStrings: i18nStrings })));
});
applyDisplayName(TagEditor, 'TagEditor');
export default TagEditor;
//# sourceMappingURL=index.js.map