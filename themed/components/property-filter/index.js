import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useRef, useState, useMemo, useImperativeHandle } from 'react';
import InternalSpaceBetween from '../space-between/internal';
import { InternalButton } from '../button/internal';
import { getBaseProps } from '../internal/base-component';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import { KeyCode } from '../internal/keycode';
import SelectToggle from '../token-group/toggle';
import { generateUniqueId } from '../internal/hooks/use-unique-id/index';
import { fireNonCancelableEvent } from '../internal/events';
import { TokenButton } from './token';
import { getQueryActions, parseText, getAutosuggestOptions, getAllowedOperators, getExtendedOperator, } from './controller';
import { useLoadItems } from './use-load-items';
import styles from './styles.css.js';
import useBaseComponent from '../internal/hooks/use-base-component';
import PropertyFilterAutosuggest from './property-filter-autosuggest';
import { PropertyEditor } from './property-editor';
import { matchTokenValue } from './utils';
var PropertyFilter = React.forwardRef(function (_a, ref) {
    var _b;
    var disabled = _a.disabled, i18nStrings = _a.i18nStrings, countText = _a.countText, query = _a.query, hideOperations = _a.hideOperations, onChange = _a.onChange, filteringProperties = _a.filteringProperties, _c = _a.filteringOptions, filteringOptions = _c === void 0 ? [] : _c, _d = _a.customGroupsText, customGroupsText = _d === void 0 ? [] : _d, _e = _a.disableFreeTextFiltering, disableFreeTextFiltering = _e === void 0 ? false : _e, onLoadItems = _a.onLoadItems, virtualScroll = _a.virtualScroll, customControl = _a.customControl, filteringEmpty = _a.filteringEmpty, filteringLoadingText = _a.filteringLoadingText, filteringFinishedText = _a.filteringFinishedText, filteringErrorText = _a.filteringErrorText, filteringRecoveryText = _a.filteringRecoveryText, filteringStatusType = _a.filteringStatusType, asyncProperties = _a.asyncProperties, tokenLimit = _a.tokenLimit, expandToViewport = _a.expandToViewport, rest = __rest(_a, ["disabled", "i18nStrings", "countText", "query", "hideOperations", "onChange", "filteringProperties", "filteringOptions", "customGroupsText", "disableFreeTextFiltering", "onLoadItems", "virtualScroll", "customControl", "filteringEmpty", "filteringLoadingText", "filteringFinishedText", "filteringErrorText", "filteringRecoveryText", "filteringStatusType", "asyncProperties", "tokenLimit", "expandToViewport"]);
    var __internalRootRef = useBaseComponent('PropertyFilter').__internalRootRef;
    var inputRef = useRef(null);
    var baseProps = getBaseProps(rest);
    useImperativeHandle(ref, function () { return ({ focus: function () { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); } }); }, []);
    var tokens = query.tokens, operation = query.operation;
    var showResults = (tokens === null || tokens === void 0 ? void 0 : tokens.length) && !disabled;
    var _f = getQueryActions(query, onChange, inputRef), addToken = _f.addToken, removeToken = _f.removeToken, setToken = _f.setToken, setOperation = _f.setOperation, removeAllTokens = _f.removeAllTokens;
    var _g = useState(''), filteringText = _g[0], setFilteringText = _g[1];
    var parsedText = parseText(filteringText, filteringProperties, disableFreeTextFiltering);
    var autosuggestOptions = getAutosuggestOptions(parsedText, filteringOptions, filteringProperties, customGroupsText, i18nStrings);
    var createToken = function (currentText) {
        var parsedText = parseText(currentText, filteringProperties, disableFreeTextFiltering);
        var newToken;
        switch (parsedText.step) {
            case 'property': {
                newToken = matchTokenValue({
                    propertyKey: parsedText.property.key,
                    operator: parsedText.operator,
                    value: parsedText.value
                }, filteringOptions);
                break;
            }
            case 'free-text': {
                newToken = {
                    operator: parsedText.operator || ':',
                    value: parsedText.value
                };
                break;
            }
            case 'operator': {
                newToken = {
                    operator: ':',
                    value: currentText
                };
                break;
            }
        }
        if (disableFreeTextFiltering && !('propertyKey' in newToken)) {
            return;
        }
        addToken(newToken);
        setFilteringText('');
    };
    var ignoreKeyDown = useRef(false);
    var handleKeyDown = function (event) {
        if (filteringText && !ignoreKeyDown.current && event.detail.keyCode === KeyCode.enter) {
            createToken(filteringText);
        }
    };
    var getLoadMoreDetail = function (parsedText, filteringText) {
        var loadMoreDetail = {
            filteringProperty: undefined,
            filteringText: filteringText,
            filteringOperator: undefined
        };
        if (parsedText.step === 'property') {
            loadMoreDetail.filteringProperty = parsedText.property;
            loadMoreDetail.filteringText = parsedText.value;
            loadMoreDetail.filteringOperator = parsedText.operator;
        }
        return loadMoreDetail;
    };
    var loadMoreDetail = getLoadMoreDetail(parsedText, filteringText);
    var inputLoadItemsHandlers = useLoadItems(onLoadItems, loadMoreDetail.filteringText, loadMoreDetail.filteringProperty, loadMoreDetail.filteringText, loadMoreDetail.filteringOperator);
    var asyncProps = {
        empty: filteringEmpty,
        loadingText: filteringLoadingText,
        finishedText: filteringFinishedText,
        errorText: filteringErrorText,
        recoveryText: filteringRecoveryText,
        statusType: filteringStatusType
    };
    var asyncAutosuggestProps = !!filteringText.length || asyncProperties
        ? __assign(__assign({}, inputLoadItemsHandlers), asyncProps) : {};
    var handleSelected = function (event) {
        // The ignoreKeyDown flag makes sure `createToken` routine runs only once. Autosuggest's `onKeyDown` fires,
        // when an item is selected from the list using "enter" key.
        ignoreKeyDown.current = true;
        setTimeout(function () {
            ignoreKeyDown.current = false;
        }, 0);
        var option = event.detail;
        var value = option.value || '';
        if (!('keepOpenOnSelect' in option)) {
            createToken(value);
            return;
        }
        // stop dropdown from closing
        event.preventDefault();
        var parsedText = parseText(value, filteringProperties, disableFreeTextFiltering);
        var loadMoreDetail = getLoadMoreDetail(parsedText, value);
        // Insert operator automatically if only one operator is defined for the given property.
        if (parsedText.step === 'operator') {
            var operators = getAllowedOperators(parsedText.property);
            if (value.trim() === parsedText.property.propertyLabel && operators.length === 1) {
                loadMoreDetail.filteringProperty = parsedText.property;
                loadMoreDetail.filteringOperator = operators[0];
                loadMoreDetail.filteringText = '';
                setFilteringText(parsedText.property.propertyLabel + ' ' + operators[0] + ' ');
            }
        }
        fireNonCancelableEvent(onLoadItems, __assign(__assign({}, loadMoreDetail), { firstPage: true, samePage: false }));
    };
    var _h = useState(false), tokensExpanded = _h[0], setTokensExpanded = _h[1];
    var toggleExpandedTokens = function () { return setTokensExpanded(!tokensExpanded); };
    var hasHiddenOptions = tokenLimit !== undefined && tokens.length > tokenLimit;
    var slicedTokens = hasHiddenOptions && !tokensExpanded ? tokens.slice(0, tokenLimit) : tokens;
    var controlId = useMemo(function () { return generateUniqueId(); }, []);
    var operatorForm = parsedText.step === 'property' &&
        ((_b = getExtendedOperator(filteringProperties, parsedText.property.key, parsedText.operator)) === null || _b === void 0 ? void 0 : _b.form);
    return (React.createElement("span", __assign({}, baseProps, { className: clsx(baseProps.className, styles.root), ref: __internalRootRef }),
        React.createElement("div", { className: styles['search-field'] },
            customControl && React.createElement("div", { className: styles['custom-control'] }, customControl),
            React.createElement(PropertyFilterAutosuggest, __assign({ ref: inputRef, virtualScroll: virtualScroll, enteredTextLabel: i18nStrings.enteredTextLabel, ariaLabel: i18nStrings.filteringAriaLabel, placeholder: i18nStrings.filteringPlaceholder, value: filteringText, disabled: disabled, onKeyDown: handleKeyDown }, autosuggestOptions, { onChange: function (event) { return setFilteringText(event.detail.value); }, empty: filteringEmpty }, asyncAutosuggestProps, { expandToViewport: expandToViewport, onOptionClick: handleSelected, customForm: operatorForm && (React.createElement(PropertyEditor, { property: parsedText.property, operator: parsedText.operator, filter: parsedText.value, operatorForm: operatorForm, i18nStrings: i18nStrings, onCancel: function () {
                        var _a, _b;
                        setFilteringText('');
                        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.close();
                        (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.focus({ preventDropdown: true });
                    }, onSubmit: function (token) {
                        var _a, _b;
                        addToken(token);
                        setFilteringText('');
                        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventDropdown: true });
                        (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.close();
                    } })), hideEnteredTextOption: disableFreeTextFiltering && parsedText.step !== 'property' })),
            React.createElement("span", { "aria-live": "polite", "aria-atomic": "true", className: clsx(styles.results, showResults && styles['results-visible']) }, showResults ? countText : '')),
        tokens && tokens.length > 0 && (React.createElement("div", { className: styles.tokens },
            React.createElement(InternalSpaceBetween, { size: "xs", direction: "horizontal", id: controlId },
                slicedTokens.map(function (token, index) { return (React.createElement(TokenButton, { token: token, first: index === 0, operation: operation, key: index, removeToken: function () { return removeToken(index); }, setToken: function (newToken) { return setToken(index, newToken); }, setOperation: setOperation, filteringOptions: filteringOptions, filteringProperties: filteringProperties, asyncProps: asyncProps, onLoadItems: onLoadItems, i18nStrings: i18nStrings, asyncProperties: asyncProperties, hideOperations: hideOperations, customGroupsText: customGroupsText, disableFreeTextFiltering: disableFreeTextFiltering, disabled: disabled, expandToViewport: expandToViewport })); }),
                hasHiddenOptions && (React.createElement("div", { className: styles['toggle-collapsed'] },
                    React.createElement(SelectToggle, { controlId: controlId, allHidden: tokenLimit === 0, expanded: tokensExpanded, numberOfHiddenOptions: tokens.length - slicedTokens.length, i18nStrings: {
                            limitShowFewer: i18nStrings.tokenLimitShowFewer,
                            limitShowMore: i18nStrings.tokenLimitShowMore
                        }, onClick: toggleExpandedTokens }))),
                React.createElement("div", { className: styles.separator }),
                React.createElement(InternalButton, { onClick: removeAllTokens, className: styles['remove-all'], disabled: disabled }, i18nStrings.clearFiltersText))))));
});
applyDisplayName(PropertyFilter, 'PropertyFilter');
export default PropertyFilter;
//# sourceMappingURL=index.js.map