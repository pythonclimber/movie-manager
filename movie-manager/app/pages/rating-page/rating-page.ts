import { NavigatedData, Page } from 'ui/page';
import { RatingViewModel } from './rating-view-model';

export function navigatingTo(args: NavigatedData) {
    let page = <Page>args.object;
    page.actionBarHidden = true;

    let ratingViewModel = new RatingViewModel(args.context);

    if (!page.bindingContext) {
        page.bindingContext = ratingViewModel;
    }
}