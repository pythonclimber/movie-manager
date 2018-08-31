import { EventData } from "data/observable";
import { Page, NavigatedData } from "ui/page";
import { SearchViewModel } from "./search-view-model";
import { ItemEventData } from 'ui/list-view';
import { GestureEventData } from 'ui/gestures';
import * as navigationModule from '../../shared/navigation';
import { SearchResultViewModel } from './search-result-view-model';
import { MovieViewModel } from "../movie-page/movie-view-model";
import { ViewMode, MovieFlow } from "../../shared/enums";
import { ShowViewModel } from "../movie-page/show-view-model";
import * as utilsModule from 'utils/utils';
import { MovieService } from '../../services/movie-service';
import * as viewModule from 'ui/core/view'

const movieService = new MovieService();

export function navigatingTo(args: NavigatedData) {
    let page = <Page>args.object;
    let searchViewModel = <SearchViewModel>args.context;
    searchViewModel.page = page;
    page.actionBarHidden = true;
    if (!page.bindingContext) {
        page.bindingContext = searchViewModel || new SearchViewModel();
    }
}

export function navigatedTo(args: EventData) {
    console.log(args.object);
    let page = <Page>args.object;
    let searchField = viewModule.getViewById(page, 'movie-search');

    if (searchField.ios) {
        console.log('ios');
        searchField.ios.focus();
    }

    if (searchField.android) {
        console.log('android');
         setTimeout(() => {
             searchField.android.requestFocus();

             utilsModule.ad.getInputMethodManager().showSoftInput(searchField.android, 0);
         }, 300)
    }
}

export function goToMovies(args: GestureEventData) {
    let page = <Page>args.object;
    if (page.android) {
        utilsModule.ad.dismissSoftInput();
    }
    navigationModule.navigateToMainPage();
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
            format: ''
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