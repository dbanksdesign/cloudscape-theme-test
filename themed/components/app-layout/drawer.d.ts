import React from 'react';
import { ButtonProps } from '../button/interfaces';
import { togglesConfig } from './toggles';
import { AppLayoutProps } from './interfaces';
export interface DesktopDrawerProps {
    contentClassName?: string;
    toggleClassName?: string;
    closeClassName?: string;
    toggleRefs: {
        toggle: React.Ref<ButtonProps.Ref>;
        close: React.Ref<ButtonProps.Ref>;
    };
    width: number;
    topOffset?: number;
    bottomOffset?: number;
    ariaLabels?: AppLayoutProps.Labels;
    children: React.ReactNode;
    type: keyof typeof togglesConfig;
    isMobile?: boolean;
    isOpen?: boolean;
    isHidden?: boolean;
    hasDividerWithSplitPanel?: boolean;
    onToggle: (isOpen: boolean) => void;
    onClick?: (event: React.MouseEvent) => void;
    onLoseFocus?: (event: React.FocusEvent) => void;
    extendRight?: number;
}
export declare function Drawer({ contentClassName, toggleClassName, closeClassName, width, type, toggleRefs, topOffset, bottomOffset, ariaLabels, children, isOpen, isHidden, isMobile, hasDividerWithSplitPanel, onToggle, onClick, onLoseFocus, extendRight, }: DesktopDrawerProps): JSX.Element;
//# sourceMappingURL=drawer.d.ts.map