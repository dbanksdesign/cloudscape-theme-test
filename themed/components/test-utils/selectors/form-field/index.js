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
var styles_selectors_js_1 = require("../../../form-field/styles.selectors.js");
var FormFieldWrapper = /** @class */ (function (_super) {
    __extends(FormFieldWrapper, _super);
    function FormFieldWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormFieldWrapper.prototype.findControl = function () {
        return this.findByClassName(styles_selectors_js_1.default.control);
    };
    FormFieldWrapper.prototype.findLabel = function () {
        return this.findByClassName(styles_selectors_js_1.default.label);
    };
    FormFieldWrapper.prototype.findInfo = function () {
        return this.findByClassName(styles_selectors_js_1.default.info);
    };
    FormFieldWrapper.prototype.findConstraint = function () {
        return this.find(":scope > .".concat(styles_selectors_js_1.default.hints, " .").concat(styles_selectors_js_1.default.constraint));
    };
    FormFieldWrapper.prototype.findError = function () {
        return this.find(":scope > .".concat(styles_selectors_js_1.default.hints, " .").concat(styles_selectors_js_1.default.error, " .").concat(styles_selectors_js_1.default.error__message));
    };
    FormFieldWrapper.prototype.findDescription = function () {
        return this.findByClassName(styles_selectors_js_1.default.description);
    };
    FormFieldWrapper.prototype.findSecondaryControl = function () {
        return this.findByClassName(styles_selectors_js_1.default['secondary-control']);
    };
    FormFieldWrapper.rootSelector = styles_selectors_js_1.default.root;
    return FormFieldWrapper;
}(selectors_1.ComponentWrapper));
exports.default = FormFieldWrapper;
//# sourceMappingURL=index.js.map