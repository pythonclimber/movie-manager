import { FavoriteMovie, Movie } from '~/shared/interfaces';
import { BaseService } from './base-service';

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

    public AddToFavorites<T extends Movie>(movie: T) {
        let movieIndex = this.FindMovieIndexInFavorites(movie._id);
        if (movieIndex < 0) {
            this.favorites.push({movieId: movie._id});
            this.PersistAppSetting(FAVORITES_KEY, this.favorites);
        }
    }

    public RemoveFromFavorites<T extends Movie>(movie: T) {
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