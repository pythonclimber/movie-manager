import { GestureEventData, SwipeGestureEventData, GestureTypes, Page, NavigatedData } from "@nativescript/core";
import * as navigationModule from '../../shared/navigation';
import { MovieViewModel } from '~/view-models/movie-view-model';

export function backTap(args: GestureEventData) {
    navigationModule.backOnePage();
}

export function navigatingTo(args: NavigatedData) {
    let page = <Page>args.object;
    let movieViewModel = <MovieViewModel>args.context;
    movieViewModel.IsLoading = true;
    page.actionBarHidden = true;
    page.bindingContext = movieViewModel;
    page.on(GestureTypes[GestureTypes.swipe], swipePage);
    movieViewModel.GetLocalDetails().then(() => {
        movieViewModel.GetOnlineDetails().then(() => {
            movieViewModel.IsLoading = false;
        });    
    });
}

export function swipePage(args: SwipeGestureEventData) {
    if (args.direction === 1) {
        navigationModule.backOnePage();
    }
}