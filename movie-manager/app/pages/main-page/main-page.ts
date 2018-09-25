import { Page, NavigatedData } from 'ui/page';
import { MainViewModel } from '../../view-models/main-view-model';
import { GestureEventData } from 'ui/gestures';
import { MovieViewModel } from '../../view-models/movie-view-model';
import * as navigationModule from '../../shared/navigation';
import { ItemEventData } from 'ui/list-view';
import { ViewMode } from '../../shared/enums';

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