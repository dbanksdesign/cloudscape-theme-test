import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
import useFocusVisible from '../../hooks/focus-visible';
import { useUniqueId } from '../../hooks/use-unique-id';
function joinString(values) {
    return values.filter(function (value) { return !!value; }).join(' ');
}
export default function AbstractSwitch(_a) {
    var _b, _c;
    var controlId = _a.controlId, controlClassName = _a.controlClassName, outlineClassName = _a.outlineClassName, disabled = _a.disabled, nativeControl = _a.nativeControl, styledControl = _a.styledControl, label = _a.label, description = _a.description, descriptionBottomPadding = _a.descriptionBottomPadding, ariaLabel = _a.ariaLabel, ariaLabelledby = _a.ariaLabelledby, ariaDescribedby = _a.ariaDescribedby, onClick = _a.onClick, __internalRootRef = _a.__internalRootRef, rest = __rest(_a, ["controlId", "controlClassName", "outlineClassName", "disabled", "nativeControl", "styledControl", "label", "description", "descriptionBottomPadding", "ariaLabel", "ariaLabelledby", "ariaDescribedby", "onClick", "__internalRootRef"]);
    var uniqueId = useUniqueId();
    var id = controlId || uniqueId;
    var focusVisible = useFocusVisible();
    var labelId = "".concat(id, "-label");
    var descriptionId = "".concat(id, "-description");
    var ariaLabelledByIds = [];
    if (label) {
        ariaLabelledByIds.push(labelId);
    }
    if (ariaLabelledby) {
        ariaLabelledByIds.push(ariaLabelledby);
    }
    var ariaDescriptons = [];
    if (ariaDescribedby) {
        ariaDescriptons.push(ariaDescribedby);
    }
    if (description) {
        ariaDescriptons.push(descriptionId);
    }
    return (React.createElement("span", __assign({}, rest, { className: clsx(styles.wrapper, rest.className), ref: __internalRootRef }),
        React.createElement("span", { className: styles['label-wrapper'], "aria-disabled": disabled ? 'true' : undefined, onClick: disabled ? undefined : onClick },
            React.createElement("span", { className: clsx(styles.control, controlClassName) },
                styledControl,
                nativeControl(__assign(__assign({}, focusVisible), { id: id, disabled: disabled, className: styles['native-input'], 'aria-describedby': ariaDescriptons.length ? joinString(ariaDescriptons) : undefined, 'aria-labelledby': ariaLabelledByIds.length ? joinString(ariaLabelledByIds) : undefined, 'aria-label': ariaLabel })),
                React.createElement("span", { className: clsx(styles.outline, outlineClassName) })),
            React.createElement("span", { className: clsx(styles.content, !label && !description && styles['empty-content']) },
                label && (React.createElement("span", { id: labelId, className: clsx(styles.label, (_b = {}, _b[styles['label-disabled']] = disabled, _b)) }, label)),
                description && (React.createElement("span", { id: descriptionId, className: clsx(styles.description, (_c = {},
                        _c[styles['description-disabled']] = disabled,
                        _c[styles['description-bottom-padding']] = descriptionBottomPadding,
                        _c)) }, description))))));
}
//# sourceMappingURL=index.js.map