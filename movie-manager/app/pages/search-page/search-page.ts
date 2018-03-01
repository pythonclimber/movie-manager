import { EventData } from "data/observable";
import { Page } from "ui/page";
import { SearchViewModel } from "./search-view-model";
import { GestureEventData } from 'ui/gestures';
import * as navModule from '../../shared/navigation';

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.actionBarHidden = true;
    page.bindingContext = new SearchViewModel();
}

export function backTap(args: GestureEventData) {
    navModule.backOnePage();
}