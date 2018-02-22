import { Observable } from "tns-core-modules/ui/page/page";
import { Movie } from "../../shared/interfaces";
import * as favoriteService from '../../services/favorites-service';

export class MovieViewModel extends Observable implements Movie {
    private _movie: Movie;
    private _favorite: boolean;

    constructor(movie: Movie) {
        super();
        this._movie = movie;
    }

    get _id(): string {
        return this._movie._id;
    }

    set _id(value: string) {
        if (value !== this._movie._id) {
            this._movie._id = value;
            this.notifyPropertyChange('_id', value);
        }
    }

    get title(): string {
        return this._movie.title;
    }

    set title(value: string) {
        if (value !== this._movie.title) {
            this._movie.title = value;
            this.notifyPropertyChange('title', value);
        }
    }

    get description(): string {
        return this._movie.description;
    }

    set description(value: string) {
        if (value !== this._movie.description) {
            this._movie.description = value;
            this.notifyPropertyChange('description', value);
        }
    }

    get userId(): string {
        return this._movie.userId;
    }

    set userId(value: string) {
        if (value !== this._movie.userId) {
            this._movie.userId = value;
            this.notifyPropertyChange('userId', value);
        }
    }

    get director(): string {
        return this._movie.director;
    }

    set director(value: string) {
        if (value !== this._movie.director) {
            this._movie.director = value;
            this.notifyPropertyChange('director', value);
        }
    }

    get favorite(): boolean {
        return this._favorite;
    }

    set favorite(value: boolean) {
         if (this._favorite !== value) {
             this._favorite = value;
             this.notifyPropertyChange('favorite', value);
         }
    }

    public toggleFavorite(): void {
        this.favorite = !this.favorite;
        if (this.favorite) {
            favoriteService.addToFavorites(this);
        } else {
            favoriteService.removeFromFavorites(this);
        }
    }
}