import { __assign, __extends } from "tslib";
import AsyncStore from './async-store';
var initialState = Object.freeze({
    highlightedX: null,
    highlightedPoint: null,
    highlightedSeries: null,
    legendSeries: null,
    isPopoverPinned: false
});
var InteractionsStore = /** @class */ (function (_super) {
    __extends(InteractionsStore, _super);
    function InteractionsStore(series, plot) {
        var _this = _super.call(this, initialState) || this;
        _this.series = series;
        _this.plot = plot;
        return _this;
    }
    InteractionsStore.prototype.highlightPoint = function (point) {
        var _this = this;
        this.set(function (state) { return (__assign(__assign({}, state), { highlightedX: _this.plot.xy[point.index.x], highlightedPoint: point, highlightedSeries: _this.series[point.index.s], legendSeries: _this.series[point.index.s] })); });
    };
    InteractionsStore.prototype.highlightX = function (points) {
        this.set(function (state) { return (__assign(__assign({}, state), { highlightedX: points, highlightedPoint: null, highlightedSeries: null, legendSeries: null })); });
    };
    InteractionsStore.prototype.highlightFirstPoint = function () {
        var _this = this;
        this.set(function (state) {
            var series = state.legendSeries || state.highlightedSeries;
            var firstSeriesPoint = series && _this._getFirstSeriesPoint(series);
            var point = state.highlightedPoint || firstSeriesPoint || _this.plot.sx[0][0];
            return __assign(__assign({}, state), { highlightedX: _this.plot.xy[point.index.x], highlightedPoint: point, highlightedSeries: _this.series[point.index.s], legendSeries: _this.series[point.index.s] });
        });
    };
    InteractionsStore.prototype.highlightSeries = function (s) {
        this.set(function (state) { return (__assign(__assign({}, state), { highlightedSeries: s, legendSeries: s })); });
    };
    InteractionsStore.prototype.clearHighlight = function () {
        this.set(function (state) { return (__assign(__assign({}, state), { highlightedX: null, highlightedPoint: null, highlightedSeries: null })); });
    };
    InteractionsStore.prototype.clearHighlightedLegend = function () {
        this.set(function (state) { return (__assign(__assign({}, state), { legendSeries: null })); });
    };
    InteractionsStore.prototype.clearState = function () {
        this.set(function () { return initialState; });
    };
    InteractionsStore.prototype.pinPopover = function () {
        this.set(function (state) { return (__assign(__assign({}, state), { isPopoverPinned: true })); });
    };
    InteractionsStore.prototype.unpinPopover = function () {
        this.set(function (state) { return (__assign(__assign({}, state), { isPopoverPinned: false })); });
    };
    InteractionsStore.prototype.togglePopoverPin = function () {
        this.set(function (state) { return (__assign(__assign({}, state), { isPopoverPinned: !state.isPopoverPinned })); });
    };
    InteractionsStore.prototype._getFirstSeriesPoint = function (s) {
        var seriesIndex = this.series.indexOf(s);
        var firstSeriesPoint = (this.plot.sx[seriesIndex] || [])[0];
        return firstSeriesPoint || null;
    };
    return InteractionsStore;
}(AsyncStore));
export default InteractionsStore;
//# sourceMappingURL=interactions-store.js.map