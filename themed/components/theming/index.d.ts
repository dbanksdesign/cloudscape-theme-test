import { TypedOverride } from '../internal/generated/theming';
export type Theme = TypedOverride;
export interface ApplyThemeParams {
    theme: Theme;
}
export interface ApplyThemeResult {
    reset: () => void;
}
export declare function applyTheme({ theme }: ApplyThemeParams): ApplyThemeResult;
//# sourceMappingURL=index.d.ts.map