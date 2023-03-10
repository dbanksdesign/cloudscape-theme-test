import React from 'react';
import { AnnotationContextProps } from '../interfaces';
export interface AnnotationTriggerProps {
    open: boolean;
    onClick: () => void;
    i18nStrings: AnnotationContextProps['i18nStrings'];
    taskLocalStepIndex: number;
    totalLocalSteps: number;
}
declare const _default: React.ForwardRefExoticComponent<AnnotationTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export default _default;
//# sourceMappingURL=annotation-trigger.d.ts.map