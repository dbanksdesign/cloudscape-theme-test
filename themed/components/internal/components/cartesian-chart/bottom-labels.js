// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { memo, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { TICK_LENGTH, TICK_LINE_HEIGHT, TICK_MARGIN } from './constants';
import styles from './styles.css.js';
import { formatTicks, getVisibleTicks } from './label-utils';
export default memo(BottomLabels);
// Renders the visible tick labels on the bottom axis, as well as their grid lines.
function BottomLabels(_a) {
    var _b = _a.axis, axis = _b === void 0 ? 'x' : _b, width = _a.width, height = _a.height, scale = _a.scale, ticks = _a.ticks, tickFormatter = _a.tickFormatter, title = _a.title, ariaRoleDescription = _a.ariaRoleDescription, autoHeight = _a.autoHeight, _c = _a.offsetLeft, offsetLeft = _c === void 0 ? 0 : _c, _d = _a.offsetRight, offsetRight = _d === void 0 ? 0 : _d;
    var virtualTextRef = useRef(null);
    var xOffset = scale.isCategorical() && axis === 'x' ? Math.max(0, scale.d3Scale.bandwidth() - 1) / 2 : 0;
    var cacheRef = useRef({});
    var getLabelSpace = function (label) {
        if (cacheRef.current[label] !== undefined) {
            return cacheRef.current[label];
        }
        if (virtualTextRef.current && virtualTextRef.current.getComputedTextLength) {
            virtualTextRef.current.textContent = label;
            cacheRef.current[label] = virtualTextRef.current.getComputedTextLength();
            return cacheRef.current[label];
        }
        return 0;
    };
    var formattedTicks = formatTicks({ ticks: ticks, scale: scale, getLabelSpace: getLabelSpace, tickFormatter: tickFormatter });
    if (virtualTextRef.current) {
        virtualTextRef.current.textContent = '';
    }
    var from = 0 - offsetLeft - xOffset;
    var until = width + offsetRight - xOffset;
    var balanceLabels = axis === 'x' && scale.scaleType !== 'log';
    var visibleTicks = getVisibleTicks(formattedTicks, from, until, balanceLabels);
    var maxHeight = TICK_LENGTH + TICK_MARGIN;
    for (var _i = 0, formattedTicks_1 = formattedTicks; _i < formattedTicks_1.length; _i++) {
        var lines = formattedTicks_1[_i].lines;
        maxHeight = Math.max(maxHeight, TICK_LENGTH + TICK_MARGIN + lines.length * TICK_LINE_HEIGHT);
    }
    // Tell elements's height to the parent.
    useEffect(function () {
        autoHeight(maxHeight);
    }, [autoHeight, maxHeight]);
    return (React.createElement("g", { transform: "translate(0,".concat(height, ")"), className: styles['labels-bottom'], "aria-label": title, role: "list", "aria-roledescription": ariaRoleDescription, "aria-hidden": true },
        visibleTicks.map(function (_a, index) {
            var _b;
            var position = _a.position, lines = _a.lines;
            return isFinite(position) && (React.createElement("g", { key: index, transform: "translate(".concat(position + xOffset, ",0)"), className: clsx(styles.ticks, styles['ticks--bottom'], (_b = {},
                    _b[styles['ticks--x']] = axis === 'x',
                    _b[styles['ticks--y']] = axis === 'y',
                    _b)), role: "listitem", "aria-label": lines.join('\n') },
                React.createElement("line", { className: styles.ticks__line, x1: 0, x2: 0, y1: 0, y2: TICK_LENGTH, "aria-hidden": "true" }),
                lines.map(function (line, lineIndex) { return (React.createElement("text", { className: styles.ticks__text, key: lineIndex, x: 0, y: TICK_LENGTH + TICK_MARGIN + lineIndex * TICK_LINE_HEIGHT }, line)); })));
        }),
        React.createElement("text", { ref: virtualTextRef, x: 0, y: 0, style: { visibility: 'hidden' }, "aria-hidden": "true" })));
}
//# sourceMappingURL=bottom-labels.js.map