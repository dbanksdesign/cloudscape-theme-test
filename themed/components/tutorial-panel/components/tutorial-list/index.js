import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import styles from './styles.css.js';
import InternalBox from '../../../box/internal';
import { InternalButton } from '../../../button/internal';
import InternalStatusIndicator from '../../../status-indicator/internal';
import InternalSpaceBetween from '../../../space-between/internal';
import { fireNonCancelableEvent } from '../../../internal/events/index.js';
import clsx from 'clsx';
import InternalAlert from '../../../alert/internal';
import InternalLink from '../../../link/internal';
import { useUniqueId } from '../../../internal/hooks/use-unique-id/index.js';
import { CSSTransition } from 'react-transition-group';
import InternalIcon from '../../../icon/internal';
import useFocusVisible from '../../../internal/hooks/focus-visible/index.js';
import { useVisualRefresh } from '../../../internal/hooks/use-visual-mode';
import { checkSafeUrl } from '../../../internal/utils/check-safe-url';
import LiveRegion from '../../../internal/components/live-region/index.js';
export default function TutorialList(_a) {
    var i18nStrings = _a.i18nStrings, tutorials = _a.tutorials, _b = _a.loading, loading = _b === void 0 ? false : _b, onStartTutorial = _a.onStartTutorial, downloadUrl = _a.downloadUrl;
    checkSafeUrl('TutorialPanel', downloadUrl);
    /*
    // Filtering is not available in the Beta release.
  
    const [searchTerm, setSearchTerm] = useState('');
  
    const onSearchChangeCallback: InputProps['onChange'] = useCallback(event => setSearchTerm(event.detail.value), [
      setSearchTerm
    ]);
  
    const filteredTutorials = tutorials.filter(tutorial => filteringFunction(tutorial, searchTerm))
    */
    var focusVisible = useFocusVisible();
    var isRefresh = useVisualRefresh();
    return (React.createElement(React.Fragment, null,
        React.createElement(InternalSpaceBetween, { size: "s" },
            React.createElement(InternalSpaceBetween, { size: "m" },
                React.createElement(InternalBox, { variant: "h2", fontSize: isRefresh ? 'heading-m' : 'heading-l', padding: { bottom: 'n' } }, i18nStrings.tutorialListTitle),
                React.createElement(InternalBox, { variant: "p", color: "text-body-secondary", padding: "n" }, i18nStrings.tutorialListDescription)),
            React.createElement(InternalSpaceBetween, { size: "l" },
                React.createElement("a", __assign({}, focusVisible, { href: downloadUrl, target: "_blank", rel: "noopener noreferrer", className: styles['download-link'], "aria-label": i18nStrings.labelTutorialListDownloadLink }),
                    React.createElement(InternalIcon, { name: "download" }),
                    React.createElement(InternalBox, { padding: { left: 'xs' }, color: "inherit", fontWeight: "bold", display: "inline" }, i18nStrings.tutorialListDownloadLinkText)),
                loading ? (React.createElement(InternalStatusIndicator, { type: "loading" },
                    React.createElement(LiveRegion, { visible: true }, i18nStrings.loadingText))) : (React.createElement(React.Fragment, null,
                    React.createElement("ul", { className: styles['tutorial-list'], role: "list" }, tutorials.map(function (tutorial, index) { return (React.createElement(Tutorial, { tutorial: tutorial, key: index, onStartTutorial: onStartTutorial, i18nStrings: i18nStrings })); }))))))));
}
function Tutorial(_a) {
    var _b;
    var tutorial = _a.tutorial, onStartTutorialEventHandler = _a.onStartTutorial, i18nStrings = _a.i18nStrings;
    checkSafeUrl('TutorialPanel', tutorial.learnMoreUrl);
    var controlId = useUniqueId();
    var triggerControldId = useUniqueId();
    var headerId = useUniqueId();
    var isRefresh = useVisualRefresh();
    var onStartTutorial = useCallback(function () {
        fireNonCancelableEvent(onStartTutorialEventHandler, { tutorial: tutorial });
    }, [onStartTutorialEventHandler, tutorial]);
    var _c = useState(!tutorial.prerequisitesNeeded && !tutorial.completed), expanded = _c[0], setExpanded = _c[1];
    var onClick = useCallback(function () {
        setExpanded(function (expanded) { return !expanded; });
    }, []);
    return (React.createElement("li", { className: styles['tutorial-box'], role: "listitem" },
        React.createElement(InternalSpaceBetween, { size: "xs" },
            React.createElement("div", { className: styles['tutorial-box-title'] },
                React.createElement(InternalBox, { variant: "h3", fontSize: isRefresh ? 'heading-s' : 'heading-m', id: headerId, margin: { right: 'xs' }, padding: "n", className: styles.title }, tutorial.title),
                React.createElement("div", { className: styles['button-wrapper'] },
                    React.createElement(InternalButton, { id: triggerControldId, variant: "icon", ariaExpanded: expanded, __nativeAttributes: {
                            'aria-controls': controlId,
                            'aria-labelledby': headerId
                        }, formAction: "none", onClick: onClick, className: expanded ? styles['collapse-button'] : styles['expand-button'], iconName: expanded ? 'angle-up' : 'angle-down' }))),
            tutorial.completed ? (React.createElement(InternalStatusIndicator, { __size: "inherit", type: "success", className: styles.completed, wrapText: true }, i18nStrings.tutorialCompletedText)) : null),
        React.createElement("div", { "aria-live": "polite" },
            React.createElement(CSSTransition, { "in": expanded, timeout: 30, classNames: { enter: styles['content-enter'] } },
                React.createElement("div", { className: clsx(styles['expandable-section'], expanded && styles.expanded), id: controlId },
                    React.createElement(InternalSpaceBetween, { size: "l" },
                        React.createElement(InternalSpaceBetween, { size: "m" },
                            tutorial.prerequisitesNeeded && tutorial.prerequisitesAlert && (React.createElement(InternalAlert, { type: "info", className: styles['prerequisites-alert'] }, tutorial.prerequisitesAlert)),
                            React.createElement(InternalSpaceBetween, { size: "s" },
                                React.createElement(InternalBox, { color: "text-body-secondary" },
                                    React.createElement("div", { className: clsx(styles['tutorial-description'], typeof tutorial.description === 'string' && styles['tutorial-description-plaintext']) }, tutorial.description)),
                                tutorial.learnMoreUrl && (React.createElement(InternalLink, { href: tutorial.learnMoreUrl, className: styles['learn-more-link'], externalIconAriaLabel: i18nStrings.labelLearnMoreExternalIcon, ariaLabel: i18nStrings.labelLearnMoreLink, external: true }, i18nStrings.learnMoreLinkText)))),
                        React.createElement(InternalBox, { margin: { bottom: 'xxs' } },
                            React.createElement(InternalButton, { onClick: onStartTutorial, disabled: (_b = tutorial.prerequisitesNeeded) !== null && _b !== void 0 ? _b : false, formAction: "none", className: styles.start }, tutorial.completed ? i18nStrings.restartTutorialButtonText : i18nStrings.startTutorialButtonText))))))));
}
//# sourceMappingURL=index.js.map