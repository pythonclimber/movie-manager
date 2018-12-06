import { GestureEventData, SwipeGestureEventData, GestureTypes } from 'ui/gestures';
import * as navigationModule from '../../shared/navigation';
import { Page, NavigatedData } from 'ui/page';
import { MovieViewModel } from '../../view-models/movie-view-model';

export function backTap(args: GestureEventData) {
    navigationModule.backOnePage();
}

export function navigatingTo(args: NavigatedData) {
    let page = <Page>args.object;
    let movieViewModel = <MovieViewModel>args.context;
    movieViewModel.IsLoading = true;
    page.actionBarHidden = true;
    page.bindingContext = movieViewModel;
    //page.on(GestureTypes[GestureTypes.swipe], swipePage);
    movieViewModel.GetLocalDetails().then(() => {
        movieViewModel.GetOnlineDetails().then(() => {
            movieViewModel.IsLoading = false;
        });    
    });
}

export function swipePage(args: SwipeGestureEventData) {
    console.log('swiping');
    console.log(args.direction);
}