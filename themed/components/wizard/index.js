import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { getBaseProps } from '../internal/base-component';
import { fireNonCancelableEvent } from '../internal/events';
import { warnOnce } from '../internal/logging';
import { useContainerBreakpoints } from '../internal/hooks/container-queries';
import { useControllable } from '../internal/hooks/use-controllable';
import WizardForm from './wizard-form';
import WizardNavigation from './wizard-navigation';
import styles from './styles.css.js';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import useBaseComponent from '../internal/hooks/use-base-component';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import { trackStartStep, trackNavigate, trackSubmit } from './internal/analytics';
export default function Wizard(_a) {
    var steps = _a.steps, controlledActiveStepIndex = _a.activeStepIndex, i18nStrings = _a.i18nStrings, _b = _a.isLoadingNextStep, isLoadingNextStep = _b === void 0 ? false : _b, _c = _a.allowSkipTo, allowSkipTo = _c === void 0 ? false : _c, secondaryActions = _a.secondaryActions, onCancel = _a.onCancel, onSubmit = _a.onSubmit, onNavigate = _a.onNavigate, rest = __rest(_a, ["steps", "activeStepIndex", "i18nStrings", "isLoadingNextStep", "allowSkipTo", "secondaryActions", "onCancel", "onSubmit", "onNavigate"]);
    var __internalRootRef = useBaseComponent('Wizard').__internalRootRef;
    var baseProps = getBaseProps(rest);
    var _d = useContainerBreakpoints(['xs']), breakpoint = _d[0], breakpointsRef = _d[1];
    var ref = useMergeRefs(breakpointsRef, __internalRootRef);
    var smallContainer = breakpoint === 'default';
    var _e = useControllable(controlledActiveStepIndex, onNavigate, 0, {
        componentName: 'Wizard',
        controlledProp: 'activeStepIndex',
        changeHandler: 'onNavigate'
    }), activeStepIndex = _e[0], setActiveStepIndex = _e[1];
    var actualActiveStepIndex = activeStepIndex ? Math.min(activeStepIndex, steps.length - 1) : 0;
    var farthestStepIndex = useRef(actualActiveStepIndex);
    farthestStepIndex.current = Math.max(farthestStepIndex.current, actualActiveStepIndex);
    var isVisualRefresh = useVisualRefresh();
    var isLastStep = actualActiveStepIndex >= steps.length - 1;
    var navigationEvent = function (requestedStepIndex, reason) {
        trackNavigate(actualActiveStepIndex, requestedStepIndex, reason);
        setActiveStepIndex(requestedStepIndex);
        fireNonCancelableEvent(onNavigate, { requestedStepIndex: requestedStepIndex, reason: reason });
    };
    var onStepClick = function (stepIndex) { return navigationEvent(stepIndex, 'step'); };
    var onSkipToClick = function (stepIndex) { return navigationEvent(stepIndex, 'skip'); };
    var onCancelClick = function () { return fireNonCancelableEvent(onCancel); };
    var onPreviousClick = function () { return navigationEvent(actualActiveStepIndex - 1, 'previous'); };
    var onPrimaryClick = function () {
        if (isLastStep) {
            trackSubmit(actualActiveStepIndex);
            fireNonCancelableEvent(onSubmit);
        }
        else {
            navigationEvent(actualActiveStepIndex + 1, 'next');
        }
    };
    if (activeStepIndex && activeStepIndex >= steps.length) {
        warnOnce('Wizard', "You have set `activeStepIndex` to ".concat(activeStepIndex, " but you have provided only ").concat(steps.length, " steps. Its value is ignored and the component uses ").concat(steps.length - 1, " instead."));
    }
    if (allowSkipTo && !i18nStrings.skipToButtonLabel) {
        warnOnce('Wizard', "You have set `allowSkipTo` but you have not provided `i18nStrings.skipToButtonLabel`. The skip-to button will not be rendered.");
    }
    useEffect(function () {
        trackStartStep(actualActiveStepIndex);
    }, [actualActiveStepIndex]);
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(styles.root, baseProps.className), ref: ref }),
        React.createElement("div", { className: clsx(styles.wizard, isVisualRefresh && styles.refresh, smallContainer && styles['small-container']) },
            React.createElement(WizardNavigation, { activeStepIndex: actualActiveStepIndex, farthestStepIndex: farthestStepIndex.current, allowSkipTo: allowSkipTo, hidden: smallContainer, i18nStrings: i18nStrings, isVisualRefresh: isVisualRefresh, isLoadingNextStep: isLoadingNextStep, onStepClick: onStepClick, onSkipToClick: onSkipToClick, steps: steps }),
            React.createElement("div", { className: clsx(styles.form, isVisualRefresh && styles.refresh, smallContainer && styles['small-container']) },
                isVisualRefresh && React.createElement("div", { className: clsx(styles.background, 'awsui-context-content-header') }),
                React.createElement(WizardForm, { steps: steps, isVisualRefresh: isVisualRefresh, showCollapsedSteps: smallContainer, i18nStrings: i18nStrings, activeStepIndex: actualActiveStepIndex, isPrimaryLoading: isLoadingNextStep, allowSkipTo: allowSkipTo, secondaryActions: secondaryActions, onCancelClick: onCancelClick, onPreviousClick: onPreviousClick, onSkipToClick: onSkipToClick, onPrimaryClick: onPrimaryClick })))));
}
applyDisplayName(Wizard, 'Wizard');
//# sourceMappingURL=index.js.map