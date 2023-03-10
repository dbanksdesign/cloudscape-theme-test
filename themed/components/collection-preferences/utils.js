// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import InternalCheckbox from '../checkbox/internal';
import InternalColumnLayout from '../column-layout/internal';
import InternalFormField from '../form-field/internal';
import InternalRadioGroup from '../radio-group/internal';
import { useContainerBreakpoints } from '../internal/hooks/container-queries';
import styles from './styles.css.js';
export var copyPreferences = function (_a) {
    var pageSize = _a.pageSize, wrapLines = _a.wrapLines, stripedRows = _a.stripedRows, visibleContent = _a.visibleContent, custom = _a.custom;
    return ({
        pageSize: pageSize,
        wrapLines: wrapLines,
        stripedRows: stripedRows,
        visibleContent: visibleContent,
        custom: custom
    });
};
export var mergePreferences = function (newPref, oldPref) { return ({
    pageSize: newPref.pageSize !== undefined ? newPref.pageSize : oldPref.pageSize,
    wrapLines: newPref.wrapLines !== undefined ? newPref.wrapLines : oldPref.wrapLines,
    stripedRows: newPref.stripedRows !== undefined ? newPref.stripedRows : oldPref.stripedRows,
    visibleContent: newPref.visibleContent !== undefined ? newPref.visibleContent : oldPref.visibleContent,
    custom: newPref.custom !== undefined ? newPref.custom : oldPref.custom
}); };
export var ModalContentLayout = function (_a) {
    var left = _a.left, right = _a.right;
    var _b = useContainerBreakpoints(['xs']), breakpoint = _b[0], ref = _b[1];
    var smallContainer = breakpoint === 'default';
    if (smallContainer) {
        return (React.createElement("div", { ref: ref },
            React.createElement("div", null, left),
            right && React.createElement("div", { className: styles['second-column-small'] }, right)));
    }
    var columns = right ? 2 : 1;
    return (React.createElement("div", { ref: ref },
        React.createElement(InternalColumnLayout, { columns: columns, variant: "text-grid" },
            React.createElement("div", null, left),
            right && React.createElement("div", null, right))));
};
export var PageSizePreference = function (_a) {
    var title = _a.title, options = _a.options, value = _a.value, onChange = _a.onChange;
    return (React.createElement("div", { className: styles['page-size'] },
        React.createElement(InternalFormField, { label: title, stretch: true, className: styles['page-size-form-field'] },
            React.createElement(InternalRadioGroup, { className: styles['page-size-radio-group'], value: "".concat(value), items: options.map(function (_a) {
                    var label = _a.label, value = _a.value;
                    return ({ label: label, value: "".concat(value) });
                }), onChange: function (_a) {
                    var detail = _a.detail;
                    return onChange(parseInt(detail.value, 10));
                } }))));
};
export var WrapLinesPreference = function (_a) {
    var label = _a.label, description = _a.description, value = _a.value, onChange = _a.onChange;
    return (React.createElement(InternalCheckbox, { checked: !!value, description: description, onChange: function (_a) {
            var detail = _a.detail;
            return onChange(detail.checked);
        }, className: styles['wrap-lines'] }, label));
};
export var StripedRowsPreference = function (_a) {
    var label = _a.label, description = _a.description, value = _a.value, onChange = _a.onChange;
    return (React.createElement(InternalCheckbox, { checked: !!value, description: description, onChange: function (_a) {
            var detail = _a.detail;
            return onChange(detail.checked);
        }, className: styles['striped-rows'] }, label));
};
export var CustomPreference = function (_a) {
    var value = _a.value, customPreference = _a.customPreference, onChange = _a.onChange;
    var _b = useState(value), customState = _b[0], setCustomState = _b[1];
    if (customPreference) {
        return (React.createElement("div", { className: styles.custom }, customPreference(customState, function (value) {
            // prevent value to be treated as a functional callback
            setCustomState(function () { return value; });
            onChange(value);
        })));
    }
    return null;
};
//# sourceMappingURL=utils.js.map