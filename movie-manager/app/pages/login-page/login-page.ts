import { EventData, Page, TextField, Color } from "@nativescript/core";
import { LoginViewModel } from "~/view-models/login-view-model";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.actionBarHidden = true;
    page.bindingContext = new LoginViewModel();
}

export function navigatedTo(args: EventData) {
    let page = <Page>args.object;
    let usernameField = <TextField>page.getViewById('username');
    let passwordField = <TextField>page.getViewById('password');
    if (usernameField.android) {
        let color = new Color('#777777');
        usernameField.android.setHintTextColor(color.android);
        passwordField.android.setHintTextColor(color.android);
    } else if (usernameField.ios) {
        let color = new Color('#777777');
        let placeholder = usernameField.ios.valueForKey('placeholderLabel');
        placeholder.textColor = color.ios;
        placeholder = passwordField.ios.valueForKey('placeholderLabel');
        placeholder.textColor = color.ios;
    }
}