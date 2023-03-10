import { ScaleContinuousNumeric, ScaleTime, ScaleBand } from '../../vendor/d3-scale';
import { ChartDataTypes, ChartDomain, ScaleType, ScaleRange } from './interfaces';
export interface NumericD3Scale {
    type: 'numeric';
    scale: ScaleContinuousNumeric<number, number>;
}
export interface TimeD3Scale {
    type: 'time';
    scale: ScaleTime<number, number>;
}
export interface CategoricalD3Scale {
    type: 'categorical';
    scale: ScaleBand<ChartDataTypes>;
}
export type D3Scale = NumericD3Scale | TimeD3Scale | CategoricalD3Scale;
type InternalScale = ScaleContinuousNumeric<number, number> | ScaleBand<ChartDataTypes> | ScaleTime<number, number>;
export declare function createScale(type: ScaleType, domain: ChartDomain<ChartDataTypes>, range: ScaleRange): D3Scale;
export declare class ChartScale {
    readonly scaleType: ScaleType;
    readonly domain: ChartDomain<ChartDataTypes>;
    readonly range: ScaleRange;
    readonly scale: D3Scale;
    readonly d3Scale: InternalScale;
    constructor(scaleType: ScaleType, domain: ChartDomain<ChartDataTypes>, range: ScaleRange, noCategoricalOuterPadding?: boolean);
    cloneScale(newScaleType?: ScaleType, newDomain?: ChartDomain<ChartDataTypes>, newRange?: ScaleRange): ChartScale;
    isNumeric(): this is {
        d3Scale: ScaleContinuousNumeric<number, number>;
        domain: ChartDomain<number>;
    };
    isTime(): this is {
        d3Scale: ScaleTime<number, number>;
        domain: ChartDomain<Date>;
    };
    isCategorical(): this is {
        d3Scale: ScaleBand<ChartDataTypes>;
        domain: ChartDomain<string>;
    };
}
export declare class NumericChartScale {
    readonly scaleType: 'linear' | 'log';
    readonly scale: NumericD3Scale;
    readonly d3Scale: ScaleContinuousNumeric<number, number>;
    constructor(scaleType: 'linear' | 'log', domain: ChartDomain<number>, range: ScaleRange, adjustDomain: null | number);
    isCategorical(): boolean;
}
export {};
//# sourceMappingURL=scales.d.ts.map