import * as appSettingsModule from 'application-settings';
import { FavoriteMovie } from '../shared/interfaces';
import { MovieViewModel } from '../pages/movie-page/movie-view-model';

const FAVORITES_KEY: string = 'FAVORITES';
var favorites: Array<FavoriteMovie>;

try {
    favorites = <Array<FavoriteMovie>>JSON.parse(appSettingsModule.getString(FAVORITES_KEY));
} catch (error) {
    favorites = new Array<FavoriteMovie>();
}

export function addToFavorites(movie: MovieViewModel) {
    let movieIndex = this.findMovieIndexInFavorites(movie._id);
    if (movieIndex < 0) {
        favorites.push({movieId: movie._id});
        persistFavorites();
    }
}

export function removeFromFavorites(movie: MovieViewModel) {
    let movieIndex = this.findMovieIndexInFavorites(movie._id);
    if (movieIndex >= 0) {
        favorites.splice(movieIndex, 1);
        persistFavorites();
    }
}

export function persistFavorites() {
    var jsonString = JSON.stringify(favorites);
    console.log(jsonString, favorites);
    appSettingsModule.setString(FAVORITES_KEY, jsonString);
}

export function findMovieIndexInFavorites(movieId: string): number {
    return favorites.findIndex(e => e.movieId === movieId);
}