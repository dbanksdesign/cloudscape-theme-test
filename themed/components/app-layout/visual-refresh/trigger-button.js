import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import useFocusVisible from '../../internal/hooks/focus-visible';
import Icon from '../../icon/internal';
import styles from './styles.css.js';
function TriggerButton(_a, ref) {
    var _b;
    var ariaLabel = _a.ariaLabel, iconName = _a.iconName, onClick = _a.onClick, _c = _a.selected, selected = _c === void 0 ? false : _c, className = _a.className;
    var focusVisible = useFocusVisible();
    return (React.createElement("button", __assign({ "aria-label": ariaLabel, "aria-expanded": false, "aria-haspopup": true, className: clsx(styles.trigger, (_b = {},
            _b[styles.selected] = selected,
            _b), className), onClick: onClick, type: "button", ref: ref }, focusVisible),
        React.createElement(Icon, { name: iconName })));
}
export default React.forwardRef(TriggerButton);
//# sourceMappingURL=trigger-button.js.map