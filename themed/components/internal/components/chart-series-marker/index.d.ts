import React from 'react';
import { BaseComponentProps } from '../../base-component';
export type ChartSeriesMarkerType = 'line' | 'rectangle' | 'dashed' | 'hollow-rectangle';
interface ChartSeriesMarkerProps extends BaseComponentProps {
    type: ChartSeriesMarkerType;
    color: string;
}
declare const _default: React.MemoExoticComponent<typeof ChartSeriesMarker>;
export default _default;
declare function ChartSeriesMarker({ type, color }: ChartSeriesMarkerProps): JSX.Element;
//# sourceMappingURL=index.d.ts.map