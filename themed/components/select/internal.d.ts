import React from 'react';
import { SelectProps } from './interfaces';
import { InternalBaseComponentProps } from '../internal/hooks/use-base-component';
import { SomeRequired } from '../internal/types';
export interface InternalSelectProps extends SomeRequired<SelectProps, 'options'>, InternalBaseComponentProps {
    __inFilteringToken?: boolean;
}
declare const InternalSelect: React.ForwardRefExoticComponent<InternalSelectProps & React.RefAttributes<SelectProps.Ref>>;
export default InternalSelect;
//# sourceMappingURL=internal.d.ts.map