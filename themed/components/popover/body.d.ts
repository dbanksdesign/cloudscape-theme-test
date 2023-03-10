import React from 'react';
export interface PopoverBodyProps {
    dismissButton: boolean;
    dismissAriaLabel: string | undefined;
    onDismiss: () => void;
    header: React.ReactNode | undefined;
    children: React.ReactNode;
    variant?: 'annotation';
    overflowVisible?: 'content' | 'both';
    className?: string;
    ariaLabelledby?: string;
}
export default function PopoverBody({ dismissButton: showDismissButton, dismissAriaLabel, header, children, onDismiss, variant, overflowVisible, className, ariaLabelledby, }: PopoverBodyProps): JSX.Element;
//# sourceMappingURL=body.d.ts.map