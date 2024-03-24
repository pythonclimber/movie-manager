import { Page, NavigatedData, EventData, GestureEventData } from "@nativescript/core";
import { MainViewModel } from '~/view-models/main-view-model';
import { MovieViewModel } from '~/view-models/movie-view-model';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

let sideDrawer: RadSideDrawer;
let mainViewModel: MainViewModel;

export function navigatingTo(args: NavigatedData) {
    let page = <Page>args.object;
    mainViewModel = mainViewModel || new MainViewModel();
    page.bindingContext = mainViewModel;
    page.actionBarHidden = true;
    page.bindingContext.GetPage = page;
}

export function pageLoaded(args: EventData) {
    let page = <Page>args.object;
    sideDrawer = <RadSideDrawer>page.getViewById('side-drawer');
}

export function toggleFavorite(args: GestureEventData) {
    let movie = <MovieViewModel>args.view.bindingContext;
    movie.ToggleFavorite();
}

export function toggleDrawer(args: GestureEventData) {
    if (!sideDrawer) {
        console.log('exiting');
        return;
    }
    sideDrawer.toggleDrawerState();
}