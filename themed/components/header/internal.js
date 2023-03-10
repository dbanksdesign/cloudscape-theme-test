import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useContext } from 'react';
import { getBaseProps } from '../internal/base-component';
import { StickyHeaderContext } from '../container/use-sticky-header';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import styles from './styles.css.js';
export default function InternalHeader(_a) {
    var variant = _a.variant, headingTagOverride = _a.headingTagOverride, children = _a.children, actions = _a.actions, counter = _a.counter, description = _a.description, info = _a.info, _b = _a.__internalRootRef, __internalRootRef = _b === void 0 ? null : _b, __disableActionsWrapping = _a.__disableActionsWrapping, restProps = __rest(_a, ["variant", "headingTagOverride", "children", "actions", "counter", "description", "info", "__internalRootRef", "__disableActionsWrapping"]);
    var HeadingTag = headingTagOverride !== null && headingTagOverride !== void 0 ? headingTagOverride : (variant === 'awsui-h1-sticky' ? 'h1' : variant);
    var isStuck = useContext(StickyHeaderContext).isStuck;
    var baseProps = getBaseProps(restProps);
    var isRefresh = useVisualRefresh();
    var dynamicVariant = isStuck ? 'h2' : 'h1';
    var variantOverride = variant === 'awsui-h1-sticky' ? (isRefresh ? dynamicVariant : 'h2') : variant;
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(styles.root, baseProps.className, styles["root-variant-".concat(variantOverride)], isRefresh && styles["root-variant-".concat(variantOverride, "-refresh")], !actions && [styles["root-no-actions"]], description && [styles["root-has-description"]], __disableActionsWrapping && [styles['root-no-wrap']]), ref: __internalRootRef }),
        React.createElement("div", { className: clsx(styles.main, styles["main-variant-".concat(variantOverride)], isRefresh && styles["main-variant-".concat(variantOverride, "-refresh")]) },
            React.createElement("div", { className: clsx(styles.title, styles["title-variant-".concat(variantOverride)], isRefresh && styles["title-variant-".concat(variantOverride, "-refresh")]) },
                React.createElement(HeadingTag, { className: clsx(styles.heading, styles["heading-variant-".concat(variantOverride)]) },
                    React.createElement("span", { className: clsx(styles['heading-text'], styles["heading-text-variant-".concat(variantOverride)]) }, children),
                    counter !== undefined && React.createElement("span", { className: styles.counter },
                        " ",
                        counter)),
                info && React.createElement("span", { className: styles.info }, info)),
            description && (React.createElement("p", { className: clsx(styles.description, styles["description-variant-".concat(variantOverride)], isRefresh && styles["description-variant-".concat(variantOverride, "-refresh")]) }, description))),
        actions && (React.createElement("div", { className: clsx(styles.actions, styles["actions-variant-".concat(variantOverride)], isRefresh && styles["actions-variant-".concat(variantOverride, "-refresh")]) }, actions))));
}
//# sourceMappingURL=internal.js.map