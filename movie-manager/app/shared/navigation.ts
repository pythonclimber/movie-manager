import * as frameModule from 'ui/frame';
import { MovieViewModel } from '../pages/movie-page/movie-view-model';
import { SearchViewModel } from '../pages/search-page/search-view-model';
import * as loginService from '../services/login-service';

export function startingPage() {
    return 'pages/login-page/login-page'
}

export function navigateToMovie(movie: MovieViewModel) {
    frameModule.topmost().navigate({
        moduleName: 'pages/movie-page/movie-page',
        context: movie
    });
}

export function navigateToMainPage() {
    frameModule.topmost().navigate({
        moduleName: 'pages/main-page/main-page'
    });
}

export function backOnePage() {
    frameModule.topmost().goBack();
}

export function navigateToSearchPage(movies: MovieViewModel[]) {
    let searchViewModel = new SearchViewModel();
    searchViewModel.myMovies = movies;
    frameModule.topmost().navigate({
        moduleName: 'pages/search-page/search-page',
        context: searchViewModel
    });
}