import { DropdownOption, OptionDefinition, OptionGroup } from '../interfaces';
export declare const matchesString: (value: string | undefined, searchText: string, strictMatching: boolean) => boolean;
export declare const filterOptions: (options: ReadonlyArray<DropdownOption>, searchText: string, strictMatching?: boolean) => ReadonlyArray<DropdownOption>;
export declare const isInteractive: (option?: DropdownOption) => boolean;
export declare const isGroupInteractive: (option?: DropdownOption) => boolean;
export declare const isGroup: (option?: OptionDefinition | OptionGroup) => option is OptionGroup;
//# sourceMappingURL=filter-options.d.ts.map