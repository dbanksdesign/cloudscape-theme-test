import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
import { getBaseProps } from '../internal/base-component';
import { warnOnce } from '../internal/logging';
import { fireNonCancelableEvent } from '../internal/events';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { Progress, ResultState, SmallText } from './internal';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import useBaseComponent from '../internal/hooks/use-base-component';
import { throttle } from '../internal/utils/throttle';
import LiveRegion from '../internal/components/live-region';
var ASSERTION_FREQUENCY = 5000; // interval in ms between progress announcements
export default function ProgressBar(_a) {
    var _b = _a.value, value = _b === void 0 ? 0 : _b, _c = _a.status, status = _c === void 0 ? 'in-progress' : _c, _d = _a.variant, variant = _d === void 0 ? 'standalone' : _d, resultButtonText = _a.resultButtonText, label = _a.label, description = _a.description, additionalInfo = _a.additionalInfo, resultText = _a.resultText, onResultButtonClick = _a.onResultButtonClick, rest = __rest(_a, ["value", "status", "variant", "resultButtonText", "label", "description", "additionalInfo", "resultText", "onResultButtonClick"]);
    var __internalRootRef = useBaseComponent('ProgressBar').__internalRootRef;
    var baseProps = getBaseProps(rest);
    var generatedName = useUniqueId('awsui-progress-bar-');
    var labelId = "".concat(generatedName, "-label");
    var isInFlash = variant === 'flash';
    var isInProgressState = status === 'in-progress';
    var _e = useState(''), assertion = _e[0], setAssertion = _e[1];
    var throttledAssertion = useMemo(function () {
        return throttle(function (value) {
            setAssertion("".concat(label !== null && label !== void 0 ? label : '', ": ").concat(value, "%"));
        }, ASSERTION_FREQUENCY);
    }, [label]);
    useEffect(function () {
        throttledAssertion(value);
    }, [throttledAssertion, value]);
    if (isInFlash && resultButtonText) {
        warnOnce('ProgressBar', 'The `resultButtonText` is ignored if you set `variant="flash"`, and the result button is not displayed. Use the `buttonText` property and the `onButtonClick` event listener of the flashbar item in which the progress bar component is embedded.');
    }
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(baseProps.className, styles.root, variant && styles[variant]), ref: __internalRootRef }),
        React.createElement("div", { className: isInFlash ? styles['flash-container'] : undefined },
            React.createElement("div", { className: clsx(styles['word-wrap'], styles["label-".concat(variant)]), id: labelId }, label),
            description && React.createElement(SmallText, { color: isInFlash ? 'inherit' : undefined }, description),
            React.createElement("div", null, isInProgressState ? (React.createElement(React.Fragment, null,
                React.createElement(Progress, { value: value, labelId: labelId, isInFlash: isInFlash }),
                React.createElement(LiveRegion, { delay: 0 }, assertion))) : (React.createElement(ResultState, { resultText: resultText, isInFlash: isInFlash, resultButtonText: resultButtonText, status: status, onClick: function () {
                    fireNonCancelableEvent(onResultButtonClick);
                } })))),
        additionalInfo && React.createElement(SmallText, { color: isInFlash ? 'inherit' : undefined }, additionalInfo)));
}
applyDisplayName(ProgressBar, 'ProgressBar');
//# sourceMappingURL=index.js.map