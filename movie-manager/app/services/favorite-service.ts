import * as appSettingsModule from 'application-settings';
import { FavoriteMovie } from '../shared/interfaces';
import { MovieViewModel } from '../pages/movie-page/movie-view-model';
import { BaseService } from '../shared/base-service';

const FAVORITES_KEY: string = 'FAVORITES';

export class FavoriteService extends BaseService {
    private favorites: FavoriteMovie[];

    constructor() {
        super();

        try {
            this.favorites = <FavoriteMovie[]>this.GetAppSetting(FAVORITES_KEY)
        } catch (error) {
            this.favorites = new Array<FavoriteMovie>();
        }
    }

    public AddToFavorites(movie: MovieViewModel) {
        let movieIndex = this.FindMovieIndexInFavorites(movie._id);
        if (movieIndex < 0) {
            this.favorites.push({movieId: movie._id});
            this.PersistAppSetting(FAVORITES_KEY, this.favorites);
        }
    }

    public RemoveFromFavorites(movie: MovieViewModel) {
        let movieIndex = this.FindMovieIndexInFavorites(movie._id);
        if (movieIndex >= 0) {
            this.favorites.splice(movieIndex, 1);
            this.PersistAppSetting(FAVORITES_KEY, this.favorites);
        }
    }

    public FindMovieIndexInFavorites(movieId: string): number {
        return this.favorites.findIndex(e => e.movieId === movieId);
    }
}