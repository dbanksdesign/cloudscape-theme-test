// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __spreadArray } from "tslib";
import { isDataSeries, isXThreshold, isYThreshold, matchesX } from './utils';
export function computeDomainX(series, xScaleType) {
    if (xScaleType === 'categorical') {
        return series.reduce(function (acc, s) {
            if (isDataSeries(s.series)) {
                s.series.data.forEach(function (_a) {
                    var x = _a.x;
                    if (acc.indexOf(x) === -1) {
                        acc.push(x);
                    }
                });
            }
            if (isXThreshold(s.series)) {
                if (acc.indexOf(s.series.x) === -1) {
                    acc.push(s.series.x);
                }
            }
            return acc;
        }, []);
    }
    return series.reduce(function (acc, curr) {
        // Y-thresholds don't have X value.
        if (isYThreshold(curr.series)) {
            return acc;
        }
        // Compare x-threshold X with current min, max.
        if (isXThreshold(curr.series)) {
            var min = acc[0], max = acc[1];
            var newMin = min === undefined || min === null || curr.series.x < min ? curr.series.x : min;
            var newMax = max === undefined || max === null || max < curr.series.x ? curr.series.x : max;
            return [newMin, newMax];
        }
        // Compare all series X values with current min, max.
        if (isDataSeries(curr.series)) {
            return curr.series.data.reduce(function (_a, _b) {
                var min = _a[0], max = _a[1];
                var x = _b.x;
                var newMin = min === undefined || min === null || x < min ? x : min;
                var newMax = max === undefined || max === null || max < x ? x : max;
                return [newMin, newMax];
            }, acc);
        }
        return acc;
    }, []);
}
function find(arr, func) {
    for (var i = 0; i < arr.length; i++) {
        var found = func(arr[i]);
        if (found) {
            return arr[i];
        }
    }
    return null;
}
export function computeDomainY(series, scaleType, stackedBars) {
    var _series = series;
    // For stacked bars, we need to accumulate all the bar series into a positive and a negative series
    if (stackedBars) {
        var _a = series.reduce(function (acc, curr) {
            if (curr.series.type === 'bar') {
                curr.series.data.forEach(function (_a) {
                    var x = _a.x, y = _a.y;
                    var data = y < 0 ? acc.negativeData : acc.positiveData;
                    var stackedDatum = find(data, function (el) { return matchesX(el.x, x); });
                    if (stackedDatum) {
                        stackedDatum.y += y;
                    }
                    else {
                        data.push({ x: x, y: y });
                    }
                    return acc;
                });
            }
            return acc;
        }, {
            positiveData: [],
            negativeData: []
        }), positiveData = _a.positiveData, negativeData = _a.negativeData;
        // Artificial series with the sum of all bars when stacked
        var stackedSeries = [
            {
                color: '',
                index: NaN,
                series: {
                    type: 'bar',
                    title: 'positive',
                    data: positiveData
                }
            },
            {
                color: '',
                index: NaN,
                series: {
                    type: 'bar',
                    title: 'negative',
                    data: negativeData
                }
            },
        ];
        // MixedLineBarChart can also contain other non-bar series,
        // so we replace all bars with the artificial bar series
        // Then proceed to compute range with it and the remaining (non-bar) series
        _series = __spreadArray(__spreadArray([], stackedSeries, true), _series.filter(function (s) { return s.series.type !== 'bar'; }), true);
    }
    var domain = _series.reduce(function (acc, curr) {
        // Compare threshold Y value with current min, max.
        if (isYThreshold(curr.series)) {
            var min = acc[0], max = acc[1];
            var newMin = min === undefined || curr.series.y < min ? curr.series.y : min;
            var newMax = max === undefined || max < curr.series.y ? curr.series.y : max;
            return [newMin, newMax];
        }
        // X-thresholds don't have Y value.
        if (isXThreshold(curr.series)) {
            return acc;
        }
        // Compare all series Y values with current min, max.
        if (isDataSeries(curr.series)) {
            return curr.series.data.reduce(function (_a, _b) {
                var min = _a[0], max = _a[1];
                var y = _b.y;
                var newMin = min === undefined || y < min ? y : min;
                var newMax = max === undefined || max < y ? y : max;
                return [newMin, newMax];
            }, acc);
        }
        return acc;
    }, [0, 0]);
    // Log scales can't start from 0, so if possible, start from 1.
    if (scaleType === 'log' && domain[0] === 0 && domain[1] > 1) {
        return [1, domain[1]];
    }
    return domain;
}
//# sourceMappingURL=domain.js.map