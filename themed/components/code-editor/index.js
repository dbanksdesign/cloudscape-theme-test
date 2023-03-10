import { __assign, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { getBaseProps } from '../internal/base-component';
import { KeyCode } from '../internal/keycode';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { Pane } from './pane';
import { useChangeEffect } from './listeners';
import { getDefaultConfig, getAceTheme, getLanguageLabel, DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME, getDefaultTheme, } from './util';
import { fireNonCancelableEvent } from '../internal/events';
import { setupEditor } from './setup-editor';
import { ResizableBox } from './resizable-box';
import PreferencesModal from './preferences-modal';
import LoadingScreen from './loading-screen';
import ErrorScreen from './error-screen';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import { useContainerQuery } from '../internal/hooks/container-queries/use-container-query';
import useBaseComponent from '../internal/hooks/use-base-component';
import { useCurrentMode } from '../internal/hooks/use-visual-mode';
import { StatusBar } from './status-bar';
import { useFormFieldContext } from '../internal/context/form-field-context';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import { useControllable } from '../internal/hooks/use-controllable';
import LiveRegion from '../internal/components/live-region';
import styles from './styles.css.js';
export default function CodeEditor(props) {
    var _a;
    var __internalRootRef = useBaseComponent('CodeEditor').__internalRootRef;
    var _b = useFormFieldContext(props), controlId = _b.controlId, ariaLabelledby = _b.ariaLabelledby, ariaDescribedby = _b.ariaDescribedby;
    var ace = props.ace, value = props.value, language = props.language, i18nStrings = props.i18nStrings, editorContentHeight = props.editorContentHeight, onEditorContentResize = props.onEditorContentResize, customLanguageLabel = props.languageLabel, rest = __rest(props, ["ace", "value", "language", "i18nStrings", "editorContentHeight", "onEditorContentResize", "languageLabel"]);
    var _c = useControllable(editorContentHeight, onEditorContentResize, 480, {
        componentName: 'code-editor',
        changeHandler: 'onEditorContentResize',
        controlledProp: 'editorContentHeight'
    }), _d = _c[0], editorHeight = _d === void 0 ? 480 : _d, setEditorHeight = _c[1];
    var baseProps = getBaseProps(rest);
    var _e = useState(), editor = _e[0], setEditor = _e[1];
    var mode = useCurrentMode(__internalRootRef);
    var defaultTheme = mode === 'dark' ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    var editorRef = useCallback(function (elem) {
        if (!ace || !elem) {
            return;
        }
        var config = getDefaultConfig();
        setEditor(ace.edit(elem, __assign(__assign({}, config), { theme: getAceTheme(getDefaultTheme(elem)) })));
    }, [ace]);
    useEffect(function () {
        if (!editor) {
            return;
        }
        var textarea = editor.renderer.textarea;
        if (!textarea) {
            return;
        }
        var updateAttribute = function (attribute, value) {
            return value ? textarea.setAttribute(attribute, value) : textarea.removeAttribute(attribute);
        };
        updateAttribute('id', controlId);
        updateAttribute('aria-labelledby', ariaLabelledby);
        updateAttribute('aria-describedby', ariaDescribedby);
    }, [ariaDescribedby, ariaLabelledby, controlId, editor]);
    var _f = useState('hidden'), paneStatus = _f[0], setPaneStatus = _f[1];
    var _g = useState([]), annotations = _g[0], setAnnotations = _g[1];
    var _h = useState(), highlightedAnnotation = _h[0], setHighlightedAnnotation = _h[1];
    var _j = useState({ row: 0, column: 0 }), cursorPosition = _j[0], setCursorPosition = _j[1];
    var _k = useState(false), isTabFocused = _k[0], setTabFocused = _k[1];
    var errorsTabRef = useRef(null);
    var warningsTabRef = useRef(null);
    var _l = useContainerQuery(function (rect) { return rect.width; }), codeEditorWidth = _l[0], codeEditorMeasureRef = _l[1];
    var mergedRef = useMergeRefs(codeEditorMeasureRef, __internalRootRef);
    var isRefresh = useVisualRefresh();
    useEffect(function () {
        editor === null || editor === void 0 ? void 0 : editor.resize();
    }, [editor, editorContentHeight, codeEditorWidth]);
    var paneId = useUniqueId('code-editor-pane');
    useEffect(function () {
        if (!ace || !editor) {
            return;
        }
        setupEditor(ace, editor, setAnnotations, setCursorPosition, setHighlightedAnnotation, setPaneStatus);
        return function () {
            editor === null || editor === void 0 ? void 0 : editor.destroy();
        };
    }, [ace, editor, __internalRootRef]);
    useEffect(function () {
        if (!editor) {
            return;
        }
        if (value === editor.getValue()) {
            return;
        }
        // TODO maintain cursor position?
        var pos = editor.session.selection.toJSON();
        editor.setValue(value, -1);
        editor.session.selection.fromJSON(pos);
    }, [editor, value]);
    useEffect(function () {
        editor === null || editor === void 0 ? void 0 : editor.session.setMode("ace/mode/".concat(language));
    }, [editor, language]);
    useEffect(function () {
        var _a, _b, _c, _d;
        if (!editor) {
            return;
        }
        var theme = (_b = (_a = props.preferences) === null || _a === void 0 ? void 0 : _a.theme) !== null && _b !== void 0 ? _b : defaultTheme;
        editor.setTheme(getAceTheme(theme));
        editor.session.setUseWrapMode((_d = (_c = props.preferences) === null || _c === void 0 ? void 0 : _c.wrapLines) !== null && _d !== void 0 ? _d : true);
    }, [editor, defaultTheme, props.preferences]);
    // Change listeners
    useChangeEffect(editor, props.onChange, props.onDelayedChange);
    // Hide error panel when there are no errors to show.
    useEffect(function () {
        if (annotations.length === 0) {
            setPaneStatus('hidden');
        }
        if (props.onValidate) {
            fireNonCancelableEvent(props.onValidate, { annotations: annotations });
        }
    }, [annotations, props.onValidate]);
    var languageLabel = customLanguageLabel !== null && customLanguageLabel !== void 0 ? customLanguageLabel : getLanguageLabel(language);
    var errorCount = annotations.filter(function (a) { return a.type === 'error'; }).length;
    var warningCount = annotations.filter(function (a) { return a.type === 'warning'; }).length;
    var currentAnnotations = useMemo(function () { return annotations.filter(function (a) { return a.type === paneStatus; }); }, [annotations, paneStatus]);
    /*
     * Callbacks
     */
    var onEditorKeydown = useCallback(function (e) {
        if (editor && e.target === editor.container && e.keyCode === KeyCode.enter) {
            e.stopPropagation();
            e.preventDefault();
            editor.focus();
        }
    }, [editor]);
    var onTabFocus = useCallback(function () { return setTabFocused(true); }, []);
    var onTabBlur = useCallback(function () { return setTabFocused(false); }, []);
    var onResize = useCallback(function () {
        editor === null || editor === void 0 ? void 0 : editor.resize();
    }, [editor]);
    var onErrorPaneToggle = useCallback(function () {
        setPaneStatus(paneStatus !== 'error' ? 'error' : 'hidden');
    }, [paneStatus]);
    var onWarningPaneToggle = useCallback(function () {
        setPaneStatus(paneStatus !== 'warning' ? 'warning' : 'hidden');
    }, [paneStatus]);
    var onPaneClose = useCallback(function () {
        if (paneStatus === 'error' && errorsTabRef.current) {
            errorsTabRef.current.focus();
        }
        if (paneStatus === 'warning' && warningsTabRef.current) {
            warningsTabRef.current.focus();
        }
        setPaneStatus('hidden');
    }, [paneStatus]);
    var onAnnotationClick = function (_a) {
        var _b = _a.row, row = _b === void 0 ? 0 : _b, _c = _a.column, column = _c === void 0 ? 0 : _c;
        if (!editor) {
            return;
        }
        editor.focus();
        editor.gotoLine(row + 1, column, false);
        setHighlightedAnnotation(undefined);
    };
    var onAnnotationClear = useCallback(function () {
        setHighlightedAnnotation(undefined);
    }, []);
    /**
     * Ignore focus lock if focused element is the pane tab button or within editor tree.
     * This check is required:
     * - When closing the pane with `ESC` key: The panel closes asynchronously and its focus lock
     *   still exists when trying to focus the tab button in higher-order component.
     * - When clicking or hittin `Enter` on an annotation: The panel remains open but focus lock
     *   deactivates asynchronously.
     */
    var shouldHandleFocus = useCallback(function (activeElement) {
        return (activeElement !== errorsTabRef.current &&
            activeElement !== warningsTabRef.current &&
            !(editor === null || editor === void 0 ? void 0 : editor.container.contains(activeElement)));
    }, [editor]);
    var _m = useState(false), isPreferencesModalVisible = _m[0], setPreferencesModalVisible = _m[1];
    var onPreferencesOpen = function () { return setPreferencesModalVisible(true); };
    var onPreferencesConfirm = function (p) {
        fireNonCancelableEvent(props.onPreferencesChange, p);
        setPreferencesModalVisible(false);
    };
    var onPreferencesDismiss = function () { return setPreferencesModalVisible(false); };
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(styles['code-editor'], baseProps.className, (_a = {}, _a[styles['code-editor-refresh']] = isRefresh, _a)), ref: mergedRef }),
        props.loading && (React.createElement(LoadingScreen, null,
            React.createElement(LiveRegion, { visible: true }, i18nStrings.loadingState))),
        !ace && !props.loading && (React.createElement(ErrorScreen, { recoveryText: i18nStrings.errorStateRecovery, onRecoveryClick: props.onRecoveryClick }, i18nStrings.errorState)),
        ace && !props.loading && (React.createElement(React.Fragment, null,
            React.createElement(ResizableBox, { height: Math.max(editorHeight, 20), minHeight: 20, onResize: function (height) {
                    setEditorHeight(height);
                    onResize();
                    fireNonCancelableEvent(onEditorContentResize, { height: height });
                } },
                React.createElement("div", { ref: editorRef, className: clsx(styles.editor, styles.ace, isRefresh && styles['editor-refresh']), onKeyDown: onEditorKeydown, tabIndex: 0, role: "group", "aria-label": i18nStrings.editorGroupAriaLabel })),
            React.createElement("div", { role: "group", "aria-label": i18nStrings.statusBarGroupAriaLabel },
                React.createElement(StatusBar, { languageLabel: languageLabel, cursorPosition: i18nStrings.cursorPosition(cursorPosition.row + 1, cursorPosition.column + 1), errorCount: errorCount, warningCount: warningCount, paneStatus: paneStatus, onErrorPaneToggle: onErrorPaneToggle, onWarningPaneToggle: onWarningPaneToggle, onTabFocus: onTabFocus, onTabBlur: onTabBlur, errorsTabRef: errorsTabRef, warningsTabRef: warningsTabRef, i18nStrings: i18nStrings, isTabFocused: isTabFocused, paneId: paneId, onPreferencesOpen: onPreferencesOpen, isRefresh: isRefresh }),
                React.createElement(Pane, { id: paneId, visible: paneStatus !== 'hidden', annotations: currentAnnotations, highlighted: highlightedAnnotation, onAnnotationClick: onAnnotationClick, onAnnotationClear: onAnnotationClear, onClose: onPaneClose, onAllowlist: shouldHandleFocus, cursorPositionLabel: i18nStrings.cursorPosition, closeButtonAriaLabel: i18nStrings.paneCloseButtonAriaLabel })),
            isPreferencesModalVisible && (React.createElement(PreferencesModal, { onConfirm: onPreferencesConfirm, onDismiss: onPreferencesDismiss, themes: props.themes, preferences: props.preferences, defaultTheme: defaultTheme, i18nStrings: {
                    header: i18nStrings.preferencesModalHeader,
                    cancel: i18nStrings.preferencesModalCancel,
                    confirm: i18nStrings.preferencesModalConfirm,
                    wrapLines: i18nStrings.preferencesModalWrapLines,
                    theme: i18nStrings.preferencesModalTheme,
                    lightThemes: i18nStrings.preferencesModalLightThemes,
                    darkThemes: i18nStrings.preferencesModalDarkThemes
                } }))))));
}
applyDisplayName(CodeEditor, 'CodeEditor');
//# sourceMappingURL=index.js.map