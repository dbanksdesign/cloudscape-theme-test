import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import ChartPopover from '../../internal/components/chart-popover';
import ChartSeriesDetails from '../../internal/components/chart-series-details';
import styles from '../styles.css.js';
export default function AreaChartPopover(_a) {
    var model = _a.model, highlightDetails = _a.highlightDetails, dismissAriaLabel = _a.dismissAriaLabel, size = _a.size;
    if (!highlightDetails) {
        return null;
    }
    var popoverProps = {
        title: highlightDetails.formattedX,
        trackRef: model.refs.verticalMarker,
        trackKey: highlightDetails.highlightIndex,
        dismissButton: highlightDetails.isPopoverPinned,
        onDismiss: model.handlers.onPopoverDismiss,
        onMouseLeave: model.handlers.onPopoverLeave,
        ref: model.refs.popoverRef
    };
    return (React.createElement(ChartPopover, __assign({}, popoverProps, { container: model.refs.container.current, dismissAriaLabel: dismissAriaLabel, size: size }),
        React.createElement(ChartSeriesDetails, { details: highlightDetails.seriesDetails }),
        React.createElement("div", { className: styles['popover-divider'] }),
        React.createElement(ChartSeriesDetails, { details: highlightDetails.totalDetails })));
}
//# sourceMappingURL=chart-popover.js.map