// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { InternalButton } from '../../button/internal';
import styles from './styles.css.js';
export var togglesConfig = {
    navigation: {
        TagName: 'nav',
        iconName: 'menu',
        getLabels: function (labels) {
            if (labels === void 0) { labels = {}; }
            return ({
                mainLabel: labels.navigation,
                openLabel: labels.navigationToggle,
                closeLabel: labels.navigationClose
            });
        }
    },
    tools: {
        TagName: 'aside',
        iconName: 'status-info',
        getLabels: function (labels) {
            if (labels === void 0) { labels = {}; }
            return ({
                mainLabel: labels.tools,
                openLabel: labels.toolsToggle,
                closeLabel: labels.toolsClose
            });
        }
    }
};
export var AppLayoutButton = React.forwardRef(function (_a, ref) {
    var className = _a.className, ariaLabel = _a.ariaLabel, ariaExpanded = _a.ariaExpanded, iconName = _a.iconName, disabled = _a.disabled, onClick = _a.onClick;
    return (React.createElement(InternalButton, { ref: ref, className: className, ariaLabel: ariaLabel, variant: "icon", formAction: "none", onClick: onClick, iconName: iconName, disabled: disabled, ariaExpanded: ariaExpanded ? undefined : false, __nativeAttributes: { 'aria-haspopup': ariaExpanded ? undefined : true } }));
});
export var CloseButton = React.forwardRef(function (_a, ref) {
    var className = _a.className, ariaLabel = _a.ariaLabel, onClick = _a.onClick, iconName = _a.iconName;
    return (React.createElement("span", { className: styles['close-button'] },
        React.createElement(AppLayoutButton, { ref: ref, className: className, ariaExpanded: true, ariaLabel: ariaLabel, iconName: iconName, onClick: onClick })));
});
//# sourceMappingURL=index.js.map