import { useEffect, useRef } from 'react';
import defaultOptionDescription from '../../internal/components/option/option-announcer';
/**
 * The hook produces the live region string to be announced when an option is highlighted.
 * This is a workaround to account for the issues with assistive technologies.
 *
 * If the testing reveals no issues with the native announcements the live-region can be removed.
 */
export function useAnnouncement(_a) {
    var announceSelected = _a.announceSelected, highlightedOption = _a.highlightedOption, getParent = _a.getParent, selectedAriaLabel = _a.selectedAriaLabel, renderHighlightedAriaLive = _a.renderHighlightedAriaLive;
    var prevAnnouncedGroup = useRef(undefined);
    // Record previously announced group with a delay to account for possible re-renders of the hook.
    useEffect(function () {
        if (highlightedOption) {
            var frameId_1 = requestAnimationFrame(function () {
                prevAnnouncedGroup.current = getParent(highlightedOption);
            });
            return function () { return cancelAnimationFrame(frameId_1); };
        }
    });
    if (!highlightedOption) {
        return '';
    }
    var option = highlightedOption.option;
    var parent = getParent(highlightedOption);
    // Only announce parent group if it wasn't announced with previous option.
    var group = parent && parent !== prevAnnouncedGroup.current ? parent : undefined;
    // Use custom renderer if provided.
    if (renderHighlightedAriaLive) {
        return renderHighlightedAriaLive(option, group);
    }
    // Use default renderer with selected ARIA label if defined and relevant.
    var selectedAnnouncement = announceSelected && selectedAriaLabel ? selectedAriaLabel : '';
    var defaultDescription = defaultOptionDescription(option, group);
    return [selectedAnnouncement, defaultDescription].filter(Boolean).join(' ');
}
//# sourceMappingURL=use-announcement.js.map