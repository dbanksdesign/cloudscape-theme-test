import React from 'react';
import { IconProps } from '../icon/interfaces';
import { NonCancelableEventHandler } from '../internal/events';
import { InputProps, BaseInputProps, InputAutoCorrect, BaseChangeDetail } from './interfaces';
import { BaseComponentProps } from '../internal/base-component';
import { FormFieldValidationControlProps } from '../internal/context/form-field-context';
import { InternalBaseComponentProps } from '../internal/hooks/use-base-component';
export interface InternalInputProps extends BaseComponentProps, BaseInputProps, Omit<InputProps, 'type'>, InputAutoCorrect, FormFieldValidationControlProps, InternalBaseComponentProps {
    type?: InputProps['type'] | 'visualSearch';
    __leftIcon?: IconProps['name'];
    __leftIconVariant?: IconProps['variant'];
    __onLeftIconClick?: () => void;
    __rightIcon?: IconProps['name'];
    __onRightIconClick?: () => void;
    __nativeAttributes?: Record<string, any>;
    __noBorderRadius?: boolean;
    __onDelayedInput?: NonCancelableEventHandler<BaseChangeDetail>;
    __onBlurWithDetail?: NonCancelableEventHandler<{
        relatedTarget: Node | null;
    }>;
    __inheritFormFieldProps?: boolean;
}
declare const _default: React.ForwardRefExoticComponent<InternalInputProps & React.RefAttributes<HTMLInputElement>>;
export default _default;
//# sourceMappingURL=internal.d.ts.map