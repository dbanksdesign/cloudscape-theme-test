import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/dom';
import ExpandableSectionWrapper from '../expandable-section';
export default class SideNavigationWrapper extends ComponentWrapper {
    static rootSelector: string;
    findHeader(): ElementWrapper<HTMLAnchorElement> | null;
    findHeaderLink(): ElementWrapper<HTMLAnchorElement> | null;
    findLinkByHref(href: string): ElementWrapper<HTMLAnchorElement> | null;
    findActiveLink(): ElementWrapper<HTMLAnchorElement> | null;
    findItemByIndex(index: number): SideNavigationItemWrapper | null;
}
export declare class SideNavigationItemWrapper extends ElementWrapper {
    findSection(): ExpandableSectionWrapper | null;
    findSectionGroup(): ElementWrapper | null;
    findSectionGroupTitle(): ElementWrapper | null;
    findExpandableLinkGroup(): ExpandableSectionWrapper | null;
    findDivider(): ElementWrapper | null;
    findLink(): ElementWrapper<HTMLAnchorElement> | null;
    findSectionTitle(): ElementWrapper | null;
    findItemByIndex(index: number): SideNavigationItemWrapper | null;
    findItems(): Array<SideNavigationItemWrapper>;
}
