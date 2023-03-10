import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';
import { getBaseProps } from '../internal/base-component';
import { useControllable } from '../internal/hooks/use-controllable';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { KeyCode } from '../internal/keycode';
import { fireNonCancelableEvent } from '../internal/events';
import styles from './styles.css.js';
import { ExpandableSectionContainer } from './expandable-section-container';
import { ExpandableSectionHeader } from './expandable-section-header';
export default function InternalExpandableSection(_a) {
    var controlledExpanded = _a.expanded, defaultExpanded = _a.defaultExpanded, onChange = _a.onChange, _b = _a.variant, variant = _b === void 0 ? 'default' : _b, children = _a.children, header = _a.header, headerText = _a.headerText, headerCounter = _a.headerCounter, headerDescription = _a.headerDescription, headingTagOverride = _a.headingTagOverride, disableContentPaddings = _a.disableContentPaddings, headerAriaLabel = _a.headerAriaLabel, __internalRootRef = _a.__internalRootRef, props = __rest(_a, ["expanded", "defaultExpanded", "onChange", "variant", "children", "header", "headerText", "headerCounter", "headerDescription", "headingTagOverride", "disableContentPaddings", "headerAriaLabel", "__internalRootRef"]);
    var ref = useRef(null);
    var controlId = useUniqueId();
    var triggerControlId = "".concat(controlId, "-trigger");
    var baseProps = getBaseProps(props);
    var _c = useControllable(controlledExpanded, onChange, defaultExpanded, {
        componentName: 'ExpandableSection',
        controlledProp: 'expanded',
        changeHandler: 'onChange'
    }), expanded = _c[0], setExpanded = _c[1];
    var onExpandChange = useCallback(function (expanded) {
        setExpanded(expanded);
        fireNonCancelableEvent(onChange, { expanded: expanded });
    }, [onChange, setExpanded]);
    var onClick = useCallback(function () {
        onExpandChange(!expanded);
    }, [onExpandChange, expanded]);
    var onKeyUp = useCallback(function (event) {
        var interactionKeys = [KeyCode.enter, KeyCode.space];
        if (interactionKeys.indexOf(event.keyCode) !== -1) {
            onExpandChange(!expanded);
        }
    }, [onExpandChange, expanded]);
    var onKeyDown = useCallback(function (event) {
        if (event.keyCode === KeyCode.space) {
            // Prevent the page from scrolling when toggling the component with the space bar.
            event.preventDefault();
        }
    }, []);
    var triggerProps = {
        ariaControls: controlId,
        ariaLabel: headerAriaLabel,
        ariaLabelledBy: headerAriaLabel ? undefined : triggerControlId,
        onKeyUp: onKeyUp,
        onKeyDown: onKeyDown,
        onClick: onClick
    };
    return (React.createElement(ExpandableSectionContainer, __assign({}, baseProps, { expanded: expanded, className: clsx(baseProps.className, styles.root), variant: variant, disableContentPaddings: disableContentPaddings, header: React.createElement(ExpandableSectionHeader, __assign({ id: triggerControlId, className: clsx(styles.header, styles["header-".concat(variant)]), variant: variant, expanded: !!expanded, header: header, headerText: headerText, headerDescription: headerDescription, headerCounter: headerCounter, headingTagOverride: headingTagOverride }, triggerProps)), __internalRootRef: __internalRootRef }),
        React.createElement(CSSTransition, { "in": expanded, timeout: 30, classNames: { enter: styles['content-enter'] }, nodeRef: ref },
            React.createElement("div", { id: controlId, ref: ref, className: clsx(styles.content, styles["content-".concat(variant)], expanded && styles['content-expanded']), role: "group", "aria-label": triggerProps.ariaLabel, "aria-labelledby": triggerProps.ariaLabelledBy }, children))));
}
//# sourceMappingURL=internal.js.map