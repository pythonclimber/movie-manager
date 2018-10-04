import * as frameModule from 'ui/frame';
import { MovieViewModel } from '../view-models/movie-view-model';
import { ShowViewModel } from '../view-models/show-view-model';
import { SearchViewModel } from '../view-models/search-view-model';
import { ViewMode, ViewOptions } from './enums';
import { MainViewModel } from '../view-models/main-view-model';

let mainViewModel: MainViewModel;

export function startingPage() {
    return 'pages/login-page/login-page';
    //return 'pages/main-page/main-page';
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
            name: 'slideLeft'
        }
    });
}

export function navigateToWishlist() {
    frameModule.topmost().navigate({
        moduleName: 'pages/main-page/main-page',
        context: 'wishlist',
        transition: {
            name: 'slideLeft'
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
    frameModule.topmost().navigate({
        moduleName: 'pages/search-page/search-page',
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