import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { OpenAnnotation } from './annotation/open-annotation';
import { ClosedAnnotation } from './annotation/closed-annotation';
import { hotspotContext } from './context';
import { fireNonCancelableEvent } from '../internal/events';
import { useTelemetry } from '../internal/hooks/use-telemetry';
import { applyDisplayName } from '../internal/utils/apply-display-name';
export function getStepInfo(annotations, index) {
    if (index >= 0) {
        var taskIndex = 0;
        for (var _i = 0, annotations_1 = annotations; _i < annotations_1.length; _i++) {
            var task = annotations_1[_i];
            if (task.steps.length <= index) {
                index -= task.steps.length;
                taskIndex++;
                continue;
            }
            return { task: task, step: task.steps[index], localIndex: index, taskIndex: taskIndex };
        }
    }
    return { task: undefined, step: undefined, localIndex: 0, taskIndex: 0 };
}
// constant empty array to keep hook dependency stable
var emptyTasks = [];
export default function AnnotationContext(_a) {
    var _b, _c, _d, _e;
    var currentTutorial = _a.currentTutorial, children = _a.children, onStepChange = _a.onStepChange, onFinishHandler = _a.onFinish, onStartTutorial = _a.onStartTutorial, onExitTutorial = _a.onExitTutorial, i18nStrings = _a.i18nStrings;
    useTelemetry('AnnotationContext');
    var _f = useState(true), open = _f[0], setOpen = _f[1];
    var _g = useState(0), currentStepIndex = _g[0], setCurrentStepIndex = _g[1];
    useEffect(function () {
        // When a tutorial is started, we reset the progress to the first step.
        setCurrentStepIndex(0);
        setOpen(true);
    }, [currentTutorial, setOpen]);
    var _h = useState({}), availableHotspots = _h[0], setAvailableHotspots = _h[1];
    // availableHotspots is mirrored in this ref to prevent endless loops
    // in between registerHotspot and unregisterHotspot callbacks.
    var availableHotspotsRef = useRef(availableHotspots);
    var annotations = currentTutorial ? currentTutorial.tasks : emptyTasks;
    var _j = getStepInfo(annotations, currentStepIndex), task = _j.task, step = _j.step, localIndex = _j.localIndex, taskIndex = _j.taskIndex;
    var currentId = step === null || step === void 0 ? void 0 : step.hotspotId;
    var totalStepCount = annotations.map(function (a) { return a.steps.length; }).reduce(function (a, b) { return a + b; }, 0);
    var id2index = useMemo(function () {
        var mapping = {};
        var counter = 0;
        for (var _i = 0, annotations_2 = annotations; _i < annotations_2.length; _i++) {
            var annotation = annotations_2[_i];
            for (var _a = 0, _b = annotation.steps; _a < _b.length; _a++) {
                var step_1 = _b[_a];
                if (mapping[step_1.hotspotId] === undefined) {
                    mapping[step_1.hotspotId] = counter;
                }
                counter++;
            }
        }
        return mapping;
    }, [annotations]);
    var openNextStep = useCallback(function () {
        var newStepIndex = Math.min(currentStepIndex + 1, totalStepCount);
        setCurrentStepIndex(newStepIndex);
        fireNonCancelableEvent(onStepChange, { step: newStepIndex, reason: 'next' });
    }, [currentStepIndex, onStepChange, totalStepCount]);
    var openPreviousStep = useCallback(function () {
        var newStepIndex = Math.max(currentStepIndex - 1, 0);
        setCurrentStepIndex(newStepIndex);
        fireNonCancelableEvent(onStepChange, { step: newStepIndex, reason: 'previous' });
    }, [onStepChange, currentStepIndex]);
    var onFinish = useCallback(function () { return fireNonCancelableEvent(onFinishHandler); }, [onFinishHandler]);
    /**
     * If the currently open hotspot disappears from the page (e.g. because of a react-router navigation),
     * this Effect detects the nearest available hotspot and changes to it. This allows us to e.g. automatically
     * advance to the first step on the new page (or the last step on the previous page, in case the user
     * navigates back).
     */
    var isCurrentHotspotAvailable = currentId ? availableHotspots[currentId] : null;
    useEffect(function () {
        if (!currentId || availableHotspotsRef.current[currentId]) {
            return;
        }
        var findNearestHotspot = function () {
            var nearestHotspot = undefined;
            var nearestDistance = Infinity;
            for (var _i = 0, _a = Object.keys(availableHotspotsRef.current); _i < _a.length; _i++) {
                var hotspotId = _a[_i];
                var distanceFromCurrentHotspot = Math.abs(id2index[hotspotId] - currentStepIndex);
                if (distanceFromCurrentHotspot < nearestDistance) {
                    nearestDistance = distanceFromCurrentHotspot;
                    nearestHotspot = hotspotId;
                }
            }
            return nearestHotspot;
        };
        var nearestHotspot = findNearestHotspot();
        if (nearestHotspot) {
            var newStepIndex = id2index[nearestHotspot];
            setCurrentStepIndex(newStepIndex);
            setOpen(true);
            fireNonCancelableEvent(onStepChange, { step: newStepIndex, reason: 'auto-fallback' });
        }
    }, [annotations, isCurrentHotspotAvailable, currentId, currentStepIndex, id2index, onStepChange]);
    var onDismiss = useCallback(function () {
        setOpen(false);
    }, [setOpen]);
    var onOpen = useCallback(function (stepIndex) {
        setCurrentStepIndex(stepIndex);
        fireNonCancelableEvent(onStepChange, { step: stepIndex, reason: 'open' });
        setOpen(true);
    }, [onStepChange, setOpen]);
    var idOfPreviousHotspot = (_b = getStepInfo(annotations, currentStepIndex - 1).step) === null || _b === void 0 ? void 0 : _b.hotspotId;
    var idOfNextHotspot = (_c = getStepInfo(annotations, currentStepIndex + 1).step) === null || _c === void 0 ? void 0 : _c.hotspotId;
    var previousHotspotIsAvailable = (_d = (idOfPreviousHotspot !== undefined && availableHotspots[idOfPreviousHotspot])) !== null && _d !== void 0 ? _d : false;
    var nextHotspotIsAvailable = (_e = (idOfNextHotspot !== undefined && availableHotspots[idOfNextHotspot])) !== null && _e !== void 0 ? _e : false;
    var getContentForId = useCallback(function (id, direction) {
        if (currentTutorial === null || currentTutorial === void 0 ? void 0 : currentTutorial.completed) {
            return null;
        }
        var globalStepIndex = id2index[id];
        if (globalStepIndex === undefined) {
            // This hotspot is not used in the current tutorial.
            return null;
        }
        if (!task || !step || !open || id !== currentId) {
            var _a = getStepInfo(annotations, globalStepIndex), currentTask = _a.task, currentStepIndex_1 = _a.localIndex;
            return (React.createElement(ClosedAnnotation, { globalStepIndex: globalStepIndex, i18nStrings: i18nStrings, onOpen: onOpen, focusOnRender: id === currentId, totalLocalSteps: currentTask ? currentTask.steps.length : 0, taskLocalStepIndex: currentStepIndex_1 }));
        }
        return (React.createElement(OpenAnnotation, { i18nStrings: i18nStrings, direction: direction, title: i18nStrings.taskTitle(taskIndex, task.title), content: step.content, alert: step.warningAlert, showPreviousButton: currentStepIndex !== 0, showFinishButton: currentStepIndex + 1 === totalStepCount, taskLocalStepIndex: localIndex, totalLocalSteps: task.steps.length, nextButtonEnabled: nextHotspotIsAvailable, onNextButtonClick: openNextStep, onFinish: onFinish, previousButtonEnabled: previousHotspotIsAvailable, onPreviousButtonClick: openPreviousStep, onDismiss: onDismiss }));
    }, [
        id2index,
        currentTutorial,
        task,
        step,
        open,
        currentId,
        currentStepIndex,
        i18nStrings,
        taskIndex,
        localIndex,
        totalStepCount,
        nextHotspotIsAvailable,
        openNextStep,
        onFinish,
        previousHotspotIsAvailable,
        openPreviousStep,
        onDismiss,
        onOpen,
        annotations,
    ]);
    var registerHotspot = useCallback(function (id) {
        var _a;
        if (!id2index || id2index[id] === undefined) {
            // This hotspot is not used in the current tutorial.
            return;
        }
        /*
          To ensure that all hotspots are immediately known to all triggered useEffects, we
          need to update the availableHotspotsRef BEFORE the setAvailableHotspots calls, since
          they will be batched and delayed until after the useEffects are run.
        */
        availableHotspotsRef.current = __assign(__assign({}, availableHotspotsRef.current), (_a = {}, _a[id] = true, _a));
        setAvailableHotspots(function (availableHotspots) {
            var _a;
            if (availableHotspots[id]) {
                return availableHotspots;
            }
            return __assign(__assign({}, availableHotspots), (_a = {}, _a[id] = true, _a));
        });
    }, 
    // We need to react on id2index changes for registering new hotspots when the map changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id2index]);
    var unregisterHotspot = useCallback(function (id) {
        if (!availableHotspotsRef.current[id]) {
            // Prevents unnecessary re-renders.
            return;
        }
        /*
          To ensure that all hotspots are immediately known to all triggered useEffects, we
          need to update the availableHotspotsRef BEFORE the setAvailableHotspots calls, since
          they will be batched and delayed until after the useEffects are run.
        */
        availableHotspotsRef.current = removeKey(id, availableHotspotsRef.current);
        setAvailableHotspots(function (availableHotspots) {
            if (!availableHotspots[id]) {
                return availableHotspots;
            }
            return removeKey(id, availableHotspots);
        });
    }, []);
    var context = {
        getContentForId: getContentForId,
        registerHotspot: registerHotspot,
        unregisterHotspot: unregisterHotspot,
        onStartTutorial: onStartTutorial,
        onExitTutorial: onExitTutorial,
        currentStepIndex: currentStepIndex,
        currentTutorial: currentTutorial
    };
    return React.createElement(hotspotContext.Provider, { value: context }, children);
}
applyDisplayName(AnnotationContext, 'AnnotationContext');
function removeKey(key, object) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var _a = object, _b = key, _ = _a[_b], remainingObject = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    return remainingObject;
}
//# sourceMappingURL=index.js.map