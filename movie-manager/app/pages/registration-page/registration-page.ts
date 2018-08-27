import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { RegistrationViewModel } from './registration-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.actionBarHidden = true;
    page.bindingContext = new RegistrationViewModel();
}