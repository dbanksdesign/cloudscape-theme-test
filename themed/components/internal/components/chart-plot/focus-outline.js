// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef } from 'react';
import styles from './styles.css.js';
import useFocusVisible from '../../hooks/focus-visible/index';
export default function FocusOutline(_a) {
    var elementKey = _a.elementKey, elementRef = _a.elementRef, _b = _a.offset, offset = _b === void 0 ? 0 : _b;
    var ref = useRef(null);
    var focusVisible = useFocusVisible()["data-awsui-focus-visible"];
    useEffect(function () {
        if (!ref.current) {
            return;
        }
        if (focusVisible && elementKey && elementRef && elementRef.current && elementRef.current.getBBox) {
            var element = elementRef.current.getBBox();
            showOutline(ref.current, element, offset);
        }
        else {
            hideOutline(ref.current);
        }
    }, [focusVisible, elementKey, elementRef, offset]);
    return React.createElement("rect", { ref: ref, "aria-hidden": "true", className: styles['focus-outline'], rx: "2" });
}
function showOutline(el, position, offset) {
    var offsetX = typeof offset === 'number' ? offset : offset.x;
    var offsetY = typeof offset === 'number' ? offset : offset.y;
    el.setAttribute('x', (position.x - offsetX).toString());
    el.setAttribute('y', (position.y - offsetY).toString());
    el.setAttribute('width', (position.width + 2 * offsetX).toString());
    el.setAttribute('height', (position.height + 2 * offsetY).toString());
    el.style.visibility = 'visible';
}
function hideOutline(el) {
    el.style.visibility = 'hidden';
    el.removeAttribute('x');
    el.removeAttribute('y');
    el.removeAttribute('width');
    el.removeAttribute('height');
}
//# sourceMappingURL=focus-outline.js.map