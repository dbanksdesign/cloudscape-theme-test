import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import InternalSelect from '../../../select/internal';
import InternalIcon from '../../../icon/internal';
import useFocusVisible from '../../hooks/focus-visible';
import styles from './styles.css.js';
export default function FilteringToken(_a) {
    var showOperation = _a.showOperation, operation = _a.operation, andText = _a.andText, orText = _a.orText, dismissAriaLabel = _a.dismissAriaLabel, operatorAriaLabel = _a.operatorAriaLabel, disabled = _a.disabled, children = _a.children, onChange = _a.onChange, onDismiss = _a.onDismiss;
    var focusVisible = useFocusVisible();
    return (React.createElement("div", { className: styles.root },
        showOperation && (React.createElement(InternalSelect, { __inFilteringToken: true, className: styles.select, options: [
                { value: 'and', label: andText },
                { value: 'or', label: orText },
            ], selectedOption: { value: operation, label: operation === 'and' ? andText : orText }, onChange: function (e) { return onChange(e.detail.selectedOption.value); }, disabled: disabled, ariaLabel: operatorAriaLabel })),
        React.createElement("div", { className: clsx(styles.token, showOperation && styles['show-operation'], disabled && styles['token-disabled']), "aria-disabled": disabled },
            React.createElement("div", { className: styles['token-content'] }, children),
            React.createElement("button", __assign({}, focusVisible, { type: "button", className: styles['dismiss-button'], "aria-label": dismissAriaLabel, onClick: onDismiss, disabled: disabled }),
                React.createElement(InternalIcon, { name: "close" })))));
}
//# sourceMappingURL=index.js.map