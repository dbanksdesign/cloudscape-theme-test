import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/selectors";
import ExpandableSectionWrapper from '../expandable-section';
export default class SideNavigationWrapper extends ComponentWrapper {
    static rootSelector: string;
    findHeader(): ElementWrapper;
    findHeaderLink(): ElementWrapper;
    findLinkByHref(href: string): ElementWrapper;
    findActiveLink(): ElementWrapper;
    findItemByIndex(index: number): SideNavigationItemWrapper;
}
export declare class SideNavigationItemWrapper extends ElementWrapper {
    findSection(): ExpandableSectionWrapper;
    findSectionGroup(): ElementWrapper;
    findSectionGroupTitle(): ElementWrapper;
    findExpandableLinkGroup(): ExpandableSectionWrapper;
    findDivider(): ElementWrapper;
    findLink(): ElementWrapper;
    findSectionTitle(): ElementWrapper;
    findItemByIndex(index: number): SideNavigationItemWrapper;
    findItems(): import("@cloudscape-design/test-utils-core/selectors").MultiElementWrapper<SideNavigationItemWrapper>;
}
