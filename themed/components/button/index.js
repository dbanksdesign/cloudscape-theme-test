import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { getBaseProps } from '../internal/base-component';
import { InternalButton } from './internal';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import useBaseComponent from '../internal/hooks/use-base-component';
var Button = React.forwardRef(function (_a, ref) {
    var children = _a.children, iconName = _a.iconName, _b = _a.iconAlign, iconAlign = _b === void 0 ? 'left' : _b, iconUrl = _a.iconUrl, iconSvg = _a.iconSvg, iconAlt = _a.iconAlt, _c = _a.variant, variant = _c === void 0 ? 'normal' : _c, _d = _a.loading, loading = _d === void 0 ? false : _d, loadingText = _a.loadingText, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.wrapText, wrapText = _f === void 0 ? true : _f, href = _a.href, target = _a.target, download = _a.download, _g = _a.formAction, formAction = _g === void 0 ? 'submit' : _g, ariaLabel = _a.ariaLabel, onClick = _a.onClick, onFollow = _a.onFollow, ariaExpanded = _a.ariaExpanded, props = __rest(_a, ["children", "iconName", "iconAlign", "iconUrl", "iconSvg", "iconAlt", "variant", "loading", "loadingText", "disabled", "wrapText", "href", "target", "download", "formAction", "ariaLabel", "onClick", "onFollow", "ariaExpanded"]);
    var baseComponentProps = useBaseComponent('Button');
    var baseProps = getBaseProps(props);
    return (React.createElement(InternalButton, __assign({}, baseProps, baseComponentProps, { ref: ref, iconName: iconName, iconAlign: iconAlign, iconUrl: iconUrl, iconSvg: iconSvg, iconAlt: iconAlt, variant: variant, loading: loading, loadingText: loadingText, disabled: disabled, wrapText: wrapText, href: href, target: target, download: download, formAction: formAction, ariaLabel: ariaLabel, onClick: onClick, onFollow: onFollow, ariaExpanded: ariaExpanded }), children));
});
applyDisplayName(Button, 'Button');
export default Button;
//# sourceMappingURL=index.js.map