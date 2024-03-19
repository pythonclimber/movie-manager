import { EventData, Page } from "@nativescript/core";
import { RegistrationViewModel } from '~/view-models/registration-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    //page.actionBarHidden = true;
    page.bindingContext = new RegistrationViewModel();
}