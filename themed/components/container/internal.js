import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { getBaseProps } from '../internal/base-component';
import { useAppLayoutContext } from '../internal/context/app-layout-context';
import { StickyHeaderContext, useStickyHeader } from './use-sticky-header';
import { useDynamicOverlap } from '../internal/hooks/use-dynamic-overlap';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import styles from './styles.css.js';
export default function InternalContainer(_a) {
    var _b, _c, _d;
    var header = _a.header, footer = _a.footer, children = _a.children, _e = _a.variant, variant = _e === void 0 ? 'default' : _e, _f = _a.disableHeaderPaddings, disableHeaderPaddings = _f === void 0 ? false : _f, _g = _a.disableContentPaddings, disableContentPaddings = _g === void 0 ? false : _g, fitHeight = _a.fitHeight, __stickyOffset = _a.__stickyOffset, _h = _a.__stickyHeader, __stickyHeader = _h === void 0 ? false : _h, _j = _a.__internalRootRef, __internalRootRef = _j === void 0 ? null : _j, _k = _a.__disableFooterDivider, __disableFooterDivider = _k === void 0 ? false : _k, _l = _a.__disableFooterPaddings, __disableFooterPaddings = _l === void 0 ? false : _l, _m = _a.__hiddenContent, __hiddenContent = _m === void 0 ? false : _m, __headerRef = _a.__headerRef, __headerId = _a.__headerId, _o = _a.__darkHeader, __darkHeader = _o === void 0 ? false : _o, restProps = __rest(_a, ["header", "footer", "children", "variant", "disableHeaderPaddings", "disableContentPaddings", "fitHeight", "__stickyOffset", "__stickyHeader", "__internalRootRef", "__disableFooterDivider", "__disableFooterPaddings", "__hiddenContent", "__headerRef", "__headerId", "__darkHeader"]);
    var baseProps = getBaseProps(restProps);
    var rootRef = useRef(null);
    var headerRef = useRef(null);
    var _p = useStickyHeader(rootRef, headerRef, __stickyHeader, __stickyOffset), isSticky = _p.isSticky, isStuck = _p.isStuck, stickyStyles = _p.stickyStyles;
    var setHasStickyBackground = useAppLayoutContext().setHasStickyBackground;
    var isRefresh = useVisualRefresh();
    var hasDynamicHeight = isRefresh && variant === 'full-page';
    var overlapElement = useDynamicOverlap({ disabled: !hasDynamicHeight || !__darkHeader });
    var mergedRef = useMergeRefs(rootRef, __internalRootRef);
    var headerMergedRef = useMergeRefs(headerRef, overlapElement, __headerRef);
    var headerIdProp = __headerId ? { id: __headerId } : {};
    /**
     * The visual refresh AppLayout component needs to know if a child component
     * has a high contrast sticky header. This is to make sure the background element
     * stays in the same vertical position as the header content.
     */
    useEffect(function () {
        var shouldUpdateStickyBackground = isSticky && variant === 'full-page' && setHasStickyBackground;
        if (shouldUpdateStickyBackground) {
            setHasStickyBackground(true);
        }
        return function () {
            if (shouldUpdateStickyBackground) {
                setHasStickyBackground(false);
            }
        };
    }, [isSticky, setHasStickyBackground, variant]);
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(baseProps.className, styles.root, styles["variant-".concat(variant)], fitHeight && styles['root-fit-height']), ref: mergedRef }),
        header && (React.createElement(StickyHeaderContext.Provider, { value: { isStuck: isStuck } },
            React.createElement("div", __assign({ className: clsx(styles.header, styles["header-variant-".concat(variant)], (_b = {},
                    _b[styles['header-sticky-disabled']] = __stickyHeader && !isSticky,
                    _b[styles['header-sticky-enabled']] = isSticky,
                    _b[styles['header-dynamic-height']] = hasDynamicHeight,
                    _b[styles['header-stuck']] = isStuck,
                    _b[styles['with-paddings']] = !disableHeaderPaddings,
                    _b[styles['with-hidden-content']] = !children || __hiddenContent,
                    _b)) }, headerIdProp, stickyStyles, { ref: headerMergedRef }), __darkHeader ? (React.createElement("div", { className: clsx(styles['dark-header'], 'awsui-context-content-header') }, header)) : (header)))),
        React.createElement("div", { className: clsx(styles.content, (_c = {},
                _c[styles['with-paddings']] = !disableContentPaddings,
                _c)) }, children),
        footer && (React.createElement("div", { className: clsx(styles.footer, (_d = {},
                _d[styles['with-divider']] = !__disableFooterDivider,
                _d[styles['with-paddings']] = !__disableFooterPaddings,
                _d)) }, footer))));
}
//# sourceMappingURL=internal.js.map