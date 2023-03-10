import { InternalBaseComponentProps } from '../internal/hooks/use-base-component';
import { ModalProps } from './interfaces';
import { SomeRequired } from '../internal/types';
type InternalModalProps = SomeRequired<ModalProps, 'size' | 'closeAriaLabel'> & InternalBaseComponentProps;
export default function InternalModal({ size, visible, closeAriaLabel, header, children, footer, disableContentPaddings, onDismiss, modalRoot, __internalRootRef, ...rest }: InternalModalProps): JSX.Element;
export {};
//# sourceMappingURL=internal.d.ts.map