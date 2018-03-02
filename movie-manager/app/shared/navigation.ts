import * as frameModule from 'ui/frame';
import { MovieViewModel } from '../pages/movie-page/movie-view-model';

export function startingPage() {
    return 'pages/search-page/search-page'
}

export function navigateToMovie(movie: MovieViewModel) {
    frameModule.topmost().navigate({
        moduleName: 'pages/movie-page/movie-page',
        context: movie
    });
}

export function navigateToMainPage(userId: string) {
    frameModule.topmost().navigate({
        moduleName: 'pages/main-page/main-page'
    });
}

export function backOnePage() {
    frameModule.topmost().goBack();
}

export function navigateToSearchPage() {
    frameModule.topmost().navigate({
        moduleName: 'pages/search-page/search-page'
    });
}