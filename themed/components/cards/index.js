import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useImperativeHandle, useRef } from 'react';
import styles from './styles.css.js';
import { getCardsPerRow } from './cards-layout-helper';
import { getBaseProps } from '../internal/base-component';
import { useContainerQuery } from '../internal/hooks/container-queries/use-container-query';
import ToolsHeader from '../table/tools-header';
import { getItemKey } from '../table/utils';
import { focusMarkers, useFocusMove, useSelection } from '../table/use-selection';
import SelectionControl from '../table/selection-control';
import InternalContainer from '../container/internal';
import InternalStatusIndicator from '../status-indicator/internal';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import stickyScrolling from '../table/sticky-scrolling';
import { useSupportsStickyHeader } from '../container/use-sticky-header';
import useBaseComponent from '../internal/hooks/use-base-component';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import LiveRegion from '../internal/components/live-region';
import useMouseDownTarget from '../internal/hooks/use-mouse-down-target';
var Cards = React.forwardRef(function (_a, ref) {
    var _b = _a.items, items = _b === void 0 ? [] : _b, cardDefinition = _a.cardDefinition, _c = _a.cardsPerRow, cardsPerRow = _c === void 0 ? [] : _c, header = _a.header, filter = _a.filter, pagination = _a.pagination, preferences = _a.preferences, empty = _a.empty, loading = _a.loading, loadingText = _a.loadingText, trackBy = _a.trackBy, selectedItems = _a.selectedItems, selectionType = _a.selectionType, isItemDisabled = _a.isItemDisabled, onSelectionChange = _a.onSelectionChange, ariaLabels = _a.ariaLabels, visibleSections = _a.visibleSections, stickyHeader = _a.stickyHeader, stickyHeaderVerticalOffset = _a.stickyHeaderVerticalOffset, _d = _a.variant, variant = _d === void 0 ? 'container' : _d, rest = __rest(_a, ["items", "cardDefinition", "cardsPerRow", "header", "filter", "pagination", "preferences", "empty", "loading", "loadingText", "trackBy", "selectedItems", "selectionType", "isItemDisabled", "onSelectionChange", "ariaLabels", "visibleSections", "stickyHeader", "stickyHeaderVerticalOffset", "variant"]);
    var __internalRootRef = useBaseComponent('Cards').__internalRootRef;
    var baseProps = getBaseProps(rest);
    var isRefresh = useVisualRefresh();
    var computedVariant = isRefresh ? variant : 'container';
    var instanceUniqueId = useUniqueId('cards');
    var cardsId = (baseProps === null || baseProps === void 0 ? void 0 : baseProps.id) || instanceUniqueId;
    var cardsHeaderId = header ? "".concat(cardsId, "-header") : undefined;
    var _e = useContainerQuery(function (_a) {
        var width = _a.width;
        return getCardsPerRow(width, cardsPerRow);
    }, [cardsPerRow]), columns = _e[0], measureRef = _e[1];
    var refObject = useRef(null);
    var mergedRef = useMergeRefs(measureRef, refObject, __internalRootRef);
    var getMouseDownTarget = useMouseDownTarget();
    var _f = useSelection({
        items: items,
        trackBy: trackBy,
        selectedItems: selectedItems,
        selectionType: selectionType,
        isItemDisabled: isItemDisabled,
        onSelectionChange: onSelectionChange,
        ariaLabels: ariaLabels
    }), isItemSelected = _f.isItemSelected, getItemSelectionProps = _f.getItemSelectionProps, updateShiftToggle = _f.updateShiftToggle;
    var hasToolsHeader = header || filter || pagination || preferences;
    var headerRef = useRef(null);
    var _g = stickyScrolling(refObject, headerRef), scrollToTop = _g.scrollToTop, scrollToItem = _g.scrollToItem;
    stickyHeader = useSupportsStickyHeader() && stickyHeader;
    var onCardFocus = function (event) {
        // When an element inside card receives focus we want to adjust the scroll.
        // However, that behavior is unwanted when the focus is received as result of a click
        // as it causes the click to never reach the target element.
        if (stickyHeader && !event.currentTarget.contains(getMouseDownTarget())) {
            scrollToItem(event.currentTarget);
        }
    };
    useImperativeHandle(ref, function () { return ({
        scrollToTop: function () {
            if (stickyHeader) {
                scrollToTop();
            }
        }
    }); }, [stickyHeader, scrollToTop]);
    var status;
    if (loading) {
        status = (React.createElement("div", { className: styles.loading },
            React.createElement(InternalStatusIndicator, { type: "loading" },
                React.createElement(LiveRegion, { visible: true }, loadingText))));
    }
    else if (empty && !items.length) {
        status = React.createElement("div", { className: styles.empty }, empty);
    }
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(baseProps.className, styles.root), ref: mergedRef }),
        React.createElement(InternalContainer, { header: hasToolsHeader && (React.createElement("div", { className: clsx(styles.header, isRefresh && styles['header-refresh'], styles["header-variant-".concat(computedVariant)]) },
                React.createElement(ToolsHeader, { header: header, filter: filter, pagination: pagination, preferences: preferences }))), disableContentPaddings: true, disableHeaderPaddings: computedVariant === 'full-page', variant: computedVariant === 'container' ? 'cards' : computedVariant, __stickyHeader: stickyHeader, __stickyOffset: stickyHeaderVerticalOffset, __headerRef: headerRef, __headerId: cardsHeaderId, __darkHeader: computedVariant === 'full-page' },
            React.createElement("div", { className: clsx(hasToolsHeader && styles['has-header']) }, status !== null && status !== void 0 ? status : (React.createElement(CardsList, { items: items, cardDefinition: cardDefinition, trackBy: trackBy, selectionType: selectionType, columns: columns, isItemSelected: isItemSelected, getItemSelectionProps: getItemSelectionProps, visibleSections: visibleSections, updateShiftToggle: updateShiftToggle, onFocus: onCardFocus, ariaDescribedby: cardsHeaderId, ariaLabelledby: cardsHeaderId }))))));
});
export default Cards;
var CardsList = function (_a) {
    var items = _a.items, cardDefinition = _a.cardDefinition, trackBy = _a.trackBy, selectionType = _a.selectionType, columns = _a.columns, isItemSelected = _a.isItemSelected, getItemSelectionProps = _a.getItemSelectionProps, visibleSections = _a.visibleSections, updateShiftToggle = _a.updateShiftToggle, onFocus = _a.onFocus, ariaLabelledby = _a.ariaLabelledby, ariaDescribedby = _a.ariaDescribedby;
    var selectable = !!selectionType;
    var _b = useFocusMove(selectionType, items.length), moveFocusDown = _b.moveFocusDown, moveFocusUp = _b.moveFocusUp;
    var visibleSectionsDefinition = cardDefinition.sections || [];
    visibleSectionsDefinition = visibleSections
        ? visibleSectionsDefinition.filter(function (section) { return section.id && visibleSections.indexOf(section.id) !== -1; })
        : visibleSectionsDefinition;
    var listRole = undefined;
    var listItemRole = undefined;
    if (selectable) {
        listRole = 'group';
        listItemRole = 'presentation';
    }
    return (React.createElement("ol", __assign({ className: clsx(styles.list, styles["list-grid-".concat(columns || 1)]), role: listRole, "aria-labelledby": ariaLabelledby, "aria-describedby": ariaDescribedby }, (focusMarkers && focusMarkers.root)), items.map(function (item, index) {
        var _a;
        return (React.createElement("li", __assign({ className: clsx(styles.card, (_a = {},
                _a[styles['card-selectable']] = selectable,
                _a[styles['card-selected']] = selectable && isItemSelected(item),
                _a)), key: getItemKey(trackBy, item, index), onFocus: onFocus }, (focusMarkers && focusMarkers.item), { role: listItemRole }),
            React.createElement("div", { className: styles['card-inner'] },
                React.createElement("div", { className: styles['card-header'] },
                    React.createElement("span", { className: styles['card-header-inner'] }, cardDefinition.header ? cardDefinition.header(item) : ''),
                    selectable && (React.createElement("div", { className: styles['selection-control'] },
                        React.createElement(SelectionControl, __assign({ onFocusDown: moveFocusDown, onFocusUp: moveFocusUp, onShiftToggle: updateShiftToggle }, getItemSelectionProps(item)))))),
                visibleSectionsDefinition.map(function (_a, index) {
                    var _b = _a.width, width = _b === void 0 ? 100 : _b, header = _a.header, content = _a.content, id = _a.id;
                    return (React.createElement("div", { key: id || index, className: styles.section, style: { width: "".concat(width, "%") } },
                        header ? React.createElement("div", { className: styles['section-header'] }, header) : '',
                        content ? React.createElement("div", { className: styles['section-content'] }, content(item)) : ''));
                }))));
    })));
};
applyDisplayName(Cards, 'Cards');
//# sourceMappingURL=index.js.map