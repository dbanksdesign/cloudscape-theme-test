// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import InternalLink from '../../../link/internal';
import InternalStatusIndicator from '../../../status-indicator/internal';
import { fireNonCancelableEvent } from '../../events';
import { usePrevious } from '../../hooks/use-previous';
import styles from './styles.css.js';
function DropdownStatus(_a) {
    var children = _a.children;
    return React.createElement("div", { className: styles.root }, children);
}
export var useDropdownStatus = function (_a) {
    var statusType = _a.statusType, empty = _a.empty, loadingText = _a.loadingText, finishedText = _a.finishedText, errorText = _a.errorText, recoveryText = _a.recoveryText, isEmpty = _a.isEmpty, isNoMatch = _a.isNoMatch, noMatch = _a.noMatch, onRecoveryClick = _a.onRecoveryClick, errorIconAriaLabel = _a.errorIconAriaLabel;
    var previousStatusType = usePrevious(statusType);
    var statusResult = { isSticky: true, content: null };
    if (statusType === 'loading') {
        statusResult.content = React.createElement(InternalStatusIndicator, { type: 'loading' }, loadingText);
    }
    else if (statusType === 'error') {
        statusResult.content = (React.createElement("span", null,
            React.createElement(InternalStatusIndicator, { type: "error", __animate: previousStatusType !== 'error', iconAriaLabel: errorIconAriaLabel }, errorText),
            ' ',
            recoveryText && (React.createElement(InternalLink, { onFollow: function () { return fireNonCancelableEvent(onRecoveryClick); }, variant: "recovery", className: styles.recovery }, recoveryText))));
    }
    else if (isEmpty && empty) {
        statusResult.content = empty;
    }
    else if (isNoMatch && noMatch) {
        statusResult.content = noMatch;
    }
    else if (statusType === 'finished' && finishedText) {
        statusResult.content = finishedText;
        statusResult.isSticky = false;
    }
    return statusResult;
};
export default DropdownStatus;
//# sourceMappingURL=index.js.map