var ARROW_OFFSET = 12;
export var PRIORITY_MAPPING = {
    top: [
        'top-center',
        'top-right',
        'top-left',
        'bottom-center',
        'bottom-right',
        'bottom-left',
        'right-top',
        'right-bottom',
        'left-top',
        'left-bottom',
    ],
    bottom: [
        'bottom-center',
        'bottom-right',
        'bottom-left',
        'top-center',
        'top-right',
        'top-left',
        'right-top',
        'right-bottom',
        'left-top',
        'left-bottom',
    ],
    left: [
        'left-top',
        'left-bottom',
        'right-top',
        'right-bottom',
        'bottom-center',
        'top-center',
        'bottom-left',
        'top-left',
        'bottom-right',
        'top-right',
    ],
    right: [
        'right-top',
        'right-bottom',
        'left-top',
        'left-bottom',
        'bottom-center',
        'top-center',
        'bottom-right',
        'top-right',
        'bottom-left',
        'top-left',
    ]
};
var RECTANGLE_CALCULATIONS = {
    'top-center': function (_a) {
        var body = _a.body, trigger = _a.trigger, arrow = _a.arrow;
        return {
            top: trigger.top - body.height - arrow.height,
            left: trigger.left + trigger.width / 2 - body.width / 2,
            width: body.width,
            height: body.height
        };
    },
    'top-right': function (_a) {
        var body = _a.body, trigger = _a.trigger, arrow = _a.arrow;
        return {
            top: trigger.top - body.height - arrow.height,
            left: trigger.left,
            width: body.width,
            height: body.height
        };
    },
    'top-left': function (_a) {
        var body = _a.body, trigger = _a.trigger, arrow = _a.arrow;
        return {
            top: trigger.top - body.height - arrow.height,
            left: trigger.left + trigger.width - body.width,
            width: body.width,
            height: body.height
        };
    },
    'bottom-center': function (_a) {
        var body = _a.body, trigger = _a.trigger, arrow = _a.arrow;
        return {
            top: trigger.top + trigger.height + arrow.height,
            left: trigger.left + trigger.width / 2 - body.width / 2,
            width: body.width,
            height: body.height
        };
    },
    'bottom-right': function (_a) {
        var body = _a.body, trigger = _a.trigger, arrow = _a.arrow;
        return {
            top: trigger.top + trigger.height + arrow.height,
            left: trigger.left,
            width: body.width,
            height: body.height
        };
    },
    'bottom-left': function (_a) {
        var body = _a.body, trigger = _a.trigger, arrow = _a.arrow;
        return {
            top: trigger.top + trigger.height + arrow.height,
            left: trigger.left + trigger.width - body.width,
            width: body.width,
            height: body.height
        };
    },
    'right-top': function (_a) {
        var body = _a.body, trigger = _a.trigger, arrow = _a.arrow;
        return {
            top: trigger.top + trigger.height / 2 - ARROW_OFFSET - arrow.height,
            left: trigger.left + trigger.width + arrow.height,
            width: body.width,
            height: body.height
        };
    },
    'right-bottom': function (_a) {
        var body = _a.body, trigger = _a.trigger, arrow = _a.arrow;
        return {
            top: trigger.top + trigger.height / 2 - body.height + ARROW_OFFSET + arrow.height,
            left: trigger.left + trigger.width + arrow.height,
            width: body.width,
            height: body.height
        };
    },
    'left-top': function (_a) {
        var body = _a.body, trigger = _a.trigger, arrow = _a.arrow;
        return {
            top: trigger.top + trigger.height / 2 - ARROW_OFFSET - arrow.height,
            left: trigger.left - body.width - arrow.height,
            width: body.width,
            height: body.height
        };
    },
    'left-bottom': function (_a) {
        var body = _a.body, trigger = _a.trigger, arrow = _a.arrow;
        return {
            top: trigger.top + trigger.height / 2 - body.height + ARROW_OFFSET + arrow.height,
            left: trigger.left - body.width - arrow.height,
            width: body.width,
            height: body.height
        };
    }
};
/**
 * Returns whether one rectangle fits in another.
 */
function canRectFit(inner, outer) {
    return (inner.left >= outer.left &&
        inner.top >= outer.top &&
        inner.left + inner.width <= outer.left + outer.width &&
        inner.top + inner.height <= outer.top + outer.height);
}
function fitIntoContainer(inner, outer) {
    var left = inner.left, width = inner.width, top = inner.top, height = inner.height;
    // Adjust left boundary.
    if (left < outer.left) {
        width = left + width - outer.left;
        left = outer.left;
    }
    // Adjust right boundary.
    else if (left + width > outer.left + outer.width) {
        width = outer.left + outer.width - left;
    }
    // Adjust top boundary.
    if (top < outer.top) {
        height = top + height - outer.top;
        top = outer.top;
    }
    // Adjust bottom boundary.
    else if (top + height > outer.top + outer.height) {
        height = outer.top + outer.height - top;
    }
    return { left: left, width: width, top: top, height: height };
}
function getLargestRect(rect1, rect2) {
    var area1 = rect1.height * rect1.width;
    var area2 = rect2.height * rect2.width;
    return area1 >= area2 ? rect1 : rect2;
}
/**
 * Returns the area of the intersection of passed in rectangles or a null, if there is no intersection
 */
export function intersectRectangles(rectangles) {
    var boundingOffset = null;
    for (var _i = 0, rectangles_1 = rectangles; _i < rectangles_1.length; _i++) {
        var currentRect = rectangles_1[_i];
        if (!boundingOffset) {
            boundingOffset = currentRect;
            continue;
        }
        var left = Math.max(boundingOffset.left, currentRect.left);
        var top_1 = Math.max(boundingOffset.top, currentRect.top);
        var right = Math.min(boundingOffset.left + boundingOffset.width, currentRect.left + currentRect.width);
        var bottom = Math.min(boundingOffset.top + boundingOffset.height, currentRect.top + currentRect.height);
        if (right < left || bottom < top_1) {
            return null;
        }
        boundingOffset = {
            left: left,
            top: top_1,
            width: right - left,
            height: bottom - top_1
        };
    }
    return boundingOffset && boundingOffset.height * boundingOffset.width;
}
/**
 * A functions that returns the correct popover position based on screen dimensions.
 */
export function calculatePosition(preferred, trigger, arrow, body, container, viewport, 
// the popover is only bound by the viewport if it is rendered in a portal
renderWithPortal) {
    var bestPositionOutsideViewport = null;
    var largestArea = 0;
    // Attempt to position the popover based on the priority list for this position,
    // trying to fit it inside the container and inside the viewport.
    for (var _i = 0, _a = PRIORITY_MAPPING[preferred]; _i < _a.length; _i++) {
        var internalPosition_1 = _a[_i];
        var boundingOffset = RECTANGLE_CALCULATIONS[internalPosition_1]({ body: body, trigger: trigger, arrow: arrow });
        var fitsInContainer = renderWithPortal || canRectFit(boundingOffset, container);
        var fitsInViewport = canRectFit(boundingOffset, viewport);
        if (fitsInContainer && fitsInViewport) {
            return { internalPosition: internalPosition_1, boundingOffset: boundingOffset };
        }
        var boundingRectangles = [boundingOffset, viewport];
        if (!renderWithPortal) {
            boundingRectangles.push(container);
        }
        var availableArea = intersectRectangles(boundingRectangles);
        if (availableArea && availableArea > largestArea) {
            bestPositionOutsideViewport = { internalPosition: internalPosition_1, boundingOffset: boundingOffset };
            largestArea = availableArea;
        }
    }
    // Use best possible placement.
    var internalPosition = (bestPositionOutsideViewport === null || bestPositionOutsideViewport === void 0 ? void 0 : bestPositionOutsideViewport.internalPosition) || 'right-top';
    // Get default rect for that placement.
    var defaultOffset = RECTANGLE_CALCULATIONS[internalPosition]({ body: body, trigger: trigger, arrow: arrow });
    // Get largest possible rect that fits into viewport or container.
    var optimisedOffset = fitIntoContainer(defaultOffset, renderWithPortal ? viewport : getLargestRect(container, viewport));
    // If largest possible rect is smaller than original - set body scroll.
    var scrollable = optimisedOffset.height < defaultOffset.height;
    return { internalPosition: internalPosition, boundingOffset: optimisedOffset, scrollable: scrollable };
}
//# sourceMappingURL=positions.js.map