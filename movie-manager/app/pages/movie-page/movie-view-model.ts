import { Observable } from "tns-core-modules/ui/page/page";
import { Movie } from "../../shared/interfaces";
import * as favoriteService from '../../services/favorites-service';
import { MoviesService } from '../../services/movies-service';
import { ImageSource } from "tns-core-modules/image-source/image-source";
import * as imageService from '../../services/image-service';

export class MovieViewModel extends Observable implements Movie {
    private _movie: Movie;
    private _favorite: boolean;
    private _imageSource: ImageSource;

    constructor(movie: Movie) {
        super();
        this._movie = movie;
    }

    public getDetails(): Promise<any> {
        let movieService = new MoviesService();
        return movieService.getMovieDetails<any>(this._movie.onlineId).then(response => {
            if (response.success) {
                let movie = response.movie;
                this._movie = movie;
                if (movie.poster) {
                    imageService.getImageFromHttp(movie.poster).then(imageSource => {
                        this.imageSource = imageSource;
                    });
                }
                this.notifyPropertyChange('movie', movie);
            }
        });
    }

    get movie(): Movie {
        return this._movie;
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

    get imageSource(): ImageSource {
        return this._imageSource;
    }

    set imageSource(value: ImageSource) {
        if (value !== this._imageSource) {
            this._imageSource = value;
            this.notifyPropertyChange('imageSource', value);
        }
    }

    get plot(): string {
        return this._movie.plot;
    }

    set plot(value: string) {
        if (value !== this._movie.plot) {
            this._movie.plot = value;
            this.notifyPropertyChange('plot', value);
        }
    }

    get onlineId(): string {
        return this._movie.onlineId;
    }

    set onlineId(value: string) {
        if (value !== this._movie.onlineId) {
            this._movie.onlineId = value;
            this.notifyPropertyChange('onlineId', value)
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