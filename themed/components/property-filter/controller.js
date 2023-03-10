// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __spreadArray } from "tslib";
import { fireNonCancelableEvent } from '../internal/events';
import { matchFilteringProperty, matchOperator, matchOperatorPrefix, trimFirstSpace, trimStart } from './utils';
export var getQueryActions = function (query, onChange, inputRef) {
    var tokens = query.tokens, operation = query.operation;
    var fireOnChange = function (tokens, operation) {
        return fireNonCancelableEvent(onChange, { tokens: tokens, operation: operation });
    };
    var setToken = function (index, newToken) {
        var newTokens = __spreadArray([], tokens, true);
        if (newTokens && index < newTokens.length) {
            newTokens[index] = newToken;
        }
        fireOnChange(newTokens, operation);
    };
    var removeToken = function (index) {
        var _a;
        var newTokens = tokens.filter(function (_, i) { return i !== index; });
        fireOnChange(newTokens, operation);
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventDropdown: true });
    };
    var removeAllTokens = function () {
        var _a;
        fireOnChange([], operation);
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventDropdown: true });
    };
    var addToken = function (newToken) {
        var newTokens = __spreadArray([], tokens, true);
        newTokens.push(newToken);
        fireOnChange(newTokens, operation);
    };
    var setOperation = function (newOperation) {
        fireOnChange(tokens, newOperation);
    };
    return {
        setToken: setToken,
        removeToken: removeToken,
        removeAllTokens: removeAllTokens,
        addToken: addToken,
        setOperation: setOperation
    };
};
export var getAllowedOperators = function (property) {
    var _a = property.operators, operators = _a === void 0 ? [] : _a, defaultOperator = property.defaultOperator;
    var operatorOrder = ['=', '!=', ':', '!:', '>=', '<=', '<', '>'];
    var operatorSet = new Set(__spreadArray([
        defaultOperator !== null && defaultOperator !== void 0 ? defaultOperator : '='
    ], operators.map(function (op) { return (typeof op === 'string' ? op : op.operator); }), true));
    return operatorOrder.filter(function (op) { return operatorSet.has(op); });
};
/*
 * parses the value of the filtering input to figure out the current step of entering the token:
 * - "property": means that a filter on a particular column is being added, with operator already finalized
 * - "operator": means that a filter on a particular column is being added, with operator not yet finalized
 * - "free-text": means that a "free text" token is being added
 */
export var parseText = function (filteringText, filteringProperties, disableFreeTextFiltering) {
    if (filteringProperties === void 0) { filteringProperties = []; }
    var negatedGlobalQuery = /^(!:|!)(.*)/.exec(filteringText);
    if (!disableFreeTextFiltering && negatedGlobalQuery) {
        return {
            step: 'free-text',
            operator: '!:',
            value: negatedGlobalQuery[2]
        };
    }
    var property = matchFilteringProperty(filteringProperties, filteringText);
    if (!property) {
        return {
            step: 'free-text',
            value: filteringText
        };
    }
    var allowedOps = getAllowedOperators(property);
    var textWithoutProperty = filteringText.substring(property.propertyLabel.length);
    var operator = matchOperator(allowedOps, trimStart(textWithoutProperty));
    if (operator) {
        var operatorLastIndex = textWithoutProperty.indexOf(operator) + operator.length;
        var textWithoutPropertyAndOperator = textWithoutProperty.slice(operatorLastIndex);
        // We need to remove the first leading space in case the user presses space
        // after the operator, for example: Owner: admin, will result in value of ` admin`
        // and we need to remove the first space, if the user added any more spaces only the
        // first one will be removed.
        var value = trimFirstSpace(textWithoutPropertyAndOperator);
        return { step: 'property', property: property, operator: operator, value: value };
    }
    var operatorPrefix = matchOperatorPrefix(allowedOps, trimStart(textWithoutProperty));
    if (operatorPrefix !== null) {
        return { step: 'operator', property: property, operatorPrefix: operatorPrefix };
    }
    return {
        step: 'free-text',
        value: filteringText
    };
};
export var getPropertyOptions = function (filteringProperty, filteringOptions) {
    return filteringOptions.filter(function (option) { return option.propertyKey === filteringProperty.key; });
};
export var getAllValueSuggestions = function (filteringOptions, filteringProperties, operator, i18nStrings, customGroupsText) {
    if (operator === void 0) { operator = '='; }
    var defaultGroup = {
        label: i18nStrings.groupValuesText,
        options: []
    };
    var customGroups = {};
    filteringOptions.forEach(function (filteringOption) {
        var _a;
        var property = getPropertyByKey(filteringProperties, filteringOption.propertyKey);
        // given option refers to a non-existent filtering property
        if (!property) {
            return;
        }
        // this option's filtering property does not support current operator
        if (getAllowedOperators(property).indexOf(operator) === -1) {
            return;
        }
        if (property.group && !customGroups[property.group]) {
            var label = customGroupsText.reduce(function (acc, customGroup) { return (customGroup.group === property.group ? customGroup.values : acc); }, '');
            customGroups[property.group] = {
                label: label,
                options: []
            };
        }
        var propertyGroup = property.group ? customGroups[property.group] : defaultGroup;
        propertyGroup.options.push({
            value: property.propertyLabel + ' ' + (operator || '=') + ' ' + filteringOption.value,
            label: (_a = filteringOption.label) !== null && _a !== void 0 ? _a : filteringOption.value,
            __labelPrefix: property.propertyLabel + ' ' + (operator || '=')
        });
    });
    return __spreadArray([defaultGroup], Object.keys(customGroups).map(function (group) { return customGroups[group]; }), true);
};
export var getPropertyByKey = function (filteringProperties, key) {
    var propertyMap = filteringProperties.reduce(function (acc, property) {
        acc[property.key] = property;
        return acc;
    }, {});
    return propertyMap[key];
};
export function getExtendedOperator(filteringProperties, property, operator) {
    var matchedProperty = getPropertyByKey(filteringProperties, property);
    for (var _i = 0, _a = (matchedProperty === null || matchedProperty === void 0 ? void 0 : matchedProperty.operators) || []; _i < _a.length; _i++) {
        var matchedOperator = _a[_i];
        if (typeof matchedOperator === 'object' && matchedOperator.operator === operator) {
            return matchedOperator;
        }
    }
    return null;
}
export function createPropertiesCompatibilityMap(filteringProperties) {
    var lookup = {};
    for (var _i = 0, filteringProperties_1 = filteringProperties; _i < filteringProperties_1.length; _i++) {
        var property = filteringProperties_1[_i];
        lookup[property.key] = (property.operators || [])
            .map(function (operator) {
            return typeof operator === 'object'
                ? { operator: operator.operator, form: operator.form }
                : { operator: operator, form: undefined };
        })
            .sort(function (a, b) { return a.operator.localeCompare(b.operator); });
    }
    return function (propertyA, propertyB) {
        if (lookup[propertyA].length !== lookup[propertyB].length) {
            return false;
        }
        for (var i = 0; i < lookup[propertyA].length; i++) {
            if (lookup[propertyA][i].operator !== lookup[propertyB][i].operator) {
                return false;
            }
            if (lookup[propertyA][i].form !== lookup[propertyB][i].form) {
                return false;
            }
        }
        return true;
    };
}
var filteringPropertyToAutosuggestOption = function (filteringProperty) { return ({
    value: filteringProperty.propertyLabel,
    label: filteringProperty.propertyLabel,
    keepOpenOnSelect: true
}); };
export function getPropertySuggestions(filteringProperties, customGroupsText, i18nStrings, filteringPropertyToOption) {
    var defaultGroup = {
        label: i18nStrings.groupPropertiesText,
        options: []
    };
    var customGroups = {};
    filteringProperties.forEach(function (filteringProperty) {
        var group = filteringProperty.group;
        var optionsGroup = defaultGroup;
        if (group) {
            if (!customGroups[group]) {
                var label = customGroupsText.reduce(function (acc, customGroup) { return (customGroup.group === group ? customGroup.properties : acc); }, '');
                customGroups[group] = { options: [], label: label };
            }
            optionsGroup = customGroups[group];
        }
        optionsGroup.options.push(filteringPropertyToOption(filteringProperty));
    });
    var defaultGroupArray = defaultGroup.options.length ? [defaultGroup] : [];
    var customGroupsArray = Object.keys(customGroups).map(function (groupKey) { return customGroups[groupKey]; });
    return __spreadArray(__spreadArray([], defaultGroupArray, true), customGroupsArray, true);
}
export var getAutosuggestOptions = function (parsedText, filteringOptions, filteringProperties, customGroupsText, i18nStrings) {
    switch (parsedText.step) {
        case 'property': {
            var _a = parsedText.property, propertyLabel_1 = _a.propertyLabel, groupValuesLabel = _a.groupValuesLabel;
            var options = getPropertyOptions(parsedText.property, filteringOptions);
            return {
                filterText: parsedText.value,
                options: [
                    {
                        options: options.map(function (_a) {
                            var label = _a.label, value = _a.value;
                            return ({
                                value: propertyLabel_1 + ' ' + parsedText.operator + ' ' + value,
                                label: label !== null && label !== void 0 ? label : value,
                                __labelPrefix: propertyLabel_1 + ' ' + parsedText.operator
                            });
                        }),
                        label: groupValuesLabel
                    },
                ]
            };
        }
        case 'operator': {
            return {
                filterText: parsedText.property.propertyLabel + ' ' + parsedText.operatorPrefix,
                options: __spreadArray(__spreadArray([], getPropertySuggestions(filteringProperties, customGroupsText, i18nStrings, filteringPropertyToAutosuggestOption), true), [
                    {
                        options: getAllowedOperators(parsedText.property).map(function (value) { return ({
                            value: parsedText.property.propertyLabel + ' ' + value + ' ',
                            label: parsedText.property.propertyLabel + ' ' + value,
                            description: operatorToDescription(value, i18nStrings),
                            keepOpenOnSelect: true
                        }); }),
                        label: i18nStrings.operatorsText
                    },
                ], false)
            };
        }
        case 'free-text': {
            var needsValueSuggestions = !!parsedText.value;
            var needsPropertySuggestions = !(parsedText.step === 'free-text' && parsedText.operator === '!:');
            return {
                filterText: parsedText.value,
                options: __spreadArray(__spreadArray([], (needsPropertySuggestions
                    ? getPropertySuggestions(filteringProperties, customGroupsText, i18nStrings, filteringPropertyToAutosuggestOption)
                    : []), true), (needsValueSuggestions
                    ? getAllValueSuggestions(filteringOptions, filteringProperties, parsedText.operator, i18nStrings, customGroupsText)
                    : []), true)
            };
        }
    }
};
export var operatorToDescription = function (operator, i18nStrings) {
    var _a;
    var mapping = (_a = {},
        _a['<'] = i18nStrings.operatorLessText,
        _a['<='] = i18nStrings.operatorLessOrEqualText,
        _a['>'] = i18nStrings.operatorGreaterText,
        _a['>='] = i18nStrings.operatorGreaterOrEqualText,
        _a[':'] = i18nStrings.operatorContainsText,
        _a['!:'] = i18nStrings.operatorDoesNotContainText,
        _a['='] = i18nStrings.operatorEqualsText,
        _a['!='] = i18nStrings.operatorDoesNotEqualText,
        _a);
    return mapping[operator];
};
//# sourceMappingURL=controller.js.map