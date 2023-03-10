// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { fireNonCancelableEvent } from '../../events';
import InternalStatusIndicator from '../../../status-indicator/internal';
import InternalLink from '../../../link/internal';
import styles from './styles.css.js';
export function getChartStatus(_a) {
    var externalData = _a.externalData, visibleData = _a.visibleData, statusType = _a.statusType;
    var isEmpty = !visibleData || visibleData.length === 0;
    var isNoMatch = isEmpty && visibleData.length !== externalData.length;
    var showChart = statusType === 'finished' && !isEmpty;
    return { isEmpty: isEmpty, isNoMatch: isNoMatch, showChart: showChart };
}
export default function ChartStatusContainer(_a) {
    var statusType = _a.statusType, errorText = _a.errorText, loadingText = _a.loadingText, recoveryText = _a.recoveryText, noMatch = _a.noMatch, empty = _a.empty, onRecoveryClick = _a.onRecoveryClick, isNoMatch = _a.isNoMatch, isEmpty = _a.isEmpty, showChart = _a.showChart;
    var statusContainer = useMemo(function () {
        var handleRecoveryClick = function (event) {
            event.preventDefault();
            fireNonCancelableEvent(onRecoveryClick);
        };
        if (statusType === 'error') {
            return (React.createElement("span", null,
                React.createElement(InternalStatusIndicator, { type: "error" }, errorText),
                ' ',
                recoveryText && (React.createElement(InternalLink, { onFollow: handleRecoveryClick, variant: "recovery" }, recoveryText))));
        }
        if (statusType === 'loading') {
            return React.createElement(InternalStatusIndicator, { type: "loading" }, loadingText);
        }
        if (isNoMatch) {
            return React.createElement("div", { className: styles.empty }, noMatch);
        }
        if (isEmpty) {
            return React.createElement("div", { className: styles.empty }, empty);
        }
    }, [statusType, onRecoveryClick, isEmpty, isNoMatch, recoveryText, loadingText, errorText, empty, noMatch]);
    return (React.createElement("div", { className: styles.root, "aria-live": "polite", "aria-atomic": "true" }, !showChart && statusContainer));
}
//# sourceMappingURL=index.js.map