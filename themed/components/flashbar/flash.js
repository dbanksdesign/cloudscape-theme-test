import { __assign } from "tslib";
import React from 'react';
import InternalSpinner from '../spinner/internal';
import InternalIcon from '../icon/internal';
import clsx from 'clsx';
import styles from './styles.css.js';
import { InternalButton } from '../button/internal';
import { warnOnce } from '../internal/logging';
import { isDevelopment } from '../internal/is-development';
import { throttle } from '../internal/utils/throttle';
import useFocusVisible from '../internal/hooks/focus-visible';
import LiveRegion from '../internal/components/live-region';
import { sendDismissMetric } from './internal/analytics';
import { FOCUS_THROTTLE_DELAY } from './utils';
var ICON_TYPES = {
    success: 'status-positive',
    warning: 'status-warning',
    info: 'status-info',
    error: 'status-negative'
};
function actionButton(buttonText, onButtonClick) {
    return (React.createElement(InternalButton, { onClick: onButtonClick, className: styles['action-button'], formAction: "none" }, buttonText));
}
function dismissButton(dismissLabel, onDismiss) {
    return (React.createElement("div", { className: styles['dismiss-button-wrapper'] },
        React.createElement(InternalButton, { onClick: onDismiss, className: styles['dismiss-button'], variant: "flashbar-icon", iconName: "close", formAction: "none", ariaLabel: dismissLabel })));
}
export var focusFlashById = throttle(function (element, itemId) {
    var _a;
    var selector = "[data-itemid=\"".concat(CSS.escape(itemId), "\"] .").concat(styles['flash-focus-container']);
    (_a = element === null || element === void 0 ? void 0 : element.querySelector(selector)) === null || _a === void 0 ? void 0 : _a.focus();
}, FOCUS_THROTTLE_DELAY, { trailing: false });
export var Flash = React.forwardRef(function (_a, ref) {
    var _b;
    var id = _a.id, header = _a.header, content = _a.content, dismissible = _a.dismissible, dismissLabel = _a.dismissLabel, statusIconAriaLabel = _a.statusIconAriaLabel, loading = _a.loading, action = _a.action, buttonText = _a.buttonText, onButtonClick = _a.onButtonClick, onDismiss = _a.onDismiss, className = _a.className, transitionState = _a.transitionState, ariaRole = _a.ariaRole, _c = _a.type, type = _c === void 0 ? 'info' : _c;
    var focusVisible = useFocusVisible();
    if (isDevelopment) {
        if (buttonText && !onButtonClick) {
            warnOnce('Flashbar', "You provided a `buttonText` prop without an `onButtonClick` handler. This will render a non-interactive action button.");
        }
        if (dismissible && !onDismiss) {
            warnOnce('Flashbar', "You have set the `dismissible` prop without an `onDismiss` handler. This will render a non-interactive dismiss button.");
        }
    }
    var button = action || (buttonText && actionButton(buttonText, onButtonClick));
    var iconType = ICON_TYPES[type];
    var icon = loading ? React.createElement(InternalSpinner, null) : React.createElement(InternalIcon, { name: iconType });
    var effectiveType = loading ? 'info' : type;
    var announcement = [statusIconAriaLabel, header, content].filter(Boolean).join(' ');
    var handleDismiss = function (event) {
        sendDismissMetric(effectiveType);
        onDismiss && onDismiss(event);
    };
    return (
    // We're not using "polite" or "assertive" here, just turning default behavior off.
    // eslint-disable-next-line @cloudscape-design/prefer-live-region
    React.createElement("div", { ref: ref, role: ariaRole, "aria-live": ariaRole ? 'off' : undefined, "data-itemid": id, className: clsx(styles.flash, styles["flash-type-".concat(effectiveType)], className, transitionState && (_b = {},
            _b[styles.enter] = transitionState === 'enter',
            _b[styles.entering] = transitionState === 'entering',
            _b[styles.entered] = transitionState === 'entered',
            _b[styles.exit] = transitionState === 'exit',
            _b[styles.exiting] = transitionState === 'exiting',
            _b[styles.exited] = transitionState === 'exited',
            _b)) },
        React.createElement("div", { className: styles['flash-body'] },
            React.createElement("div", __assign({}, focusVisible, { className: styles['flash-focus-container'], tabIndex: -1 }),
                React.createElement("div", { className: clsx(styles['flash-icon'], styles['flash-text']), role: "img", "aria-label": statusIconAriaLabel }, icon),
                React.createElement("div", { className: clsx(styles['flash-message'], styles['flash-text']) },
                    React.createElement("div", { className: styles['flash-header'] }, header),
                    React.createElement("div", { className: styles['flash-content'] }, content))),
            button && React.createElement("div", { className: styles['action-button-wrapper'] }, button)),
        dismissible && dismissButton(dismissLabel, handleDismiss),
        ariaRole === 'status' && React.createElement(LiveRegion, null, announcement)));
});
//# sourceMappingURL=flash.js.map