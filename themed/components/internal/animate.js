// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __assign } from "tslib";
export function getDOMRects(elements) {
    var rects = {};
    for (var id in elements) {
        var element = elements[id];
        if (element) {
            rects[id] = element.getBoundingClientRect();
        }
    }
    return rects;
}
/*
  Animate DOM elements based on the FLIP technique
  - https://aerotwist.com/blog/flip-your-animations/
  - https://css-tricks.com/animating-layouts-with-the-flip-technique/

  This can be useful when the initial dimensions or position of the element is not known,
  so the initial offset or scaling needs to be retrieved via JS.

  Caveat: this currently does not support elements having CSS transforms in the end state.
  These would be overridden in the animation instead of combined.
 */
export function animate(_a) {
    var oldState = _a.oldState, elements = _a.elements, onTransitionsEnd = _a.onTransitionsEnd, newElementInitialState = _a.newElementInitialState;
    // First, apply the transform that will make the elements "look like" in the start position
    for (var id in elements) {
        var element = elements[id];
        var oldRect = oldState[id];
        if (element) {
            var newRect = element.getBoundingClientRect();
            var noOpTransform = { scale: 1, x: 0, y: 0 };
            // Calculate initial position.
            // If the element didn't exist previously, use the newElementInitialState function if provided.
            // If not, default to no transitions (scale: 1, y: 0)
            var calculatedInverseTransform = oldRect
                ? {
                    scale: oldRect.width / newRect.width,
                    x: (oldRect.left + oldRect.right) / 2 - (newRect.left + newRect.right) / 2,
                    y: (oldRect.top + oldRect.bottom) / 2 - (newRect.top + newRect.bottom) / 2
                }
                : newElementInitialState
                    ? newElementInitialState(newRect)
                    : {};
            var inverseTransform = __assign(__assign({}, noOpTransform), calculatedInverseTransform);
            // Apply this initial change, without animating
            element.style.transitionProperty = 'none';
            element.style.transform = "scale(".concat(inverseTransform.scale, ") translate(").concat(inverseTransform.x, "px, ").concat(inverseTransform.y, "px)");
            if (!oldRect) {
                // If the element didn't exist, then fade it in
                // (besides any other possibly defined transitions based on `newElementInitialState`)
                element.style.opacity = '0';
            }
        }
    }
    // Animate from the initial state to the end state
    requestAnimationFrame(function () {
        var ongoingAnimations = new Set();
        var _loop_1 = function (id) {
            var element = elements[id];
            if (element) {
                var oldRect = oldState[id];
                if (oldRect) {
                    // Animate from here on
                    element.style.transitionProperty = "transform";
                    // Unset inline CSS transforms so that the final state is applied
                    element.style.transform = '';
                }
                else {
                    // If the element didn't exist previously, fade in as well
                    element.style.transitionProperty = "transform, opacity";
                    element.style.transform = '';
                    element.style.opacity = '';
                }
                var onTransitionStart_1 = function (event) {
                    if (event.target === element) {
                        ongoingAnimations.add(id);
                        element.removeEventListener('transitionstart', onTransitionStart_1);
                    }
                };
                var onTransitionEnd_1 = function (event) {
                    if (event.target === element) {
                        // Clean up remaining inline styles
                        element.style.transitionProperty = '';
                        element.removeEventListener('transitionstart', onTransitionEnd_1);
                        if (onTransitionsEnd) {
                            ongoingAnimations["delete"](id);
                            if (ongoingAnimations.size === 0) {
                                onTransitionsEnd();
                            }
                        }
                    }
                };
                element.addEventListener('transitionstart', onTransitionStart_1);
                element.addEventListener('transitionend', onTransitionEnd_1);
            }
        };
        for (var id in elements) {
            _loop_1(id);
        }
    });
}
//# sourceMappingURL=animate.js.map