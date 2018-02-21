import { Observable } from "tns-core-modules/ui/page/page";
import { Movie } from "../../shared/interfaces";

export class MovieViewModel extends Observable implements Movie {
    private _movie: Movie;
    constructor(movie: Movie) {
        super();
        this._movie = movie;
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
        return this._movie.favorite;
    }

    set favorite(value: boolean) {
        if (value !== this._movie.favorite) {
            this._movie.favorite = value;
            this.notifyPropertyChange('favorite', value);
        }
    }

    public toggleFavorite(): void {
        this.favorite = !this.favorite;
    }
}