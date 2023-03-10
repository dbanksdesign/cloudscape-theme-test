import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { fireNonCancelableEvent } from '../internal/events';
import { getBaseProps } from '../internal/base-component';
import InternalBox from '../box/internal';
import { InternalButton } from '../button/internal';
import InternalModal from '../modal/internal';
import InternalSpaceBetween from '../space-between/internal';
import { copyPreferences, mergePreferences, ModalContentLayout, PageSizePreference, WrapLinesPreference, StripedRowsPreference, CustomPreference, } from './utils';
import VisibleContentPreference from './visible-content';
import checkControlled from '../internal/hooks/check-controlled';
import styles from './styles.css.js';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import useBaseComponent from '../internal/hooks/use-base-component';
var ModalContent = function (_a) {
    var _b = _a.preferences, preferences = _b === void 0 ? {} : _b, pageSizePreference = _a.pageSizePreference, wrapLinesPreference = _a.wrapLinesPreference, stripedRowsPreference = _a.stripedRowsPreference, customPreference = _a.customPreference, visibleContentPreference = _a.visibleContentPreference, onChange = _a.onChange;
    if (!visibleContentPreference &&
        !pageSizePreference &&
        !wrapLinesPreference &&
        !stripedRowsPreference &&
        customPreference) {
        return (React.createElement(CustomPreference, { value: preferences.custom, customPreference: customPreference, onChange: function (custom) { return onChange({ custom: custom }); } }));
    }
    return (React.createElement(ModalContentLayout, { left: React.createElement(InternalSpaceBetween, { size: "l" },
            pageSizePreference && (React.createElement(PageSizePreference, __assign({ value: preferences.pageSize }, pageSizePreference, { onChange: function (pageSize) { return onChange({ pageSize: pageSize }); } }))),
            wrapLinesPreference && (React.createElement(WrapLinesPreference, __assign({ value: preferences.wrapLines }, wrapLinesPreference, { onChange: function (wrapLines) { return onChange({ wrapLines: wrapLines }); } }))),
            stripedRowsPreference && (React.createElement(StripedRowsPreference, __assign({ value: preferences.stripedRows }, stripedRowsPreference, { onChange: function (stripedRows) { return onChange({ stripedRows: stripedRows }); } }))),
            customPreference && (React.createElement(CustomPreference, { value: preferences.custom, customPreference: customPreference, onChange: function (custom) { return onChange({ custom: custom }); } }))), right: visibleContentPreference && (React.createElement(VisibleContentPreference, __assign({ value: preferences.visibleContent }, visibleContentPreference, { onChange: function (visibleContent) { return onChange({ visibleContent: visibleContent }); } }))) }));
};
export default function CollectionPreferences(_a) {
    var title = _a.title, confirmLabel = _a.confirmLabel, cancelLabel = _a.cancelLabel, _b = _a.disabled, disabled = _b === void 0 ? false : _b, onConfirm = _a.onConfirm, onCancel = _a.onCancel, visibleContentPreference = _a.visibleContentPreference, pageSizePreference = _a.pageSizePreference, wrapLinesPreference = _a.wrapLinesPreference, stripedRowsPreference = _a.stripedRowsPreference, preferences = _a.preferences, customPreference = _a.customPreference, rest = __rest(_a, ["title", "confirmLabel", "cancelLabel", "disabled", "onConfirm", "onCancel", "visibleContentPreference", "pageSizePreference", "wrapLinesPreference", "stripedRowsPreference", "preferences", "customPreference"]);
    var __internalRootRef = useBaseComponent('CollectionPreferences').__internalRootRef;
    checkControlled('CollectioPreferences', 'preferences', preferences, 'onConfirm', onConfirm);
    var baseProps = getBaseProps(rest);
    var _c = useState(false), modalVisible = _c[0], setModalVisible = _c[1];
    var _d = useState(copyPreferences(preferences || {})), temporaryPreferences = _d[0], setTemporaryPreferences = _d[1];
    var triggerRef = useRef(null);
    var dialogPreviouslyOpen = useRef(false);
    useEffect(function () {
        if (!modalVisible) {
            dialogPreviouslyOpen.current && triggerRef.current && triggerRef.current.focus();
        }
        else {
            dialogPreviouslyOpen.current = true;
        }
    }, [modalVisible]);
    var onConfirmListener = function () {
        setModalVisible(false);
        fireNonCancelableEvent(onConfirm, temporaryPreferences);
    };
    var onCancelListener = function () {
        fireNonCancelableEvent(onCancel, {});
        setModalVisible(false);
        setTemporaryPreferences(copyPreferences(preferences || {}));
    };
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(baseProps.className, styles.root), ref: __internalRootRef }),
        React.createElement(InternalButton, { ref: triggerRef, className: styles['trigger-button'], disabled: disabled, ariaLabel: title, onClick: function () {
                setTemporaryPreferences(copyPreferences(preferences || {}));
                setModalVisible(true);
            }, variant: "icon", iconName: "settings", formAction: "none" }),
        !disabled && modalVisible && (React.createElement(InternalModal, { className: styles['modal-root'], visible: true, header: title, footer: React.createElement(InternalBox, { float: "right" },
                React.createElement(InternalSpaceBetween, { direction: "horizontal", size: "xs" },
                    React.createElement(InternalButton, { className: styles['cancel-button'], variant: "link", formAction: "none", onClick: onCancelListener }, cancelLabel),
                    React.createElement(InternalButton, { className: styles['confirm-button'], variant: "primary", formAction: "none", onClick: onConfirmListener }, confirmLabel))), closeAriaLabel: cancelLabel, size: "large", onDismiss: onCancelListener },
            React.createElement(ModalContent, { preferences: temporaryPreferences, visibleContentPreference: visibleContentPreference, pageSizePreference: pageSizePreference, wrapLinesPreference: wrapLinesPreference, stripedRowsPreference: stripedRowsPreference, customPreference: customPreference, onChange: function (changedPreferences) {
                    return setTemporaryPreferences(mergePreferences(changedPreferences, temporaryPreferences));
                } })))));
}
applyDisplayName(CollectionPreferences, 'CollectionPreferences');
//# sourceMappingURL=index.js.map