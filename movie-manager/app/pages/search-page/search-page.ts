import { EventData } from "data/observable";
import { Page } from "ui/page";
import { SearchViewModel } from "./search-view-model";
import { ItemEventData } from 'ui/list-view';
import { GestureEventData } from 'ui/gestures';
import * as navigationModule from '../../shared/navigation';
import { SearchResultViewModel } from './search-result-view-model';
import { MovieViewModel } from "../movie-page/movie-view-model";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.actionBarHidden = true;
    page.bindingContext = new SearchViewModel();
}

export function backTap(args: GestureEventData) {
    navigationModule.backOnePage();
}

export function selectMovie(args: ItemEventData) {
    let searchResult = <SearchResultViewModel>args.view.bindingContext;
    let movie = new MovieViewModel({
        _id: '',
        title: searchResult.title,
        description: '',
        userId: '',
        director: '',
        onlineId: searchResult.imdbid
    });
    movie.getDetails().then(() => {
        navigationModule.navigateToMovie(movie);
    });
}