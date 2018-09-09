import { EventData } from "data/observable";
import { Page } from 'ui/page';
import { LoginViewModel } from "./login-view-model";
import { TextField } from 'ui/text-field';
import * as colorModule from 'color';

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    //page.actionBarHidden = true;
    page.bindingContext = new LoginViewModel();
}

export function navigatedTo(args: EventData) {
    let page = <Page>args.object;
    let color = new colorModule.Color('#FFFFFF');
    let usernameField = <TextField>page.getViewById('username');
    let passwordField = <TextField>page.getViewById('password');
    if (usernameField.android) {
        usernameField.android.setHintTextColor(color.android);
        passwordField.android.setHintTextColor(color.android);
    } else if (usernameField.ios) {
    }
}