// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { scaleLinear, scaleLog, scaleTime, scaleBand, } from '../../vendor/d3-scale';
function isNumericDomain(domain) {
    return domain.length > 0 && typeof domain[0] === 'number';
}
function isDateDomain(domain) {
    return domain.length > 0 && domain[0] instanceof Date;
}
function createNumericScale(type, domain) {
    var scale;
    switch (type) {
        case 'log':
            scale = scaleLog();
            break;
        default:
            scale = scaleLinear();
    }
    if (isNumericDomain(domain)) {
        scale.domain(domain);
    }
    return scale;
}
function createTimeScale(domain) {
    var scale = scaleTime();
    if (isDateDomain(domain)) {
        scale.domain(domain);
    }
    return scale;
}
function createBandScale(domain) {
    var scale = scaleBand().padding(0.1);
    scale.domain(domain);
    return scale;
}
export function createScale(type, domain, range) {
    switch (type) {
        case 'linear':
        case 'log':
            return { type: 'numeric', scale: createNumericScale(type, domain).range(range) };
        case 'time':
            return { type: 'time', scale: createTimeScale(domain).range(range) };
        case 'categorical':
            return { type: 'categorical', scale: createBandScale(domain).range(range) };
    }
}
var ChartScale = /** @class */ (function () {
    function ChartScale(scaleType, domain, range, noCategoricalOuterPadding) {
        if (noCategoricalOuterPadding === void 0) { noCategoricalOuterPadding = false; }
        this.scaleType = scaleType;
        this.domain = domain;
        this.range = range;
        this.scale = createScale(this.scaleType, this.domain, this.range);
        this.d3Scale = this.scale.scale;
        if (this.isCategorical()) {
            if (noCategoricalOuterPadding) {
                // Categorical charts with only line (or threshold) series don't need as much out padding
                // compared to a bar series. Increasing the inner padding to push more data points to the outside.
                this.d3Scale.paddingInner(0.7);
                this.d3Scale.paddingOuter(0);
            }
            else {
                this.d3Scale.paddingInner(0.2);
                this.d3Scale.paddingOuter(0.05);
            }
        }
    }
    ChartScale.prototype.cloneScale = function (newScaleType, newDomain, newRange) {
        return new ChartScale(newScaleType || this.scaleType, newDomain || this.domain, newRange || this.range);
    };
    ChartScale.prototype.isNumeric = function () {
        return this.scale.type === 'numeric';
    };
    ChartScale.prototype.isTime = function () {
        return this.scale.type === 'time';
    };
    ChartScale.prototype.isCategorical = function () {
        return this.scale.type === 'categorical';
    };
    return ChartScale;
}());
export { ChartScale };
var NumericChartScale = /** @class */ (function () {
    function NumericChartScale(scaleType, domain, range, adjustDomain) {
        this.scaleType = scaleType;
        var scale = createNumericScale(scaleType, domain).range(range);
        if (adjustDomain !== null) {
            scale.nice(adjustDomain);
        }
        this.scale = { type: 'numeric', scale: scale };
        this.d3Scale = this.scale.scale;
    }
    NumericChartScale.prototype.isCategorical = function () {
        return false;
    };
    return NumericChartScale;
}());
export { NumericChartScale };
//# sourceMappingURL=scales.js.map