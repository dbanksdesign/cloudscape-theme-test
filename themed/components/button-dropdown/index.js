import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import InternalButtonDropdown from './internal';
import { getBaseProps } from '../internal/base-component';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import useBaseComponent from '../internal/hooks/use-base-component';
var ButtonDropdown = React.forwardRef(function (_a, ref) {
    var items = _a.items, _b = _a.variant, variant = _b === void 0 ? 'normal' : _b, _c = _a.loading, loading = _c === void 0 ? false : _c, loadingText = _a.loadingText, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.expandableGroups, expandableGroups = _e === void 0 ? false : _e, _f = _a.expandToViewport, expandToViewport = _f === void 0 ? false : _f, ariaLabel = _a.ariaLabel, children = _a.children, onItemClick = _a.onItemClick, onItemFollow = _a.onItemFollow, props = __rest(_a, ["items", "variant", "loading", "loadingText", "disabled", "expandableGroups", "expandToViewport", "ariaLabel", "children", "onItemClick", "onItemFollow"]);
    var baseComponentProps = useBaseComponent('ButtonDropdown');
    var baseProps = getBaseProps(props);
    return (React.createElement(InternalButtonDropdown, __assign({}, baseProps, baseComponentProps, { ref: ref, items: items, variant: variant, loading: loading, loadingText: loadingText, disabled: disabled, expandableGroups: expandableGroups, expandToViewport: expandToViewport, ariaLabel: ariaLabel, onItemClick: onItemClick, onItemFollow: onItemFollow }), children));
});
applyDisplayName(ButtonDropdown, 'ButtonDropdown');
export default ButtonDropdown;
//# sourceMappingURL=index.js.map