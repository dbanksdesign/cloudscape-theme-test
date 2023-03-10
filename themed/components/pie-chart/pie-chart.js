// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { pie } from 'd3-shape';
import { KeyCode } from '../internal/keycode';
import { nodeContains } from '../internal/utils/dom';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import ChartPopover from '../internal/components/chart-popover';
import SeriesDetails from '../internal/components/chart-series-details';
import SeriesMarker from '../internal/components/chart-series-marker';
import ChartStatusContainer, { getChartStatus } from '../internal/components/chart-status-container';
import InternalBox from '../box/internal';
import Labels from './labels';
import styles from './styles.css.js';
import { defaultDetails, dimensionsBySize, refreshDimensionsBySize } from './utils';
import Segments from './segments';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import ChartPlot from '../internal/components/chart-plot';
export default (function (_a) {
    var _b;
    var _c;
    var variant = _a.variant, size = _a.size, i18nStrings = _a.i18nStrings, ariaLabel = _a.ariaLabel, ariaLabelledby = _a.ariaLabelledby, data = _a.data, visibleData = _a.visibleData, ariaDescription = _a.ariaDescription, innerMetricValue = _a.innerMetricValue, innerMetricDescription = _a.innerMetricDescription, hideTitles = _a.hideTitles, hideDescriptions = _a.hideDescriptions, detailPopoverContent = _a.detailPopoverContent, detailPopoverSize = _a.detailPopoverSize, width = _a.width, additionalFilters = _a.additionalFilters, hideFilter = _a.hideFilter, hideLegend = _a.hideLegend, statusType = _a.statusType, empty = _a.empty, noMatch = _a.noMatch, errorText = _a.errorText, recoveryText = _a.recoveryText, loadingText = _a.loadingText, onRecoveryClick = _a.onRecoveryClick, segmentDescription = _a.segmentDescription, highlightedSegment = _a.highlightedSegment, onHighlightChange = _a.onHighlightChange, legendSegment = _a.legendSegment, pinnedSegment = _a.pinnedSegment, setPinnedSegment = _a.setPinnedSegment;
    var plotRef = useRef(null);
    var containerRef = useRef(null);
    var focusedSegmentRef = useRef(null);
    var popoverTrackRef = useRef(null);
    var popoverRef = useRef(null);
    var isRefresh = useVisualRefresh();
    var dimensions = isRefresh ? refreshDimensionsBySize[size] : dimensionsBySize[size];
    var radius = dimensions.outerRadius;
    var hasLabels = !(hideTitles && hideDescriptions);
    var height = 2 * (radius + dimensions.padding + (hasLabels ? dimensions.paddingLabels : 0));
    // Inner content is only available for donut charts and the inner description is not displayed for small charts
    var hasInnerContent = variant === 'donut' && (innerMetricValue || (innerMetricDescription && size !== 'small'));
    var innerMetricId = useUniqueId('awsui-pie-chart__inner');
    var _d = useState(false), isTooltipOpen = _d[0], setTooltipOpen = _d[1];
    var _e = useState(), tooltipData = _e[0], setTooltipData = _e[1];
    var _f = useMemo(function () {
        var dataSum = visibleData.reduce(function (sum, d) { return sum + d.datum.value; }, 0);
        var pieFactory = pie()
            // Minimum 1% segment size
            .value(function (d) { return (d.datum.value < dataSum / 100 ? dataSum / 100 : d.datum.value); })
            .sort(null);
        // Filter out segments with value of zero or below
        var pieData = pieFactory(visibleData.filter(function (d) { return d.datum.value > 0; }));
        return { pieData: pieData, dataSum: dataSum };
    }, [visibleData]), pieData = _f.pieData, dataSum = _f.dataSum;
    var highlightedSegmentIndex = useMemo(function () {
        for (var index = 0; index < pieData.length; index++) {
            if (pieData[index].data.datum === highlightedSegment) {
                return index;
            }
        }
        return null;
    }, [pieData, highlightedSegment]);
    var detailFunction = detailPopoverContent || defaultDetails(i18nStrings);
    var details = tooltipData ? detailFunction(tooltipData.datum, dataSum) : [];
    var tooltipContent = tooltipData && React.createElement(SeriesDetails, { details: details });
    var _g = getChartStatus({ externalData: data, visibleData: pieData, statusType: statusType }), isEmpty = _g.isEmpty, showChart = _g.showChart;
    // Pie charts have a special condition for empty/noMatch due to how zero-value segments are handled.
    var isNoMatch = isEmpty && visibleData.length !== data.length;
    var reserveLegendSpace = !showChart && !hideLegend;
    var reserveFilterSpace = statusType !== 'finished' && !isNoMatch && (!hideFilter || additionalFilters);
    var popoverDismissedRecently = useRef(false);
    var escapePressed = useRef(false);
    var highlightSegment = useCallback(function (internalDatum) {
        var segment = internalDatum.datum;
        if (segment !== highlightedSegment) {
            onHighlightChange(segment);
        }
        if (popoverTrackRef.current) {
            setTooltipData({
                datum: internalDatum.datum,
                series: {
                    color: internalDatum.color,
                    index: internalDatum.index,
                    label: internalDatum.datum.title,
                    markerType: 'rectangle'
                },
                trackRef: popoverTrackRef
            });
            setTooltipOpen(true);
        }
    }, [highlightedSegment, setTooltipOpen, onHighlightChange]);
    var clearHighlightedSegment = useCallback(function () {
        setTooltipOpen(false);
        onHighlightChange(null);
    }, [onHighlightChange, setTooltipOpen]);
    useEffect(function () {
        var onKeyDown = function (event) {
            if (event.key === 'Escape') {
                clearHighlightedSegment();
                escapePressed.current = true;
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return function () { return document.removeEventListener('keydown', onKeyDown); };
    }, [clearHighlightedSegment]);
    var onMouseDown = useCallback(function (internalDatum) {
        if (pinnedSegment === internalDatum.datum) {
            setPinnedSegment(null);
            clearHighlightedSegment();
        }
        else {
            setPinnedSegment(internalDatum.datum);
            highlightSegment(internalDatum);
        }
    }, [pinnedSegment, clearHighlightedSegment, setPinnedSegment, highlightSegment]);
    var onMouseOver = useCallback(function (internalDatum) {
        if (escapePressed.current) {
            escapePressed.current = false;
            return;
        }
        if (pinnedSegment !== null) {
            return;
        }
        highlightSegment(internalDatum);
    }, [pinnedSegment, highlightSegment]);
    var onMouseOut = useCallback(function (event) {
        var _a;
        if (pinnedSegment !== null || ((_a = popoverRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.relatedTarget))) {
            return;
        }
        clearHighlightedSegment();
    }, [pinnedSegment, clearHighlightedSegment]);
    var onKeyDown = useCallback(function (event) {
        var keyCode = event.keyCode;
        if (keyCode !== KeyCode.right &&
            keyCode !== KeyCode.left &&
            keyCode !== KeyCode.enter &&
            keyCode !== KeyCode.space) {
            return;
        }
        event.preventDefault();
        var nextIndex = highlightedSegmentIndex || 0;
        var MAX = pieData.length - 1;
        if (keyCode === KeyCode.right) {
            nextIndex++;
            if (nextIndex > MAX) {
                nextIndex = 0;
            }
        }
        else if (keyCode === KeyCode.left) {
            nextIndex--;
            if (nextIndex < 0) {
                nextIndex = MAX;
            }
        }
        if (keyCode === KeyCode.enter || keyCode === KeyCode.space) {
            setPinnedSegment(pieData[nextIndex].data.datum);
        }
        highlightSegment(pieData[nextIndex].data);
    }, [setPinnedSegment, highlightSegment, pieData, highlightedSegmentIndex]);
    var onFocus = useCallback(function (_event, target) {
        // We need to make sure that we do not re-show the popover when we focus the segment after the popover is dismissed.
        // Normally we would check `event.relatedTarget` for the previously focused element,
        // but this is not supported for SVG elements in IE11. The workaround is this `popoverDismissedRecently` ref.
        if (pinnedSegment !== null || popoverDismissedRecently.current || target === 'mouse') {
            return;
        }
        var segment = highlightedSegment || legendSegment || pieData[0].data.datum;
        var matched = pieData.filter(function (d) { return d.data.datum === segment; });
        highlightSegment(matched[0].data);
    }, [pinnedSegment, pieData, highlightSegment, highlightedSegment, legendSegment]);
    var onBlur = useCallback(function (event) {
        var blurTarget = event.relatedTarget || event.target;
        if (blurTarget === null || !(blurTarget instanceof Element) || !nodeContains(containerRef.current, blurTarget)) {
            // We only need to close the tooltip and remove the pinned segment so that we keep track of the current
            // highlighted legendSeries. using clearHighlightedSegment() would set the legendSeries to null, in that case
            // using Keyboard Tab will always highlight the first legend item in the legend component.
            setTooltipOpen(false);
            setPinnedSegment(null);
        }
    }, [setPinnedSegment]);
    var onPopoverDismiss = function (outsideClick) {
        setTooltipOpen(false);
        setPinnedSegment(null);
        if (!outsideClick) {
            // The delay is needed to bypass focus events caused by click or keypress needed to unpin the popover.
            setTimeout(function () {
                popoverDismissedRecently.current = true;
                plotRef.current.focusApplication();
                popoverDismissedRecently.current = false;
            }, 0);
        }
        else {
            onHighlightChange(null);
        }
    };
    var onPopoverLeave = function (event) {
        if (pinnedSegment !== null || focusedSegmentRef.current.contains(event.relatedTarget)) {
            return;
        }
        clearHighlightedSegment();
    };
    return (React.createElement("div", { className: clsx(styles.content, styles["content--".concat(size)], (_b = {},
            _b[styles['content--without-labels']] = !hasLabels,
            _b[styles['content--reserve-filter']] = reserveFilterSpace,
            _b[styles['content--reserve-legend']] = reserveLegendSpace,
            _b)) },
        React.createElement(ChartStatusContainer, { isEmpty: isEmpty, isNoMatch: isNoMatch, showChart: showChart, statusType: statusType, empty: empty, noMatch: noMatch, loadingText: loadingText, errorText: errorText, recoveryText: recoveryText, onRecoveryClick: onRecoveryClick }),
        showChart && (React.createElement("div", { className: styles['chart-container'], ref: containerRef },
            React.createElement(ChartPlot, { ref: plotRef, width: width, height: height, transform: "translate(".concat(width / 2, " ").concat(height / 2, ")"), isPrecise: true, isClickable: !isTooltipOpen, ariaLabel: ariaLabel, ariaLabelledby: ariaLabelledby, ariaDescription: ariaDescription, ariaDescribedby: hasInnerContent ? innerMetricId : undefined, ariaRoleDescription: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.chartAriaRoleDescription, ariaLiveRegion: tooltipContent, activeElementRef: focusedSegmentRef, activeElementKey: highlightedSegmentIndex === null || highlightedSegmentIndex === void 0 ? void 0 : highlightedSegmentIndex.toString(), onFocus: onFocus, onBlur: onBlur, onKeyDown: onKeyDown, onMouseOut: onMouseOut },
                React.createElement(Segments, { pieData: pieData, size: size, variant: variant, focusedSegmentRef: focusedSegmentRef, popoverTrackRef: popoverTrackRef, highlightedSegment: highlightedSegment, segmentAriaRoleDescription: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.segmentAriaRoleDescription, onMouseDown: onMouseDown, onMouseOver: onMouseOver, onMouseOut: onMouseOut }),
                hasLabels && (React.createElement(Labels, { pieData: pieData, size: size, segmentDescription: segmentDescription, visibleDataSum: dataSum, hideTitles: hideTitles, hideDescriptions: hideDescriptions, highlightedSegment: highlightedSegment, containerRef: containerRef }))),
            hasInnerContent && (React.createElement("div", { className: styles['inner-content'], id: innerMetricId },
                innerMetricValue && (React.createElement(InternalBox, { variant: size === 'small' ? 'h3' : 'h1', tagOverride: "div", color: "inherit", padding: "n" }, innerMetricValue)),
                innerMetricDescription && size !== 'small' && (React.createElement(InternalBox, { variant: "h3", color: "text-body-secondary", tagOverride: "div", padding: "n" }, innerMetricDescription)))),
            isTooltipOpen && tooltipData && (React.createElement(ChartPopover, { ref: popoverRef, title: tooltipData.series && (React.createElement(InternalBox, { className: styles['popover-header'], variant: "strong" },
                    React.createElement(SeriesMarker, { color: tooltipData.series.color, type: tooltipData.series.markerType }),
                    ' ',
                    tooltipData.series.label)), trackRef: tooltipData.trackRef, trackKey: tooltipData.series.index, dismissButton: pinnedSegment !== null, dismissAriaLabel: i18nStrings.detailPopoverDismissAriaLabel, onDismiss: onPopoverDismiss, container: ((_c = plotRef.current) === null || _c === void 0 ? void 0 : _c.svg) || null, size: detailPopoverSize, onMouseLeave: onPopoverLeave }, tooltipContent))))));
});
//# sourceMappingURL=pie-chart.js.map