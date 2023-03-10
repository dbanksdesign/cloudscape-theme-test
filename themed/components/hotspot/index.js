import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useEffect } from 'react';
import styles from './styles.css.js';
import { hotspotContext as hotspotContextType } from '../annotation-context/context';
import clsx from 'clsx';
import { getBaseProps } from '../internal/base-component';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import useBaseComponent from '../internal/hooks/use-base-component';
export default function Hotspot(_a) {
    var children = _a.children, hotspotId = _a.hotspotId, _b = _a.side, side = _b === void 0 ? 'right' : _b, _c = _a.direction, direction = _c === void 0 ? 'top' : _c, restProps = __rest(_a, ["children", "hotspotId", "side", "direction"]);
    var __internalRootRef = useBaseComponent('Hotspot').__internalRootRef;
    var baseProps = getBaseProps(restProps);
    var hotspotContext = useContext(hotspotContextType);
    var content = hotspotContext.getContentForId(hotspotId, direction);
    var unregisterHotspot = hotspotContext.unregisterHotspot, registerHotspot = hotspotContext.registerHotspot;
    useEffect(function () {
        registerHotspot(hotspotId);
        return function () { return unregisterHotspot(hotspotId); };
    }, [hotspotId, unregisterHotspot, registerHotspot]);
    if (children) {
        return (React.createElement("div", __assign({}, baseProps, { className: clsx(baseProps.className, styles.root, styles.wrapper), ref: __internalRootRef }),
            React.createElement("div", { className: styles.elementWrapper }, children),
            React.createElement("div", { className: clsx(styles.markerWrapper, styles["placement-".concat(side)]), onClick: function (e) { return e.stopPropagation(); } }, content)));
    }
    return (React.createElement("span", __assign({}, baseProps, { className: clsx(baseProps.className, styles.root, styles.inlineWrapper), ref: __internalRootRef, onClick: function (e) { return e.stopPropagation(); } }), content));
}
applyDisplayName(Hotspot, 'Hotspot');
//# sourceMappingURL=index.js.map