// A sufficiently small value.
// The Number.EPSILON is not available in the target ECMA version.
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
var EPSILON = 0.0000000000001;
// When x-domain is not set explicitly - guess it based on the available data.
export function computeDomainX(series) {
    var xValues = getXValues(series);
    if (xValues.length === 0) {
        return [];
    }
    // Assuming categorical domain.
    // In that case, all values are to be included.
    if (typeof xValues[0] === 'string') {
        return uniq(xValues);
    }
    // For non-categorical domain find min and max bounds.
    return xValues.reduce(function (_a, x) {
        var min = _a[0], max = _a[1];
        return [x < min ? x : min, max < x ? x : max];
    }, [xValues[0], xValues[0]]);
}
// When y-domain is not set explicitly - guess it based on the available data and series.
export function computeDomainY(series, scaleType) {
    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;
    // Find the min and max for threshold series.
    series.forEach(function (s) {
        if (s.type === 'threshold') {
            min = Math.min(min, s.y);
            max = Math.max(max, s.y);
        }
    });
    // Find the min and max for area series considering their stacking.
    getXValues(series).forEach(function (_, xIndex) {
        var _a;
        // Maintains the prev stack level.
        var stackY = scaleType === 'linear' ? 0 : EPSILON;
        for (var _i = 0, series_1 = series; _i < series_1.length; _i++) {
            var s = series_1[_i];
            if (s.type === 'area') {
                stackY = stackY + (((_a = s.data[xIndex]) === null || _a === void 0 ? void 0 : _a.y) || 0);
                min = Math.min(min, stackY);
                max = Math.max(max, stackY);
            }
        }
    });
    // If min/max is not overridden than either series or series data is empty.
    if (min === Number.POSITIVE_INFINITY) {
        return [];
    }
    // Log scales can't start from 0, so, if possible, start from 1.
    if (scaleType === 'log' && min === 0 && max > 1) {
        return [1, max];
    }
    return [min, max];
}
// For given data, series and scales, compute all points and group them as
// x:y, x:series and series:x to allow constant time access to the required point or subset.
export function computePlotPoints(series, xScale, yScale) {
    var xValues = getXValues(series);
    // Lookup for xy[xIndex][yIndex]
    var xy = [];
    // Lookup for xs[xIndex][seriesIndex]
    var xs = [];
    // Lookup for sx[seriesIndex][xIndex]
    var sx = [];
    // Filter out the data which is beyond the plot for whatever reason.
    getVisibleData(xValues, xScale).forEach(function (_a, xIndex) {
        var x = _a.x, scaledX = _a.scaledX;
        // Maintains the prev stack level. Starting from epsilon to not break log scales.
        var stackY = yScale.scaleType === 'linear' ? 0 : EPSILON;
        // A column of series points related to the same x.
        var points = [];
        // Collect the points, leaving y-index as 0 for now.
        series.forEach(function (s, sIndex) {
            var _a;
            if (s.type === 'threshold') {
                var scaledY = yScale.d3Scale(s.y) || 0;
                points.push({
                    x: x,
                    y0: s.y,
                    y1: s.y,
                    scaled: { x: scaledX, y0: scaledY, y1: scaledY },
                    index: { x: xIndex, s: sIndex, y: 0 },
                    value: 0
                });
            }
            else {
                var value = ((_a = s.data[xIndex]) === null || _a === void 0 ? void 0 : _a.y) || 0;
                var y0 = stackY;
                var y1 = stackY + value;
                points.push({
                    x: x,
                    y0: y0,
                    y1: y1,
                    scaled: { x: scaledX, y0: yScale.d3Scale(y0) || 0, y1: yScale.d3Scale(y1) || 0 },
                    index: { x: xIndex, s: sIndex, y: 0 },
                    value: value
                });
                stackY = y1;
            }
        });
        // Sort points by y and insert the missing y-index.
        points
            .sort(function (p1, p2) { return p1.y1 - p2.y1; })
            .forEach(function (point, index) {
            point.index.y = index;
            // Insert the points to the respective two-dimensional lookup arrays.
            insertIntoMatrix(xy, point.index.x, point.index.y, point);
            insertIntoMatrix(xs, point.index.x, point.index.s, point);
            insertIntoMatrix(sx, point.index.s, point.index.x, point);
        });
    });
    return { xy: xy, xs: xs, sx: sx };
}
// Finds the closest point in the sorted array.
export function findClosest(sortedArray, target, getter) {
    // The method guarantees to return a point hence empty arrays are not allowed.
    if (sortedArray.length === 0) {
        throw new Error('Invariant violation: array is empty.');
    }
    var isAscending = getter(sortedArray[0]) < getter(sortedArray[sortedArray.length - 1]);
    var compare = function (x) { return (isAscending ? getter(x) < target : getter(x) > target); };
    var delta = function (x) { return Math.abs(getter(x) - target); };
    // Use binary search to find the closest value in a sorted array.
    var lo = 0;
    var hi = sortedArray.length - 1;
    while (hi - lo > 1) {
        var mid = Math.floor((lo + hi) / 2);
        if (compare(sortedArray[mid])) {
            lo = mid;
        }
        else {
            hi = mid;
        }
    }
    return delta(sortedArray[lo]) < delta(sortedArray[hi]) ? sortedArray[lo] : sortedArray[hi];
}
// Returns given index if it is in range or the opposite range boundary otherwise.
export function circleIndex(index, _a) {
    var from = _a[0], to = _a[1];
    if (index < from) {
        return to;
    }
    if (index > to) {
        return from;
    }
    return index;
}
// Compares all x-values between series to ensure they are consistent.
export function isSeriesValid(series) {
    var _a;
    var sampleXValues = getXValues(series);
    for (var _i = 0, series_2 = series; _i < series_2.length; _i++) {
        var s = series_2[_i];
        if (s.type === 'area') {
            for (var i = 0; i < Math.max(s.data.length, sampleXValues.length); i++) {
                if (((_a = s.data[i]) === null || _a === void 0 ? void 0 : _a.x) !== sampleXValues[i]) {
                    return false;
                }
            }
        }
    }
    return true;
}
// Takes first area series x-values as all data x-values are to match across series.
function getXValues(series) {
    for (var _i = 0, series_3 = series; _i < series_3.length; _i++) {
        var s = series_3[_i];
        if (s.type === 'area') {
            return s.data.map(function (_a) {
                var x = _a.x;
                return x;
            });
        }
    }
    return [];
}
// Returns data that is visible in the given scale.
function getVisibleData(data, xScale) {
    var scaledOffsetX = xScale.isCategorical() ? Math.max(0, xScale.d3Scale.bandwidth() - 1) / 2 : 0;
    var visibleData = [];
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var x = data_1[_i];
        var scaledX = xScale.d3Scale(x);
        if (scaledX !== undefined) {
            visibleData.push({ x: x, scaledX: scaledX + scaledOffsetX });
        }
    }
    return visibleData;
}
// Inserts given value into a two-dimensional array.
function insertIntoMatrix(matrix, row, col, value) {
    if (!matrix[row]) {
        matrix[row] = [];
    }
    matrix[row][col] = value;
}
// Creates new array with only unique elements of the given array.
function uniq(arr) {
    var set = new Set();
    var uniqArray = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var value = arr_1[_i];
        if (!set.has(value)) {
            set.add(value);
            uniqArray.push(value);
        }
    }
    return uniqArray;
}
//# sourceMappingURL=utils.js.map