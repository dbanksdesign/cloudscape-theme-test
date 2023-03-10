// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import AnnotationTrigger from './annotation-trigger';
export function ClosedAnnotation(_a) {
    var globalStepIndex = _a.globalStepIndex, onOpen = _a.onOpen, i18nStrings = _a.i18nStrings, focusOnRender = _a.focusOnRender, totalLocalSteps = _a.totalLocalSteps, taskLocalStepIndex = _a.taskLocalStepIndex;
    var _b = useState(null), hotspotRef = _b[0], setHotspotRef = _b[1];
    var onClick = useCallback(function () {
        onOpen(globalStepIndex);
    }, [globalStepIndex, onOpen]);
    useEffect(function () {
        if (focusOnRender && hotspotRef) {
            hotspotRef.focus();
        }
    }, [focusOnRender, hotspotRef]);
    return (React.createElement(AnnotationTrigger, { open: false, onClick: onClick, i18nStrings: i18nStrings, ref: setHotspotRef, totalLocalSteps: totalLocalSteps, taskLocalStepIndex: taskLocalStepIndex }));
}
//# sourceMappingURL=closed-annotation.js.map