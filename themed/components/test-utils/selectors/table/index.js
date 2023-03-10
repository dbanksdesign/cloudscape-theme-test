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
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var selectors_1 = require("@cloudscape-design/test-utils-core/selectors");
var styles_selectors_js_1 = require("../../../table/styles.selectors.js");
var styles_selectors_js_2 = require("../../../table/header-cell/styles.selectors.js");
var styles_selectors_js_3 = require("../../../table/body-cell/styles.selectors.js");
var styles_selectors_js_4 = require("../../../table/selection-control/styles.selectors.js");
var styles_selectors_js_5 = require("../../../table/resizer/styles.selectors.js");
var collection_preferences_1 = require("../collection-preferences");
var container_1 = require("../container");
var pagination_1 = require("../pagination");
var text_filter_1 = require("../text-filter");
var TableWrapper = /** @class */ (function (_super) {
    __extends(TableWrapper, _super);
    function TableWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.containerWrapper = new container_1.default(_this.getElement());
        return _this;
    }
    TableWrapper.prototype.findNativeTable = function () {
        return this.find(".".concat(styles_selectors_js_1.default.wrapper, " > .").concat(styles_selectors_js_1.default.table));
    };
    TableWrapper.prototype.findActiveTHead = function () {
        return this.findByClassName(styles_selectors_js_1.default['thead-active']);
    };
    TableWrapper.prototype.findHeaderSlot = function () {
        return this.findByClassName(styles_selectors_js_1.default['header-controls']);
    };
    /**
     * Alias for findHeader method for compatibility with previous versions
     * @deprecated
     */
    TableWrapper.prototype.findHeaderRegion = function () {
        return this.findHeaderSlot();
    };
    TableWrapper.prototype.findFooterSlot = function () {
        return this.containerWrapper.findFooter();
    };
    TableWrapper.prototype.findColumnHeaders = function () {
        return this.findActiveTHead().findAll('tr > *');
    };
    /**
     * Returns the element the user clicks when resizing a column.
     *
     * @param columnIndex 1-based index of the column containing the resizer.
     */
    TableWrapper.prototype.findColumnResizer = function (columnIndex) {
        return this.findActiveTHead().find("th:nth-child(".concat(columnIndex, ") .").concat(styles_selectors_js_5.default.resizer));
    };
    /**
     * Returns a table cell based on given row and column indices.
     *
     * @param rowIndex 1-based index of the row of the cell to select.
     * @param columnIndex 1-based index of the column of the cell to select.
     */
    TableWrapper.prototype.findBodyCell = function (rowIndex, columnIndex) {
        return this.findNativeTable().find("tbody tr:nth-child(".concat(rowIndex, ") td:nth-child(").concat(columnIndex, ")"));
    };
    TableWrapper.prototype.findRows = function () {
        return this.findNativeTable().findAllByClassName(styles_selectors_js_1.default.row);
    };
    TableWrapper.prototype.findSelectedRows = function () {
        return this.findAllByClassName(styles_selectors_js_1.default['row-selected']);
    };
    /**
     * Alias for findEmptySlot method for compatibility with previous versions
     * @deprecated
     */
    TableWrapper.prototype.findEmptyRegion = function () {
        return this.findEmptySlot();
    };
    TableWrapper.prototype.findEmptySlot = function () {
        return this.findByClassName(styles_selectors_js_1.default.empty);
    };
    TableWrapper.prototype.findLoadingText = function () {
        return this.findByClassName(styles_selectors_js_1.default.loading);
    };
    TableWrapper.prototype.findColumnSortingArea = function (colIndex) {
        return this.findActiveTHead().find("tr > *:nth-child(".concat(colIndex, ") [role=button]"));
    };
    /**
     * Returns the column that is used for ascending sorting.
     */
    TableWrapper.prototype.findAscSortedColumn = function () {
        return this.findNativeTable().findByClassName(styles_selectors_js_2.default['header-cell-ascending']);
    };
    /**
     * Returns the column that is used for descending sorting.
     */
    TableWrapper.prototype.findDescSortedColumn = function () {
        return this.findNativeTable().findByClassName(styles_selectors_js_2.default['header-cell-descending']);
    };
    /**
     * Returns a row selection area for a given index.
     *
     * @param rowIndex 1-based index of the row selection area to return.
     */
    TableWrapper.prototype.findRowSelectionArea = function (rowIndex) {
        return this.findNativeTable().find("tbody tr:nth-child(".concat(rowIndex, ") .").concat(styles_selectors_js_4.default.root));
    };
    TableWrapper.prototype.findSelectAllTrigger = function () {
        return this.findActiveTHead().find(".".concat(styles_selectors_js_4.default.root));
    };
    TableWrapper.prototype.findTextFilter = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['tools-filtering']), text_filter_1.default);
    };
    //
    // findPropertyFiltering(): TablePropertyFilteringWrapper {
    //   return new TablePropertyFilteringWrapper(this.find('awsui-table-property-filtering').getElement());
    // }
    //
    TableWrapper.prototype.findCollectionPreferences = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['tools-preferences']), collection_preferences_1.default);
    };
    TableWrapper.prototype.findPagination = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['tools-pagination']), pagination_1.default);
    };
    TableWrapper.prototype.findEditingCell = function () {
        return this.findNativeTable().findByClassName(styles_selectors_js_3.default['body-cell-edit-active']);
    };
    TableWrapper.prototype._findEditingCellControls = function () {
        var _a, _b;
        return (_b = (_a = this.findEditingCell()) === null || _a === void 0 ? void 0 : _a.findByClassName(styles_selectors_js_3.default['body-cell-editor-controls'])) !== null && _b !== void 0 ? _b : null;
    };
    TableWrapper.prototype.findEditingCellSaveButton = function () {
        var _a, _b;
        return (_b = (_a = this._findEditingCellControls()) === null || _a === void 0 ? void 0 : _a.find('button[type="submit"]')) !== null && _b !== void 0 ? _b : null;
    };
    TableWrapper.prototype.findEditingCellCancelButton = function () {
        var _a, _b;
        return (_b = (_a = this._findEditingCellControls()) === null || _a === void 0 ? void 0 : _a.find('button:first-child')) !== null && _b !== void 0 ? _b : null;
    };
    TableWrapper.rootSelector = styles_selectors_js_1.default.root;
    return TableWrapper;
}(selectors_1.ComponentWrapper));
exports.default = TableWrapper;
//# sourceMappingURL=index.js.map