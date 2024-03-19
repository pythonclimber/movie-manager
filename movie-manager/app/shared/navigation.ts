import { Frame } from "@nativescript/core";
import { MovieViewModel } from '~/view-models/movie-view-model';
import { ShowViewModel } from '~/view-models/show-view-model';
import { ViewMode } from './enums';

export function navigateToMovie(movie: MovieViewModel) {
    Frame.topmost().navigate({
        moduleName: 'pages/movie-page/movie-page',
        context: movie,
        transition: {
            name: 'slideLeft'
        }
    });
}

export function navigateToShow(show: ShowViewModel) {
    Frame.topmost().navigate({
        moduleName: 'pages/show-page/show-page',
        context: show
    });
}

export function navigateToMainPage() {
    Frame.topmost().navigate({
        moduleName: 'pages/main-page/main-page',
        transition: {
            name: 'slideLeft'
        }
    });
}

export function navigateToWishlist() {
    Frame.topmost().navigate({
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
    Frame.topmost().goBack();
}

export function navigateToSearchPage(searchMode: ViewMode) {
    Frame.topmost().navigate({
        moduleName: 'pages/search-page/search-page',
        transition: {
            name: 'slideLeft'
        }
    });
}

export function showFormatPicker(movie: MovieViewModel) {
    Frame.topmost().navigate({
        moduleName: 'pages/format-picker/format-picker',
        context: movie,
        transition: {
            name: 'slideBottom'
        }
    });
}

export function goToLoginPage() {
    Frame.topmost().navigate({
        moduleName: 'pages/login-page/login-page',
        transition: {
            name: 'slideRight'
        }
    });
}

export function goToRegistrationPage() {
    Frame.topmost().navigate({
        moduleName: 'pages/registration-page/registration-page',
        transition: {
            name: 'slideLeft'
        }
    });
}

export function goToRatingPage(movie: MovieViewModel) {
    Frame.topmost().navigate({
        moduleName: 'pages/rating-page/rating-page',
        context: movie,
        transition: {
            name: 'slideBottom'
        }
    })
}