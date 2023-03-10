import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { getBaseProps } from '../internal/base-component';
import { useControllable } from '../internal/hooks/use-controllable';
import { fireNonCancelableEvent } from '../internal/events';
import Legend from '../internal/components/chart-legend';
import Filter from '../internal/components/chart-filter';
import InternalSpaceBetween from '../space-between/internal';
import InternalBox from '../box/internal';
import InternalPieChart from './pie-chart';
import styles from './styles.css.js';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import useBaseComponent from '../internal/hooks/use-base-component';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import createCategoryColorScale from '../internal/utils/create-category-color-scale';
import useContainerWidth from '../internal/utils/use-container-width';
import { nodeContains } from '../internal/utils/dom';
var PieChart = function PieChart(_a) {
    var _b;
    var _c = _a.variant, variant = _c === void 0 ? 'pie' : _c, _d = _a.size, size = _d === void 0 ? 'medium' : _d, _e = _a.hideTitles, hideTitles = _e === void 0 ? false : _e, _f = _a.hideDescriptions, hideDescriptions = _f === void 0 ? false : _f, _g = _a.hideLegend, hideLegend = _g === void 0 ? false : _g, _h = _a.hideFilter, hideFilter = _h === void 0 ? false : _h, _j = _a.statusType, statusType = _j === void 0 ? 'finished' : _j, _k = _a.data, externalData = _k === void 0 ? [] : _k, _l = _a.i18nStrings, i18nStrings = _l === void 0 ? {} : _l, controlledHighlightedSegment = _a.highlightedSegment, controlledVisibleSegments = _a.visibleSegments, controlledOnHighlightChange = _a.onHighlightChange, onFilterChange = _a.onFilterChange, additionalFilters = _a.additionalFilters, legendTitle = _a.legendTitle, _m = _a.detailPopoverSize, detailPopoverSize = _m === void 0 ? 'medium' : _m, props = __rest(_a, ["variant", "size", "hideTitles", "hideDescriptions", "hideLegend", "hideFilter", "statusType", "data", "i18nStrings", "highlightedSegment", "visibleSegments", "onHighlightChange", "onFilterChange", "additionalFilters", "legendTitle", "detailPopoverSize"]);
    var _o = useBaseComponent('PieChart').__internalRootRef, __internalRootRef = _o === void 0 ? null : _o;
    var baseProps = getBaseProps(props);
    var isEmpty = !externalData || externalData.length === 0;
    var containerAttr = __assign(__assign({}, baseProps), { className: clsx(baseProps.className, styles.root) });
    var containerRef = useRef(null);
    var _p = useContainerWidth(), containerWidth = _p[0], measureRef = _p[1];
    var data = useMemo(function () {
        var colors = createCategoryColorScale(externalData, undefined, function (it) { return it.color || null; });
        return externalData.map(function (datum, i) { return ({
            index: i,
            color: colors[i],
            datum: datum
        }); });
    }, [externalData]);
    var _q = useControllable(controlledHighlightedSegment, controlledOnHighlightChange, null, {
        componentName: 'PieChart',
        controlledProp: 'highlightedSegment',
        changeHandler: 'onHighlightChange'
    }), _r = _q[0], highlightedSegment = _r === void 0 ? null : _r, setHighlightedSegment = _q[1];
    var _s = useState(highlightedSegment), legendSegment = _s[0], setLegendSegment = _s[1];
    useEffect(function () {
        setLegendSegment(controlledHighlightedSegment || null);
    }, [controlledHighlightedSegment]);
    var _t = useControllable(controlledVisibleSegments, onFilterChange, externalData, {
        componentName: 'PieChart',
        controlledProp: 'visibleSegments',
        changeHandler: 'onFilterChange'
    }), visibleSegments = _t[0], setVisibleSegments = _t[1];
    var _u = useState(null), pinnedSegment = _u[0], setPinnedSegment = _u[1];
    var visibleData = useMemo(function () { return data.filter(function (d) { return (visibleSegments === null || visibleSegments === void 0 ? void 0 : visibleSegments.indexOf(d.datum)) !== -1; }); }, [data, visibleSegments]);
    var filterItems = data === null || data === void 0 ? void 0 : data.map(function (data) { return ({
        label: data.datum.title,
        color: data.color,
        type: 'rectangle',
        datum: data.datum
    }); });
    var legendItems = filterItems.filter(function (d) { return (visibleSegments === null || visibleSegments === void 0 ? void 0 : visibleSegments.indexOf(d.datum)) !== -1; });
    var filterChange = useCallback(function (selectedSeries) {
        setVisibleSegments(selectedSeries);
        fireNonCancelableEvent(onFilterChange, {
            visibleSegments: selectedSeries
        });
    }, [setVisibleSegments, onFilterChange]);
    var onHighlightChange = useCallback(function (segment) {
        setLegendSegment(segment);
        setHighlightedSegment(segment);
        fireNonCancelableEvent(controlledOnHighlightChange, { highlightedSegment: segment });
    }, [controlledOnHighlightChange, setHighlightedSegment]);
    var onBlur = function (event) {
        if (event.relatedTarget && !nodeContains(containerRef.current, event.relatedTarget)) {
            highlightedSegment && onHighlightChange(null);
            setLegendSegment(null);
        }
    };
    var mergedRef = useMergeRefs(containerRef, measureRef, __internalRootRef);
    return (React.createElement("div", __assign({}, containerAttr, { ref: mergedRef, onBlur: onBlur }),
        statusType === 'finished' && !isEmpty && (React.createElement(InternalBox, { className: styles['filter-container'], margin: { bottom: 'l' } },
            React.createElement(InternalSpaceBetween, { size: "l", direction: "horizontal", className: clsx((_b = {},
                    _b[styles['has-default-filter']] = !hideFilter,
                    _b)) },
                !hideFilter && (React.createElement(Filter, { series: filterItems, onChange: filterChange, selectedSeries: visibleSegments, i18nStrings: i18nStrings })),
                additionalFilters))),
        React.createElement(InternalPieChart, __assign({}, props, { variant: variant, size: size, data: externalData, visibleData: visibleData, width: containerWidth, statusType: statusType, hideTitles: hideTitles, hideDescriptions: hideDescriptions, hideLegend: hideLegend, hideFilter: hideFilter, additionalFilters: additionalFilters, i18nStrings: i18nStrings, onHighlightChange: onHighlightChange, highlightedSegment: highlightedSegment, legendSegment: legendSegment, pinnedSegment: pinnedSegment, setPinnedSegment: setPinnedSegment, detailPopoverSize: detailPopoverSize })),
        !hideLegend && !isEmpty && statusType === 'finished' && (React.createElement(InternalBox, { margin: { top: 'm' } },
            React.createElement(Legend, { series: legendItems, highlightedSeries: legendSegment, legendTitle: legendTitle, ariaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.legendAriaLabel, onHighlightChange: onHighlightChange, plotContainerRef: containerRef })))));
};
applyDisplayName(PieChart, 'PieChart');
export default PieChart;
//# sourceMappingURL=index.js.map