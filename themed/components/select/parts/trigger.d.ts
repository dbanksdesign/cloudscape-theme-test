import React from 'react';
import { SelectProps } from '../interfaces';
import { OptionDefinition } from '../../internal/components/option/interfaces';
import { FormFieldValidationControlProps } from '../../internal/context/form-field-context';
import { SelectTriggerProps } from '../utils/use-select';
export interface TriggerProps extends FormFieldValidationControlProps {
    placeholder: string | undefined;
    disabled: boolean | undefined;
    triggerProps: SelectTriggerProps;
    selectedOption: OptionDefinition | null;
    isOpen?: boolean;
    triggerVariant?: SelectProps.TriggerVariant;
    inFilteringToken?: boolean;
}
declare const Trigger: React.ForwardRefExoticComponent<TriggerProps & React.RefAttributes<HTMLButtonElement>>;
export default Trigger;
//# sourceMappingURL=trigger.d.ts.map