import * as frameModule from 'ui/frame';
import { MovieViewModel } from '../pages/movie-page/movie-view-model';
import { ShowViewModel } from '../pages/movie-page/show-view-model';
import { SearchViewModel } from '../pages/search-page/search-view-model';
import * as loginService from '../services/login-service';
import { ViewMode } from './enums';

export function startingPage() {
    return 'pages/login-page/login-page'
}

export function navigateToMovie(movie: MovieViewModel) {
    frameModule.topmost().navigate({
        moduleName: 'pages/movie-page/movie-page',
        context: movie,
        transition: {
            name: 'slideLeft'
        }
    });
}

export function navigateBackToMovie(movie: MovieViewModel) {
    frameModule.topmost().navigate({
        moduleName: 'pages/movie-page/movie-page',
        context: movie,
        transition: {
            name: 'slideTop'
        }
    });
}

export function navigateToShow(show: ShowViewModel) {
    frameModule.topmost().navigate({
        moduleName: 'pages/show-page/show-page',
        context: show
    });
}

export function navigateToMainPage() {
    frameModule.topmost().navigate({
        moduleName: 'pages/main-page/main-page',
        transition: {
            name: 'slideRight'
        }
    });
}

export function backOnePage() {
    frameModule.topmost().goBack();
}

export function navigateToSearchPage(items: any[], searchMode: ViewMode) {
    let searchViewModel = new SearchViewModel();
    searchViewModel.searchMode = searchMode;
    if (searchMode == ViewMode.Movies) {
        searchViewModel.myMovies = items as MovieViewModel[];
    } else {
        searchViewModel.myShows = items as ShowViewModel[];
    }
    frameModule.topmost().navigate({
        moduleName: 'pages/search-page/search-page',
        context: searchViewModel,
        transition: {
            name: 'slideLeft'
        }
    });
}

export function showFormatPicker(movie: MovieViewModel) {
    frameModule.topmost().navigate({
        moduleName: 'pages/format-picker/format-picker',
        context: movie,
        transition: {
            name: 'slideBottom'
        }
    });
}