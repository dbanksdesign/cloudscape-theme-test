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
var button_1 = require("../button");
var checkbox_1 = require("../checkbox");
var modal_1 = require("../modal");
var visible_content_preference_1 = require("./visible-content-preference");
var page_size_preference_1 = require("./page-size-preference");
var styles_selectors_js_1 = require("../../../collection-preferences/styles.selectors.js");
var PreferencesModalWrapper = /** @class */ (function (_super) {
    __extends(PreferencesModalWrapper, _super);
    function PreferencesModalWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreferencesModalWrapper.prototype.findCancelButton = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['cancel-button']), button_1.default);
    };
    PreferencesModalWrapper.prototype.findConfirmButton = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['confirm-button']), button_1.default);
    };
    PreferencesModalWrapper.prototype.findWrapLinesPreference = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['wrap-lines']), checkbox_1.default);
    };
    PreferencesModalWrapper.prototype.findStripedRowsPreference = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['striped-rows']), checkbox_1.default);
    };
    PreferencesModalWrapper.prototype.findPageSizePreference = function () {
        return this.findComponent(".".concat(page_size_preference_1.default.rootSelector), page_size_preference_1.default);
    };
    PreferencesModalWrapper.prototype.findVisibleContentPreference = function () {
        return this.findComponent(".".concat(visible_content_preference_1.default.rootSelector), visible_content_preference_1.default);
    };
    PreferencesModalWrapper.prototype.findCustomPreference = function () {
        return this.findByClassName(styles_selectors_js_1.default.custom);
    };
    PreferencesModalWrapper.rootSelector = styles_selectors_js_1.default['modal-root'];
    return PreferencesModalWrapper;
}(modal_1.default));
var CollectionPreferencesWrapper = /** @class */ (function (_super) {
    __extends(CollectionPreferencesWrapper, _super);
    function CollectionPreferencesWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollectionPreferencesWrapper.prototype.findModal = function () {
        return (0, selectors_1.createWrapper)().findComponent(".".concat(styles_selectors_js_1.default['modal-root']), PreferencesModalWrapper);
    };
    CollectionPreferencesWrapper.prototype.findTriggerButton = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['trigger-button']), button_1.default);
    };
    CollectionPreferencesWrapper.rootSelector = styles_selectors_js_1.default.root;
    return CollectionPreferencesWrapper;
}(selectors_1.ComponentWrapper));
exports.default = CollectionPreferencesWrapper;
//# sourceMappingURL=index.js.map