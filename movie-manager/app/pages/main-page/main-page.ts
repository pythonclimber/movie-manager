import { Page, NavigatedData, EventData } from 'ui/page';
import { MainViewModel } from '../../view-models/main-view-model';
import { GestureEventData } from 'ui/gestures';
import { MovieViewModel } from '../../view-models/movie-view-model';
import * as navigationModule from '../../shared/navigation';
import { ItemEventData } from 'ui/list-view';
import { ViewMode } from '../../shared/enums';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

let sideDrawer: RadSideDrawer;

export function navigatingTo(args: NavigatedData) {
    let page = <Page>args.object;
    let mainViewModel = <MainViewModel>args.context;
    page.actionBarHidden = true;
    page.bindingContext = mainViewModel;
    if (!page.bindingContext) {
        page.bindingContext = new MainViewModel();
    }
    page.bindingContext.Page = page;
    page.bindingContext.Init();
}

export function pageLoaded(args: EventData) {
    let page = <Page>args.object;
    sideDrawer = <RadSideDrawer>page.getViewById('side-drawer');
}

export function toggleFavorite(args: GestureEventData) {
    let movie = <MovieViewModel>args.view.bindingContext;
    movie.ToggleFavorite();
}

export function selectMovie(args: ItemEventData) {
    let movie = <MovieViewModel>args.view.bindingContext;
    navigationModule.navigateToMovie(movie);
}

export function searchTap(args: GestureEventData) {
    let mainViewModel = <MainViewModel>args.view.bindingContext;
    
    if (mainViewModel.ViewMode == ViewMode[ViewMode.Movies]) {
        navigationModule.navigateToSearchPage(ViewMode.Movies);
    } else {
        navigationModule.navigateToSearchPage(ViewMode.Shows);
    }
}

export function refreshCollection(args) {
    let pullToRefresh = args.object;
    let mainViewModel = <MainViewModel>pullToRefresh.bindingContext;


    mainViewModel.LoadMovies().then(() => {
        pullToRefresh.refreshing = false;
    });
}

export function toggleDrawer(args: GestureEventData) {
    if (!sideDrawer) {
        console.log('exiting');
        return;
    }
    sideDrawer.toggleDrawerState();
}