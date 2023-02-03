// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import InternalLink from '../link/internal';
import InternalBox from '../box/internal';
import styles from './styles.css.js';
var Statuses;
(function (Statuses) {
    Statuses["Active"] = "active";
    Statuses["Unvisited"] = "unvisited";
    Statuses["Visited"] = "visited";
    Statuses["Next"] = "next";
})(Statuses || (Statuses = {}));
export default function Navigation(_a) {
    var activeStepIndex = _a.activeStepIndex, farthestStepIndex = _a.farthestStepIndex, allowSkipTo = _a.allowSkipTo, hidden = _a.hidden, i18nStrings = _a.i18nStrings, isVisualRefresh = _a.isVisualRefresh, isLoadingNextStep = _a.isLoadingNextStep, onStepClick = _a.onStepClick, onSkipToClick = _a.onSkipToClick, steps = _a.steps;
    return (React.createElement("nav", { className: clsx(styles.navigation, hidden && styles.hidden, isVisualRefresh && styles.refresh), "aria-label": i18nStrings.navigationAriaLabel },
        React.createElement("ul", null, steps.map(function (step, index) {
            return isVisualRefresh ? (React.createElement(NavigationStepVisualRefresh, { i18nStrings: i18nStrings, index: index, key: index, onStepClick: onStepClick, onSkipToClick: onSkipToClick, status: getStatus(index), step: step })) : (React.createElement(NavigationStepClassic, { i18nStrings: i18nStrings, index: index, key: index, onStepClick: onStepClick, onSkipToClick: onSkipToClick, status: getStatus(index), step: step }));
        }))));
    function getStatus(index) {
        if (activeStepIndex === index) {
            return Statuses.Active;
        }
        if (isLoadingNextStep) {
            return Statuses.Unvisited;
        }
        if (farthestStepIndex >= index) {
            return Statuses.Visited;
        }
        if (allowSkipTo && canSkip(activeStepIndex + 1, index)) {
            return Statuses.Next;
        }
        return Statuses.Unvisited;
    }
    function canSkip(fromIndex, toIndex) {
        var index = fromIndex;
        do {
            if (!steps[index].isOptional) {
                return false;
            }
            index++;
        } while (index < toIndex);
        return true;
    }
}
function NavigationStepVisualRefresh(_a) {
    var _b;
    var i18nStrings = _a.i18nStrings, index = _a.index, onStepClick = _a.onStepClick, onSkipToClick = _a.onSkipToClick, status = _a.status, step = _a.step;
    function handleStepInteraction() {
        if (status === Statuses.Visited) {
            onStepClick(index);
        }
        if (status === Statuses.Next) {
            onSkipToClick(index);
        }
    }
    var state = {
        active: 'active',
        unvisited: 'disabled',
        visited: 'enabled',
        next: 'enabled'
    }[status];
    var linkClassName = clsx(styles['navigation-link'], (_b = {},
        _b[styles['navigation-link-active']] = status === Statuses.Active,
        _b[styles['navigation-link-disabled']] = status === Statuses.Unvisited,
        _b));
    return (React.createElement("li", { className: clsx(styles["".concat(state)], styles['navigation-link-item']) },
        React.createElement("hr", null),
        React.createElement("span", { className: clsx(styles.number, styles['navigation-link-label']) },
            i18nStrings.stepNumberLabel && i18nStrings.stepNumberLabel(index + 1),
            step.isOptional && React.createElement("i", null, " - ".concat(i18nStrings.optional))),
        React.createElement("a", { className: linkClassName, "aria-current": status === Statuses.Active ? 'step' : undefined, "aria-disabled": status === Statuses.Unvisited ? 'true' : undefined, onClick: function (event) {
                event.preventDefault();
                handleStepInteraction();
            }, onKeyDown: function (event) {
                if (event.key === ' ' || event.key === 'Enter') {
                    event.preventDefault();
                }
                // Enter activates the button on key down instead of key up.
                if (event.key === 'Enter') {
                    handleStepInteraction();
                }
            }, onKeyUp: function (event) {
                // Emulate button behavior, which also fires on space.
                if (event.key === ' ') {
                    handleStepInteraction();
                }
            }, role: "button", tabIndex: status === Statuses.Visited || status === Statuses.Next ? 0 : undefined },
            React.createElement("div", { className: clsx(styles.circle) }),
            React.createElement("span", { className: clsx(styles.title) }, step.title))));
}
function NavigationStepClassic(_a) {
    var i18nStrings = _a.i18nStrings, index = _a.index, onStepClick = _a.onStepClick, onSkipToClick = _a.onSkipToClick, status = _a.status, step = _a.step;
    var spanClassName = clsx(styles['navigation-link'], status === Statuses.Active ? styles['navigation-link-active'] : styles['navigation-link-disabled']);
    return (React.createElement("li", { className: styles['navigation-link-item'] },
        React.createElement(InternalBox, { variant: "small", className: styles['navigation-link-label'], display: "block", margin: { bottom: 'xxs' } },
            i18nStrings.stepNumberLabel && i18nStrings.stepNumberLabel(index + 1),
            step.isOptional && React.createElement("i", null, " - ".concat(i18nStrings.optional))),
        React.createElement("div", null, status === Statuses.Visited || status === Statuses.Next ? (React.createElement(InternalLink, { className: clsx(styles['navigation-link']), onFollow: function (evt) {
                evt.preventDefault();
                status === Statuses.Visited ? onStepClick(index) : onSkipToClick(index);
            } }, step.title)) : (React.createElement("span", { className: spanClassName, "aria-current": status === Statuses.Active ? 'step' : undefined, "aria-disabled": status === Statuses.Active ? undefined : 'true' }, step.title)))));
}
//# sourceMappingURL=wizard-navigation.js.map