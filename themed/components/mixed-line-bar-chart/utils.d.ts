import { ChartSeriesMarkerType } from '../internal/components/chart-series-marker';
import { ChartDataTypes, InternalChartSeries, MixedLineBarChartProps } from './interfaces';
import { ScaledBarGroup } from './make-scaled-bar-groups';
export declare const chartLegendMap: Record<string, ChartSeriesMarkerType>;
export declare const nextValidDomainIndex: <T>(nextGroupIndex: number, barGroups: ScaledBarGroup<T>[], direction?: number) => number;
/**
 * Find the subset of series that are individually navigable with keyboard.
 * Lines and thresholds are navigated individually, while bar series are grouped as one.
 */
export declare function findNavigableSeries<T extends ChartDataTypes>(series: ReadonlyArray<InternalChartSeries<T>>): {
    navigableSeries: MixedLineBarChartProps.ChartSeries<T>[];
    navigableBarSeriesIndex: number;
};
/**
 * Checks if two x values are equal.
 * With a special treat for Date values which need to be converted to numbers first.
 */
export declare const matchesX: <T>(x1: T, x2: T) => boolean;
export type OffsetMap = Record<string | number, number>;
export interface StackedOffsets {
    positiveOffsets: OffsetMap;
    negativeOffsets: OffsetMap;
}
/**
 * Calculates list of offset maps from all data by accumulating each value
 */
export declare function calculateOffsetMaps(data: Array<readonly MixedLineBarChartProps.Datum<ChartDataTypes>[]>): StackedOffsets[];
/** Returns string or number value for ChartDataTypes key */
export declare const getKeyValue: (key: ChartDataTypes) => string | number;
export declare function isYThreshold<T>(series: MixedLineBarChartProps.ChartSeries<T>): series is MixedLineBarChartProps.YThresholdSeries;
export declare function isXThreshold<T>(series: MixedLineBarChartProps.ChartSeries<T>): series is MixedLineBarChartProps.XThresholdSeries<T>;
export declare function isDataSeries<T>(series: MixedLineBarChartProps.ChartSeries<T>): series is MixedLineBarChartProps.DataSeries<T>;
//# sourceMappingURL=utils.d.ts.map