import { Observable, EventData } from "data/observable";
import { Movie, MovieDetailResponse } from "../shared/interfaces";
import { MovieService } from '../services/movie-service';
import { ImageSource } from "image-source";
import * as imageService from '../services/image-service';
import * as navigationModule from '../shared/navigation'
import { MovieFlow } from "../shared/enums";

export class MovieViewModel extends Observable {
    private movie: Movie;
    private imageSource: ImageSource;
    private isLoading: boolean;
    private movieService: MovieService;
    private isPaused: boolean;
    private flow: string;

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

    get Wishlist(): boolean {
        return this.movie.wishlist;
    }

    set Wishlist(value: boolean) {
        if (value !== this.movie.wishlist) {
            this.movie.wishlist = value;
        }
    }

    get Format(): string {
        return this.movie.format;
    }

    set Format(value: string) {
        if (value !== this.movie.format) {
            this.movie.format = value;
            this.notifyPropertyChange('Format', value);
        }
    }

    get IsPaused(): boolean {
        return this.isPaused;
    }

    set IsPaused(value: boolean) {
        if (value !== this.isPaused) {
            this.isPaused = value;
            this.notifyPropertyChange('IsPaused', value);
        }
    }

    get Rating(): number {
        return this.movie.rating;
    }

    set Rating(value: number) {
        if (value !== this.movie.rating) {
            this.movie.rating = value;
            this.notifyPropertyChange("Rating", value);
        }
    }

    get Flow(): string {
        return this.flow;
    }

    get MovieFlowSearch(): string {
        return MovieFlow.Search;
    }

    get MovieFlowCollection(): string {
        return MovieFlow.Collection;
    }

    constructor(movie: Movie, flow: string) {
        super();
        this.movie = movie;
        this.movieService = new MovieService();
        this.flow = flow;

        if (!this.movie.rating) {
            this.movie.rating = 0;
        }

        //this.movie.title = this.movieService.FormatTitle(this.movie.title);

        this.Plot = this.Plot || '';
    }

    public GetLocalDetails(): Promise<any> {
        return this.movieService.getMovie(this.movie.imdbid).then(response => {
            if (response.success) {
                this.UserId = response.movie.userId;
                this.Wishlist = response.movie.wishlist;
                this.Format = response.movie.format;
            }
        });
    }

    public GetOnlineDetails(): Promise<any> {
        return this.movieService.getMovieDetails<MovieDetailResponse>(this.movie.imdbid).then(response => {
                let movie = response.movie;
                this._id = '';
                this.Description = '';
                this.Title = movie.title;
                this.Plot = movie.plot;
                this.UserId = this.UserId;
                this.Year = movie.year;
                this.Director = movie.director;
                this.ImdbId = movie.imdbid;
                this.Wishlist = this.Wishlist;

                if (movie.poster && movie.poster.startsWith('https')) {
                    imageService.getImageFromHttp(movie.poster).then(imageSource => {
                        this.ImageSource = imageSource;
                    });
                }
        }).catch(error => {
            console.log(error);
        });
    }

    public ToggleFavorite(): void {
        this.Favorite = !this.Favorite;
        this.movieService.toggleFavorite(this.UserId, this.ImdbId, this.Favorite);
    }

    public AddToMyCollection(args: EventData) {
        navigationModule.showFormatPicker(this);
        // if (this.Wishlist) {
        //     navigationModule.showFormatPicker(this);
        //     this.movieService.toggleWishlist(this.UserId, this.ImdbId, false).then(response => {
        //         this.Wishlist = false;
        //         navigationModule.navigateToMainPage();
        //     });
        // } else {
        //     this.movieService.addMovie(this).then(response => {
        //         this.UserId = response.userId;
        //         this.Wishlist = false;
        //     });
        // }
    }

    public RemoveFromMyCollection(args: EventData) {
        this.IsPaused = true;
        this.movieService.deleteMovie(this).then(response => {
            this.UserId = '';
            this.Wishlist = false;
            this.IsPaused = false;
            //navigationModule.navigateToMainPage();
        });
    }

    public AddToWishlist(args: EventData) {
        this.IsPaused = true;
        this.Wishlist = true;
        this.movieService.addMovie(this).then(movie => {
            this.UserId = movie.userId;
            this.IsPaused = false;
        });
    }

    public GoToMyMovies() {
        navigationModule.navigateToMainPage();
    }

    public AddFormats() {
        navigationModule.showFormatPicker(this);
    }

    public AddRating() {
        navigationModule.goToRatingPage(this);
    }
}