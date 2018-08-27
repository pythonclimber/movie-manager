import * as frameModule from 'ui/frame';
import { MovieViewModel } from '../pages/movie-page/movie-view-model';
import { ShowViewModel } from '../pages/movie-page/show-view-model';
import { SearchViewModel } from '../pages/search-page/search-view-model';
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

export function navigateBackToMainPage() {
    navigateToMainPage();    
}

export function backOnePage() {
    frameModule.topmost().goBack();
}

export function navigateToSearchPage(items: any[], searchMode: ViewMode) {
    let searchViewModel = new SearchViewModel();
    searchViewModel.searchMode = searchMode;
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

export function goToLoginPage() {
    frameModule.topmost().navigate({
        moduleName: 'pages/login-page/login-page',
        transition: {
            name: 'slideRight'
        }
    });
}

export function goToRegistrationPage() {
    frameModule.topmost().navigate({
        moduleName: 'pages/registration-page/registration-page',
        transition: {
            name: 'slideLeft'
        }
    });
}