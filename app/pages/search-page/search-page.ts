import {
    Page,
    NavigatedData,
    ItemEventData,
    GestureEventData,
    SearchBar,
    EventData,
    getViewById,
    Utils
} from "@nativescript/core";
import { SearchViewModel } from '~/view-models/search-view-model';
import * as navigationModule from '../../shared/navigation';
import { SearchResultViewModel } from '~/view-models/search-result-view-model';
import { MovieViewModel } from '~/view-models/movie-view-model';
import { ViewMode, MovieFlow } from '~/shared/enums';
import { ShowViewModel } from '~/view-models/show-view-model';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

let sideDrawer: RadSideDrawer;
let searchViewModel: SearchViewModel;

export function onSearchLoaded(args: NavigatedData) {
    let page = <Page>args.object;
    let searchField = <SearchBar>getViewById(page, 'movie-search');

    searchViewModel = searchViewModel || new SearchViewModel();

    searchViewModel.searchMode = ViewMode.Movies;
    searchViewModel.page = page;
    page.bindingContext = searchViewModel;

    if (searchField.ios) {
        searchField.focus();
    }

    if (searchField.android) {
        setTimeout(() => {
            try {
                searchField.android.requestFocus();
                Utils.ad.showSoftInput(searchField.android);
            } catch (error) {
                console.log('error: ', error)
            }
        }, 300);
    }
}

export function pageLoaded(args: EventData) {
    let page = <Page>args.object;
    let searchField = <SearchBar>getViewById(page, 'movie-search');

    sideDrawer = <RadSideDrawer>page.getViewById('sideDrawer');

    if (searchField.ios) {
        searchField.focus();
    }

    if (searchField.android) {
        setTimeout(() => {
            try {
                searchField.android.requestFocus();
                Utils.ad.showSoftInput(searchField.android);
            } catch (error) {
                console.log('error: ', error)
            }
        }, 300);
    }
}

export function selectItem(args: ItemEventData) {
    let searchResult = <SearchResultViewModel>args.view.bindingContext;
    let searchViewModel = <SearchViewModel>args.view.parent.bindingContext;
    if (searchViewModel.searchMode == ViewMode.Movies) {
        let movieViewModel = new MovieViewModel({
            _id: '',
            title: searchResult.Title,
            description: '',
            userId: '',
            director: '',
            imdbid: searchResult.ImdbId,
            favorite: false,
            wishlist: false,
            format: '',
            poster: searchResult.Poster
        }, MovieFlow.Search);

        navigationModule.navigateToMovie(movieViewModel);
    } else {
        let show = new ShowViewModel({
            title: searchResult.Title,
            year: searchResult.Year,
            imdbid: searchResult.ImdbId,
            userId: searchResult.UserId,
            favorite: false
        });
        navigationModule.navigateToShow(show);
    }
}

export function toggleDrawer(args: GestureEventData) {
    console.log('toggling', sideDrawer)
    if (!sideDrawer) {
        console.log('exiting');
        return;
    }
    sideDrawer.toggleDrawerState();
}