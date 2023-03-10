import React, { Dispatch, SetStateAction } from 'react';
type View = 'utilities' | 'dropdown-menu';
interface RouteData {
    headerText?: string;
    headerSecondaryText?: string;
    definition?: any;
    utilityIndex?: number;
}
interface RouteState {
    view: View;
    data: RouteData | null;
}
interface IViewContext {
    state: RouteState;
    setState: Dispatch<SetStateAction<RouteState>>;
}
export declare const ViewContext: React.Context<IViewContext>;
export declare const useNavigate: () => (view: View, data: any) => void;
interface RouteProps {
    view: View;
    element?: React.ReactNode | ((data: RouteData | null) => React.ReactElement);
}
export declare const Route: ({ view, element }: RouteProps) => any;
interface RouterProps {
    children?: React.ReactNode;
}
declare const Router: ({ children }: RouterProps) => JSX.Element;
export default Router;
//# sourceMappingURL=router.d.ts.map