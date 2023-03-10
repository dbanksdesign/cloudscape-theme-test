// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import FocusLock from 'react-focus-lock';
import { KeyCode } from '../internal/keycode';
import { scrollElementIntoView } from '../internal/utils/scrollable-containers';
import { InternalButton } from '../button/internal';
import { ResizableBox } from './resizable-box';
import styles from './styles.css.js';
var ANNOTATION_ITEM_HEIGHT = 31;
var PANE_ANNOTATIONS_PADDING = 12;
var MIN_HEIGHT = 3 * ANNOTATION_ITEM_HEIGHT + 2 * PANE_ANNOTATIONS_PADDING;
export var Pane = function (_a) {
    var id = _a.id, visible = _a.visible, annotations = _a.annotations, highlighted = _a.highlighted, onAllowlist = _a.onAllowlist, onClose = _a.onClose, onAnnotationClick = _a.onAnnotationClick, onAnnotationClear = _a.onAnnotationClear, cursorPositionLabel = _a.cursorPositionLabel, closeButtonAriaLabel = _a.closeButtonAriaLabel;
    var _b = useState(MIN_HEIGHT), paneHeight = _b[0], setPaneHeight = _b[1];
    var listRef = useRef(null);
    var _c = useState(false), isFocusTrapActive = _c[0], setFocusTrapActive = _c[1];
    useEffect(function () {
        var _a;
        if (!highlighted) {
            return;
        }
        var row = highlighted.row, column = highlighted.column;
        var highlightedAnnotationIndex = annotations.indexOf(annotations.filter(function (a) { return a.row === row && a.column === column; })[0]);
        if (highlightedAnnotationIndex > -1) {
            var errorItem = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.children[highlightedAnnotationIndex];
            scrollElementIntoView(errorItem);
        }
    }, [highlighted, annotations]);
    var onItemFocus = function () {
        setFocusTrapActive(true);
        onAnnotationClear();
    };
    var onItemClick = function (annotation) {
        setFocusTrapActive(false);
        onAnnotationClick(annotation);
    };
    var onItemKeyDown = function (annotation, event) {
        if (event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) {
            event.preventDefault();
            setFocusTrapActive(false);
            onAnnotationClick(annotation);
        }
    };
    var onEscKeyDown = function (event) {
        if (event.keyCode === KeyCode.escape) {
            event.preventDefault();
            setFocusTrapActive(false);
            onClose();
        }
    };
    if (!visible) {
        return null;
    }
    return (React.createElement("div", { id: id, className: styles.pane, onKeyDown: onEscKeyDown, role: "tabpanel" },
        React.createElement(ResizableBox, { height: paneHeight, minHeight: MIN_HEIGHT, onResize: function (newHeight) { return setPaneHeight(newHeight); } },
            React.createElement(FocusLock, { disabled: !isFocusTrapActive, className: styles['focus-lock'], autoFocus: false, returnFocus: false, whiteList: onAllowlist },
                React.createElement("div", { className: styles.pane__list, tabIndex: -1 },
                    React.createElement("table", { className: styles.pane__table, role: "presentation" },
                        React.createElement("colgroup", null,
                            React.createElement("col", { style: { width: 1 } /* shrink to fit content */ }),
                            React.createElement("col", { style: { width: 'auto' } })),
                        React.createElement("tbody", { ref: listRef }, annotations.map(function (annotation, i) {
                            var _a;
                            return (React.createElement("tr", { key: i, className: clsx(styles.pane__item, (_a = {},
                                    _a[styles['pane__item--highlighted']] = annotation === highlighted,
                                    _a)), onFocus: onItemFocus, onMouseOver: onAnnotationClear, onClick: onItemClick.bind(null, annotation), onKeyDown: onItemKeyDown.bind(null, annotation), tabIndex: 0, role: "link" },
                                React.createElement("td", { className: clsx(styles.pane__location, styles.pane__cell), tabIndex: -1 }, cursorPositionLabel((annotation.row || 0) + 1, (annotation.column || 0) + 1)),
                                React.createElement("td", { className: clsx(styles.pane__description, styles.pane__cell), tabIndex: -1 }, annotation.text)));
                        })))),
                React.createElement("div", { className: styles['pane__close-container'] },
                    React.createElement(InternalButton, { formAction: "none", variant: "icon", iconName: "close", onClick: onClose, ariaLabel: closeButtonAriaLabel }))))));
};
//# sourceMappingURL=pane.js.map