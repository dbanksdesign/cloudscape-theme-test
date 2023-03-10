"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrpDropdownWrapper = exports.SelectionModeSwitchWrapper = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var test_utils_1 = require("react-dom/test-utils");
var dom_1 = require("@cloudscape-design/test-utils-core/dom");
var styles_selectors_js_1 = require("../../../date-range-picker/styles.selectors.js");
var styles_selectors_js_2 = require("../../../date-range-picker/calendar/grids/styles.selectors.js");
var styles_selectors_js_3 = require("../../../date-range-picker/relative-range/styles.selectors.js");
var select_1 = require("../select");
var button_1 = require("../button");
var radio_group_1 = require("../radio-group");
var input_1 = require("../input");
var segmented_control_1 = require("../segmented-control");
var DateRangePickerWrapper = /** @class */ (function (_super) {
    __extends(DateRangePickerWrapper, _super);
    function DateRangePickerWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Alias for `findTrigger`
     * @deprecated
     */
    DateRangePickerWrapper.prototype.findLabel = function () {
        return this.findTrigger();
    };
    /**
     * Returns the trigger element that can be used to open the picker dropdown.
     */
    DateRangePickerWrapper.prototype.findTrigger = function () {
        return this.findByClassName(styles_selectors_js_1.default.label);
    };
    /**
     * @param options
     * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
     */
    DateRangePickerWrapper.prototype.findDropdown = function (options) {
        if (options === void 0) { options = { expandToViewport: false }; }
        var wrapper = options.expandToViewport ? (0, dom_1.createWrapper)() : this;
        return wrapper.findComponent(".".concat(styles_selectors_js_1.default.dropdown), DrpDropdownWrapper);
    };
    DateRangePickerWrapper.prototype.openDropdown = function () {
        var _this = this;
        (0, test_utils_1.act)(function () {
            _this.findTrigger().click();
        });
    };
    DateRangePickerWrapper.rootSelector = styles_selectors_js_1.default.root;
    __decorate([
        dom_1.usesDom
    ], DateRangePickerWrapper.prototype, "openDropdown", null);
    return DateRangePickerWrapper;
}(dom_1.ComponentWrapper));
exports.default = DateRangePickerWrapper;
var SelectionModeSwitchWrapper = /** @class */ (function (_super) {
    __extends(SelectionModeSwitchWrapper, _super);
    function SelectionModeSwitchWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns the mode selector as a SegmentedControl wrapper.
     *
     * The mode selector is only rendered as a SegmentedControl on wide viewports. On narrow viewports, use `findModesAsSelect()` instead.
     */
    SelectionModeSwitchWrapper.prototype.findModesAsSegments = function () {
        return new segmented_control_1.default(this.getElement());
    };
    /**
     * Returns the mode selector as a Select wrapper.
     * The mode selector is only rendered as a Select on narrow viewports. On wide viewports, use `findModesAsSegments()` instead.
     */
    SelectionModeSwitchWrapper.prototype.findModesAsSelect = function () {
        return new select_1.default(this.getElement());
    };
    return SelectionModeSwitchWrapper;
}(dom_1.ElementWrapper));
exports.SelectionModeSwitchWrapper = SelectionModeSwitchWrapper;
var DrpDropdownWrapper = /** @class */ (function (_super) {
    __extends(DrpDropdownWrapper, _super);
    function DrpDropdownWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrpDropdownWrapper.prototype.findSelectionModeSwitch = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['mode-switch']), SelectionModeSwitchWrapper);
    };
    DrpDropdownWrapper.prototype.findValidationError = function () {
        return this.findByClassName(styles_selectors_js_1.default['validation-error']);
    };
    // -- Relative mode --
    DrpDropdownWrapper.prototype.findRelativeRangeRadioGroup = function () {
        return this.findComponent(".".concat(styles_selectors_js_3.default['relative-range-radio-group']), radio_group_1.default);
    };
    DrpDropdownWrapper.prototype.findCustomRelativeRangeDuration = function () {
        return this.findComponent(".".concat(styles_selectors_js_3.default['custom-range-duration-input']), input_1.default);
    };
    DrpDropdownWrapper.prototype.findCustomRelativeRangeUnit = function () {
        return this.findComponent(".".concat(styles_selectors_js_3.default['custom-range-unit-select']), select_1.default);
    };
    // -- Absolute mode --
    DrpDropdownWrapper.prototype.findHeader = function () {
        return this.findByClassName(styles_selectors_js_1.default['calendar-header']);
    };
    DrpDropdownWrapper.prototype.findPreviousMonthButton = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['calendar-prev-month-btn']), button_1.default);
    };
    DrpDropdownWrapper.prototype.findNextMonthButton = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['calendar-next-month-btn']), button_1.default);
    };
    /**
     * Returns a day container on the calendar.
     *
     * @param grid the calendar grid. If only one calendar grid is visible (on small screens), use `'right'`.
     * @param row 1-based row index of the day.
     * @param column 1-based column index of the day.
     */
    DrpDropdownWrapper.prototype.findDateAt = function (grid, row, column) {
        var gridClassName = grid === 'right' ? styles_selectors_js_1.default['second-grid'] : styles_selectors_js_1.default['first-grid'];
        return this.find(".".concat(gridClassName, " .").concat(styles_selectors_js_2.default.week, ":nth-child(").concat(row, ") .").concat(styles_selectors_js_2.default.day, ":nth-child(").concat(column, ")"));
    };
    DrpDropdownWrapper.prototype.findSelectedStartDate = function () {
        return this.findByClassName(styles_selectors_js_2.default['start-date']);
    };
    DrpDropdownWrapper.prototype.findSelectedEndDate = function () {
        return this.findByClassName(styles_selectors_js_2.default['end-date']);
    };
    DrpDropdownWrapper.prototype.findStartDateInput = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['start-date-input']), input_1.default);
    };
    DrpDropdownWrapper.prototype.findStartTimeInput = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['start-time-input']), input_1.default);
    };
    DrpDropdownWrapper.prototype.findEndDateInput = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['end-date-input']), input_1.default);
    };
    DrpDropdownWrapper.prototype.findEndTimeInput = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['end-time-input']), input_1.default);
    };
    // -- Footer --
    DrpDropdownWrapper.prototype.findClearButton = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['clear-button']), button_1.default);
    };
    DrpDropdownWrapper.prototype.findCancelButton = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['cancel-button']), button_1.default);
    };
    DrpDropdownWrapper.prototype.findApplyButton = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['apply-button']), button_1.default);
    };
    return DrpDropdownWrapper;
}(dom_1.ComponentWrapper));
exports.DrpDropdownWrapper = DrpDropdownWrapper;
//# sourceMappingURL=index.js.map