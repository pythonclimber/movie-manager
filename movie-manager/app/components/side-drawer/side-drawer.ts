import { GestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { DisplayPages, ViewOptions } from '~/shared/enums';
import { EventData, Page } from 'ui/page';
import * as utilsModule from 'utils/utils';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { MainViewModel } from '~/view-models/main-view-model';
import { MovieListViewModel } from '~/view-models/movie-list-view-model';

let sideDrawer: RadSideDrawer;
let page: Page;

export function onSideDrawerLoaded(args: EventData) {
    let root = <any>args.object;
    page = <Page>root.page;
    sideDrawer = page.getViewById('side-drawer');
}

export function searchTap(args: GestureEventData) {
    let mainViewModel = <MainViewModel>page.bindingContext;
    mainViewModel.SetDisplayPage(DisplayPages.SearchPage);

    sideDrawer.toggleDrawerState();
}

export function goToMovies(args: GestureEventData) {
    if (page.android) {
        utilsModule.ad.dismissSoftInput();
    }

    let mainViewModel = <MainViewModel>page.bindingContext;
    mainViewModel.SetDisplayPage(DisplayPages.MovieListPage);

    let movieListViewModel = <MovieListViewModel>page.getViewById('movie-list').bindingContext;
    movieListViewModel.SetViewMode(ViewOptions.All);

    sideDrawer.toggleDrawerState();
}

export function goToWishlist(args: GestureEventData) {
    if (page.android) {
        utilsModule.ad.dismissSoftInput();
    }

    let mainViewModel = <MainViewModel>page.bindingContext;
    mainViewModel.SetDisplayPage(DisplayPages.MovieListPage);

    let movieListViewModel = <MovieListViewModel>page.getViewById('movie-list').bindingContext;
    movieListViewModel.SetViewMode(ViewOptions.Wishlist);

    sideDrawer.toggleDrawerState();
}