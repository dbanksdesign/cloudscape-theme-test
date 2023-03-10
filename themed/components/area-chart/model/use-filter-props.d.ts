import { NonCancelableEventHandler } from '../../internal/events';
import { AreaChartProps } from '../interfaces';
type FilterProps<T> = [readonly AreaChartProps.Series<T>[], (series: readonly AreaChartProps.Series<T>[]) => void];
export default function useFilterProps<T>(series: readonly AreaChartProps.Series<T>[], controlledVisibleSeries?: readonly AreaChartProps.Series<T>[], controlledOnVisibleChange?: NonCancelableEventHandler<AreaChartProps.FilterChangeDetail<T>>): FilterProps<T>;
export {};
//# sourceMappingURL=use-filter-props.d.ts.map