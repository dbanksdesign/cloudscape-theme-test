import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useState, useEffect, useRef } from 'react';
import InternalBox from '../../box/internal';
import { InternalButton } from '../../button/internal';
import InternalFormField from '../../form-field/internal';
import InternalSelect from '../../select/internal';
import InternalStatusIndicator from '../../status-indicator/internal';
import useForwardFocus from '../../internal/hooks/forward-focus';
import { useVersionsFetch } from './use-versions-fetch';
import { validate, getErrorText } from './validation';
import styles from './styles.css.js';
import { SearchInput } from './search-input';
import LiveRegion from '../../internal/components/live-region';
export var S3InContext = React.forwardRef(function (_a, ref) {
    var i18nStrings = _a.i18nStrings, resource = _a.resource, viewHref = _a.viewHref, invalid = _a.invalid, inputAriaDescribedby = _a.inputAriaDescribedby, selectableItemsTypes = _a.selectableItemsTypes, fetchVersions = _a.fetchVersions, onChange = _a.onChange, onBrowse = _a.onBrowse;
    var isInputBlurredRef = useRef(true);
    var _b = useState(false), isInputTouched = _b[0], setInputTouched = _b[1];
    var _c = useVersionsFetch(fetchVersions), versions = _c.versions, loading = _c.loading, loadVersions = _c.loadVersions, resetVersions = _c.resetVersions;
    var inputRef = useRef(null);
    useForwardFocus(ref, inputRef);
    var uri = resource.uri;
    var supportsVersions = selectableItemsTypes && selectableItemsTypes.indexOf('versions') > -1;
    var selectedVersion = versions.filter(function (version) { return version.value === resource.versionId; })[0] || null;
    function handleUriChange(event) {
        var uri = event.detail.value;
        var errorCode = isInputTouched ? validate(uri) : undefined;
        resetVersions();
        onChange({ uri: uri }, getErrorText(i18nStrings, errorCode));
    }
    function handleUriBlur() {
        isInputBlurredRef.current = true;
        setInputTouched(true);
        var errorCode = validate(resource.uri);
        onChange(resource, getErrorText(i18nStrings, errorCode));
        if (supportsVersions) {
            loadVersions(resource.uri);
        }
    }
    useEffect(function () {
        var _a;
        if (!isInputBlurredRef.current || !supportsVersions) {
            return;
        }
        var cancel = ((_a = loadVersions(uri)) !== null && _a !== void 0 ? _a : {}).cancel;
        return cancel;
    }, [uri, supportsVersions, loadVersions]);
    return (React.createElement("div", { className: styles.root },
        React.createElement("div", { className: styles.layout },
            React.createElement(InternalFormField, { className: styles['layout-uri'], label: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.inContextUriLabel, stretch: true },
                React.createElement(SearchInput, { ref: inputRef, value: uri, ariaDescribedby: inputAriaDescribedby, clearAriaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.inContextInputClearAriaLabel, placeholder: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.inContextInputPlaceholder, onChange: handleUriChange, invalid: invalid, onFocus: function () { return (isInputBlurredRef.current = false); }, onBlur: handleUriBlur })),
            supportsVersions && (React.createElement(InternalFormField, { className: styles['layout-version'], label: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.inContextVersionSelectLabel, stretch: true },
                React.createElement(InternalSelect, { selectedOption: selectedVersion, placeholder: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.inContextSelectPlaceholder, disabled: versions.length === 0, options: versions, onChange: function (event) { return onChange(__assign(__assign({}, resource), { versionId: event.detail.selectedOption.value }), undefined); }, invalid: false }))),
            React.createElement("div", null,
                React.createElement(InternalButton, { className: styles['view-button'], disabled: !viewHref, href: viewHref, target: "_blank", iconName: "external", iconAlign: "right", formAction: "none", ariaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.inContextViewButtonAriaLabel }, i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.inContextViewButton)),
            React.createElement("div", { className: styles['layout-divider'] }),
            React.createElement("div", null,
                React.createElement(InternalButton, { className: styles['browse-button'], disabled: loading, formAction: "none", onClick: onBrowse }, i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.inContextBrowseButton))),
        React.createElement("div", { role: "alert", "aria-live": "assertive", "aria-atomic": "true" }, loading && (React.createElement(InternalBox, { margin: { top: 's' } },
            React.createElement(InternalStatusIndicator, { type: "loading" },
                React.createElement(LiveRegion, { visible: true }, i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.inContextLoadingText)))))));
});
//# sourceMappingURL=index.js.map