import React from 'react';
type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export interface DropdownContextProviderProps {
    position?: Position;
    children?: React.ReactNode;
}
export declare function DropdownContextProvider({ children, position }: DropdownContextProviderProps): JSX.Element;
export declare function useDropdownContext(): {
    position: Position;
};
export {};
//# sourceMappingURL=context.d.ts.map