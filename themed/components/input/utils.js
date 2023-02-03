// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useCallback } from 'react';
export var useSearchProps = function (type, disabled, readOnly, value, inputRef, onChange) {
    var searchProps = {};
    var handleIconClick = useCallback(function () {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        onChange('');
    }, [inputRef, onChange]);
    if (type === 'search' || type === 'visualSearch') {
        searchProps.__leftIcon = 'search';
        if (!disabled && !readOnly && value) {
            searchProps.__rightIcon = 'close';
            searchProps.__onRightIconClick = handleIconClick;
        }
    }
    return searchProps;
};
/**
 * Converts the boolean or string value of the `autoComplete` property to the correct `autocomplete` attribute value.
 */
export var convertAutoComplete = function (propertyValue) {
    if (propertyValue === void 0) { propertyValue = false; }
    if (propertyValue === true) {
        return 'on';
    }
    return propertyValue || 'off';
};
//# sourceMappingURL=utils.js.map