import { EventData } from "data/observable";
import { Page } from "ui/page";
import { SearchViewModel } from "./search-view-model";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.actionBarHidden = true;
    page.bindingContext = new SearchViewModel();
}