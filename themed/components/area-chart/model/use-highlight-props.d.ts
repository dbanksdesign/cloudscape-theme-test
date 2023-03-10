import { NonCancelableEventHandler } from '../../internal/events';
import { AreaChartProps } from '../interfaces';
type HighlightProps<T> = [null | AreaChartProps.Series<T>, (s: null | AreaChartProps.Series<T>) => void];
export default function useHighlightProps<T>(series: readonly AreaChartProps.Series<T>[], controlledHighlightedSeries?: null | AreaChartProps.Series<T>, controlledOnHighlightChange?: NonCancelableEventHandler<AreaChartProps.HighlightChangeDetail<T>>): HighlightProps<T>;
export {};
//# sourceMappingURL=use-highlight-props.d.ts.map