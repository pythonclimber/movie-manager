import { EventData, PropertyChangeData } from 'data/observable';
import { Page } from 'ui/page';
import { MainViewModel } from './main-view-model';
import { GestureEventData } from 'ui/gestures';
import { MovieViewModel } from '../movie-page/movie-view-model';
import * as navigationModule from '../../shared/navigation';
import { ItemEventData } from 'ui/list-view';
import { SearchViewModel } from '../search-page/search-view-model';
import { Switch } from 'ui/switch';
import { ViewMode } from '../../shared/enums';

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.actionBarHidden = true;
    if (!page.bindingContext) {
        page.bindingContext = new MainViewModel();
    }
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
        navigationModule.navigateToSearchPage(mainViewModel.Movies, ViewMode.Movies);
    } else {
        navigationModule.navigateToSearchPage(mainViewModel.Shows, ViewMode.Shows);
    }
}

export function refreshCollection(args) {
    let pullToRefresh = args.object;
    let mainViewModel = <MainViewModel>pullToRefresh.bindingContext;


    mainViewModel.LoadMovies();
    pullToRefresh.refreshing = false;
}