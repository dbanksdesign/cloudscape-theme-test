import React from 'react';
import { BaseComponentProps } from '../internal/base-component';
export interface FormProps extends BaseComponentProps {
    /**
     * Specifies the main form content.
     */
    children?: React.ReactNode;
    /**
     * Specifies the form title and optional description. Use the [header component](/components/header/).
     */
    header?: React.ReactNode;
    /**
     * Specifies a form-level validation message.
     */
    errorText?: React.ReactNode;
    /**
     * Provides a text alternative for the error icon in the error alert.
     */
    errorIconAriaLabel?: string;
    /**
     * Specifies actions for the form. You should wrap action buttons in a [space between component](/components/space-between) with `direction="horizontal"` and `size="xs"`.
     */
    actions?: React.ReactNode;
    /**
     * Specifies left-aligned secondary actions for the form. Use a button dropdown if multiple actions are required.
     */
    secondaryActions?: React.ReactNode;
}
//# sourceMappingURL=interfaces.d.ts.map