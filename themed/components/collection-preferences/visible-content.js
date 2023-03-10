import { __assign, __spreadArray } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import InternalSpaceBetween from '../space-between/internal';
import InternalToggle from '../toggle/internal';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import styles from './styles.css.js';
var isVisible = function (id, visibleIds) { return visibleIds.indexOf(id) !== -1; };
var className = function (suffix) { return ({
    className: styles["visible-content-".concat(suffix)]
}); };
export default function VisibleContentPreference(_a) {
    var title = _a.title, options = _a.options, _b = _a.value, value = _b === void 0 ? [] : _b, onChange = _a.onChange;
    var idPrefix = useUniqueId('visible-content');
    var flatOptionsIds = options.reduce(function (ids, group) { return __spreadArray(__spreadArray([], ids, true), group.options.reduce(function (groupIds, option) { return __spreadArray(__spreadArray([], groupIds, true), [option.id], false); }, []), true); }, []);
    var onToggle = function (id) {
        if (!isVisible(id, value)) {
            onChange(__spreadArray(__spreadArray([], value, true), [id], false).sort(function (firstId, secondId) { return flatOptionsIds.indexOf(firstId) - flatOptionsIds.indexOf(secondId); }));
        }
        else {
            onChange(value.filter(function (currentId) { return currentId !== id; }));
        }
    };
    var selectionOption = function (option, optionGroupIndex, optionIndex) {
        var labelId = "".concat(idPrefix, "-").concat(optionGroupIndex, "-").concat(optionIndex);
        return (React.createElement("div", __assign({ key: optionIndex }, className('option')),
            React.createElement("label", __assign({}, className('option-label'), { htmlFor: labelId }), option.label),
            React.createElement("div", __assign({}, className('toggle')),
                React.createElement(InternalToggle, { checked: isVisible(option.id, value), onChange: function () { return onToggle(option.id); }, disabled: option.editable === false, controlId: labelId }))));
    };
    var outerGroupLabelId = "".concat(idPrefix, "-outer");
    return (React.createElement("div", { className: styles['visible-content'] },
        React.createElement("h3", __assign({}, className('title'), { id: outerGroupLabelId }), title),
        React.createElement(InternalSpaceBetween, __assign({}, className('groups'), { size: "xs" }), options.map(function (optionGroup, optionGroupIndex) {
            var groupLabelId = "".concat(idPrefix, "-").concat(optionGroupIndex);
            return (React.createElement("div", __assign({ key: optionGroupIndex }, className('group'), { role: "group", "aria-labelledby": "".concat(outerGroupLabelId, " ").concat(groupLabelId) }),
                React.createElement("div", __assign({}, className('group-label'), { id: groupLabelId }), optionGroup.label),
                React.createElement("div", null, optionGroup.options.map(function (option, optionIndex) {
                    return selectionOption(option, optionGroupIndex, optionIndex);
                }))));
        }))));
}
//# sourceMappingURL=visible-content.js.map