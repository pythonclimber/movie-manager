import * as frameModule from 'ui/frame';
import { MovieViewModel } from '../view-models/movie-view-model';
import { ShowViewModel } from '../view-models/show-view-model';
import { SearchViewModel } from '../view-models/search-view-model';
import { ViewMode } from './enums';
import { MainViewModel } from '../view-models/main-view-model';

let mainViewModel: MainViewModel;

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
    mainViewModel = mainViewModel || new MainViewModel();
    frameModule.topmost().navigate({
        moduleName: 'pages/main-page/main-page',
        context: mainViewModel,
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

export function navigateToSearchPage(searchMode: ViewMode) {
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

export function goToRatingPage(movie: MovieViewModel) {
    frameModule.topmost().navigate({
        moduleName: 'pages/rating-page/rating-page',
        context: movie,
        transition: {
            name: 'slideBottom'
        }
    })
}