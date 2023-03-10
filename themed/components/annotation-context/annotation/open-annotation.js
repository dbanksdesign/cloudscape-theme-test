// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import AnnotationTrigger from './annotation-trigger';
import { AnnotationPopover } from './annotation-popover';
export function OpenAnnotation(_a) {
    var title = _a.title, content = _a.content, alert = _a.alert, direction = _a.direction, showPreviousButton = _a.showPreviousButton, showFinishButton = _a.showFinishButton, taskLocalStepIndex = _a.taskLocalStepIndex, totalLocalSteps = _a.totalLocalSteps, onDismiss = _a.onDismiss, nextButtonEnabled = _a.nextButtonEnabled, onNextButtonClick = _a.onNextButtonClick, onFinish = _a.onFinish, previousButtonEnabled = _a.previousButtonEnabled, onPreviousButtonClick = _a.onPreviousButtonClick, i18nStrings = _a.i18nStrings;
    var trackRef = useRef(null);
    return (React.createElement(React.Fragment, null,
        React.createElement(AnnotationTrigger, { open: true, onClick: onDismiss, i18nStrings: i18nStrings, ref: trackRef, totalLocalSteps: totalLocalSteps, taskLocalStepIndex: taskLocalStepIndex }),
        React.createElement(AnnotationPopover, { trackRef: trackRef, previousButtonEnabled: previousButtonEnabled, showPreviousButton: showPreviousButton, showFinishButton: showFinishButton, totalLocalSteps: totalLocalSteps, i18nStrings: i18nStrings, nextButtonEnabled: nextButtonEnabled, onDismiss: onDismiss, onFinish: onFinish, onNextButtonClick: onNextButtonClick, onPreviousButtonClick: onPreviousButtonClick, taskLocalStepIndex: taskLocalStepIndex, direction: direction, title: title, content: content, alert: alert })));
}
//# sourceMappingURL=open-annotation.js.map