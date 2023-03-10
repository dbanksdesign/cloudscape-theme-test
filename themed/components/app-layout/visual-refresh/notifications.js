// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { useAppLayoutInternals } from './context';
import styles from './styles.css.js';
import testutilStyles from '../test-classes/styles.css.js';
/**
 * The CSS class 'awsui-context-content-header' needs to be added to the root element so
 * that the design tokens used are overridden with the appropriate values.
 */
export default function Notifications() {
    var _a;
    var _b;
    var _c = useAppLayoutInternals(), ariaLabels = _c.ariaLabels, hasNotificationsContent = _c.hasNotificationsContent, notifications = _c.notifications, notificationsElement = _c.notificationsElement, stickyNotifications = _c.stickyNotifications;
    if (!notifications) {
        return null;
    }
    return (React.createElement("div", { role: "region", "aria-label": (_b = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.notifications) !== null && _b !== void 0 ? _b : undefined, className: clsx(styles.notifications, (_a = {},
            _a[styles['has-notifications-content']] = hasNotificationsContent,
            _a[styles['sticky-notifications']] = stickyNotifications,
            _a), testutilStyles.notifications, 'awsui-context-content-header'), ref: notificationsElement }, notifications));
}
//# sourceMappingURL=notifications.js.map