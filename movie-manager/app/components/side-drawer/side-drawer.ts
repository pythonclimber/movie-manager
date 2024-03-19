import { GestureEventData, EventData, Page, Utils } from "@nativescript/core";
import { DisplayPages, ViewOptions } from '~/shared/enums';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { MainViewModel } from '~/view-models/main-view-model';
import { MovieListViewModel } from '~/view-models/movie-list-view-model';

let sideDrawer: RadSideDrawer;
let page: Page;

export function onSideDrawerLoaded(args: EventData) {
    let root = <any>args.object;
    page = <Page>root.page;
    sideDrawer = <RadSideDrawer>page.getViewById('side-drawer');
}

export function searchTap(args: GestureEventData) {
    let mainViewModel = <MainViewModel>page.bindingContext;
    mainViewModel.SetDisplayPage(DisplayPages.SearchPage);

    sideDrawer.toggleDrawerState();
}

export function goToMovies(args: GestureEventData) {
    if (page.android) {
        Utils.ad.dismissSoftInput();
    }

    let mainViewModel = <MainViewModel>page.bindingContext;
    mainViewModel.SetDisplayPage(DisplayPages.MovieListPage);

    let movieListViewModel = <MovieListViewModel>page.getViewById('movie-list').bindingContext;
    movieListViewModel.SetViewMode(ViewOptions.All);

    sideDrawer.toggleDrawerState();
}

export function goToWishlist(args: GestureEventData) {
    if (page.android) {
        Utils.ad.dismissSoftInput();
    }

    let mainViewModel = <MainViewModel>page.bindingContext;
    mainViewModel.SetDisplayPage(DisplayPages.MovieListPage);

    let movieListViewModel = <MovieListViewModel>page.getViewById('movie-list').bindingContext;
    movieListViewModel.SetViewMode(ViewOptions.Wishlist);

    sideDrawer.toggleDrawerState();
}