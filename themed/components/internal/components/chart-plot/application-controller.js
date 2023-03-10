// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import focusSvgElement from '../../utils/focus-svg-element';
import styles from './styles.css.js';
export default forwardRef(ApplicationController);
function ApplicationController(_a, ref) {
    var activeElementKey = _a.activeElementKey, activeElementRef = _a.activeElementRef, onFocus = _a.onFocus, onBlur = _a.onBlur, onKeyDown = _a.onKeyDown;
    var containerRef = useRef(null);
    var applicationRef = useRef(null);
    var focusTransitionRef = useRef(false);
    var _b = useState(false), isFocused = _b[0], setFocused = _b[1];
    // Calls provided onFocus handler when the application obtains focus, ignoring internal focus juggling.
    var onApplicationFocus = useCallback(function (event) {
        if (focusTransitionRef.current === false) {
            setFocused(true);
            onFocus && onFocus(event);
        }
        else {
            focusTransitionRef.current = false;
        }
    }, [onFocus]);
    // Calls provided onBlur handler when the application loses focus, ignoring internal focus juggling.
    var onApplicationBlur = useCallback(function (event) {
        if (focusTransitionRef.current === false) {
            setFocused(false);
            onBlur && onBlur(event);
            // The application controller can only be focused programmatically.
            muteApplication(applicationRef.current);
        }
    }, [onBlur]);
    var onApplicationKeyDown = onKeyDown;
    useImperativeHandle(ref, function () { return ({
        focus: function () { return focusApplication(applicationRef.current, (activeElementRef === null || activeElementRef === void 0 ? void 0 : activeElementRef.current) || null); }
    }); }, [activeElementRef]);
    // Re-attaches and re-focuses the application for screen readers to treat it as an update.
    useEffect(function () {
        // Skip if not focused or if the transition is already happening.
        if (!isFocused || focusTransitionRef.current === true) {
            return;
        }
        // Delay focus juggle to let the last focus event settle in Firefox.
        // Without the delay the focus is getting lost.
        var timeoutId = setTimeout(function () {
            focusTransitionRef.current = true;
            containerRef.current.removeChild(applicationRef.current);
            containerRef.current.appendChild(applicationRef.current);
            focusApplication(applicationRef.current, (activeElementRef === null || activeElementRef === void 0 ? void 0 : activeElementRef.current) || null);
        }, 0);
        return function () { return clearTimeout(timeoutId); };
    }, [isFocused, activeElementKey, activeElementRef]);
    return (React.createElement("g", { ref: containerRef },
        React.createElement("g", { tabIndex: -1, ref: applicationRef, onFocus: onApplicationFocus, onBlur: onApplicationBlur, onKeyDown: onApplicationKeyDown, className: styles.application })));
}
// Focuses application but before copies aria-attributes from the target.
function focusApplication(app, target) {
    // Remove prev attributes.
    for (var _i = 0, _a = getAttributeNames(app); _i < _a.length; _i++) {
        var attributeName = _a[_i];
        if (attributeName === 'role' || attributeName.slice(0, 4) === 'aria') {
            app.removeAttribute(attributeName);
        }
    }
    // Copy new attributes.
    if (target) {
        for (var _b = 0, _c = getAttributeNames(target); _b < _c.length; _b++) {
            var attributeName = _c[_b];
            if (attributeName === 'role' || attributeName.slice(0, 4) === 'aria') {
                var attributeValue = target.getAttribute(attributeName);
                attributeValue && app.setAttribute(attributeName, attributeValue);
            }
        }
    }
    // Make app focusable.
    app.tabIndex = 0;
    app.setAttribute('focusable', 'true');
    app.setAttribute('aria-hidden', 'false');
    // Focus app.
    focusSvgElement(app);
}
// The application is to be only focused programmatically.
function muteApplication(app) {
    // Remove prev attributes.
    for (var _i = 0, _a = getAttributeNames(app); _i < _a.length; _i++) {
        var attributeName = _a[_i];
        if (attributeName === 'role' || attributeName.slice(0, 4) === 'aria') {
            app.removeAttribute(attributeName);
        }
    }
    // Make app non-focusable.
    app.tabIndex = -1;
    app.setAttribute('focusable', 'false');
    app.setAttribute('aria-hidden', 'true');
}
// Polyfill for element.getAttributeNames(), IE11
// https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNames#polyfill
function getAttributeNames(element) {
    var attributes = element.attributes;
    var result = new Array(attributes.length);
    for (var i = 0; i < attributes.length; i++) {
        result[i] = attributes[i].name;
    }
    return result;
}
//# sourceMappingURL=application-controller.js.map