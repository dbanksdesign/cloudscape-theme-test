import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { arc } from 'd3-shape';
import { dimensionsBySize, refreshDimensionsBySize } from './utils';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import styles from './styles.css.js';
import clsx from 'clsx';
export default function Segments(_a) {
    var pieData = _a.pieData, highlightedSegment = _a.highlightedSegment, size = _a.size, variant = _a.variant, focusedSegmentRef = _a.focusedSegmentRef, popoverTrackRef = _a.popoverTrackRef, segmentAriaRoleDescription = _a.segmentAriaRoleDescription, onMouseDown = _a.onMouseDown, onMouseOver = _a.onMouseOver, onMouseOut = _a.onMouseOut;
    var isRefresh = useVisualRefresh();
    var _b = useMemo(function () {
        var dimensions = isRefresh ? refreshDimensionsBySize[size] : dimensionsBySize[size];
        var radius = dimensions.outerRadius;
        var innerRadius = variant === 'pie' ? 0 : dimensions.innerRadius;
        var cornerRadius = dimensions.cornerRadius || 0;
        var arcFactory = arc()
            .innerRadius(innerRadius)
            .outerRadius(radius)
            .cornerRadius(cornerRadius);
        var highlightedArcFactory = arc()
            .innerRadius(radius + 4)
            .outerRadius(radius + 6);
        return {
            arcFactory: arcFactory,
            highlightedArcFactory: highlightedArcFactory
        };
    }, [size, variant, isRefresh]), arcFactory = _b.arcFactory, highlightedArcFactory = _b.highlightedArcFactory;
    var centroid = useMemo(function () {
        for (var _i = 0, pieData_1 = pieData; _i < pieData_1.length; _i++) {
            var datum = pieData_1[_i];
            if (datum.data.datum === highlightedSegment) {
                var _a = arcFactory.centroid(datum), centroidLeft = _a[0], centroidTop = _a[1];
                return { cx: centroidLeft, cy: centroidTop };
            }
        }
        return null;
    }, [highlightedSegment, pieData, arcFactory]);
    return (React.createElement("g", { onMouseLeave: function (event) { return onMouseOut(event); } },
        pieData.map(function (datum) {
            var _a;
            var isHighlighted = highlightedSegment === datum.data.datum;
            var isDimmed = highlightedSegment !== null && !isHighlighted;
            var arcPath = arcFactory(datum) || undefined;
            var highlightedPath = highlightedArcFactory(datum) || undefined;
            return (React.createElement("g", { key: datum.data.index, onMouseDown: function (e) {
                    onMouseDown(datum.data);
                    e.preventDefault();
                }, onMouseOver: function () { return onMouseOver(datum.data); }, className: clsx(styles.segment, (_a = {},
                    _a[styles['segment--highlighted']] = isHighlighted,
                    _a[styles['segment--dimmed']] = isDimmed,
                    _a)), ref: isHighlighted ? focusedSegmentRef : undefined, "aria-label": "".concat(datum.data.datum.title, " (").concat(datum.data.datum.value, ")"), role: "button", "aria-roledescription": segmentAriaRoleDescription },
                React.createElement("path", { d: arcPath, fill: datum.data.color, className: styles.segment__path, "aria-hidden": "true" }),
                React.createElement("path", { d: highlightedPath, fill: datum.data.color, className: clsx(styles.segment__path, styles.segment__highlight), "aria-hidden": "true" })));
        }),
        React.createElement("circle", __assign({}, centroid, { ref: popoverTrackRef, r: "1", opacity: "0", "aria-hidden": "true" }))));
}
//# sourceMappingURL=segments.js.map