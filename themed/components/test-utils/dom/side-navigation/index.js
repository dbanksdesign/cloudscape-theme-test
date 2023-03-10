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
exports.SideNavigationItemWrapper = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var dom_1 = require("@cloudscape-design/test-utils-core/dom");
var expandable_section_1 = require("../expandable-section");
var styles_selectors_js_1 = require("../../../side-navigation/styles.selectors.js");
var SideNavigationWrapper = /** @class */ (function (_super) {
    __extends(SideNavigationWrapper, _super);
    function SideNavigationWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SideNavigationWrapper.prototype.findHeader = function () {
        return this.findByClassName(styles_selectors_js_1.default.header);
    };
    SideNavigationWrapper.prototype.findHeaderLink = function () {
        return this.findByClassName(styles_selectors_js_1.default['header-link']);
    };
    SideNavigationWrapper.prototype.findLinkByHref = function (href) {
        return this.find(".".concat(styles_selectors_js_1.default.link, "[href=\"").concat(href, "\"]"));
    };
    SideNavigationWrapper.prototype.findActiveLink = function () {
        return this.findByClassName(styles_selectors_js_1.default['link-active']);
    };
    SideNavigationWrapper.prototype.findItemByIndex = function (index) {
        return this.findComponent(".".concat(styles_selectors_js_1.default['list-variant-root'], " > li:nth-child(").concat(index, ")"), SideNavigationItemWrapper);
    };
    SideNavigationWrapper.rootSelector = styles_selectors_js_1.default.root;
    return SideNavigationWrapper;
}(dom_1.ComponentWrapper));
exports.default = SideNavigationWrapper;
var SideNavigationItemWrapper = /** @class */ (function (_super) {
    __extends(SideNavigationItemWrapper, _super);
    function SideNavigationItemWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SideNavigationItemWrapper.prototype.findSection = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default.section), expandable_section_1.default);
    };
    SideNavigationItemWrapper.prototype.findSectionGroup = function () {
        return this.findByClassName(styles_selectors_js_1.default['section-group']);
    };
    SideNavigationItemWrapper.prototype.findSectionGroupTitle = function () {
        return this.findByClassName(styles_selectors_js_1.default['section-group-title']);
    };
    SideNavigationItemWrapper.prototype.findExpandableLinkGroup = function () {
        return this.findComponent(".".concat(styles_selectors_js_1.default['expandable-link-group']), expandable_section_1.default);
    };
    SideNavigationItemWrapper.prototype.findDivider = function () {
        return this.findByClassName(styles_selectors_js_1.default.divider);
    };
    SideNavigationItemWrapper.prototype.findLink = function () {
        return this.findByClassName(styles_selectors_js_1.default.link);
    };
    SideNavigationItemWrapper.prototype.findSectionTitle = function () {
        var _a, _b;
        return (_b = (_a = this.findSection()) === null || _a === void 0 ? void 0 : _a.findHeader()) !== null && _b !== void 0 ? _b : null;
    };
    SideNavigationItemWrapper.prototype.findItemByIndex = function (index) {
        return this.findComponent("li:nth-child(".concat(index, ")"), SideNavigationItemWrapper);
    };
    SideNavigationItemWrapper.prototype.findItems = function () {
        return this.findAll('li').map(function (wrapper) { return new SideNavigationItemWrapper(wrapper.getElement()); });
    };
    return SideNavigationItemWrapper;
}(dom_1.ElementWrapper));
exports.SideNavigationItemWrapper = SideNavigationItemWrapper;
//# sourceMappingURL=index.js.map