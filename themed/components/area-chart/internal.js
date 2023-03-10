import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { isDevelopment } from '../internal/is-development';
import { getBaseProps } from '../internal/base-component';
import InternalBox from '../box/internal';
import ChartStatusContainer, { getChartStatus } from '../internal/components/chart-status-container';
import AreaChartFilter from './elements/area-chart-filter';
import AreaChartLegend from './elements/area-chart-legend';
import InternalSpaceBetween from '../space-between/internal';
import ChartContainer from './chart-container';
import cartesianStyles from '../internal/components/cartesian-chart/styles.css.js';
import styles from './styles.css.js';
import useChartModel from './model/use-chart-model';
import useFilterProps from './model/use-filter-props';
import useHighlightProps from './model/use-highlight-props';
import { isSeriesValid } from './model/utils';
import { warnOnce } from '../internal/logging';
import { nodeContains } from '../internal/utils/dom';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
export default function InternalAreaChart(_a) {
    var _b, _c;
    var height = _a.height, xScaleType = _a.xScaleType, yScaleType = _a.yScaleType, xDomain = _a.xDomain, yDomain = _a.yDomain, controlledHighlightedSeries = _a.highlightedSeries, controlledVisibleSeries = _a.visibleSeries, externalSeries = _a.series, controlledOnVisibleChange = _a.onFilterChange, controlledOnHighlightChange = _a.onHighlightChange, i18nStrings = _a.i18nStrings, ariaLabel = _a.ariaLabel, ariaLabelledby = _a.ariaLabelledby, ariaDescription = _a.ariaDescription, xTitle = _a.xTitle, yTitle = _a.yTitle, hideFilter = _a.hideFilter, additionalFilters = _a.additionalFilters, hideLegend = _a.hideLegend, legendTitle = _a.legendTitle, statusType = _a.statusType, detailPopoverSize = _a.detailPopoverSize, empty = _a.empty, noMatch = _a.noMatch, errorText = _a.errorText, loadingText = _a.loadingText, recoveryText = _a.recoveryText, onRecoveryClick = _a.onRecoveryClick, _d = _a.__internalRootRef, __internalRootRef = _d === void 0 ? null : _d, props = __rest(_a, ["height", "xScaleType", "yScaleType", "xDomain", "yDomain", "highlightedSeries", "visibleSeries", "series", "onFilterChange", "onHighlightChange", "i18nStrings", "ariaLabel", "ariaLabelledby", "ariaDescription", "xTitle", "yTitle", "hideFilter", "additionalFilters", "hideLegend", "legendTitle", "statusType", "detailPopoverSize", "empty", "noMatch", "errorText", "loadingText", "recoveryText", "onRecoveryClick", "__internalRootRef"]);
    var baseProps = getBaseProps(props);
    var containerRef = useRef(null);
    var popoverRef = useRef(null);
    if (isDevelopment) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(function () {
            if (!isSeriesValid(externalSeries)) {
                warnOnce('AreaChart', "The `series` property violates the component's constraints: all `area` " +
                    'series must have `data` arrays of the same length and with the same x-values.');
            }
        }, [externalSeries]);
    }
    var _e = useState(0), width = _e[0], setWidth = _e[1];
    var _f = useFilterProps(externalSeries, controlledVisibleSeries, controlledOnVisibleChange), visibleSeries = _f[0], setVisibleSeries = _f[1];
    var _g = useHighlightProps(externalSeries, controlledHighlightedSeries, controlledOnHighlightChange), highlightedSeries = _g[0], setHighlightedSeries = _g[1];
    var model = useChartModel({
        externalSeries: externalSeries,
        visibleSeries: visibleSeries,
        setVisibleSeries: setVisibleSeries,
        highlightedSeries: highlightedSeries,
        setHighlightedSeries: setHighlightedSeries,
        xDomain: xDomain,
        yDomain: yDomain,
        xScaleType: xScaleType,
        yScaleType: yScaleType,
        height: height,
        width: width,
        popoverRef: popoverRef
    });
    var _h = getChartStatus({
        externalData: externalSeries,
        visibleData: visibleSeries,
        statusType: statusType
    }), isEmpty = _h.isEmpty, isNoMatch = _h.isNoMatch, showChart = _h.showChart;
    var showFilters = statusType === 'finished' && (!isEmpty || isNoMatch);
    var showLegend = !hideLegend && !isEmpty && statusType === 'finished';
    var reserveLegendSpace = !showChart && !hideLegend;
    var reserveFilterSpace = !showChart && !isNoMatch && (!hideFilter || additionalFilters);
    useEffect(function () {
        var onKeyDown = model.handlers.onDocumentKeyDown;
        document.addEventListener('keydown', onKeyDown);
        return function () { return document.removeEventListener('keydown', onKeyDown); };
    }, [model.handlers.onDocumentKeyDown]);
    var onBlur = function (event) {
        if (event.relatedTarget && !nodeContains(containerRef.current, event.relatedTarget)) {
            model.handlers.onContainerBlur();
        }
    };
    var mergedRef = useMergeRefs(containerRef, __internalRootRef);
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(baseProps.className, styles.root), ref: mergedRef, onBlur: onBlur }),
        showFilters && (React.createElement(InternalBox, { className: cartesianStyles['filter-container'], margin: { bottom: 'l' } },
            React.createElement(InternalSpaceBetween, { size: "l", direction: "horizontal", className: clsx((_b = {}, _b[styles['has-default-filter']] = !hideFilter, _b)) },
                !hideFilter && (React.createElement(AreaChartFilter, { model: model, filterLabel: i18nStrings.filterLabel, filterPlaceholder: i18nStrings.filterPlaceholder, filterSelectedAriaLabel: i18nStrings.filterSelectedAriaLabel })),
                additionalFilters))),
        React.createElement("div", { className: clsx(styles.content, (_c = {},
                _c[styles['content--reserve-filter']] = reserveFilterSpace,
                _c[styles['content--reserve-legend']] = reserveLegendSpace,
                _c)), style: { minHeight: height } },
            React.createElement(ChartStatusContainer, { isEmpty: isEmpty, isNoMatch: isNoMatch, showChart: showChart, statusType: statusType, empty: empty, noMatch: noMatch, loadingText: loadingText, errorText: errorText, recoveryText: recoveryText, onRecoveryClick: onRecoveryClick }),
            showChart && (React.createElement(ChartContainer, { model: model, autoWidth: setWidth, detailPopoverSize: detailPopoverSize, xTitle: xTitle, yTitle: yTitle, ariaLabel: ariaLabel, ariaLabelledby: ariaLabelledby, ariaDescription: ariaDescription, i18nStrings: i18nStrings }))),
        showLegend && (React.createElement(InternalBox, { margin: { top: 'm' } },
            React.createElement(AreaChartLegend, { plotContainerRef: containerRef, model: model, legendTitle: legendTitle, ariaLabel: i18nStrings.legendAriaLabel })))));
}
//# sourceMappingURL=internal.js.map