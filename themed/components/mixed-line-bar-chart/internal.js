import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { getBaseProps } from '../internal/base-component';
import { fireNonCancelableEvent } from '../internal/events';
import InternalBox from '../box/internal';
import ChartStatusContainer, { getChartStatus } from '../internal/components/chart-status-container';
import { useControllable } from '../internal/hooks/use-controllable';
import { usePrevious } from '../internal/hooks/use-previous';
import { warnOnce } from '../internal/logging';
import InternalChartFilters from './chart-filters';
import InternalChartLegend from './chart-legend';
import ChartContainer from './chart-container';
import cartesianStyles from '../internal/components/cartesian-chart/styles.css.js';
import styles from './styles.css.js';
import { isDevelopment } from '../internal/is-development';
import createCategoryColorScale from '../internal/utils/create-category-color-scale';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { nodeContains } from '../internal/utils/dom';
import { isXThreshold, isYThreshold } from './utils';
export default function InternalMixedLineBarChart(_a) {
    var _b;
    var height = _a.height, xScaleType = _a.xScaleType, yScaleType = _a.yScaleType, xDomain = _a.xDomain, yDomain = _a.yDomain, controlledHighlightedSeries = _a.highlightedSeries, controlledVisibleSeries = _a.visibleSeries, externalSeries = _a.series, onFilterChange = _a.onFilterChange, controlledOnHighlightChange = _a.onHighlightChange, i18nStrings = _a.i18nStrings, ariaLabel = _a.ariaLabel, ariaLabelledby = _a.ariaLabelledby, ariaDescription = _a.ariaDescription, xTitle = _a.xTitle, yTitle = _a.yTitle, stackedBars = _a.stackedBars, horizontalBars = _a.horizontalBars, hideFilter = _a.hideFilter, additionalFilters = _a.additionalFilters, hideLegend = _a.hideLegend, legendTitle = _a.legendTitle, statusType = _a.statusType, detailPopoverSize = _a.detailPopoverSize, emphasizeBaselineAxis = _a.emphasizeBaselineAxis, empty = _a.empty, noMatch = _a.noMatch, errorText = _a.errorText, loadingText = _a.loadingText, recoveryText = _a.recoveryText, onRecoveryClick = _a.onRecoveryClick, _c = _a.__internalRootRef, __internalRootRef = _c === void 0 ? null : _c, props = __rest(_a, ["height", "xScaleType", "yScaleType", "xDomain", "yDomain", "highlightedSeries", "visibleSeries", "series", "onFilterChange", "onHighlightChange", "i18nStrings", "ariaLabel", "ariaLabelledby", "ariaDescription", "xTitle", "yTitle", "stackedBars", "horizontalBars", "hideFilter", "additionalFilters", "hideLegend", "legendTitle", "statusType", "detailPopoverSize", "emphasizeBaselineAxis", "empty", "noMatch", "errorText", "loadingText", "recoveryText", "onRecoveryClick", "__internalRootRef"]);
    var baseProps = getBaseProps(props);
    var containerRef = useRef(null);
    useEffect(function () {
        var gotBarSeries = externalSeries.some(function (s) { return s.type === 'bar'; });
        var gotLineSeries = externalSeries.some(function (s) { return s.type === 'line'; });
        if (xScaleType !== 'categorical' && gotBarSeries) {
            warnOnce('MixedLineBarChart', "Bar series cannot be used with a ".concat(xScaleType, " scale. Use a categorical x axis instead."));
        }
        if (horizontalBars && gotLineSeries) {
            warnOnce('MixedLineBarChart', "Property horizontalBars can only be used with charts that contain only bar or threshold series.");
        }
        for (var _i = 0, externalSeries_1 = externalSeries; _i < externalSeries_1.length; _i++) {
            var s = externalSeries_1[_i];
            if (s.type === 'threshold' && s.x !== undefined && s.y !== undefined) {
                warnOnce('MixedLineBarChart', "Series of type \"threshold\" must contain either x or y property.");
            }
            if (s.type === 'threshold' && s.x === undefined && s.y === undefined) {
                warnOnce('MixedLineBarChart', "Series of type \"threshold\" must contain either x or y property.");
            }
        }
    }, [xScaleType, horizontalBars, externalSeries]);
    var series = useMemo(function () {
        // Generate series colors if not explicitly provided.
        // The thresholds use a dedicated colour scale.
        var colors = createCategoryColorScale(externalSeries, function (it) { return isYThreshold(it) || isXThreshold(it); }, function (it) { return it.color || null; });
        return externalSeries.map(function (s, i) { return ({ index: i, color: colors[i], series: s }); });
    }, [externalSeries]);
    var _d = useState(null), highlightedPoint = _d[0], setHighlightedPoint = _d[1];
    var _e = useState(null), highlightedGroupIndex = _e[0], setHighlightedGroupIndex = _e[1];
    var _f = useControllable(controlledHighlightedSeries, controlledOnHighlightChange, null, {
        componentName: 'MixedLineBarChart',
        controlledProp: 'highlightedSeries',
        changeHandler: 'onHighlightChange'
    }), _g = _f[0], highlightedSeries = _g === void 0 ? null : _g, setHighlightedSeries = _f[1];
    var _h = useState(highlightedSeries), legendSeries = _h[0], setLegendSeries = _h[1];
    useEffect(function () {
        setLegendSeries(controlledHighlightedSeries || null);
    }, [controlledHighlightedSeries]);
    var _j = useControllable(controlledVisibleSeries, onFilterChange, externalSeries, {
        componentName: 'MixedLineBarChart',
        controlledProp: 'visibleSeries',
        changeHandler: 'onFilterChange'
    }), externalVisibleSeries = _j[0], setExternalVisibleSeries = _j[1];
    if (isDevelopment) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        var previousSeries = usePrevious(externalSeries);
        var hasPrevious = !!(previousSeries && previousSeries.length);
        var hasCurrent = !!externalSeries.length;
        if (hasPrevious && hasCurrent && externalSeries !== previousSeries && !controlledVisibleSeries && !hideFilter) {
            warnOnce('MixedLineBarChart', 'The `series` value passed into the component changed. ' +
                'This may cause problems with filtering - we recommend that you make the `series` value constant, ' +
                'or provide a `visibleSeries` value that derives from the current `series` value.');
        }
    }
    var visibleSeries = useMemo(function () { return series.filter(function (s) { return (externalVisibleSeries === null || externalVisibleSeries === void 0 ? void 0 : externalVisibleSeries.indexOf(s.series)) !== -1; }); }, [series, externalVisibleSeries]);
    var filterChange = function (selectedSeries) {
        setExternalVisibleSeries(selectedSeries);
        fireNonCancelableEvent(onFilterChange, {
            visibleSeries: selectedSeries
        });
    };
    var onHighlightChange = function (series) {
        setHighlightedSeries(series);
        fireNonCancelableEvent(controlledOnHighlightChange, {
            highlightedSeries: series
        });
        setLegendSeries(series);
    };
    var onBlur = function (event) {
        if (event.relatedTarget && !nodeContains(containerRef.current, event.relatedTarget)) {
            highlightedSeries && onHighlightChange(highlightedSeries);
            setHighlightedPoint(null);
            setHighlightedGroupIndex(null);
            setLegendSeries(null);
        }
    };
    var _k = getChartStatus({
        externalData: externalSeries,
        visibleData: visibleSeries || [],
        statusType: statusType
    }), isEmpty = _k.isEmpty, isNoMatch = _k.isNoMatch, showChart = _k.showChart;
    var showFilters = statusType === 'finished' && (!isEmpty || isNoMatch);
    var showLegend = !hideLegend && !isEmpty && statusType === 'finished';
    var reserveLegendSpace = !showChart && !hideLegend;
    var reserveFilterSpace = !showChart && !isNoMatch && (!hideFilter || additionalFilters);
    var mergedRef = useMergeRefs(containerRef, __internalRootRef);
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(baseProps.className, styles.root), ref: mergedRef, onBlur: onBlur }),
        showFilters && (React.createElement(InternalBox, { className: cartesianStyles['filter-container'], margin: { bottom: 'l' } },
            React.createElement(InternalChartFilters, { series: series, visibleSeries: externalVisibleSeries || [], onChange: filterChange, i18nStrings: i18nStrings, hideFilter: hideFilter, additionalFilters: additionalFilters }))),
        React.createElement("div", { className: clsx(styles.content, (_b = {},
                _b[styles['content--reserve-filter']] = reserveFilterSpace,
                _b[styles['content--reserve-legend']] = reserveLegendSpace,
                _b)), style: { minHeight: height } },
            React.createElement(ChartStatusContainer, { isEmpty: isEmpty, isNoMatch: isNoMatch, showChart: showChart, statusType: statusType, empty: empty, noMatch: noMatch, loadingText: loadingText, errorText: errorText, recoveryText: recoveryText, onRecoveryClick: onRecoveryClick }),
            showChart && (React.createElement(ChartContainer, { height: height, xScaleType: xScaleType, yScaleType: yScaleType, xDomain: xDomain, yDomain: yDomain, xTickFormatter: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.xTickFormatter, yTickFormatter: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.yTickFormatter, emphasizeBaselineAxis: emphasizeBaselineAxis, stackedBars: stackedBars, horizontalBars: horizontalBars, series: series, visibleSeries: visibleSeries, highlightedSeries: highlightedSeries, onHighlightChange: onHighlightChange, highlightedPoint: highlightedPoint, setHighlightedPoint: setHighlightedPoint, highlightedGroupIndex: highlightedGroupIndex, setHighlightedGroupIndex: setHighlightedGroupIndex, detailPopoverSize: detailPopoverSize, xTitle: xTitle, yTitle: yTitle, ariaLabel: ariaLabel, ariaLabelledby: ariaLabelledby, ariaDescription: ariaDescription, i18nStrings: i18nStrings, plotContainerRef: containerRef }))),
        showLegend && (React.createElement(InternalBox, { margin: { top: 'm' } },
            React.createElement(InternalChartLegend, { series: series, visibleSeries: externalVisibleSeries || [], highlightedSeries: legendSeries, onHighlightChange: onHighlightChange, legendTitle: legendTitle, ariaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.legendAriaLabel, plotContainerRef: containerRef })))));
}
//# sourceMappingURL=internal.js.map