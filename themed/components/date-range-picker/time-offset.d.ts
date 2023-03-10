import { DateRangePickerProps } from './interfaces';
/**
 * Appends a time zone offset to an offset-less date string.
 */
export declare function setTimeOffset(value: DateRangePickerProps.Value | null, timeOffset: {
    startDate?: number;
    endDate?: number;
}): DateRangePickerProps.Value | null;
/**
 * Re-formats an absolute date range so that it is expressed using the
 * target time offset. The returned value still represents the same range
 * in time, but contains no visible offset.
 */
export declare function shiftTimeOffset(value: null | DateRangePickerProps.Value, timeOffset: {
    startDate?: number;
    endDate?: number;
}): DateRangePickerProps.Value | null;
export declare function normalizeTimeOffset(value: null | DateRangePickerProps.Value, getTimeOffset?: DateRangePickerProps.GetTimeOffsetFunction, timeOffset?: number): {
    startDate: number;
    endDate: number;
} | {
    startDate: undefined;
    endDate: undefined;
};
//# sourceMappingURL=time-offset.d.ts.map