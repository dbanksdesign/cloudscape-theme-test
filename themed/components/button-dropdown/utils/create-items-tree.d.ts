import { ButtonDropdownProps } from '../interfaces';
export type TreeIndex = number[];
interface ItemsTreeApi {
    getItem: (index: TreeIndex) => ButtonDropdownProps.ItemOrGroup | null;
    getItemIndex: (item: ButtonDropdownProps.ItemOrGroup) => TreeIndex;
    getSequentialIndex: (index: TreeIndex, direction: -1 | 1) => TreeIndex | null;
    getParentIndex: (item: ButtonDropdownProps.ItemOrGroup) => TreeIndex | null;
}
export default function createItemsTree(items: ButtonDropdownProps.Items): ItemsTreeApi;
export {};
//# sourceMappingURL=create-items-tree.d.ts.map