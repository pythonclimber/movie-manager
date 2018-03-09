import { EventData } from "data/observable";
import { Page, NavigatedData } from "ui/page";
import { SearchViewModel } from "./search-view-model";
import { ItemEventData } from 'ui/list-view';
import { GestureEventData } from 'ui/gestures';
import * as navigationModule from '../../shared/navigation';
import { SearchResultViewModel } from './search-result-view-model';
import { MovieViewModel } from "../movie-page/movie-view-model";

export function navigatingTo(args: NavigatedData) {
    let page = <Page>args.object;
    let searchViewModel = <SearchViewModel>args.context;
    page.actionBarHidden = true;
    if (!page.bindingContext) {
        page.bindingContext = searchViewModel || new SearchViewModel();
    }
}

export function backTap(args: GestureEventData) {
    navigationModule.backOnePage();
}

export function selectMovie(args: ItemEventData) {
    let searchResult = <SearchResultViewModel>args.view.bindingContext;
    let movie = new MovieViewModel({
        _id: '',
        title: searchResult.Title,
        description: '',
        userId: searchResult.UserId,
        director: '',
        imdbid: searchResult.imdbID
    });
    navigationModule.navigateToMovie(movie);
}