import React from 'react';
import { BaseComponentProps } from '../../base-component';
import { NonCancelableEventHandler } from '../../events';
interface ChartStatusContainerProps extends BaseComponentProps {
    statusType: 'loading' | 'finished' | 'error';
    empty?: React.ReactNode;
    noMatch?: React.ReactNode;
    loadingText?: string;
    errorText?: string;
    recoveryText?: string;
    onRecoveryClick?: NonCancelableEventHandler;
    isEmpty?: boolean;
    isNoMatch?: boolean;
    showChart?: boolean;
}
export declare function getChartStatus<T, U>({ externalData, visibleData, statusType, }: {
    externalData: ReadonlyArray<T>;
    visibleData: ReadonlyArray<U>;
    statusType: 'loading' | 'finished' | 'error';
}): {
    isEmpty: boolean;
    isNoMatch: boolean;
    showChart: boolean;
};
export default function ChartStatusContainer({ statusType, errorText, loadingText, recoveryText, noMatch, empty, onRecoveryClick, isNoMatch, isEmpty, showChart, }: ChartStatusContainerProps): JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map