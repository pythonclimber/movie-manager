import { NavigatedData, Page } from "@nativescript/core";
import { RatingViewModel } from '~/view-models/rating-view-model';

export function navigatingTo(args: NavigatedData) {
    let page = <Page>args.object;
    page.actionBarHidden = true;

    let ratingViewModel = new RatingViewModel(args.context);

    if (!page.bindingContext) {
        page.bindingContext = ratingViewModel;
    }
}