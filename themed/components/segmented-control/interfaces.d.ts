import { NonCancelableEventHandler } from '../internal/events';
import { BaseComponentProps } from '../internal/base-component';
import { IconProps } from '../icon/interfaces';
import React from 'react';
export interface SegmentedControlProps extends BaseComponentProps {
    /**
     * ID of the selected option. If you want to clear the selection, use `null`.
     */
    selectedId: string | null;
    /**
     * An array of objects representing options. Each segment has the following properties:
     *
     * - `id` (string) - The ID of the segment.
     * - `disabled` [boolean] - (Optional) Determines whether the segment is disabled, which prevents the user from selecting it.
     * - `iconName` (string) - (Optional) Specifies the name of the icon, used with the [icon component](/components/icon/).
     * - `iconAlt` (string) - (Optional) Specifies alternate text for the icon when using `iconUrl`, or `iconName` without `text`.
     *            This is required when you use an icon without `text`.
     * - `iconUrl` (string) - (Optional) Specifies the URL of a custom icon.
     * - `iconSvg` (ReactNode) - (Optional) Custom SVG icon. Equivalent to the `svg` slot of the [icon component](/components/icon/).
     * - `text` (string) - (Optional) Specifies the text of the segment.
     */
    options?: ReadonlyArray<SegmentedControlProps.Option>;
    /**
     * Defines the label of the entire segmented control. In the standard view (that is, all individual segments are visible),
     * this label is used as `aria-label` on the group of segments. In a narrow container, where this component is displayed as a select component,
     * the label is visible and attached to the select component, unless `ariaLabelledBy` is defined. Don't use `label` and `ariaLabelledBy` at the same time.
     */
    label?: string;
    /**
     * Adds aria-labelledby to the component. Create a visually hidden element with an ID and set this property to that ID. If you don't want the label to be visible in narrow containers, use this property instead of `label`.
     */
    ariaLabelledby?: string;
    /**
     * Called when the user selects a different segment.
     */
    onChange?: NonCancelableEventHandler<SegmentedControlProps.ChangeDetail>;
}
export declare namespace SegmentedControlProps {
    interface Option {
        id: string;
        disabled?: boolean;
        iconName?: IconProps.Name;
        iconAlt?: string;
        iconUrl?: string;
        iconSvg?: React.ReactNode;
        text?: string;
    }
    interface ChangeDetail {
        selectedId: string;
    }
}
//# sourceMappingURL=interfaces.d.ts.map