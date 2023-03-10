import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef, useState } from 'react';
import InternalAutosuggest from '../autosuggest/internal';
import useFocusVisible from '../internal/hooks/focus-visible';
import { KeyCode } from '../internal/keycode';
import { makeCancellable, PromiseCancelledSignal } from '../internal/utils/promises';
import styles from './styles.css.js';
export var TagControl = React.forwardRef(function (_a, ref) {
    var row = _a.row, value = _a.value, readOnly = _a.readOnly, defaultOptions = _a.defaultOptions, placeholder = _a.placeholder, errorText = _a.errorText, loadingText = _a.loadingText, suggestionText = _a.suggestionText, tooManySuggestionText = _a.tooManySuggestionText, limit = _a.limit, filteringKey = _a.filteringKey, enteredTextLabel = _a.enteredTextLabel, clearAriaLabel = _a.clearAriaLabel, onChange = _a.onChange, onBlur = _a.onBlur, onRequest = _a.onRequest, initialOptionsRef = _a.initialOptionsRef;
    var _b = useState(defaultOptions), options = _b[0], setOptions = _b[1];
    var _c = useState(), statusType = _c[0], setStatusType = _c[1];
    var requestCancelFnRef = useRef({
        cancel: function () { },
        isCancelled: function () { return false; }
    });
    var latestFilteringQuery = useRef({ key: undefined, value: undefined });
    var isSameQuery = function (key, value) {
        return latestFilteringQuery.current.key === key && latestFilteringQuery.current.value === value;
    };
    var onLoadItems = function (filteringText) {
        if (!onRequest || isSameQuery(filteringKey, filteringText) || requestCancelFnRef.current.isCancelled()) {
            return;
        }
        requestCancelFnRef.current.cancel();
        if (latestFilteringQuery.current.key !== filteringKey) {
            // Reset suggestions for values if the key is different.
            setOptions([]);
        }
        else if (filteringText === '' && (initialOptionsRef === null || initialOptionsRef === void 0 ? void 0 : initialOptionsRef.current) && initialOptionsRef.current.length > 0) {
            // Load in the background, if the value is empty and we already have suggestions.
            setOptions(initialOptionsRef.current);
        }
        setStatusType('loading');
        latestFilteringQuery.current = { key: filteringKey, value: filteringText };
        var _a = makeCancellable(onRequest(filteringText)), promise = _a.promise, cancel = _a.cancel, isCancelled = _a.isCancelled;
        promise
            .then(function (newValues) {
            var newOptions = newValues.map(function (value) { return ({ value: value }); });
            setStatusType(undefined);
            setOptions(newOptions);
            if (initialOptionsRef) {
                initialOptionsRef.current = newOptions;
            }
        })["catch"](function (err) {
            if (!(err instanceof PromiseCancelledSignal)) {
                setStatusType('error');
            }
        });
        requestCancelFnRef.current = { cancel: cancel, isCancelled: isCancelled };
    };
    return (React.createElement(InternalAutosuggest, { ref: ref, value: value, readOnly: readOnly, statusType: statusType, options: options.length < limit ? options : [], empty: options.length < limit ? suggestionText : tooManySuggestionText, placeholder: placeholder, errorText: errorText, loadingText: loadingText, enteredTextLabel: enteredTextLabel, clearAriaLabel: clearAriaLabel, onChange: function (_a) {
            var detail = _a.detail;
            return onChange(detail.value, row);
        }, onBlur: function () { return onBlur === null || onBlur === void 0 ? void 0 : onBlur(row); }, onFocus: function () {
            onLoadItems('');
        }, onLoadItems: function (_a) {
            var detail = _a.detail;
            onLoadItems(detail.filteringText);
        } }));
});
export var UndoButton = React.forwardRef(function (_a, ref) {
    var children = _a.children, onClick = _a.onClick;
    var focusVisible = useFocusVisible();
    return (React.createElement("a", __assign({}, focusVisible, { ref: ref, role: "button", tabIndex: 0, className: styles['undo-button'], onClick: onClick, onKeyDown: function (event) {
            if (event.keyCode === KeyCode.space || event.keyCode === KeyCode.enter) {
                event.preventDefault();
            }
            // Enter activates the button on key down instead of key up.
            if (event.keyCode === KeyCode.enter) {
                onClick();
            }
        }, onKeyUp: function (event) {
            // Emulate button behavior, which also fires on space.
            if (event.keyCode === KeyCode.space) {
                onClick();
            }
        } }), children));
});
//# sourceMappingURL=internal.js.map