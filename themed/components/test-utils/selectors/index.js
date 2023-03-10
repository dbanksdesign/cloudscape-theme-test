"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceBetweenWrapper = exports.SideNavigationWrapper = exports.SelectWrapper = exports.SegmentedControlWrapper = exports.S3ResourceSelectorWrapper = exports.RadioGroupWrapper = exports.PropertyFilterWrapper = exports.ProgressBarWrapper = exports.PopoverWrapper = exports.PieChartWrapper = exports.PaginationWrapper = exports.MultiselectWrapper = exports.ModalWrapper = exports.MixedLineBarChartWrapper = exports.LinkWrapper = exports.LineChartWrapper = exports.InputWrapper = exports.IconWrapper = exports.HotspotWrapper = exports.HelpPanelWrapper = exports.HeaderWrapper = exports.GridWrapper = exports.FormFieldWrapper = exports.FormWrapper = exports.FlashbarWrapper = exports.ExpandableSectionWrapper = exports.DateRangePickerWrapper = exports.DatePickerWrapper = exports.DateInputWrapper = exports.ContentLayoutWrapper = exports.ContainerWrapper = exports.ColumnLayoutWrapper = exports.CollectionPreferencesWrapper = exports.CodeEditorWrapper = exports.CheckboxWrapper = exports.CardsWrapper = exports.CalendarWrapper = exports.ButtonDropdownWrapper = exports.ButtonWrapper = exports.BreadcrumbGroupWrapper = exports.BoxWrapper = exports.BarChartWrapper = exports.BadgeWrapper = exports.AutosuggestWrapper = exports.AttributeEditorWrapper = exports.AreaChartWrapper = exports.AppLayoutWrapper = exports.AnnotationWrapper = exports.AlertWrapper = exports.ElementWrapper = void 0;
exports.WizardWrapper = exports.TutorialPanelWrapper = exports.TopNavigationWrapper = exports.TokenGroupWrapper = exports.ToggleWrapper = exports.TimeInputWrapper = exports.TilesWrapper = exports.TextareaWrapper = exports.TextFilterWrapper = exports.TextContentWrapper = exports.TagEditorWrapper = exports.TabsWrapper = exports.TableWrapper = exports.StatusIndicatorWrapper = exports.SplitPanelWrapper = exports.SpinnerWrapper = void 0;
var selectors_1 = require("@cloudscape-design/test-utils-core/selectors");
Object.defineProperty(exports, "ElementWrapper", { enumerable: true, get: function () { return selectors_1.ElementWrapper; } });
var utils_1 = require("@cloudscape-design/test-utils-core/utils");
var alert_1 = require("./alert");
exports.AlertWrapper = alert_1.default;
var annotation_1 = require("./annotation");
exports.AnnotationWrapper = annotation_1.default;
var app_layout_1 = require("./app-layout");
exports.AppLayoutWrapper = app_layout_1.default;
var area_chart_1 = require("./area-chart");
exports.AreaChartWrapper = area_chart_1.default;
var attribute_editor_1 = require("./attribute-editor");
exports.AttributeEditorWrapper = attribute_editor_1.default;
var autosuggest_1 = require("./autosuggest");
exports.AutosuggestWrapper = autosuggest_1.default;
var badge_1 = require("./badge");
exports.BadgeWrapper = badge_1.default;
var bar_chart_1 = require("./bar-chart");
exports.BarChartWrapper = bar_chart_1.default;
var box_1 = require("./box");
exports.BoxWrapper = box_1.default;
var breadcrumb_group_1 = require("./breadcrumb-group");
exports.BreadcrumbGroupWrapper = breadcrumb_group_1.default;
var button_1 = require("./button");
exports.ButtonWrapper = button_1.default;
var button_dropdown_1 = require("./button-dropdown");
exports.ButtonDropdownWrapper = button_dropdown_1.default;
var calendar_1 = require("./calendar");
exports.CalendarWrapper = calendar_1.default;
var cards_1 = require("./cards");
exports.CardsWrapper = cards_1.default;
var checkbox_1 = require("./checkbox");
exports.CheckboxWrapper = checkbox_1.default;
var code_editor_1 = require("./code-editor");
exports.CodeEditorWrapper = code_editor_1.default;
var collection_preferences_1 = require("./collection-preferences");
exports.CollectionPreferencesWrapper = collection_preferences_1.default;
var column_layout_1 = require("./column-layout");
exports.ColumnLayoutWrapper = column_layout_1.default;
var container_1 = require("./container");
exports.ContainerWrapper = container_1.default;
var content_layout_1 = require("./content-layout");
exports.ContentLayoutWrapper = content_layout_1.default;
var date_input_1 = require("./date-input");
exports.DateInputWrapper = date_input_1.default;
var date_picker_1 = require("./date-picker");
exports.DatePickerWrapper = date_picker_1.default;
var date_range_picker_1 = require("./date-range-picker");
exports.DateRangePickerWrapper = date_range_picker_1.default;
var expandable_section_1 = require("./expandable-section");
exports.ExpandableSectionWrapper = expandable_section_1.default;
var flashbar_1 = require("./flashbar");
exports.FlashbarWrapper = flashbar_1.default;
var form_1 = require("./form");
exports.FormWrapper = form_1.default;
var form_field_1 = require("./form-field");
exports.FormFieldWrapper = form_field_1.default;
var grid_1 = require("./grid");
exports.GridWrapper = grid_1.default;
var header_1 = require("./header");
exports.HeaderWrapper = header_1.default;
var help_panel_1 = require("./help-panel");
exports.HelpPanelWrapper = help_panel_1.default;
var hotspot_1 = require("./hotspot");
exports.HotspotWrapper = hotspot_1.default;
var icon_1 = require("./icon");
exports.IconWrapper = icon_1.default;
var input_1 = require("./input");
exports.InputWrapper = input_1.default;
var line_chart_1 = require("./line-chart");
exports.LineChartWrapper = line_chart_1.default;
var link_1 = require("./link");
exports.LinkWrapper = link_1.default;
var mixed_line_bar_chart_1 = require("./mixed-line-bar-chart");
exports.MixedLineBarChartWrapper = mixed_line_bar_chart_1.default;
var modal_1 = require("./modal");
exports.ModalWrapper = modal_1.default;
var multiselect_1 = require("./multiselect");
exports.MultiselectWrapper = multiselect_1.default;
var pagination_1 = require("./pagination");
exports.PaginationWrapper = pagination_1.default;
var pie_chart_1 = require("./pie-chart");
exports.PieChartWrapper = pie_chart_1.default;
var popover_1 = require("./popover");
exports.PopoverWrapper = popover_1.default;
var progress_bar_1 = require("./progress-bar");
exports.ProgressBarWrapper = progress_bar_1.default;
var property_filter_1 = require("./property-filter");
exports.PropertyFilterWrapper = property_filter_1.default;
var radio_group_1 = require("./radio-group");
exports.RadioGroupWrapper = radio_group_1.default;
var s3_resource_selector_1 = require("./s3-resource-selector");
exports.S3ResourceSelectorWrapper = s3_resource_selector_1.default;
var segmented_control_1 = require("./segmented-control");
exports.SegmentedControlWrapper = segmented_control_1.default;
var select_1 = require("./select");
exports.SelectWrapper = select_1.default;
var side_navigation_1 = require("./side-navigation");
exports.SideNavigationWrapper = side_navigation_1.default;
var space_between_1 = require("./space-between");
exports.SpaceBetweenWrapper = space_between_1.default;
var spinner_1 = require("./spinner");
exports.SpinnerWrapper = spinner_1.default;
var split_panel_1 = require("./split-panel");
exports.SplitPanelWrapper = split_panel_1.default;
var status_indicator_1 = require("./status-indicator");
exports.StatusIndicatorWrapper = status_indicator_1.default;
var table_1 = require("./table");
exports.TableWrapper = table_1.default;
var tabs_1 = require("./tabs");
exports.TabsWrapper = tabs_1.default;
var tag_editor_1 = require("./tag-editor");
exports.TagEditorWrapper = tag_editor_1.default;
var text_content_1 = require("./text-content");
exports.TextContentWrapper = text_content_1.default;
var text_filter_1 = require("./text-filter");
exports.TextFilterWrapper = text_filter_1.default;
var textarea_1 = require("./textarea");
exports.TextareaWrapper = textarea_1.default;
var tiles_1 = require("./tiles");
exports.TilesWrapper = tiles_1.default;
var time_input_1 = require("./time-input");
exports.TimeInputWrapper = time_input_1.default;
var toggle_1 = require("./toggle");
exports.ToggleWrapper = toggle_1.default;
var token_group_1 = require("./token-group");
exports.TokenGroupWrapper = token_group_1.default;
var top_navigation_1 = require("./top-navigation");
exports.TopNavigationWrapper = top_navigation_1.default;
var tutorial_panel_1 = require("./tutorial-panel");
exports.TutorialPanelWrapper = tutorial_panel_1.default;
var wizard_1 = require("./wizard");
exports.WizardWrapper = wizard_1.default;
selectors_1.ElementWrapper.prototype.findAlert = function (selector) {
    var rootSelector = ".".concat(alert_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, alert_1.default);
};
selectors_1.ElementWrapper.prototype.findAnnotation = function (selector) {
    var rootSelector = ".".concat(annotation_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, annotation_1.default);
};
selectors_1.ElementWrapper.prototype.findAppLayout = function (selector) {
    var rootSelector = ".".concat(app_layout_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, app_layout_1.default);
};
selectors_1.ElementWrapper.prototype.findAreaChart = function (selector) {
    var rootSelector = ".".concat(area_chart_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, area_chart_1.default);
};
selectors_1.ElementWrapper.prototype.findAttributeEditor = function (selector) {
    var rootSelector = ".".concat(attribute_editor_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, attribute_editor_1.default);
};
selectors_1.ElementWrapper.prototype.findAutosuggest = function (selector) {
    var rootSelector = ".".concat(autosuggest_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, autosuggest_1.default);
};
selectors_1.ElementWrapper.prototype.findBadge = function (selector) {
    var rootSelector = ".".concat(badge_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, badge_1.default);
};
selectors_1.ElementWrapper.prototype.findBarChart = function (selector) {
    var rootSelector = ".".concat(bar_chart_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, bar_chart_1.default);
};
selectors_1.ElementWrapper.prototype.findBox = function (selector) {
    var rootSelector = ".".concat(box_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, box_1.default);
};
selectors_1.ElementWrapper.prototype.findBreadcrumbGroup = function (selector) {
    var rootSelector = ".".concat(breadcrumb_group_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, breadcrumb_group_1.default);
};
selectors_1.ElementWrapper.prototype.findButton = function (selector) {
    var rootSelector = ".".concat(button_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, button_1.default);
};
selectors_1.ElementWrapper.prototype.findButtonDropdown = function (selector) {
    var rootSelector = ".".concat(button_dropdown_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, button_dropdown_1.default);
};
selectors_1.ElementWrapper.prototype.findCalendar = function (selector) {
    var rootSelector = ".".concat(calendar_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, calendar_1.default);
};
selectors_1.ElementWrapper.prototype.findCards = function (selector) {
    var rootSelector = ".".concat(cards_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, cards_1.default);
};
selectors_1.ElementWrapper.prototype.findCheckbox = function (selector) {
    var rootSelector = ".".concat(checkbox_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, checkbox_1.default);
};
selectors_1.ElementWrapper.prototype.findCodeEditor = function (selector) {
    var rootSelector = ".".concat(code_editor_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, code_editor_1.default);
};
selectors_1.ElementWrapper.prototype.findCollectionPreferences = function (selector) {
    var rootSelector = ".".concat(collection_preferences_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, collection_preferences_1.default);
};
selectors_1.ElementWrapper.prototype.findColumnLayout = function (selector) {
    var rootSelector = ".".concat(column_layout_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, column_layout_1.default);
};
selectors_1.ElementWrapper.prototype.findContainer = function (selector) {
    var rootSelector = ".".concat(container_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, container_1.default);
};
selectors_1.ElementWrapper.prototype.findContentLayout = function (selector) {
    var rootSelector = ".".concat(content_layout_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, content_layout_1.default);
};
selectors_1.ElementWrapper.prototype.findDateInput = function (selector) {
    var rootSelector = ".".concat(date_input_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, date_input_1.default);
};
selectors_1.ElementWrapper.prototype.findDatePicker = function (selector) {
    var rootSelector = ".".concat(date_picker_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, date_picker_1.default);
};
selectors_1.ElementWrapper.prototype.findDateRangePicker = function (selector) {
    var rootSelector = ".".concat(date_range_picker_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, date_range_picker_1.default);
};
selectors_1.ElementWrapper.prototype.findExpandableSection = function (selector) {
    var rootSelector = ".".concat(expandable_section_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, expandable_section_1.default);
};
selectors_1.ElementWrapper.prototype.findFlashbar = function (selector) {
    var rootSelector = ".".concat(flashbar_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, flashbar_1.default);
};
selectors_1.ElementWrapper.prototype.findForm = function (selector) {
    var rootSelector = ".".concat(form_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, form_1.default);
};
selectors_1.ElementWrapper.prototype.findFormField = function (selector) {
    var rootSelector = ".".concat(form_field_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, form_field_1.default);
};
selectors_1.ElementWrapper.prototype.findGrid = function (selector) {
    var rootSelector = ".".concat(grid_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, grid_1.default);
};
selectors_1.ElementWrapper.prototype.findHeader = function (selector) {
    var rootSelector = ".".concat(header_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, header_1.default);
};
selectors_1.ElementWrapper.prototype.findHelpPanel = function (selector) {
    var rootSelector = ".".concat(help_panel_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, help_panel_1.default);
};
selectors_1.ElementWrapper.prototype.findHotspot = function (selector) {
    var rootSelector = ".".concat(hotspot_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, hotspot_1.default);
};
selectors_1.ElementWrapper.prototype.findIcon = function (selector) {
    var rootSelector = ".".concat(icon_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, icon_1.default);
};
selectors_1.ElementWrapper.prototype.findInput = function (selector) {
    var rootSelector = ".".concat(input_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, input_1.default);
};
selectors_1.ElementWrapper.prototype.findLineChart = function (selector) {
    var rootSelector = ".".concat(line_chart_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, line_chart_1.default);
};
selectors_1.ElementWrapper.prototype.findLink = function (selector) {
    var rootSelector = ".".concat(link_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, link_1.default);
};
selectors_1.ElementWrapper.prototype.findMixedLineBarChart = function (selector) {
    var rootSelector = ".".concat(mixed_line_bar_chart_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, mixed_line_bar_chart_1.default);
};
selectors_1.ElementWrapper.prototype.findModal = function (selector) {
    var rootSelector = ".".concat(modal_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, modal_1.default);
};
selectors_1.ElementWrapper.prototype.findMultiselect = function (selector) {
    var rootSelector = ".".concat(multiselect_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, multiselect_1.default);
};
selectors_1.ElementWrapper.prototype.findPagination = function (selector) {
    var rootSelector = ".".concat(pagination_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, pagination_1.default);
};
selectors_1.ElementWrapper.prototype.findPieChart = function (selector) {
    var rootSelector = ".".concat(pie_chart_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, pie_chart_1.default);
};
selectors_1.ElementWrapper.prototype.findPopover = function (selector) {
    var rootSelector = ".".concat(popover_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, popover_1.default);
};
selectors_1.ElementWrapper.prototype.findProgressBar = function (selector) {
    var rootSelector = ".".concat(progress_bar_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, progress_bar_1.default);
};
selectors_1.ElementWrapper.prototype.findPropertyFilter = function (selector) {
    var rootSelector = ".".concat(property_filter_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, property_filter_1.default);
};
selectors_1.ElementWrapper.prototype.findRadioGroup = function (selector) {
    var rootSelector = ".".concat(radio_group_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, radio_group_1.default);
};
selectors_1.ElementWrapper.prototype.findS3ResourceSelector = function (selector) {
    var rootSelector = ".".concat(s3_resource_selector_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, s3_resource_selector_1.default);
};
selectors_1.ElementWrapper.prototype.findSegmentedControl = function (selector) {
    var rootSelector = ".".concat(segmented_control_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, segmented_control_1.default);
};
selectors_1.ElementWrapper.prototype.findSelect = function (selector) {
    var rootSelector = ".".concat(select_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, select_1.default);
};
selectors_1.ElementWrapper.prototype.findSideNavigation = function (selector) {
    var rootSelector = ".".concat(side_navigation_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, side_navigation_1.default);
};
selectors_1.ElementWrapper.prototype.findSpaceBetween = function (selector) {
    var rootSelector = ".".concat(space_between_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, space_between_1.default);
};
selectors_1.ElementWrapper.prototype.findSpinner = function (selector) {
    var rootSelector = ".".concat(spinner_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, spinner_1.default);
};
selectors_1.ElementWrapper.prototype.findSplitPanel = function (selector) {
    var rootSelector = ".".concat(split_panel_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, split_panel_1.default);
};
selectors_1.ElementWrapper.prototype.findStatusIndicator = function (selector) {
    var rootSelector = ".".concat(status_indicator_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, status_indicator_1.default);
};
selectors_1.ElementWrapper.prototype.findTable = function (selector) {
    var rootSelector = ".".concat(table_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, table_1.default);
};
selectors_1.ElementWrapper.prototype.findTabs = function (selector) {
    var rootSelector = ".".concat(tabs_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, tabs_1.default);
};
selectors_1.ElementWrapper.prototype.findTagEditor = function (selector) {
    var rootSelector = ".".concat(tag_editor_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, tag_editor_1.default);
};
selectors_1.ElementWrapper.prototype.findTextContent = function (selector) {
    var rootSelector = ".".concat(text_content_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, text_content_1.default);
};
selectors_1.ElementWrapper.prototype.findTextFilter = function (selector) {
    var rootSelector = ".".concat(text_filter_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, text_filter_1.default);
};
selectors_1.ElementWrapper.prototype.findTextarea = function (selector) {
    var rootSelector = ".".concat(textarea_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, textarea_1.default);
};
selectors_1.ElementWrapper.prototype.findTiles = function (selector) {
    var rootSelector = ".".concat(tiles_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, tiles_1.default);
};
selectors_1.ElementWrapper.prototype.findTimeInput = function (selector) {
    var rootSelector = ".".concat(time_input_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, time_input_1.default);
};
selectors_1.ElementWrapper.prototype.findToggle = function (selector) {
    var rootSelector = ".".concat(toggle_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, toggle_1.default);
};
selectors_1.ElementWrapper.prototype.findTokenGroup = function (selector) {
    var rootSelector = ".".concat(token_group_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, token_group_1.default);
};
selectors_1.ElementWrapper.prototype.findTopNavigation = function (selector) {
    var rootSelector = ".".concat(top_navigation_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, top_navigation_1.default);
};
selectors_1.ElementWrapper.prototype.findTutorialPanel = function (selector) {
    var rootSelector = ".".concat(tutorial_panel_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, tutorial_panel_1.default);
};
selectors_1.ElementWrapper.prototype.findWizard = function (selector) {
    var rootSelector = ".".concat(wizard_1.default.rootSelector);
    // casting to 'any' is needed to avoid this issue with generics
    // https://github.com/microsoft/TypeScript/issues/29132
    return this.findComponent(selector ? (0, utils_1.appendSelector)(selector, rootSelector) : rootSelector, wizard_1.default);
};
function wrapper(root) {
    if (root === void 0) { root = 'body'; }
    return new selectors_1.ElementWrapper(root);
}
exports.default = wrapper;
//# sourceMappingURL=index.js.map