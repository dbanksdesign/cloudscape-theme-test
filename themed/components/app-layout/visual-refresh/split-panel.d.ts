import React from 'react';
import { AppLayoutProps } from '../interfaces';
/**
 * If there is no Split Panel in the AppLayout context then the SplitPanel
 * will pass through the AppLayout children without the context.
 */
declare function SplitPanel({ children }: React.PropsWithChildren<unknown>): JSX.Element;
declare namespace SplitPanel {
    var Bottom: typeof SplitPanelBottom;
    var Side: typeof SplitPanelSide;
}
/**
 * This is the render function for the SplitPanel when it is in bottom position.
 * The Split Panel container will be another row entry in the grid definition in
 * the Layout component. The start and finish columns will be variable based
 * on the presence and state of the Navigation and Tools components.
 */
declare function SplitPanelBottom(): JSX.Element | null;
/**
 * This is the render function for the SplitPanel when it is side position.
 * The Split Panel will not be within the grid defined in the Layout component
 * but instead a direct child of the Tools component. The width constraints
 * for this position are computed in the Tools component.
 */
declare function SplitPanelSide(): JSX.Element | null;
/**
 * This logic will determine what the Split Panel position should be. It reconciles the possibility
 * of being in forced position with the current selected position in the settings.
 */
export declare function getSplitPanelPosition(isSplitPanelForcedPosition: boolean, splitPanelPreferences: AppLayoutProps.SplitPanelPreferences | undefined): AppLayoutProps.SplitPanelPosition;
export default SplitPanel;
//# sourceMappingURL=split-panel.d.ts.map