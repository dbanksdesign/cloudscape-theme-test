import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styles from './styles.css.js';
import { AnnotationIcon } from './annotation-icon';
import useFocusVisible from '../../internal/hooks/focus-visible/index.js';
export default React.forwardRef(function AnnotationTrigger(_a, ref) {
    var open = _a.open, onClickHandler = _a.onClick, i18nStrings = _a.i18nStrings, taskLocalStepIndex = _a.taskLocalStepIndex, totalLocalSteps = _a.totalLocalSteps;
    var focusVisible = useFocusVisible();
    var onClick = useCallback(function (event) {
        event.preventDefault();
        onClickHandler();
    }, [onClickHandler]);
    return (React.createElement("button", __assign({ ref: ref, className: styles.hotspot, "aria-haspopup": "dialog", "aria-label": i18nStrings.labelHotspot(open, taskLocalStepIndex !== null && taskLocalStepIndex !== void 0 ? taskLocalStepIndex : 0, totalLocalSteps !== null && totalLocalSteps !== void 0 ? totalLocalSteps : 0), onClick: onClick }, focusVisible),
        React.createElement(AnnotationIcon, { open: open })));
});
//# sourceMappingURL=annotation-trigger.js.map