import { Observable, EventData } from "data/observable";
import { Movie, SearchResult, NewMovie } from "../../shared/interfaces";
import { MovieService } from '../../services/movie-service';
import { ImageSource } from "image-source";
import * as imageService from '../../services/image-service';
import { SearchResultViewModel } from "../search-page/search-result-view-model";
import * as navigationModule from '../../shared/navigation'

export class MovieViewModel extends Observable {
    private movie: Movie;
    private imageSource: ImageSource;
    private isLoading: boolean;

    get Movie(): Movie {
        return this.movie;
    }

    get Type(): string {
        return 'Movie';
    }

    get _id(): string {
        return this.movie._id;
    }

    set _id(value: string) {
        if (value !== this.movie._id) {
            this.movie._id = value;
            this.notifyPropertyChange('_id', value);
        }
    }

    get Title(): string {
        return this.movie.title;
    }

    set Title(value: string) {
        if (value !== this.movie.title) {
            this.movie.title = value;
            this.notifyPropertyChange('Title', value);
        }
    }

    get Description(): string {
        return this.movie.description;
    }

    set Description(value: string) {
        if (value !== this.movie.description) {
            this.movie.description = value;
            this.notifyPropertyChange('Description', value);
        }
    }

    get UserId(): string {
        return this.movie.userId;
    }

    set UserId(value: string) {
        if (value !== this.movie.userId) {
            this.movie.userId = value;
            this.notifyPropertyChange('UserId', value);
        }
    }

    get Director(): string {
        return this.movie.director;
    }

    set Director(value: string) {
        if (value !== this.movie.director) {
            this.movie.director = value;
            this.notifyPropertyChange('Director', value);
        }
    }

    get Favorite(): boolean {
        return this.movie.favorite;
    }

    set Favorite(value: boolean) {
         if (this.movie.favorite !== value) {
             this.movie.favorite = value;
             this.notifyPropertyChange('Favorite', value);
         }
    }

    get ImageSource(): ImageSource {
        return this.imageSource;
    }

    set ImageSource(value: ImageSource) {
        if (value !== this.imageSource) {
            this.imageSource = value;
            this.notifyPropertyChange('ImageSource', value);
        }
    }

    get Plot(): string {
        return this.movie.plot;
    }

    set Plot(value: string) {
        if (value !== this.movie.plot) {
            this.movie.plot = value;
            this.notifyPropertyChange('Plot', value);
        }
    }

    get ImdbId(): string {
        return this.movie.imdbid;
    }

    set ImdbId(value: string) {
        if (value !== this.movie.imdbid) {
            this.movie.imdbid = value;
            this.notifyPropertyChange('ImdbId', value)
        }
    }

    get IsLoading(): boolean {
        return this.isLoading;
    }

    set IsLoading(value: boolean) {
        if (value !== this.isLoading) {
            this.isLoading = value;
            this.notifyPropertyChange('IsLoading', value);
        }
    }

    get Year(): string {
        return this.movie.year;
    }

    set Year(value: string) {
        if (value !== this.movie.year) {
            this.movie.year = value;
            this.notifyPropertyChange('Year', value);
        }
    }

    constructor(movie: Movie) {
        super();
        this.movie = movie;

        if (this.movie.title.startsWith('The ')) {
            this.movie.title = this.movie.title.substr(4) + ', The'
        } else if (this.movie.title.startsWith('A ')) {
            this.movie.title = this.movie.title.substr(2) + ', A'
        } else if (this.movie.title.startsWith('An ')) {
            this.movie.title = this.movie.title.substr(3) + ', An'
        }

        if (!this.Plot) {
            this.Plot = '';
        }
    }

    public GetDetails(): Promise<any> {
        let movieService = new MovieService();

        return movieService.getMovieDetails<any>(this.movie.imdbid).then(response => {
                let movie = <NewMovie>response;
                this._id = '';
                this.Description = '';
                this.Title = movie.Title;
                this.Plot = movie.Plot;
                this.UserId = this.UserId;
                this.Year = movie.Year;
                this.Director = movie.Director;
                this.ImdbId = movie.imdbID;

                if (movie.Poster && movie.Poster.startsWith('https')) {
                    imageService.getImageFromHttp(movie.Poster).then(imageSource => {
                        this.ImageSource = imageSource;
                    });
                }
        }).catch(error => {
            console.log(error);
        });
    }

    public ToggleFavorite(): void {
        this.Favorite = !this.Favorite;
        let movieService = new MovieService();
        movieService.toggleFavorite(this.UserId, this.ImdbId, this.Favorite);
    }

    public AddMovieToMyCollection(args: EventData) {
        let moviesService = new MovieService();
        moviesService.addMovie(this).then(response => {
            this.UserId = response.userId;
        });
    }

    public RemoveFromMyCollection(args: EventData) {
        let movieService = new MovieService();
        movieService.deleteMovie(this).then(response => {
            this.UserId = '';
            navigationModule.navigateToMainPage();
        });
    }
}