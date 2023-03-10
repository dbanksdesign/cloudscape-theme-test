// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useState } from 'react';
import { useMutationObserver } from '../../hooks/use-mutation-observer';
import { findUpUntil } from '../../utils/dom';
export var useVisualContext = function (elementRef) {
    var contextMatch = /awsui-context-([\w-]+)/;
    var _a = useState(''), value = _a[0], setValue = _a[1];
    useMutationObserver(elementRef, function (node) {
        var contextParent = findUpUntil(node, function (node) { return !!node.className.match(contextMatch); });
        setValue(contextParent ? contextParent.className.match(contextMatch)[1] : '');
    });
    return value;
};
/**
 * This function returns only the className string needed to apply a
 * visual context to the DOM. It is used by the default export but
 * can also be imported directly for situations where the insertion
 * of a <div> node creates style problems.
 */
export function getVisualContextClassname(contextName) {
    return "awsui-context-".concat(contextName);
}
export default function VisualContext(_a) {
    var contextName = _a.contextName, className = _a.className, children = _a.children;
    return React.createElement("div", { className: clsx(getVisualContextClassname(contextName), className) }, children);
}
//# sourceMappingURL=index.js.map