import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
export var Notifications = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var sticky = _a.sticky, props = __rest(_a, ["sticky"]);
    return sticky ? (React.createElement("div", { ref: ref, className: styles['notifications-sticky'], style: { top: props.topOffset } },
        React.createElement("div", { role: "region", className: clsx(props.testUtilsClassName), "aria-label": (_b = props.labels) === null || _b === void 0 ? void 0 : _b.notifications }, props.children))) : (React.createElement("div", { role: "region", ref: ref, className: clsx(props.testUtilsClassName), "aria-label": (_c = props.labels) === null || _c === void 0 ? void 0 : _c.notifications }, props.children));
});
//# sourceMappingURL=index.js.map