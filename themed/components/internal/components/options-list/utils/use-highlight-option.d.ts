export type HighlightType = 'keyboard' | 'mouse';
export interface HighlightedOptionProps<OptionType> {
    options: readonly OptionType[];
    isHighlightable: (option: OptionType) => boolean;
}
export interface HighlightedOptionState<OptionType> {
    highlightType: HighlightType;
    highlightedIndex: number;
    highlightedOption?: OptionType;
}
export interface HighlightedOptionHandlers<OptionType> {
    setHighlightedIndexWithMouse(index: number): void;
    moveHighlightWithKeyboard(direction: -1 | 1): void;
    highlightOptionWithKeyboard(option: OptionType): void;
    resetHighlightWithKeyboard(): void;
    goHomeWithKeyboard(): void;
    goEndWithKeyboard(): void;
}
export declare function useHighlightedOption<OptionType>({ options, isHighlightable, }: HighlightedOptionProps<OptionType>): [HighlightedOptionState<OptionType>, HighlightedOptionHandlers<OptionType>];
//# sourceMappingURL=use-highlight-option.d.ts.map