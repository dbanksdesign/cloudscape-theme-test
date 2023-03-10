import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/selectors";
import ButtonWrapper from '../button';
import CheckboxWrapper from '../checkbox';
import ModalWrapper from '../modal';
import VisibleContentPreferenceWrapper from './visible-content-preference';
import PageSizePreferenceWrapper from './page-size-preference';
declare class PreferencesModalWrapper extends ModalWrapper {
    static rootSelector: string;
    findCancelButton(): ButtonWrapper;
    findConfirmButton(): ButtonWrapper;
    findWrapLinesPreference(): CheckboxWrapper;
    findStripedRowsPreference(): CheckboxWrapper;
    findPageSizePreference(): PageSizePreferenceWrapper;
    findVisibleContentPreference(): VisibleContentPreferenceWrapper;
    findCustomPreference(): ElementWrapper;
}
export default class CollectionPreferencesWrapper extends ComponentWrapper {
    static rootSelector: string;
    findModal(): PreferencesModalWrapper;
    findTriggerButton(): ButtonWrapper;
}
export {};
