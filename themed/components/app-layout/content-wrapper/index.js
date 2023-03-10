// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React from 'react';
import styles from './styles.css.js';
var ContentWrapper = React.forwardRef(function (_a, ref) {
    var className = _a.className, contentType = _a.contentType, children = _a.children, toolsPadding = _a.toolsPadding, disablePaddings = _a.disablePaddings, navigationPadding = _a.navigationPadding, isMobile = _a.isMobile, contentWidthStyles = _a.contentWidthStyles;
    if (disablePaddings) {
        return (React.createElement("div", { className: className, ref: ref }, children));
    }
    return (React.createElement("div", { ref: ref, className: clsx(className, styles['content-wrapper'], styles["content-type-".concat(contentType)], !navigationPadding && styles['content-wrapper-no-navigation-padding'], !toolsPadding && styles['content-wrapper-no-tools-padding'], isMobile && styles['content-wrapper-mobile']), style: contentWidthStyles }, children));
});
export default ContentWrapper;
//# sourceMappingURL=index.js.map