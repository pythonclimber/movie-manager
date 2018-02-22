import * as frameModule from 'ui/frame';
import { MovieViewModel } from '../pages/movie-page/movie-view-model';

export function startingPage() {
    return 'pages/main-page/main-page'
}

export function navigateToMovie(movie: MovieViewModel) {
    frameModule.topmost().navigate({
        moduleName: 'pages/movie-page/movie-page',
        context: movie
    });
}