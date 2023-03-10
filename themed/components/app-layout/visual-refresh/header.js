// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { useAppLayoutInternals } from './context';
import styles from './styles.css.js';
/**
 * The CSS class 'awsui-context-content-header' needs to be added to the root element so
 * that the design tokens used are overridden with the appropriate values.
 */
export default function Header() {
    var _a;
    var _b = useAppLayoutInternals(), breadcrumbs = _b.breadcrumbs, contentHeader = _b.contentHeader, hasNotificationsContent = _b.hasNotificationsContent;
    if (!contentHeader) {
        return null;
    }
    return (React.createElement("header", { className: clsx(styles.content, (_a = {},
            _a[styles['has-breadcrumbs']] = breadcrumbs,
            _a[styles['has-notifications-content']] = hasNotificationsContent,
            _a), 'awsui-context-content-header') }, contentHeader));
}
//# sourceMappingURL=header.js.map