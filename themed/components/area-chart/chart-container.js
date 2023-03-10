// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useState, useEffect, memo, useRef } from 'react';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import ChartPlot from '../internal/components/chart-plot';
import AxisLabel from '../internal/components/cartesian-chart/axis-label';
import LabelsMeasure from '../internal/components/cartesian-chart/labels-measure';
import LeftLabels from '../internal/components/cartesian-chart/left-labels';
import BottomLabels from '../internal/components/cartesian-chart/bottom-labels';
import EmphasizedBaseline from '../internal/components/cartesian-chart/emphasized-baseline';
import AreaDataSeries from './elements/data-series';
import AreaChartPopover from './elements/chart-popover';
import AreaHighlightedPoint from './elements/highlighted-point';
import AreaVerticalMarker from './elements/vertical-marker';
import styles from './styles.css.js';
import useHighlightDetails from './elements/use-highlight-details';
import useContainerWidth from '../internal/utils/use-container-width';
var DEFAULT_CHART_WIDTH = 500;
var LEFT_LABELS_MARGIN = 16;
var BOTTOM_LABELS_OFFSET = 12;
export default memo(ChartContainer);
function ChartContainer(_a) {
    var model = _a.model, autoWidth = _a.autoWidth, xTitle = _a.xTitle, yTitle = _a.yTitle, detailPopoverSize = _a.detailPopoverSize, ariaLabel = _a.ariaLabel, ariaLabelledby = _a.ariaLabelledby, ariaDescription = _a.ariaDescription, _b = _a.i18nStrings, _c = _b === void 0 ? {} : _b, xTickFormatter = _c.xTickFormatter, yTickFormatter = _c.yTickFormatter, detailTotalFormatter = _c.detailTotalFormatter, detailTotalLabel = _c.detailTotalLabel, chartAriaRoleDescription = _c.chartAriaRoleDescription, xAxisAriaRoleDescription = _c.xAxisAriaRoleDescription, yAxisAriaRoleDescription = _c.yAxisAriaRoleDescription, detailPopoverDismissAriaLabel = _c.detailPopoverDismissAriaLabel;
    var _d = useState(0), leftLabelsWidth = _d[0], setLeftLabelsWidth = _d[1];
    var _e = useState(0), bottomLabelsHeight = _e[0], setBottomLabelsHeight = _e[1];
    var _f = useContainerWidth(DEFAULT_CHART_WIDTH), containerWidth = _f[0], containerWidthRef = _f[1];
    // Calculate the width of the plot area and tell it to the parent.
    var plotWidth = Math.max(0, containerWidth - leftLabelsWidth - LEFT_LABELS_MARGIN);
    useEffect(function () {
        autoWidth(plotWidth);
    }, [autoWidth, plotWidth]);
    var highlightDetails = useHighlightDetails({
        model: model,
        xTickFormatter: xTickFormatter,
        yTickFormatter: yTickFormatter,
        detailTotalFormatter: detailTotalFormatter,
        detailTotalLabel: detailTotalLabel
    });
    var highlightedPointRef = useRef(null);
    var mergedRef = useMergeRefs(containerWidthRef, model.refs.container);
    var isPointHighlighted = model.interactions.get().highlightedPoint !== null;
    return (React.createElement("div", { className: styles['chart-container'], ref: mergedRef },
        React.createElement(AxisLabel, { axis: "y", position: "left", title: yTitle }),
        React.createElement("div", { className: styles['chart-container__horizontal'] },
            React.createElement(LabelsMeasure, { scale: model.computed.yScale, ticks: model.computed.yTicks, tickFormatter: yTickFormatter, autoWidth: setLeftLabelsWidth }),
            React.createElement("div", { className: styles['chart-container__vertical'] },
                React.createElement(ChartPlot, { ref: model.refs.plot, width: model.width, height: model.height, offsetBottom: bottomLabelsHeight, ariaLabel: ariaLabel, ariaLabelledby: ariaLabelledby, ariaDescription: ariaDescription, ariaRoleDescription: chartAriaRoleDescription, activeElementKey: !(highlightDetails === null || highlightDetails === void 0 ? void 0 : highlightDetails.isPopoverPinned) && (highlightDetails === null || highlightDetails === void 0 ? void 0 : highlightDetails.activeLabel), activeElementRef: isPointHighlighted ? highlightedPointRef : model.refs.verticalMarker, activeElementFocusOffset: isPointHighlighted ? 3 : { x: 8, y: 0 }, isClickable: !(highlightDetails === null || highlightDetails === void 0 ? void 0 : highlightDetails.isPopoverPinned), onMouseMove: model.handlers.onSVGMouseMove, onMouseOut: model.handlers.onSVGMouseOut, onMouseDown: model.handlers.onSVGMouseDown, onKeyDown: model.handlers.onSVGKeyDown, onFocus: model.handlers.onSVGFocus, onBlur: model.handlers.onSVGBlur },
                    React.createElement(LeftLabels, { width: model.width, height: model.height, scale: model.computed.yScale, ticks: model.computed.yTicks, tickFormatter: yTickFormatter, title: yTitle, ariaRoleDescription: yAxisAriaRoleDescription }),
                    React.createElement(AreaDataSeries, { model: model }),
                    React.createElement(BottomLabels, { width: model.width, height: model.height, scale: model.computed.xScale, ticks: model.computed.xTicks, tickFormatter: xTickFormatter, title: xTitle, ariaRoleDescription: xAxisAriaRoleDescription, autoHeight: setBottomLabelsHeight, offsetLeft: leftLabelsWidth + BOTTOM_LABELS_OFFSET, offsetRight: BOTTOM_LABELS_OFFSET }),
                    React.createElement(EmphasizedBaseline, { width: model.width, height: model.height, scale: model.computed.yScale }),
                    React.createElement(AreaVerticalMarker, { model: model }),
                    React.createElement(AreaHighlightedPoint, { ref: highlightedPointRef, model: model, ariaLabel: highlightDetails === null || highlightDetails === void 0 ? void 0 : highlightDetails.activeLabel })),
                React.createElement(AxisLabel, { axis: "x", position: "bottom", title: xTitle })),
            React.createElement(AreaChartPopover, { model: model, highlightDetails: highlightDetails, dismissAriaLabel: detailPopoverDismissAriaLabel, size: detailPopoverSize }))));
}
//# sourceMappingURL=chart-container.js.map