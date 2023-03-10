import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';
import InternalBox from '../box/internal';
import { getBaseProps } from '../internal/base-component';
import { fireNonCancelableEvent } from '../internal/events';
import useForwardFocus from '../internal/hooks/forward-focus';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import { S3InContext } from './s3-in-context';
import { S3Modal } from './s3-modal';
import styles from './styles.css.js';
import useBaseComponent from '../internal/hooks/use-base-component';
import { checkSafeUrl } from '../internal/utils/check-safe-url';
import { useFormFieldContext } from '../contexts/form-field';
var S3ResourceSelector = React.forwardRef(function (_a, ref) {
    var i18nStrings = _a.i18nStrings, alert = _a.alert, resource = _a.resource, viewHref = _a.viewHref, invalid = _a.invalid, _b = _a.selectableItemsTypes, selectableItemsTypes = _b === void 0 ? [] : _b, inputAriaDescribedby = _a.inputAriaDescribedby, _c = _a.bucketsVisibleColumns, bucketsVisibleColumns = _c === void 0 ? ['Name', 'CreationDate'] : _c, bucketsIsItemDisabled = _a.bucketsIsItemDisabled, fetchBuckets = _a.fetchBuckets, fetchObjects = _a.fetchObjects, _d = _a.objectsVisibleColumns, objectsVisibleColumns = _d === void 0 ? ['Key', 'LastModified', 'Size'] : _d, objectsIsItemDisabled = _a.objectsIsItemDisabled, fetchVersions = _a.fetchVersions, _e = _a.versionsVisibleColumns, versionsVisibleColumns = _e === void 0 ? ['ID', 'LastModified', 'Size'] : _e, versionsIsItemDisabled = _a.versionsIsItemDisabled, onChange = _a.onChange, ariaLabel = _a.ariaLabel, rest = __rest(_a, ["i18nStrings", "alert", "resource", "viewHref", "invalid", "selectableItemsTypes", "inputAriaDescribedby", "bucketsVisibleColumns", "bucketsIsItemDisabled", "fetchBuckets", "fetchObjects", "objectsVisibleColumns", "objectsIsItemDisabled", "fetchVersions", "versionsVisibleColumns", "versionsIsItemDisabled", "onChange", "ariaLabel"]);
    checkSafeUrl('S3ResourceSelector', viewHref);
    var __internalRootRef = useBaseComponent('S3ResourceSelector').__internalRootRef;
    var _f = useState(false), modalOpen = _f[0], setModalOpen = _f[1];
    var inContextRef = useRef(null);
    var modalWasSubmitted = useRef(false);
    useForwardFocus(ref, inContextRef);
    var _g = useFormFieldContext(rest), ariaLabelledby = _g.ariaLabelledby, ariaDescribedby = _g.ariaDescribedby;
    useEffect(function () {
        var _a;
        // Focus uriInput only when modal was submitted.
        // When it was dismissed, the focus naturally goes to previously focused element (browse button)
        if (!modalOpen && modalWasSubmitted.current) {
            modalWasSubmitted.current = false;
            (_a = inContextRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [modalOpen]);
    var baseProps = getBaseProps(rest);
    var modalProps = {
        alert: alert,
        i18nStrings: i18nStrings,
        fetchBuckets: fetchBuckets,
        selectableItemsTypes: selectableItemsTypes,
        bucketsVisibleColumns: bucketsVisibleColumns,
        bucketsIsItemDisabled: bucketsIsItemDisabled,
        fetchObjects: fetchObjects,
        objectsVisibleColumns: objectsVisibleColumns,
        objectsIsItemDisabled: objectsIsItemDisabled,
        fetchVersions: fetchVersions,
        versionsVisibleColumns: versionsVisibleColumns,
        versionsIsItemDisabled: versionsIsItemDisabled,
        onSubmit: function (resource) {
            fireNonCancelableEvent(onChange, { resource: resource });
            setModalOpen(false);
            modalWasSubmitted.current = true;
        },
        onDismiss: function () { return setModalOpen(false); }
    };
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(styles.root, baseProps.className), ref: __internalRootRef, role: "group", "aria-labelledby": ariaLabelledby, "aria-describedby": ariaDescribedby, "aria-label": ariaLabel }),
        React.createElement(S3InContext, { ref: inContextRef, selectableItemsTypes: selectableItemsTypes, i18nStrings: i18nStrings, resource: resource, viewHref: viewHref, invalid: invalid, inputAriaDescribedby: inputAriaDescribedby, fetchVersions: fetchVersions, onBrowse: function () { return setModalOpen(true); }, onChange: function (resource, errorText) { return fireNonCancelableEvent(onChange, { resource: resource, errorText: errorText }); } }),
        !modalOpen && alert && (React.createElement(InternalBox, { className: styles.alert, margin: { top: 's' } }, alert)),
        modalOpen && React.createElement(S3Modal, __assign({}, modalProps))));
});
applyDisplayName(S3ResourceSelector, 'S3ResourceSelector');
export default S3ResourceSelector;
//# sourceMappingURL=index.js.map