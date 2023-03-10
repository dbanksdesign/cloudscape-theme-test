import { AceModes } from './ace-modes';
import { findUpUntil } from '../internal/utils/dom';
export var DEFAULT_LIGHT_THEME = 'dawn';
export var DEFAULT_DARK_THEME = 'tomorrow_night_bright';
export function getDefaultConfig() {
    return {
        behavioursEnabled: true
    };
}
export function getDefaultTheme(element) {
    var isDarkMode = !!findUpUntil(element, function (node) { return node.classList.contains('awsui-polaris-dark-mode') || node.classList.contains('awsui-dark-mode'); });
    return isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
}
export function getAceTheme(theme) {
    return "ace/theme/".concat(theme);
}
export function getLanguageLabel(language) {
    var _a;
    return ((_a = AceModes.filter(function (mode) { return mode.value === language; })[0]) === null || _a === void 0 ? void 0 : _a.label) || language;
}
//# sourceMappingURL=util.js.map