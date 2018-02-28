import { EventData } from "data/observable";
import { Page } from 'ui/page';
import { LoginViewModel } from "./login-view-model";
import { GestureEventData } from "ui/gestures";
import * as loginService from '../../services/login-service';

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.actionBarHidden = true;
    page.bindingContext = new LoginViewModel();
}