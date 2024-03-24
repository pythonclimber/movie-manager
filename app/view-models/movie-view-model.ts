import {ImageSource, Observable} from "@nativescript/core";
import {Movie} from "~/shared/interfaces";
import {MovieService} from '~/services/movie-service';
import * as imageService from '../services/image-service';
import * as navigationModule from '../shared/navigation'
import {MovieFlow} from "~/shared/enums";

export class MovieViewModel extends Observable {
    private movie: Movie;
    private imageSource: ImageSource;
    private isLoading: boolean;
    private isPaused: boolean;
    private flow: string;
    private isMine: boolean;
    private showImage: boolean;

    get ShowImage(): boolean {
        return this.showImage;
    }

    set ShowImage(value: boolean) {
        this.showImage = value;
    }

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
            this.notifyPropertyChange('Wishlist', value);
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

    get Poster(): string {
        return this.movie.poster;
    }

    set Poster(value: string) {
        if (value !== this.movie.poster) {
            this.movie.poster = value;
            this.notifyPropertyChange('Poster', value);
        }
    }

    get IsMine(): boolean {
        return this.isMine;
    }

    set IsMine(value: boolean) {
        if (value !== this.isMine) {
            this.isMine = value;
            this.notifyPropertyChange('IsMine', value);
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

    constructor(movie: Movie, flow: string, private movieService: MovieService = null) {
        super();
        this.movie = movie;
        this.flow = flow;
        this.isMine = flow === MovieFlow.Collection && !this.Wishlist;

        this.movieService = movieService || new MovieService();

        if (!this.movie.rating) {
            this.movie.rating = 0;
        }

        this.Plot = this.Plot || '';

        this.LoadMovieImage(movie);
    }

    public GetLocalDetails(): Promise<any> {
        return this.movieService.getMovie(this.movie.imdbid).then(response => {
            if (response.found) {
                this.UserId = response.movie.userId;
                this.Wishlist = response.movie.wishlist;
                this.Format = response.movie.format;
                this.Rating = response.movie.rating;
                this.Title = response.movie.title;
                this.Director = response.movie.director;
            }
        }).catch(err => {
            console.error(err);
        });
    }

    public GetOnlineDetails(): Promise<any> {
        return this.movieService.getMovieDetails<Movie>(this.movie.imdbid).then(response => {
            this._id = '';
            this.Description = '';
            this.Title = response.title;
            this.Plot = response.plot;
            this.UserId = this.UserId;
            this.Year = response.year;
            this.Director = response.director;
            this.ImdbId = response.imdbid;
            this.Wishlist = this.Wishlist;

            this.LoadMovieImage(response);
        }).catch(error => {
            console.error(error);
        });
    }

    public ToggleFavorite(): void {
        this.Favorite = !this.Favorite;
        this.movieService.toggleFavorite(this.UserId, this.ImdbId, this.Favorite);
    }

    public AddToMyCollection() {
        navigationModule.showFormatPicker(this);
    }

    public RemoveFromMyCollection() {
        this.IsPaused = true;
        this.movieService.deleteMovie(this).then(() => {
            this.UserId = '';
            this.Wishlist = false;
            this.IsPaused = false;
            this.Format = '';
            this.Rating = 0;
            this.IsMine = false;
        });
    }

    public AddToWishlist() {
        this.IsPaused = true;
        this.Wishlist = true;
        this.movieService.addMovie(this).then(movie => {
            this.UserId = movie.userId;
            this.IsPaused = false;
        }).catch(err => {
            console.error(err);
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

    private LoadMovieImage(movie: Movie): void {
        if (movie.poster && movie.poster.startsWith('https')) {
            imageService.getImageFromHttp(movie.poster).then(imageSource => {
                this.ImageSource = imageSource;
            });
        }
    }
}