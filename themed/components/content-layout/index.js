import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import clsx from 'clsx';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import { getBaseProps } from '../internal/base-component';
import { useAppLayoutContext } from '../internal/context/app-layout-context';
import useBaseComponent from '../internal/hooks/use-base-component';
import { useDynamicOverlap } from '../internal/hooks/use-dynamic-overlap';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import styles from './styles.css.js';
export default function ContentLayout(_a) {
    var _b, _c, _d;
    var children = _a.children, disableOverlap = _a.disableOverlap, header = _a.header, rest = __rest(_a, ["children", "disableOverlap", "header"]);
    var baseProps = getBaseProps(rest);
    var hasBreadcrumbs = useAppLayoutContext().hasBreadcrumbs;
    var rootElement = useRef(null);
    var __internalRootRef = useBaseComponent('ContentLayout').__internalRootRef;
    var mergedRef = useMergeRefs(rootElement, __internalRootRef);
    var overlapElement = useDynamicOverlap();
    var isVisualRefresh = useVisualRefresh();
    /**
     * Disable the overlap if the component is missing either a header or child
     * content. If the component is not using visual refresh then the overlap
     * will not be displayed at all. This is handled in the CSS not the JavaScript.
     */
    var isOverlapDisabled = !children || !header || disableOverlap;
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(baseProps.className, styles.layout, (_b = {},
            _b[styles['is-overlap-disabled']] = isOverlapDisabled,
            _b[styles['is-visual-refresh']] = isVisualRefresh,
            _b)), ref: mergedRef }),
        React.createElement("div", { className: clsx(styles.background, (_c = {}, _c[styles['is-overlap-disabled']] = isOverlapDisabled, _c), 'awsui-context-content-header'), ref: overlapElement }),
        header && (React.createElement("div", { className: clsx(styles.header, (_d = {}, _d[styles['has-breadcrumbs']] = isVisualRefresh && hasBreadcrumbs, _d), 'awsui-context-content-header') }, header)),
        React.createElement("div", { className: styles.content }, children)));
}
applyDisplayName(ContentLayout, 'ContentLayout');
//# sourceMappingURL=index.js.map