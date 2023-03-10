import { InternalBaseComponentProps } from '../internal/hooks/use-base-component';
import { TokenGroupProps } from './interfaces';
import { SomeRequired } from '../internal/types';
type InternalTokenGroupProps = SomeRequired<TokenGroupProps, 'items' | 'alignment'> & InternalBaseComponentProps;
export default function InternalTokenGroup({ items, alignment, onDismiss, __internalRootRef, limit, ...props }: InternalTokenGroupProps): JSX.Element;
interface TokenProps extends TokenGroupProps.Item {
    onDismiss?: () => void;
}
export declare function Token({ disabled, dismissLabel, onDismiss, ...props }: TokenProps): JSX.Element;
export {};
//# sourceMappingURL=internal.d.ts.map